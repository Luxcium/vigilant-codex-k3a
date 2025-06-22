import { describe, expect, it, beforeEach } from 'vitest'
import { WebStorageStore } from '../../../auth/tokenStore/webStorage'
import type { OAuthTokens } from '../../../auth/interfaces'

describe('WebStorageStore', () => {
  const key = 'TEST_QT'
  const store = new WebStorageStore(key)
  const sample: OAuthTokens = {
    access_token: 'a',
    refresh_token: 'r',
    expires_in: 100,
    api_server: 'https://api',
    expiresAt: Date.now() + 1000
  }

  beforeEach(() => {
    // Reset mock localStorage
    const localStorageMock = {
      store: {} as Record<string, string>,
      getItem(key: string) { return this.store[key] ?? null },
      setItem(key: string, value: string) { this.store[key] = value },
      removeItem(key: string) { delete this.store[key] }
    }
    // @ts-ignore
    globalThis.localStorage = localStorageMock
  })

  it('initially returns null when no token stored', async () => {
    await expect(store.load()).resolves.toBeNull()
  })

  it('saves and loads token via localStorage', async () => {
    await store.save(sample)
    await expect(store.load()).resolves.toEqual(sample)
  })

  it('clears token from localStorage', async () => {
    await store.save(sample)
    await store.clear()
    await expect(store.load()).resolves.toBeNull()
  })
})