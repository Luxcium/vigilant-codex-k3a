#!/usr/bin/env node

/**
 * @packageDocumentation
 * @remarks
 * Questrade SDK CLI entry point. Loads environment variables, instantiates the SDK, and demonstrates fetching historical candles.
 *
 * Usage: Configure .env with CLIENT_ID, REFRESH_TOKEN, and optionally API_SERVER, SYMBOL_ID, START_TIME, END_TIME, INTERVAL.
 *
 * This CLI is for demonstration and manual testing only. Not intended for production automation.
 */

import 'dotenv/config';
import { ManualProvider } from './auth/providers/manual';
import { KeyManager } from './security/KeyManager';
import {
  QuestradeClient,
  QuestradeClientOptions,
} from './client/QuestradeClient';

/**
 * Main CLI entry point. Loads configuration, instantiates the QuestradeClient, and fetches historical candles.
 * @returns {Promise<void>} Resolves when CLI completes.
 */
async function main(): Promise<void> {
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
    const keyManager = new KeyManager();
    // Adapter to match TokenStore interface
    const store = {
      async load() {
        const token = await keyManager.load();
        if (!token) return null;
        // Map Token to OAuthTokens
        return {
          access_token: token.accessToken,
          refresh_token: token.refreshToken,
          expires_in: 0,
          api_server: '',
          token_type: 'Bearer',
          expiresAt: Date.now() + 3600 * 1000,
        };
      },
      async save(t: import('./auth/interfaces').OAuthTokens) {
        await keyManager.save({
          accessToken: t.access_token,
          refreshToken: t.refresh_token,
        });
      },
      async clear() {
        await keyManager.clear();
      },
    };

    // Create the Questrade client with config from env
    const questradeClientOptions: QuestradeClientOptions = {
      clientId,
      provider,
      tokenStore: store,
      apiServer,
    };
    const client = new QuestradeClient(questradeClientOptions);

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
}

main();
