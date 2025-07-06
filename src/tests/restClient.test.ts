import { beforeEach, describe, expect, it, vi } from 'vitest';
import { OAuthProvider, OAuthTokens, TokenStore } from '../auth/interfaces';
import { AuthManager } from '../auth/manager';
import { RestClient } from '../http/restClient';

const token: OAuthTokens = {
  access_token: 'a',
  refresh_token: 'r',
  api_server: 'https://api',
  expires_in: 3600,
  expiresAt: Date.now() + 3600000,
};

class Provider implements OAuthProvider {
  authorizeUrl() {
    return '';
  }
  async exchangeCode(): Promise<OAuthTokens> {
    return token;
  }
  async refreshToken(): Promise<OAuthTokens> {
    return token;
  }
}

class Store implements TokenStore {
  async load() {
    return token;
  }
  async save() {}
  async clear() {}
}

describe('RestClient', () => {
  beforeEach(() => {
    global.fetch = vi.fn(
      async () => new Response(JSON.stringify({ time: Date.now() }))
    );
  });

  it('get 200', async () => {
    const am = new AuthManager(new Provider(), new Store());
    const rc = new RestClient('https://api', am);
    const data = await rc.get<{ time: number }>('/time');
    expect(typeof data.time).toBe('number');
  });

  it('constructor enforces HTTPS', () => {
    const am = new AuthManager(new Provider(), new Store());
    expect(() => new RestClient('http://api', am)).toThrow(
      'Base URL must be HTTPS'
    );
  });

  it('handles 429 rate limit', async () => {
    const am = new AuthManager(new Provider(), new Store());
    const rc = new RestClient('https://api', am);
    global.fetch = vi.fn(
      async () =>
        new Response('', { status: 429, headers: { 'x-ratelimit-reset': '1' } })
    );
    await expect(rc.get('/test')).rejects.toThrow('Rate limit exceeded');
  });

  it('post and delete methods wrap request correctly', async () => {
    const am = new AuthManager(new Provider(), new Store());
    const rc = new RestClient('https://api', am);
    // test POST
    const payload = { foo: 'bar' };
    global.fetch = vi.fn(
      async (_url, init) =>
        new Response(JSON.stringify(init?.body), {
          status: 200,
          headers: { 'x-ratelimit-reset': '0' },
        })
    );
    const postRes = await rc.post<{ foo: string }>('/p', payload);
    expect(postRes).toEqual(JSON.stringify(payload));
    // test DELETE
    global.fetch = vi.fn(
      async () =>
        new Response(JSON.stringify({ foo: 'del' }), {
          status: 200,
          headers: { 'x-ratelimit-reset': '0' },
        })
    );
    const delRes = await rc.delete<{ foo: string }>('/d');
    expect((delRes as any).foo).toBe('del');
  });
});
