/**
 * @packageDocumentation
 * @remarks
 * Interfaces for OAuth tokens, providers, and token storage used by the Questrade SDK authentication system.
 *
 * @see {@link https://www.questrade.com/api/documentation/authorization | Questrade API Authorization}
 */
export interface OAuthTokens {
  /** Access token string for API requests. */
  access_token: string;
  /** Refresh token string for obtaining new access tokens. */
  refresh_token: string;
  /** Token lifetime in seconds. */
  expires_in: number;
  /** API server base URL. */
  api_server: string;
  /** Calculated expiration time in epoch ms. */
  expiresAt: number;
}

export interface OAuthTokenResponse {
  /** Access token string for API requests. */
  access_token: string;
  /** Optional refresh token string. */
  refresh_token?: string;
  /** Token lifetime in seconds. */
  expires_in: number;
  /** API server base URL. */
  api_server: string;
}

export interface OAuthProvider {
  /**
   * Returns the authorization URL for the OAuth flow.
   * @param scopes - List of requested scopes.
   * @param state - Opaque state string for CSRF protection.
   */
  authorizeUrl(scopes: string[], state: string): string;
  /**
   * Exchanges an authorization code for OAuth tokens.
   * @param code - Authorization code from the OAuth flow.
   * @returns OAuthTokens object.
   */
  exchangeCode(code: string): Promise<OAuthTokens>;
  /**
   * Refreshes the access token using a refresh token.
   * @param refresh - Refresh token string.
   * @returns OAuthTokens object.
   */
  refreshToken(refresh: string): Promise<OAuthTokens>;
  /**
   * Optionally revokes a refresh or access token.
   * @param token - Token string to revoke.
   */
  revokeToken?(token: string): Promise<void>;
}

export interface TokenStore {
  /**
   * Loads the current OAuth tokens from storage.
   * @returns OAuthTokens object or null if not found.
   */
  load(): Promise<OAuthTokens | null>;
  /**
   * Saves OAuth tokens to storage.
   * @param t - OAuthTokens object to save.
   */
  save(t: OAuthTokens): Promise<void>;
  /**
   * Clears all stored OAuth tokens.
   */
  clear(): Promise<void>;
}
