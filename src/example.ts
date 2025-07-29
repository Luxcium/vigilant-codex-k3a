dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Canonical Questrade SDK Playground Example
// Modular, robust, and agent-friendly demo for authentication and account info

import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

interface TokenSet {
  access_token: string;
  api_server: string;
  expires_in: number;
  refresh_token: string;
  obtained_at: number;
}

// --- Top-level constants ---
const REFRESH_TOKEN = process.env.QUESTRADE_REFRESH_TOKEN;
const TOKEN_FILE = path.resolve(__dirname, '../.questrade-tokens.json');
const API_BASE = 'https://login.questrade.com/oauth2/token';
const KEYS_DIR = path.resolve(__dirname, '../.keys');
const DEMO_FILE = path.join(KEYS_DIR, 'example-sdk-demo.json');

// --- Utility functions ---
function ensureKeysDir(): void {
  if (!fs.existsSync(KEYS_DIR)) {
    fs.mkdirSync(KEYS_DIR);
  }
}

function assertEnv(): void {
  if (!REFRESH_TOKEN) {
    throw new Error(
      'Missing Questrade refresh token in .env (QUESTRADE_REFRESH_TOKEN)'
    );
  }
}

function saveTokens(tokens: TokenSet): void {
  fs.writeFileSync(TOKEN_FILE, JSON.stringify(tokens, null, 2));
}

function loadTokens(): TokenSet | null {
  if (fs.existsSync(TOKEN_FILE)) {
    return JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf-8')) as TokenSet;
  }
  return null;
}

function tokensAreValid(tokens: TokenSet | null): boolean {
  if (!tokens) return false;
  const { access_token, api_server, expires_in, refresh_token, obtained_at } =
    tokens;
  if (
    !(access_token && api_server && expires_in && refresh_token && obtained_at)
  )
    return false;
  const expiresAt = obtained_at + expires_in * 1000;
  return Date.now() < expiresAt - 60 * 1000;
}

async function fetchNewTokens(refreshToken: string): Promise<TokenSet> {
  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });
  const res = await fetch(`${API_BASE}?${params.toString()}`);
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Failed to refresh token: ${msg}`);
  }
  const tokens = await res.json();
  return {
    access_token: tokens.access_token,
    api_server: tokens.api_server,
    expires_in: tokens.expires_in,
    refresh_token: tokens.refresh_token,
    obtained_at: Date.now(),
  };
}

async function fetchAccountNumber(
  tokens: TokenSet
): Promise<string | undefined> {
  const res = await fetch(`${tokens.api_server}v1/accounts`, {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Failed to fetch accounts: ${msg}`);
  }
  const data = await res.json();
  return data.accounts?.[0]?.number;
}

function writeDemoOutput(
  tokens: TokenSet,
  accountNumber: string | undefined
): void {
  const now = new Date();
  const demoOutput = {
    date: now.toISOString(),
    dateHuman: now.toLocaleString(),
    accountNumber,
    ...tokens,
  };
  fs.writeFileSync(DEMO_FILE, JSON.stringify(demoOutput, null, 2));
  console.log(`Demo info written to ${DEMO_FILE}`);
}

// --- Main playground workflow ---
async function main(): Promise<void> {
  try {
    assertEnv();
    ensureKeysDir();

    let tokens = loadTokens();
    if (!tokensAreValid(tokens)) {
      if (!REFRESH_TOKEN) {
        throw new Error(
          'Missing Questrade refresh token in .env (QUESTRADE_REFRESH_TOKEN)'
        );
      }
      tokens = await fetchNewTokens(REFRESH_TOKEN);
      saveTokens(tokens);
      console.log('Obtained new tokens.');
    } else {
      console.log('Using cached tokens.');
    }
    if (!tokens) throw new Error('Token acquisition failed.');

    const accountNumber = await fetchAccountNumber(tokens);
    console.log('First account number:', accountNumber);

    writeDemoOutput(tokens, accountNumber);
  } catch (err) {
    console.error(
      'Playground error:',
      err instanceof Error ? err.message : err
    );
    process.exit(1);
  }
}

main();
