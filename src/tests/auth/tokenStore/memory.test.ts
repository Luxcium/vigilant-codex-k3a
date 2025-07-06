import { describe, expect, it } from 'vitest';
import { MemoryStore } from '../../../auth/tokenStore/memory';
import type { OAuthTokens } from '../../../auth/interfaces';

describe('MemoryStore', () => {
  const store = new MemoryStore();
  const sample: OAuthTokens = {
    access_token: 'a',
    refresh_token: 'r',
    expires_in: 3600,
    api_server: 'https://api',
    expiresAt: Date.now() + 3600_000,
  };

  it('initially has no tokens', async () => {
    await expect(store.load()).resolves.toBeNull();
  });

  it('saves and loads tokens', async () => {
    await store.save(sample);
    await expect(store.load()).resolves.toEqual(sample);
  });

  it('clears tokens', async () => {
    await store.clear();
    await expect(store.load()).resolves.toBeNull();
  });
});
