import { describe, expect, it, vi, afterEach } from 'vitest';
import { AuthCodeProvider } from '../../../auth/providers/authCode';

const BASE = 'https://login.questrade.com';
const clientId = 'cid';
const redirectUri = 'https://app/callback';
const provider = new AuthCodeProvider(clientId, redirectUri);

describe('AuthCodeProvider', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('builds correct authorize URL', () => {
    const url = provider.authorizeUrl(['read', 'write'], 'state123');
    expect(url).toContain(`${BASE}/oauth2/authorize?`);
    expect(url).toContain('client_id=cid');
    expect(url).toContain('response_type=code');
    expect(url).toContain('redirect_uri=https%3A%2F%2Fapp%2Fcallback');
    expect(url).toContain('scope=read%2Cwrite');
    expect(url).toContain('state=state123');
  });

  it('exchangeCode calls parse and returns tokens', async () => {
    const mockResponse = {
      access_token: 'at',
      refresh_token: 'rt',
      expires_in: 10,
      api_server: 'https://api',
    };
    vi.spyOn(global, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify(mockResponse))
    );
    const tokens = await provider.exchangeCode('authcode');
    expect(tokens.access_token).toBe('at');
    expect(tokens.refresh_token).toBe('rt');
    expect(tokens.api_server).toBe('https://api');
    expect(tokens.expires_in).toBe(10);
    expect(tokens.expiresAt).toBeGreaterThan(Date.now());
  });

  it('refreshToken calls parse with fallback when no refresh_token', async () => {
    const mockResponse = {
      access_token: 'at2',
      expires_in: 20,
      api_server: 'https://api2',
    };
    vi.spyOn(global, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify(mockResponse))
    );
    const tokens = await provider.refreshToken('fallback');
    expect(tokens.access_token).toBe('at2');
    expect(tokens.refresh_token).toBe('fallback');
    expect(tokens.expires_in).toBe(20);
  });

  it('revokeToken sends POST to revoke endpoint', async () => {
    const fetchMock = vi
      .spyOn(global, 'fetch')
      .mockResolvedValueOnce(new Response(null, { status: 200 }));
    await provider.revokeToken('tok');
    expect(fetchMock).toHaveBeenCalledWith(
      `${BASE}/oauth2/revoke`,
      expect.objectContaining({ method: 'POST' })
    );
  });
});
