import { OAuthTokens } from './interfaces';
import { save } from './storage';

const ENDPOINT = 'https://login.questrade.com/oauth2/token';

/**
 * Exchange a refresh token for OAuth access tokens and persist them.
 *
 * @param clientId - Application identifier from API center
 * @param refreshToken - Long-lived refresh token
 * @returns Stored OAuth token object
 */
export const bootstrap = async (
  clientId: string,
  refreshToken: string
): Promise<OAuthTokens> => {
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });
  const res = await fetch(ENDPOINT, { method: 'POST', body });
  const data = (await res.json()) as {
    access_token: string;
    api_server: string;
    expires_in: number;
    refresh_token?: string;
  };

  const tokens: OAuthTokens = {
    access_token: data.access_token,
    refresh_token: data.refresh_token || refreshToken,
    expires_in: data.expires_in,
    api_server: data.api_server,
    expiresAt: Date.now() + data.expires_in * 1000,
  };

  // Convert to storage format for saving
  const storageTokens = {
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    apiServer: tokens.api_server,
    expiresAt: tokens.expiresAt,
  };

  await save(`.keys/qs-tokens.${clientId}.json`, storageTokens);
  return tokens;
};
