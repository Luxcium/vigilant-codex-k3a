import { bootstrap } from './manual'
import { OAuthTokens } from './storage'

/**
 * Continuously refresh tokens ahead of expiration.
 */
export const scheduleAutoRefresh = (
  clientId: string,
  refreshToken: string
): void => {
  const loop = async (): Promise<void> => {
    const tokens: OAuthTokens = await bootstrap(clientId, refreshToken)
    const delay = Math.max(tokens.expiresAt - Date.now() - 60_000, 15_000)
    setTimeout(loop, delay)
  }
  void loop()
}
