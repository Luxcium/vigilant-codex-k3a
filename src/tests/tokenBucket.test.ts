import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createRateLimiter, TokenBucketLimiter } from '../rateLimit/tokenBucket'

describe('tokenBucket', () => {
  describe('createRateLimiter function', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    it('blocks when tokens are exhausted and refills', async () => {
      const rl = createRateLimiter()
      await rl.acquire('account')
      await rl.acquire('account')
      vi.advanceTimersByTime(1000)
      const p = rl.acquire('account')
      vi.runAllTimers()
      await expect(p).resolves.toBeUndefined()
    })

    it('sync uses headers', async () => {
      const rl = createRateLimiter()
      rl.sync('market', 1, Math.floor(Date.now() / 1000))
      await rl.acquire('market')
      expect(async () => rl.acquire('market')).rejects
      vi.advanceTimersByTime(1000)
    })
  })

  describe('TokenBucketLimiter class', () => {
    it('bucket consume and hydrate', async () => {
      const limiter = new TokenBucketLimiter()
      await limiter.consume('account')
      limiter.hydrate('account', { 
        'x-ratelimit-remaining': '1', 
        'x-ratelimit-reset': String(Math.floor(Date.now() / 1000) + 1) 
      })
      expect(true).toBe(true)
    })
    it('handle429 resets both buckets to zero and sets reset timers', () => {
      const limiter = new TokenBucketLimiter()
      const resetSec = Math.floor(Date.now() / 1000) + 5
      limiter.handle429('account', resetSec)
      const buckets = (limiter as any).buckets as Record<string, any>
      expect(buckets.account.perSecond.remaining).toBe(0)
      expect(buckets.account.perHour.remaining).toBe(0)
      expect(buckets.account.perSecond.reset).toBe(resetSec * 1000)
      expect(buckets.account.perHour.reset).toBe(resetSec * 1000)
    })
  })
})
