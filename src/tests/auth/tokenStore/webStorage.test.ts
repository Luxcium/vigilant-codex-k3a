import { describe, expect, it, beforeEach } from 'vitest';
import { WebStorageStore } from '../../../auth/tokenStore/webStorage';
import type { OAuthTokens } from '../../../auth/interfaces';

describe('WebStorageStore', () => {
  const key = 'TEST_QT';
  const store = new WebStorageStore(key);
  const sample: OAuthTokens = {
    access_token: 'a',
    refresh_token: 'r',
    expires_in: 100,
    api_server: 'https://api',
    expiresAt: Date.now() + 1000,
  };

  beforeEach(() => {
    // Reset mock localStorage
    const localStorageMock = {
      store: new Map<string, string>(),
      getItem(key: string) {
        return this.store.get(key) ?? null;
      },
      setItem(key: string, value: string) {
        this.store.set(key, value);
      },
      removeItem(key: string) {
        this.store.delete(key);
      },
    };
    // @ts-expect-error Testing localStorage mock
    globalThis.localStorage = localStorageMock;
  });

  it('initially returns null when no token stored', async () => {
    await expect(store.load()).resolves.toBeNull();
  });

  it('saves and loads token via localStorage', async () => {
    await store.save(sample);
    await expect(store.load()).resolves.toEqual(sample);
  });

  it('clears token from localStorage', async () => {
    await store.save(sample);
    await store.clear();
    await expect(store.load()).resolves.toBeNull();
  });

  it('returns null when localStorage is not available', async () => {
    const originalLocalStorage = globalThis.localStorage;
    // @ts-expect-error Testing localStorage unavailable
    delete globalThis.localStorage;
    await expect(store.load()).resolves.toBeNull();
    globalThis.localStorage = originalLocalStorage;
  });

  it('returns null when localStorage is null', async () => {
    const originalLocalStorage = globalThis.localStorage;
    // @ts-expect-error Testing edge case where localStorage is null
    globalThis.localStorage = null;
    await expect(store.load()).resolves.toBeNull();

    // Should also handle save/clear gracefully
    await expect(store.save(sample)).resolves.toBeUndefined();
    await expect(store.clear()).resolves.toBeUndefined();

    globalThis.localStorage = originalLocalStorage;
  });

  it('uses default key when no key provided in constructor', async () => {
    const defaultStore = new WebStorageStore(); // This should use default 'qt_tokens' key
    await defaultStore.save(sample);

    // Verify it's stored under the default key
    const localStorageMock = globalThis.localStorage as any;
    expect(localStorageMock.store.has('qt_tokens')).toBe(true);

    await expect(defaultStore.load()).resolves.toEqual(sample);
  });
});
