import { OAuthProvider, OAuthTokens } from '../interfaces';

const BASE = 'https://login.questrade.com';

export class ImplicitProvider implements OAuthProvider {
  constructor(
    private readonly clientId: string,
    private readonly redirectUri: string
  ) {}

  authorizeUrl(scopes: string[], state: string): string {
    const params = new URLSearchParams({
      client_id: this.clientId,
      response_type: 'token',
      redirect_uri: this.redirectUri,
      scope: scopes.join(','),
      state,
    });
    return `${BASE}/oauth2/authorize?${params.toString()}`;
  }

  async exchangeCode(): Promise<OAuthTokens> {
    throw new Error('Implicit flow does not support code exchange');
  }

  async refreshToken(): Promise<OAuthTokens> {
    throw new Error('Implicit flow cannot refresh tokens');
  }
}
