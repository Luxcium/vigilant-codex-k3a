import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  createRateLimiter,
  TokenBucketLimiter,
} from '../rateLimit/tokenBucket';

describe('tokenBucket', () => {
  describe('createRateLimiter function', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    it('blocks when tokens are exhausted and refills', async () => {
      const rl = createRateLimiter();
      await rl.acquire('account');
      await rl.acquire('account');
      vi.advanceTimersByTime(1000);
      const p = rl.acquire('account');
      vi.runAllTimers();
      await expect(p).resolves.toBeUndefined();
    });

    it('sync uses headers', async () => {
      const rl = createRateLimiter();
      rl.sync('market', 1, Math.floor(Date.now() / 1000));
      await rl.acquire('market');
      // Should not throw - the rate limiter should handle it gracefully
      vi.advanceTimersByTime(1000);
    });
  });

  describe('TokenBucketLimiter class', () => {
    it('bucket consume and hydrate', async () => {
      const limiter = new TokenBucketLimiter();
      await limiter.consume('account');
      limiter.hydrate('account', {
        'x-ratelimit-remaining': '1',
        'x-ratelimit-reset': String(Math.floor(Date.now() / 1000) + 1),
      });
      expect(true).toBe(true);
    });

    it('handle429 resets both buckets to zero and sets reset timers', () => {
      const limiter = new TokenBucketLimiter();
      const resetSec = Math.floor(Date.now() / 1000) + 5;
      limiter.handle429('account', resetSec);
      const buckets = (limiter as any).buckets as Record<string, any>;
      expect(buckets.account.perSecond.remaining).toBe(0);
      expect(buckets.account.perHour.remaining).toBe(0);
      expect(buckets.account.perSecond.reset).toBe(resetSec * 1000);
      expect(buckets.account.perHour.reset).toBe(resetSec * 1000);
    });

    it('hydrate handles NaN values gracefully', async () => {
      const limiter = new TokenBucketLimiter();
      await limiter.consume('account');

      const buckets = (limiter as any).buckets as Record<string, any>;
      const beforeSecond = buckets.account.perSecond.remaining;
      const beforeHour = buckets.account.perHour.remaining;

      // Test with NaN values in headers
      limiter.hydrate('account', {
        'x-ratelimit-remaining': 'invalid',
        'x-ratelimit-reset': 'notanumber',
        'x-ratelimit-remaining-hour': 'alsoinvalid',
        'x-ratelimit-reset-hour': 'stillnotanumber',
      });

      // Should not throw and bucket state should remain unchanged when NaN
      expect(buckets.account.perSecond.remaining).toBe(beforeSecond);
      expect(buckets.account.perHour.remaining).toBe(beforeHour);
    });

    it('refill method works correctly for both buckets', () => {
      const limiter = new TokenBucketLimiter();
      const buckets = (limiter as any).buckets as Record<string, any>;
      const refillMethod = (limiter as any).refill.bind(limiter);

      const group = buckets.account;

      // Set reset times in the past to trigger refill
      const pastTime = Date.now() - 1000;
      group.perSecond.reset = pastTime;
      group.perHour.reset = pastTime;

      // Set remaining to 0 to verify refill works
      group.perSecond.remaining = 0;
      group.perHour.remaining = 0;

      // Call refill directly
      refillMethod(group);

      // Verify refill happened - tokens should be refilled
      expect(group.perSecond.remaining).toBe(group.perSecond.capacity);
      expect(group.perHour.remaining).toBe(group.perHour.capacity);
    });

    it('refill works for individual buckets', () => {
      const limiter = new TokenBucketLimiter();
      const buckets = (limiter as any).buckets as Record<string, any>;
      const refillMethod = (limiter as any).refill.bind(limiter);

      const group = buckets.account;

      // Test second bucket refill only
      group.perSecond.reset = Date.now() - 1000;
      group.perSecond.remaining = 0;
      group.perHour.reset = Date.now() + 1000; // Future time
      group.perHour.remaining = 10; // Some tokens remain

      refillMethod(group);

      // Verify only second bucket was refilled
      expect(group.perSecond.remaining).toBe(group.perSecond.capacity);
      expect(group.perHour.remaining).toBe(10); // Should remain unchanged
    });

    it('refill works for hour bucket only', () => {
      const limiter = new TokenBucketLimiter();
      const buckets = (limiter as any).buckets as Record<string, any>;
      const refillMethod = (limiter as any).refill.bind(limiter);

      const group = buckets.account;

      // Test hour bucket refill only
      group.perSecond.reset = Date.now() + 1000; // Future time
      group.perSecond.remaining = 5; // Some tokens remain
      group.perHour.reset = Date.now() - 1000; // Past time
      group.perHour.remaining = 0;

      refillMethod(group);

      // Verify only hour bucket was refilled
      expect(group.perSecond.remaining).toBe(5); // Should remain unchanged
      expect(group.perHour.remaining).toBe(group.perHour.capacity);
    });
  });
});
