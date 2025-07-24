import axios from 'axios';
import { APP } from '../config';
import { KeyManager } from '../security/KeyManager';

const keys = new KeyManager();
const client = axios.create({ baseURL: APP.apiServer });

client.interceptors.request.use(async req => {
  const token = await keys.load();
  if (token) {
    req.headers.set('Authorization', `Bearer ${token.access}`);
  }
  return req;
});

client.interceptors.response.use(undefined, async err => {
  if (err.response?.status === 401) {
    const freshToken = await refreshToken(); // Implement refreshToken logic
    await keys.save(freshToken);
    err.config.headers['Authorization'] = `Bearer ${freshToken.access}`;
    return client(err.config); // Retry the failed request
  }
  return Promise.reject(err);
});

export default client;
