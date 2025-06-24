export interface OAuthTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number; // seconds
  api_server: string;
  /** calculated – epoch ms */
  expiresAt: number;
}

export interface OAuthTokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  api_server: string;
}

export interface OAuthProvider {
  authorizeUrl(scopes: string[], state: string): string;
  exchangeCode(code: string): Promise<OAuthTokens>;
  refreshToken(refresh: string): Promise<OAuthTokens>;
  revokeToken?(token: string): Promise<void>;
}

export interface TokenStore {
  load(): Promise<OAuthTokens | null>;
  save(t: OAuthTokens): Promise<void>;
  clear(): Promise<void>;
}
