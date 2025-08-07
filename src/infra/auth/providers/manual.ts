import { OAuthProvider, OAuthTokenResponse, OAuthTokens } from '../interfaces';

const BASE = 'https://login.questrade.com';

export class ManualProvider implements OAuthProvider {
  constructor(private readonly clientId: string) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  authorizeUrl(_scopes: string[], _state: string): string {
    throw new Error('Manual provider does not support authorization URL');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async exchangeCode(_code: string): Promise<OAuthTokens> {
    throw new Error('Manual provider does not exchange authorization codes');
  }

  async refreshToken(refresh: string): Promise<OAuthTokens> {
    const body = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh,
      client_id: this.clientId,
    });
    const res = await fetch(`${BASE}/oauth2/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });
    const data = (await res.json()) as OAuthTokenResponse;
    return {
      access_token: data.access_token,
      refresh_token: data.refresh_token ?? refresh,
      expires_in: data.expires_in,
      api_server: data.api_server,
      expiresAt: Date.now() + data.expires_in * 1000,
    };
  }
}
