import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { OAuthProvider, OAuthTokens, TokenStore } from '../infra/auth/interfaces';
import { AuthManager } from '../infra/auth/manager';
import { RestClient } from '../infra/http/restClient';

// Mock the global fetch instead of node-fetch
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

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
    mockFetch.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('get 200', async () => {
    const mockTime = { time: 1234567890 };
    mockFetch.mockResolvedValue({
      status: 200,
      ok: true,
      headers: {
        get: vi.fn().mockReturnValue(null),
      },
      json: vi.fn().mockResolvedValue(mockTime),
    } as any);

    const am = new AuthManager(new Provider(), new Store());
    const rc = new RestClient('https://api', am);
    const data = await rc.get<{ time: number }>('/time');

    expect(mockFetch).toHaveBeenCalledWith(
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
    mockFetch.mockResolvedValue({
      status: 429,
      ok: false,
      headers: {
        get: vi.fn().mockReturnValue('1'),
      },
    } as any);

    const am = new AuthManager(new Provider(), new Store());
    const rc = new RestClient('https://api', am);

    await expect(rc.get('/test')).rejects.toThrow('Rate limit exceeded');
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api/test',
      expect.any(Object)
    );
  });

  it('handles 429 rate limit with NaN reset header', async () => {
    mockFetch.mockResolvedValue({
      status: 429,
      ok: false,
      headers: {
        get: vi.fn().mockReturnValue('invalid'),
      },
    } as any);

    const am = new AuthManager(new Provider(), new Store());
    const rc = new RestClient('https://api', am);

    await expect(rc.get('/test')).rejects.toThrow('Rate limit exceeded');
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api/test',
      expect.any(Object)
    );
  });

  it('handles non-ok responses with error handling', async () => {
    const mockErrorResponse = {
      status: 400,
      ok: false,
      headers: {
        get: vi.fn().mockReturnValue('0'),
      },
      json: vi.fn().mockResolvedValue({ error: 'Bad Request' }),
      text: vi.fn().mockResolvedValue('Bad Request'),
    };

    mockFetch.mockResolvedValue(mockErrorResponse as any);

    const am = new AuthManager(new Provider(), new Store());
    const rc = new RestClient('https://api', am);

    // This should call handleQuestradeError and throw
    await expect(rc.get('/test')).rejects.toThrow();
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api/test',
      expect.any(Object)
    );
  });

  it('post and delete methods wrap request correctly', async () => {
    const am = new AuthManager(new Provider(), new Store());
    const rc = new RestClient('https://api', am);

    // test POST
    const payload = { foo: 'bar' };
    mockFetch.mockResolvedValue({
      status: 200,
      ok: true,
      headers: {
        get: vi.fn().mockReturnValue('0'),
      },
      json: vi.fn().mockResolvedValue(payload),
    } as any);
    const postRes = await rc.post<{ foo: string }>('/p', payload);
    expect(postRes).toEqual(payload);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api/p',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(payload),
      })
    );

    // test DELETE
    const deletePayload = { foo: 'del' };
    mockFetch.mockResolvedValue({
      status: 200,
      ok: true,
      headers: {
        get: vi.fn().mockReturnValue('0'),
      },
      json: vi.fn().mockResolvedValue(deletePayload),
    } as any);
    const delRes = await rc.delete<{ foo: string }>('/d');
    expect(delRes).toEqual(deletePayload);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api/d',
      expect.objectContaining({
        method: 'DELETE',
      })
    );
  });
});
