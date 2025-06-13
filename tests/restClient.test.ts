import { RestClient } from '../src/http/restClient';
import { AuthManager } from '../src/auth/manager';
import { OAuthProvider, TokenStore, OAuthTokens } from '../src/auth/interfaces';

const token: OAuthTokens = { access_token: 'a', refresh_token: 'r', api_server: 'https://api', expires_in: 3600, expiresAt: Date.now()+3600000 };

class Provider implements OAuthProvider {
  authorizeUrl() { return ''; }
  async exchangeCode(): Promise<OAuthTokens> { return token; }
  async refreshToken(): Promise<OAuthTokens> { return token; }
}

class Store implements TokenStore {
  async load() { return token; }
  async save() {}
  async clear() {}
}

((globalThis as unknown) as {fetch: jest.Mock}).fetch = jest.fn(async () => new Response(JSON.stringify({ time: Date.now() }))); 

test('get 200', async () => {
  const am = new AuthManager(new Provider(), new Store());
  const rc = new RestClient('https://api', am);
  const data = await rc.get<{ time: number }>('/time');
  expect(typeof data.time).toBe('number');
});

