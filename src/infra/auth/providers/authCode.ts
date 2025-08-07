import { OAuthProvider, OAuthTokenResponse, OAuthTokens } from '../interfaces';

const BASE = 'https://login.questrade.com';

export class AuthCodeProvider implements OAuthProvider {
  constructor(
    private readonly clientId: string,
    private readonly redirectUri: string
  ) {}

  authorizeUrl(scopes: string[], state: string): string {
    const params = new URLSearchParams({
      client_id: this.clientId,
      response_type: 'code',
      redirect_uri: this.redirectUri,
      scope: scopes.join(','),
      state,
    });
    return `${BASE}/oauth2/authorize?${params.toString()}`;
  }

  async exchangeCode(code: string): Promise<OAuthTokens> {
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
    });
    return fetch(`${BASE}/oauth2/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    }).then(async (r: Response) => this.parse(r));
  }

  async refreshToken(refresh: string): Promise<OAuthTokens> {
    const body = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh,
      client_id: this.clientId,
    });
    return fetch(`${BASE}/oauth2/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    }).then(async (r: Response) => this.parse(r, refresh));
  }

  async revokeToken(token: string): Promise<void> {
    const body = new URLSearchParams({ token });
    await fetch(`${BASE}/oauth2/revoke`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });
  }

  private async parse(
    res: Response,
    fallbackRefresh?: string
  ): Promise<OAuthTokens> {
    const data = (await res.json()) as OAuthTokenResponse;
    return {
      access_token: data.access_token,
      refresh_token: data.refresh_token ?? fallbackRefresh ?? '',
      expires_in: data.expires_in,
      api_server: data.api_server,
      expiresAt: Date.now() + data.expires_in * 1000,
    };
  }
}
