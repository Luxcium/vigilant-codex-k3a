import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { smartFetch } from '../src'
import { bootstrap } from '../src/auth/manual'

vi.mock('../src/auth/manual', () => ({
  bootstrap: vi.fn(async () => ({
    accessToken: 't',
    apiServer: '',
    refreshToken: 'r',
    expiresAt: Date.now() + 60_000
  }))
}))

describe('smartFetch', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('retries on 429 after reset', async () => {
    const reset = Math.floor(Date.now() / 1000)
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response('{}', { status: 429, headers: { 'X-RateLimit-Reset': String(reset), 'X-RateLimit-Remaining': '0' } })
      )
      .mockResolvedValueOnce(new Response('{}', { status: 200 }))
    const fetchQ = smartFetch(fetchMock)
    const res = await fetchQ('a', { clientId: 'c', refreshToken: 'r' })
    expect(res.status).toBe(200)
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('refreshes on 401/1017 once', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response('{"code":1017,"message":"bad"}', { status: 401, headers: { 'Content-Type': 'application/json' } })
      )
      .mockResolvedValueOnce(new Response('{}', { status: 200 }))
    const fetchQ = smartFetch(fetchMock)
    const res = await fetchQ('b', { clientId: 'c', refreshToken: 'r' })
    expect(res.status).toBe(200)
    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(bootstrap).toHaveBeenCalledTimes(1)
  })

  it('throws QuestradeError on failure', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response('{"code":1002,"message":"bad"}', { status: 400, headers: { 'Content-Type': 'application/json' } })
    )
    const fetchQ = smartFetch(fetchMock)
    await expect(fetchQ('c')).rejects.toThrow('bad')
  })

  it('works with default fetch', async () => {
    const original = global.fetch
    global.fetch = vi.fn().mockResolvedValue(new Response('{}', { status: 200 }))
    const fetchQ = smartFetch()
    const res = await fetchQ('d')
    expect(res.status).toBe(200)
    global.fetch = original
  })
})
