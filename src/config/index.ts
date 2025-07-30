import { config } from 'dotenv';
import path from 'node:path';
import { logger } from '../logger';

config(); // loads .env by default

export const APP = {
  apiServer: process.env.API_SERVER!,
  clientId: process.env.CLIENT_ID!,
  refresh: process.env.REFRESH_TOKEN!,
  keyDir: path.resolve('.keys'),
  logLevel: process.env.LOG_LEVEL ?? 'info',
} as const;

logger.info('Using API Server %s', APP.apiServer);
