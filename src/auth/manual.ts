import { OAuthTokens, save } from './storage'

const ENDPOINT = 'https://login.questrade.com/oauth2/token'

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
    refresh_token: refreshToken
  })
  const res = await fetch(ENDPOINT, { method: 'POST', body })
  const data: { access_token: string; api_server: string; expires_in: number; refresh_token?: string } =
    await res.json()
  const tokens: OAuthTokens = {
    accessToken: data.access_token,
    apiServer: data.api_server,
    refreshToken: data.refresh_token ?? refreshToken,
    expiresAt: Date.now() + data.expires_in * 1000
  }
  await save(`.keys/qs-tokens.${clientId}.json`, tokens)
  return tokens
}
