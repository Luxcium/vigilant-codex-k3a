import axios from 'axios';
import { APP } from '../config';
import { KeyManager } from '../security/KeyManager';
import { refreshToken } from '../auth/refreshTokenUtil';

const keys = new KeyManager();
const client = axios.create({ baseURL: APP.apiServer });

client.interceptors.request.use(async config => {
  const stored = await keys.load();
  // Determine active token: persisted or from environment
  const authToken = stored?.accessToken ?? APP.accessToken;
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
      const refreshTok = stored?.refreshToken ?? APP.refreshToken;
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
          console.error('Failed to refresh token:', refreshError);
        }
      }
    }
    // Log detailed error for debugging
    console.error('HTTP Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      method: error.config?.method,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

export default client;
