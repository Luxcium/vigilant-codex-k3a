import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

/**
 * Represents a set of Questrade API tokens and metadata.
 * @remarks Used for authentication and token refresh logic.
 */
export interface TokenSet {
  access_token: string;
  api_server: string;
  expires_in: number;
  refresh_token: string;
  obtained_at: number;
}

/**
 * Questrade API authentication and account utility module.
 *
 * @remarks
 * This module provides functions to authenticate with Questrade using a refresh token,
 * persist tokens to the filesystem, and fetch account numbers. It is designed for
 * demonstration and can be imported and reused in other scripts or SDK modules.
 *
 * @packageDocumentation
 */
export class QuestradeAuthDemo {
  private readonly refreshToken: string;
  private readonly tokenFile: string;
  private readonly apiBase: string;

  /**
   * Create a new QuestradeAuthDemo instance.
   * @param options - Optional configuration overrides.
   */
  constructor(options?: {
    refreshToken?: string;
    tokenFile?: string;
    apiBase?: string;
  }) {
    this.refreshToken =
      options?.refreshToken || process.env.QUESTRADE_REFRESH_TOKEN || '';
    this.tokenFile =
      options?.tokenFile ||
      path.resolve(__dirname, '../.keys/.questrade-tokens.json');
    this.apiBase =
      options?.apiBase ||
      process.env.QUESTRADE_API_BASE ||
      'https://login.questrade.com/oauth2/token';
    if (!this.refreshToken) {
      throw new Error(
        'Missing Questrade refresh token in .env (QUESTRADE_REFRESH_TOKEN)'
      );
    }
  }

  /**
   * Save tokens to the local filesystem.
   * @param tokens - The token set to save.
   */
  saveTokens(tokens: TokenSet): void {
    fs.writeFileSync(this.tokenFile, JSON.stringify(tokens, null, 2));
  }

  /**
   * Load tokens from the local filesystem.
   * @returns The loaded token set, or null if not found.
   */
  loadTokens(): TokenSet | null {
    if (fs.existsSync(this.tokenFile)) {
      return JSON.parse(fs.readFileSync(this.tokenFile, 'utf-8')) as TokenSet;
    }
    return null;
  }

  /**
   * Request new tokens from Questrade using the refresh token.
   * @returns The new token set.
   */
  async getNewTokens(): Promise<TokenSet> {
    const params = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: this.refreshToken,
    });
    const res = await fetch(`${this.apiBase}?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to refresh token');
    const tokens = await res.json();
    return {
      access_token: tokens.access_token,
      api_server: tokens.api_server,
      expires_in: tokens.expires_in,
      refresh_token: tokens.refresh_token,
      obtained_at: Date.now(),
    };
  }

  /**
   * Get the first account number using the current access token.
   * @param tokens - The token set to use for the API call.
   * @returns The first account number, or undefined if not found.
   */
  async getAccountNumber(tokens: TokenSet): Promise<string | undefined> {
    const res = await fetch(`${tokens.api_server}v1/accounts`, {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch accounts');
    const data = await res.json();
    return data.accounts?.[0]?.number;
  }

  /**
   * Main entry point: get a valid token set (refresh if needed) and fetch the first account number.
   * @returns The account number as a string, or undefined if not found.
   * @example
   * ```ts
   * import { QuestradeAuthDemo } from './example';
   * const demo = new QuestradeAuthDemo();
   * demo.connectAndGetAccount().then(console.log);
   * ```
   */
  async connectAndGetAccount(): Promise<string | undefined> {
    let tokens = this.loadTokens();
    let needRefresh = true;
    if (
      tokens &&
      tokens.access_token &&
      tokens.api_server &&
      tokens.expires_in &&
      tokens.refresh_token &&
      tokens.obtained_at
    ) {
      const expiresAt = tokens.obtained_at + tokens.expires_in * 1000;
      if (Date.now() < expiresAt - 60 * 1000) {
        needRefresh = false;
      }
    }
    if (needRefresh) {
      tokens = await this.getNewTokens();
      this.saveTokens(tokens);
    }
    if (!tokens) {
      throw new Error('Token acquisition failed.');
    }
    return this.getAccountNumber(tokens);
  }
}

// If run directly, execute the demo
if (require.main === module) {
  (async () => {
    try {
      const demo = new QuestradeAuthDemo();
      const accountNumber = await demo.connectAndGetAccount();
      console.log('First account number:', accountNumber);
    } catch (err) {
      console.error('Error:', err);
      process.exit(1);
    }
  })();
}
