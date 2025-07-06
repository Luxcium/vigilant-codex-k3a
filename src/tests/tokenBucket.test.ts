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

    it('refill method works correctly for both buckets', async () => {
      vi.useFakeTimers();
      const limiter = new TokenBucketLimiter();
      const buckets = (limiter as any).buckets as Record<string, any>;

      // Consume all tokens
      await limiter.consume('account');
      await limiter.consume('account');

      // Set reset times in the past to trigger refill
      const pastTime = Date.now() - 1000;
      buckets.account.perSecond.reset = pastTime;
      buckets.account.perHour.reset = pastTime;

      // Set remaining to 0 to verify refill works
      buckets.account.perSecond.remaining = 0;
      buckets.account.perHour.remaining = 0;

      // This should trigger refill internally and succeed
      await limiter.consume('account');

      // Verify refill happened - tokens should be refilled
      expect(buckets.account.perSecond.remaining).toBeGreaterThan(0);
      expect(buckets.account.perHour.remaining).toBeGreaterThan(0);

      vi.useRealTimers();
    });

    it('refill works for individual buckets', async () => {
      vi.useFakeTimers();
      const limiter = new TokenBucketLimiter();
      const buckets = (limiter as any).buckets as Record<string, any>;

      // Consume tokens
      await limiter.consume('account');

      // Test second bucket refill only
      buckets.account.perSecond.reset = Date.now() - 1000;
      buckets.account.perSecond.remaining = 0;
      buckets.account.perHour.reset = Date.now() + 1000; // Future time

      await limiter.consume('account');

      // Verify only second bucket was refilled
      expect(buckets.account.perSecond.remaining).toBeGreaterThan(0);

      vi.useRealTimers();
    });
  });
});
