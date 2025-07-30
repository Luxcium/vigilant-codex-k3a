import axios from 'axios';
import axiosRetry from 'axios-retry';
import { APP } from '../config';
import { KeyManager } from '../security/KeyManager';
import { refreshToken } from '../auth/refreshTokenUtil';
import { log } from '../log';

const keys = new KeyManager();
const client = axios.create({ baseURL: APP.apiServer });

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
