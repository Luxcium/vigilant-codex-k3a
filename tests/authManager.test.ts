import { AuthManager } from '../src/auth/manager';
import { OAuthProvider, TokenStore, OAuthTokens } from '../src/auth/interfaces';

class DummyProvider implements OAuthProvider {
  constructor(private tokens: OAuthTokens) {}
  authorizeUrl(): string { return ''; }
  async exchangeCode(): Promise<OAuthTokens> { return this.tokens; }
  async refreshToken(): Promise<OAuthTokens> { return this.tokens; }
}

class MemStore implements TokenStore {
  constructor(private t: OAuthTokens | null) {}
  async load() { return this.t; }
  async save(t: OAuthTokens) { this.t = t; }
  async clear() { this.t = null; }
}

test('refresh path', async () => {
  const now = Date.now();
  const stale: OAuthTokens = { access_token: 'a', refresh_token: 'r', api_server: 's', expires_in: 1, expiresAt: now - 1000 };
  const fresh: OAuthTokens = { ...stale, expiresAt: now + 3600000 };
  const provider = new DummyProvider(fresh);
  const store = new MemStore(stale);
  const am = new AuthManager(provider, store);
  const token = await am.getAccessToken();
  expect(token).toBe('a');
  expect(store.load()).resolves.not.toBeNull();
});
