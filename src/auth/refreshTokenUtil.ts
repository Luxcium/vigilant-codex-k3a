import { KeyManager } from '../security/KeyManager';
import client from '../http/client';

export interface OAuthTokens {
  accessToken: string;
  refreshToken: string;
}

/**
 * Refreshes the OAuth token using the provided refresh token.
 * @param refreshToken - The refresh token to use for obtaining a new access token.
 * @returns A promise resolving to the new OAuth tokens.
 */
export async function refreshToken(refreshToken: string): Promise<OAuthTokens> {
  try {
    const response = await client.post('/oauth2/token', {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    });

    const tokens: OAuthTokens = {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
    };

    // Save the new tokens using KeyManager
    const keys = new KeyManager();
    await keys.save(tokens);

    return tokens;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    throw error;
  }
}
