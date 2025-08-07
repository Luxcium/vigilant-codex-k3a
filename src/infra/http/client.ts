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
    logger.error({
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      method: error.config?.method,
      data: error.response?.data,
    }, 'HTTP Error');

    return Promise.reject(error);
client.interceptors.request.use(async req => {
  const t = await keys.load();
  if (t) req.headers.set('Authorization', `Bearer ${t.accessToken}`);
  return req;
});

client.interceptors.response.use(undefined, async err => {
  if (err.response?.status === 401) {
    const fresh = await refreshToken();
    await keys.save(fresh);
    err.config.headers['Authorization'] = `Bearer ${fresh.accessToken}`;
    return client(err.config);
  }
  log.error({ status: err.response?.status, url: err.config?.url }, 'HTTP Error');
  return Promise.reject(err);
});

axiosRetry(client, {
  retries: 2,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: e => e.response?.status === 429 || e.response?.status >= 500,
});

export default client;
