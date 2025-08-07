import { logger } from '@/logger';
import { config } from 'dotenv';
import path from 'node:path';

config(); // loads .env by default

// Map to .env variable names (QUESTRADE_REFRESH_TOKEN, QUESTRADE_API_BASE, QUESTRADE_CLIENT_ID)
export const APP = {
  apiServer: process.env['API_SERVER'] ?? '',
  clientId: process.env['CLIENT_ID'] ?? '',
  refresh: process.env['REFRESH_TOKEN'] ?? '',
  keyDir: path.resolve('.keys'),
  logLevel: process.env['LOG_LEVEL'] ?? 'info',
} as const;

logger.info('[APP config] Using API Server: %s', APP.apiServer);
logger.info('[APP config] Using Client ID: %s', APP.clientId);
logger.info(
  '[APP config] Using Refresh Token: %s',
  APP.refresh ? APP.refresh.slice(0, 6) + '...' : '(none)'
);
