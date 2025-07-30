import axios from 'axios';
import axiosRetry from 'axios-retry';
import { APP } from '../config';
import { KeyManager } from '../security/KeyManager';
import { refreshToken } from '../auth/refreshTokenUtil';
import { logger } from '../logger';

const keys = new KeyManager();
const client = axios.create({ baseURL: APP.apiServer });

axiosRetry(client, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: err =>
    err.response?.status === 429 || (err.response?.status ?? 0) >= 500,
});

client.interceptors.request.use(async config => {
  const stored = await keys.load();
  const authToken = stored?.accessToken;
  if (authToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

client.interceptors.response.use(
  response => response,
  async error => {
    // Handle unauthorized: attempt token refresh
    if (error.response?.status === 401) {
      const stored = await keys.load();
      const refreshTok = stored?.refreshToken ?? APP.refresh;
      if (refreshTok) {
        try {
          const fresh = await refreshToken(refreshTok);
          // Persist new tokens
          await keys.save({
            accessToken: fresh.accessToken,
            refreshToken: fresh.refreshToken,
          });
          // Retry original request with updated token
          error.config.headers = error.config.headers || {};
          error.config.headers.Authorization = `Bearer ${fresh.accessToken}`;
          return client(error.config);
        } catch (refreshError) {
          logger.error({ err: refreshError }, 'Failed to refresh token');
        }
      }
    }
    // Log detailed error for debugging
    logger.error('HTTP Error %d %s %s',
      error.response?.status,
      error.config?.method,
      error.config?.url
    );
    return Promise.reject(error);
  }
);

export default client;
