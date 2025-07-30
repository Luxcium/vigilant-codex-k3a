import { config } from 'dotenv';
import path from 'node:path';

config(); // Load environment variables from .env file

const apiServer = process.env.API_SERVER || process.env.API_BASE_URL || '';
if (!apiServer) {
  console.error('Missing API_SERVER or API_BASE_URL environment variable');
  process.exit(1);
}
console.log('Using API Server:', apiServer);

export const APP = {
  apiServer,
  clientId: process.env.CLIENT_ID || '',
  refreshToken: process.env.REFRESH_TOKEN || '',
  accessToken: process.env.ACCESS_TOKEN || '',
  keyDir: path.resolve('.keys'),
} as const;
