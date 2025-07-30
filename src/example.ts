// Custom error type for status code propagation
interface ErrorWithStatus extends Error {
  statusCode?: number;
}
// Canonical Questrade SDK Playground Example
// Modular, robust, and agent-friendly demo for authentication and account info

// ===============================
// 1. Error Type for HTTP Status
// ===============================
// Custom error type for propagating HTTP status codes through thrown errors.
interface ErrorWithStatus extends Error {
  statusCode?: number;
}

// ===============================
// 2. Module Imports and Setup
// ===============================
// Import Node.js modules and load environment variables from .env file.
import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
import { APP } from './config';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

// ===============================
// 3. TokenSet Interface
// ===============================
// Structure for Questrade OAuth token set.

interface TokenSet {
  access_token: string;
  api_server: string;
  expires_in: number;
  refresh_token: string;
  obtained_at: number;
}

// ===============================
// 4. Top-level Constants
// ===============================
// Paths, API endpoints, and file locations used throughout the playground.
// --- Top-level constants ---
const REFRESH_TOKEN = APP.refresh;
const TOKEN_FILE = path.resolve(__dirname, '../.questrade-tokens.json');
const API_BASE = 'https://login.questrade.com/oauth2/token';
const KEYS_DIR = path.resolve(__dirname, '../.keys');
const DEMO_FILE = path.join(KEYS_DIR, 'example-sdk-demo.json');

// ===============================
// 5. Utility Functions
// ===============================
// Helper functions for directory management, environment validation, token persistence, and validation.
// --- Utility functions ---
function ensureKeysDir(): void {
  try {
    if (!fs.existsSync(KEYS_DIR)) {
      fs.mkdirSync(KEYS_DIR, { recursive: true });
    }
  } catch (err) {
    console.error(
      'Failed to create .keys directory:',
      err instanceof Error ? err.message : err
    );
    process.exit(1);
  }
}

function assertEnv(): void {
  if (
    !REFRESH_TOKEN ||
    typeof REFRESH_TOKEN !== 'string' ||
    REFRESH_TOKEN.length < 10
  ) {
    console.error(
      'Missing or invalid Questrade refresh token in .env (QUESTRADE_REFRESH_TOKEN)'
    );
    process.exit(1);
  }
}

function loadTokens(): TokenSet | null {
  try {
    if (fs.existsSync(TOKEN_FILE)) {
      const raw = fs.readFileSync(TOKEN_FILE, 'utf-8');
      return JSON.parse(raw) as TokenSet;
    }
  } catch (err) {
    console.warn(
      'Could not load tokens:',
      err instanceof Error ? err.message : err
    );
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
// ===============================
// 6. Direct API/HTTP Logic (NOT ALLOWED in playground)
// ===============================
// WARNING: The following functions perform direct HTTP/API calls.
// According to project requirements, playground (example.ts) must NOT contain direct API or HTTP logic.
// This logic should be moved to the SDK core (src/index.ts or internal modules).
//
// --- Begin problematic section ---

interface ErrorBlob {
  status: number;
  headers: Record<string, string>;
  body: string | Record<string, unknown>;
}

async function fetchNewTokens(refreshToken: string): Promise<TokenSet> {
  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });
  let res: Response;
  try {
    res = await fetch(`${API_BASE}?${params.toString()}`);
  } catch (err) {
    const error = err as ErrorWithStatus;
    // logic shall be included when you review this for the user to grab valid value and pass it or else something but must be a number 0 is a placeholder!
    error.statusCode = 0; // Network error, no status code
    throw error;
  }
  if (!res.ok) {
    const msg = await res.text();
    let errorBody: string | Record<string, unknown> = msg;
    try {
      const json = JSON.parse(msg);
      errorBody = json;
    } catch {
      // Not JSON, keep as text
    }
    // Convert headers to plain object
    const headersObj: Record<string, string> = {};
    res.headers.forEach((value, key) => {
      headersObj[key] = value;
    });
    const errorBlob: ErrorBlob = {
      status: res.status,
      headers: headersObj,
      body: errorBody,
    };
    const error = new Error(`Failed to refresh token`) as ErrorWithStatus & {
      errorBlob?: ErrorBlob;
    };
    error.statusCode = res.status;
    error.errorBlob = errorBlob;
    throw error;
  }
  const tokens = await res.json();
  if (!tokens.access_token || !tokens.api_server) {
    const error = new Error(
      'Malformed token response from Questrade'
    ) as ErrorWithStatus;
    error.statusCode = res.status;
    throw error;
  }
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
  let res: Response;
  try {
    res = await fetch(`${tokens.api_server}v1/accounts`, {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
  } catch (err) {
    const error = err as ErrorWithStatus;
    // logic shall be included when you review this for the user to grab valid value and pass it or else something but must be a number 0 is a placeholder!
    error.statusCode = 0; // Network error, no status code
    throw error;
  }
  if (!res.ok) {
    const msg = await res.text();
    let errorBody: string | Record<string, unknown> = msg;
    try {
      const json = JSON.parse(msg);
      errorBody = json;
    } catch {
      // Not JSON, keep as text
    }
    const headersObj: Record<string, string> = {};
    res.headers.forEach((value, key) => {
      headersObj[key] = value;
    });
    const errorBlob: ErrorBlob = {
      status: res.status,
      headers: headersObj,
      body: errorBody,
    };
    const error = new Error(`Failed to fetch accounts`) as ErrorWithStatus & {
      errorBlob?: ErrorBlob;
    };
    error.statusCode = res.status;
    error.errorBlob = errorBlob;
    throw error;
  }
  const data = await res.json();
  if (!Array.isArray(data.accounts) || !data.accounts[0]?.number) {
    const error = new Error(
      'Malformed accounts response from Questrade'
    ) as ErrorWithStatus;
    error.statusCode = res.status;
    throw error;
  }
  return data.accounts[0].number;
}

function writeDemoOutput(
  tokens: TokenSet,
  accountNumber: string | undefined,
  statusCode?: number,
  errorBlob?: ErrorBlob
): void {
  const now = new Date();
  const demoOutput = {
    date: now.toISOString(),
    dateHuman: now.toLocaleString(),
    accountNumber,
    statusCode,
    errorBlob,
    ...tokens,
  };
  try {
    fs.writeFileSync(DEMO_FILE, JSON.stringify(demoOutput, null, 2));
    console.log(`Demo info written to ${DEMO_FILE}`);
    if (errorBlob !== undefined) {
      // Log the full error blob with maximum depth

      console.dir({ APIError: errorBlob }, { depth: null, colors: true });
    }
  } catch (err) {
    console.error(
      'Failed to write demo output:',
      err instanceof Error ? err.message : err
    );
  }
}

// ===============================
// 8. Main Playground Workflow
// ===============================
// Entry point for the playground. Handles token loading, refresh, account fetch, and output writing.
// WARNING: This function currently calls direct API/HTTP logic,
// WARNING:  which is not allowed in other parts like in src/main.ts per requirements,
// WARNING:  this is our exploration playground we must make modular code from my instruction
// WARNING:  i get from the user.
// All API logic should be abstracted into the SDK core and only called via SDK interface here.
// --- Main playground workflow ---
async function main(): Promise<void> {
  try {
    assertEnv();
    ensureKeysDir();

    let tokens = loadTokens();
    let statusCode: number | undefined = undefined;
    let errorBlob: ErrorBlob | undefined = undefined;
    if (!tokensAreValid(tokens)) {
      if (!REFRESH_TOKEN) {
        throw new Error(
          'Missing Questrade refresh token in .env (QUESTRADE_REFRESH_TOKEN)'
        );
      }
      try {
        tokens = await fetchNewTokens(REFRESH_TOKEN);
      } catch (err) {
        const error = err as ErrorWithStatus & { errorBlob?: ErrorBlob };
        statusCode = error.statusCode;
        errorBlob = error.errorBlob;
        console.error('Token refresh error:', error.message);
        if (typeof statusCode === 'number') {
          console.error('HTTP status code:', statusCode);
        }
        writeDemoOutput(
          {
            access_token: '',
            api_server: '',
            expires_in: 0,
            refresh_token: '',
            obtained_at: Date.now(),
          },
          undefined,
          statusCode,
          errorBlob
        );
        process.exit(1);
      }
      console.log('Obtained new tokens.');
    } else {
      console.log('Using cached tokens.');
    }
  if (!tokens) throw new Error('Token acquisition failed.');

  let accountNumber: string | undefined;
  try {
    accountNumber = await fetchAccountNumber(tokens);
    console.log('First account number:', accountNumber);
  } catch (err) {
    const error = err as ErrorWithStatus & { errorBlob?: ErrorBlob };
    statusCode = error.statusCode;
    errorBlob = error.errorBlob;
    console.error('Account fetch error:', error.message);
    if (typeof statusCode === 'number') {
      console.error('HTTP status code:', statusCode);
    }
    accountNumber = undefined;
  }

    writeDemoOutput(tokens, accountNumber, statusCode, errorBlob);
  } catch (err) {
    console.error(
      'Playground error:',
      err instanceof Error ? err.message : err
    );
    process.exit(1);
  }
}
// ===============================
// 9. Playground Entrypoint
// ===============================
// Start the playground execution.

main();
