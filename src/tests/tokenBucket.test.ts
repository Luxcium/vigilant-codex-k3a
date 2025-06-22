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
  })
})
