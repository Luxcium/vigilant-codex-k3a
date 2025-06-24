import type { OAuthTokens } from './interfaces';
import { bootstrap } from './manual';

/**
 * Continuously refresh tokens ahead of expiration.
 */
export const scheduleAutoRefresh = (
  clientId: string,
  refreshToken: string
): void => {
  const loop = async (): Promise<void> => {
    try {
      const tokens: OAuthTokens = await bootstrap(clientId, refreshToken);
      const delay = Math.max(tokens.expiresAt - Date.now() - 60_000, 15_000);
      setTimeout(loop, delay);
    } catch (error) {
      // On error, retry after minimum delay
      setTimeout(loop, 15_000);
    }
  };
  void loop();
};
