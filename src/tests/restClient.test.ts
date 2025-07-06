import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import fetch, { Response } from 'node-fetch';
import { OAuthProvider, OAuthTokens, TokenStore } from '../auth/interfaces';
import { AuthManager } from '../auth/manager';
import { RestClient } from '../http/restClient';

vi.mock('node-fetch');

const mockedFetch = fetch as vi.MockedFunction<typeof fetch>;

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
  async save() {
    /* empty */
  }
  async clear() {
    /* empty */
  }
}

describe('RestClient', () => {
  beforeEach(() => {
    mockedFetch.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('get 200', async () => {
    const mockTime = { time: 1234567890 };
    mockedFetch.mockResolvedValue(
      new Response(JSON.stringify(mockTime), { status: 200 })
    );

    const am = new AuthManager(new Provider(), new Store());
    const rc = new RestClient('https://api', am);
    const data = await rc.get<{ time: number }>('/time');

    expect(mockedFetch).toHaveBeenCalledWith(
      'https://api/time',
      expect.any(Object)
    );
    expect(data).toEqual(mockTime);
  });

  it('constructor enforces HTTPS', () => {
    const am = new AuthManager(new Provider(), new Store());
    expect(() => new RestClient('http://api', am)).toThrow(
      'Base URL must be HTTPS'
    );
  });

  it('handles 429 rate limit', async () => {
    mockedFetch.mockResolvedValue(
      new Response('', {
        status: 429,
        headers: { 'x-ratelimit-reset': '1' },
      })
    );

    const am = new AuthManager(new Provider(), new Store());
    const rc = new RestClient('https://api', am);

    await expect(rc.get('/test')).rejects.toThrow('Rate limit exceeded');
    expect(mockedFetch).toHaveBeenCalledWith(
      'https://api/test',
      expect.any(Object)
    );
  });

  it('post and delete methods wrap request correctly', async () => {
    const am = new AuthManager(new Provider(), new Store());
    const rc = new RestClient('https://api', am);

    // test POST
    const payload = { foo: 'bar' };
    mockedFetch.mockResolvedValue(
      new Response(JSON.stringify(payload), {
        status: 200,
        headers: { 'x-ratelimit-reset': '0' },
      })
    );
    const postRes = await rc.post<{ foo: string }>('/p', payload);
    expect(postRes).toEqual(payload);
    expect(mockedFetch).toHaveBeenCalledWith(
      'https://api/p',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(payload),
      })
    );

    // test DELETE
    const deletePayload = { foo: 'del' };
    mockedFetch.mockResolvedValue(
      new Response(JSON.stringify(deletePayload), {
        status: 200,
        headers: { 'x-ratelimit-reset': '0' },
      })
    );
    const delRes = await rc.delete<{ foo: string }>('/d');
    expect(delRes).toEqual(deletePayload);
    expect(mockedFetch).toHaveBeenCalledWith(
      'https://api/d',
      expect.objectContaining({
        method: 'DELETE',
      })
    );
  });
});
