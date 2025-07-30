import { config } from 'dotenv';
import path from 'node:path';

config(); // loads .env by default

export const APP = {
  apiServer: process.env.API_SERVER!,
  clientId: process.env.CLIENT_ID!,
  refresh: process.env.REFRESH_TOKEN!,
  logLevel: process.env.LOG_LEVEL ?? 'info',
  keyDir: path.resolve('.keys'),
} as const;
