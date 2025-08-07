import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { EnvStore } from '../../../infra/auth/tokenStore/env';
import type { OAuthTokens } from '../../../infra/auth/interfaces';

describe('EnvStore', () => {
  const varName = 'TEST_TOKENS';
  let store: EnvStore;
  const sample: OAuthTokens = {
    access_token: 'a',
    refresh_token: 'r',
    expires_in: 3600,
    api_server: 'https://api',
    expiresAt: Date.now() + 3600_000,
  };

  beforeEach(() => {
    delete process.env[varName];
    store = new EnvStore(varName);
  });

  afterEach(() => {
    delete process.env[varName];
  });

  it('initially returns null', async () => {
    await expect(store.load()).resolves.toBeNull();
  });

  it('saves and loads tokens', async () => {
    await store.save(sample);
    const loaded = await store.load();
    expect(loaded).toEqual(sample);
  });

  it('clears tokens', async () => {
    await store.save(sample);
    await store.clear();
    await expect(store.load()).resolves.toBeNull();
  });

  it('uses default key when no varName provided', async () => {
    const defaultStore = new EnvStore();
    await defaultStore.save(sample);
    expect(process.env.QT_TOKENS).toBeDefined();
    await defaultStore.clear();
    expect(process.env.QT_TOKENS).toBeUndefined();
  });
});
