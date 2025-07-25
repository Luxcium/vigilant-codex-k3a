#!/usr/bin/env node
import 'dotenv/config';
import { ManualProvider } from './auth/providers/manual';
import { KeyManager } from './security/KeyManager';
import {
  QuestradeClient,
  QuestradeClientOptions,
} from './client/QuestradeClient';

(async function main() {
  try {
    // Load required environment variables
    const clientId = process.env.CLIENT_ID;
    const refreshToken = process.env.REFRESH_TOKEN;
    if (!clientId) {
      console.error('Missing CLIENT_ID in .env');
      process.exit(1);
    }
    if (!refreshToken) {
      console.error('Missing REFRESH_TOKEN in .env');
      process.exit(1);
    }

    // Optional API server override
    const apiServer = process.env.API_SERVER;

    // Instantiate OAuth provider and token store
    const provider = new ManualProvider(clientId);
    const store = new KeyManager();

    // Create the Questrade client with config from env
    const questradeClientOptions: QuestradeClientOptions = {
      provider,
      tokenStore: store,
      apiServer,
    } as QuestradeClientOptions;
    const client = new QuestradeClient(questradeClientOptions);
    /*


  clientId: string;
  refreshToken?: string;
  apiServer?: string;
  tokenStore?: TokenStore;
  scopes?: string[];
  provider?: OAuthProvider;

   */
    // Example usage: fetch historical candles
    const symbolId = Number(process.env.SYMBOL_ID ?? 38738);
    const start = process.env.START_TIME ?? '2024-10-01T00:00:00-04:00';
    const end = process.env.END_TIME ?? '2024-10-31T00:00:00-04:00';
    const interval = process.env.INTERVAL ?? 'OneDay';

    const candles = await client.getCandles(symbolId, start, end, interval);
    console.log('Candles data:');
    console.table(candles.slice(0, 5));
  } catch (error) {
    console.error('CLI error:', error);
    process.exit(1);
  }
})();
