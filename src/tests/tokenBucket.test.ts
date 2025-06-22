import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createRateLimiter } from '../rateLimit/tokenBucket'

describe('tokenBucket', () => {
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
