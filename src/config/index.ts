import { config } from 'dotenv';
import path from 'node:path';

config(); // Load environment variables from .env file

export const APP = {
  apiServer: process.env.API_SERVER || '',
  clientId: process.env.CLIENT_ID || '',
  refresh: process.env.REFRESH_TOKEN || '',
  keyDir: path.resolve('.keys'),
} as const;
