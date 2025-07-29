// example.ts
// Trivial Questrade authentication demo using .env and local filesystem for token storage
// This is a self-contained, all-in-one example for demonstration purposes only.

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

const REFRESH_TOKEN = process.env.QUESTRADE_REFRESH_TOKEN;
const TOKEN_FILE = path.resolve(__dirname, '../.questrade-tokens.json');
const API_BASE = 'https://login.questrade.com/oauth2/token';

if (!REFRESH_TOKEN) {
  console.error(
    'Missing Questrade refresh token in .env (QUESTRADE_REFRESH_TOKEN)'
  );
  process.exit(1);
}

function saveTokens(tokens: TokenSet) {
  fs.writeFileSync(TOKEN_FILE, JSON.stringify(tokens, null, 2));
}

function loadTokens(): TokenSet | null {
  if (fs.existsSync(TOKEN_FILE)) {
    return JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf-8')) as TokenSet;
  }
  return null;
}

async function getNewTokens(refreshToken: string): Promise<TokenSet> {
  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });
  const res = await fetch(`${API_BASE}?${params.toString()}`);
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

async function getAccountNumber(
  accessToken: string,
  apiServer: string
): Promise<string | undefined> {
  const res = await fetch(`${apiServer}v1/accounts`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error('Failed to fetch accounts');
  const data = await res.json();
  return data.accounts?.[0]?.number;
}

(async () => {
  let tokens = loadTokens();
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
    tokens = await getNewTokens(REFRESH_TOKEN);
    saveTokens(tokens);
    console.log('Obtained new tokens.');
  } else {
    console.log('Using cached tokens.');
  }
  if (!tokens) {
    throw new Error('Token acquisition failed.');
  }
  const accountNumber = await getAccountNumber(
    tokens.access_token,
    tokens.api_server
  );
  console.log('First account number:', accountNumber);
})();
