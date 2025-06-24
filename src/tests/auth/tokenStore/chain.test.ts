import { describe, expect, it, vi } from 'vitest'
import { chainStores } from '../../../auth/tokenStore/chain'
import type { OAuthTokens, TokenStore } from '../../../auth/interfaces'

describe('ChainStore', () => {
  const sample: OAuthTokens = {
    access_token: 'a',
    refresh_token: 'r',
    expires_in: 123,
    api_server: 'https://api',
    expiresAt: Date.now() + 123000
  }

  it('returns first non-null token', async () => {
    const store1: TokenStore = { load: vi.fn().mockResolvedValue(null), save: vi.fn(), clear: vi.fn() }
    const store2: TokenStore = { load: vi.fn().mockResolvedValue(sample), save: vi.fn(), clear: vi.fn() }
    const store3: TokenStore = { load: vi.fn(), save: vi.fn(), clear: vi.fn() }
    const chain = chainStores(store1, store2, store3)
    await expect(chain.load()).resolves.toEqual(sample)
    expect(store1.load).toHaveBeenCalled()
    expect(store2.load).toHaveBeenCalled()
    expect(store3.load).not.toHaveBeenCalled()
  })

  it('returns null if all stores empty', async () => {
    const stores = Array(3).fill({ load: vi.fn().mockResolvedValue(null), save: vi.fn(), clear: vi.fn() })
    const chain = chainStores(...stores)
    await expect(chain.load()).resolves.toBeNull()
  })

  it('saves to all stores', async () => {
    const stores: TokenStore[] = Array(2).fill({ load: vi.fn(), save: vi.fn().mockResolvedValue(undefined), clear: vi.fn() })
    const chain = chainStores(...stores)
    await chain.save(sample)
    stores.forEach(s => expect(s.save).toHaveBeenCalledWith(sample))
  })

  it('clears all stores', async () => {
    const stores: TokenStore[] = Array(2).fill({ load: vi.fn(), save: vi.fn(), clear: vi.fn().mockResolvedValue(undefined) })
    const chain = chainStores(...stores)
    await chain.clear()
    stores.forEach(s => expect(s.clear).toHaveBeenCalled())
  })
})