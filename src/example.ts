/**
 * @packageDocumentation
 * Canonical Questrade SDK Playground Example
 * Modular, robust, and agent-friendly demo for authentication and account info.
 *
 * This playground demonstrates Questrade OAuth authentication, token management,
 * and account info retrieval. It is intended for manual testing and prototyping only.
 * All direct API logic should be abstracted into the SDK core for production use.
 */

/**
 * Custom error type for propagating HTTP status codes through thrown errors.
 * @remarks Used to attach HTTP status codes to errors for robust error handling.
 */
interface ErrorWithStatus extends Error {
  statusCode?: number;
}

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
import path from 'node:path';
import dotenv from 'dotenv';
import fs from 'node:fs';

// Load environment variables from .env before any use of process.env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// ===============================
// 3. TokenSet Interface
// ===============================
// Structure for Questrade OAuth token set.

/**
 * Structure for Questrade OAuth token set.
 * @remarks Matches the Questrade API token response format.
 */
interface TokenSet {
  /** Access token for API requests */
  access_token: string;
  /** API server base URL */
  api_server: string;
  /** Token expiry in seconds */
  expires_in: number;
  /** Refresh token for renewing access */
  refresh_token: string;
  /** Timestamp when tokens were obtained (ms since epoch) */
  obtained_at: number;
}

// ===============================
// 4. Top-level Constants
// ===============================
// Paths, API endpoints, and file locations used throughout the playground.
// --- Top-level constants ---

/**
 * Questrade refresh token loaded from environment.
 * @remarks Must be set in .env as QUESTRADE_REFRESH_TOKEN.
 */
const REFRESH_TOKEN = process.env.QUESTRADE_REFRESH_TOKEN;

/**
 * Path to cached token file for playground use.
 */
const TOKEN_FILE = path.resolve(__dirname, '../.questrade-tokens.json');

/**
 * Questrade OAuth endpoint for token refresh.
 */
const API_BASE = 'https://login.questrade.com/oauth2/token';

/**
 * Directory for storing playground output files.
 */
const KEYS_DIR = path.resolve(__dirname, '../.keys');

/**
 * Output file for playground demo results.
 */
const DEMO_FILE = path.join(KEYS_DIR, 'example-sdk-demo.json');

console.log(
  '[DEBUG] Loaded REFRESH_TOKEN:',
  typeof REFRESH_TOKEN === 'string' && REFRESH_TOKEN.length > 0
    ? REFRESH_TOKEN.slice(0, 6) + '...'
    : '(none)'
);

// ===============================
// 5. Utility Functions
// ===============================
// Helper functions for directory management, environment validation, token persistence, and validation.
// --- Utility functions ---

/**
 * Ensures the .keys directory exists for output files.
 * @remarks Creates the directory recursively if missing.
 */
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

/**
 * Validates that the Questrade refresh token is present and looks valid.
 * @throws Exits the process if the token is missing or invalid.
 */
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

/**
 * Loads cached Questrade tokens from disk if available.
 * @returns The token set if present, otherwise null.
 */
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

/**
 * Checks if a token set is present and not expired.
 * @param tokens - The token set to validate.
 * @returns True if tokens are valid and not expired, false otherwise.
 */
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

/**
 * Structure for detailed API error information.
 * @remarks Used to capture HTTP status, headers, and body for debugging.
 */
interface ErrorBlob {
  status: number;
  headers: Record<string, string>;
  body: string | Record<string, unknown>;
}

/**
 * Exchanges a Questrade refresh token for a new token set via the OAuth endpoint.
 * @param refreshToken - The refresh token to exchange.
 * @returns The new token set if successful.
 * @throws ErrorWithStatus if the request fails or the response is invalid.
 * @remarks This function performs a direct HTTP request to Questrade's API.
 * @example
 * ```ts
 * const tokens = await fetchNewTokens(process.env.QUESTRADE_REFRESH_TOKEN!);
 * ```
 */
async function fetchNewTokens(refreshToken: string): Promise<TokenSet> {
  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });
  const requestUrl = `${API_BASE}?${params.toString()}`;
  console.log(
    '[DEBUG] Token request URL:',
    requestUrl.replace(refreshToken, '***REDACTED***')
  );
  let res: Response;
  try {
    res = await fetch(requestUrl);
  } catch (err) {
    const error = err as ErrorWithStatus;
    error.statusCode = 0; // Network error, no status code
    console.error('[DEBUG] Network error during token fetch:', error.message);
    throw error;
  }
  const rawBody = await res.clone().text();
  console.log('[DEBUG] Token response status:', res.status);
  console.log('[DEBUG] Token response body:', rawBody);
  if (!res.ok) {
    let errorBody: string | Record<string, unknown> = rawBody;
    try {
      const json = JSON.parse(rawBody);
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
  let tokens: TokenSet;
  try {
    tokens = await res.json();
  } catch (err) {
    console.error('[DEBUG] Failed to parse token response as JSON:', err);
    throw err;
  }
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

/**
 * Fetches the user's first Questrade account number using the access token.
 * @param tokens - The valid token set for authentication.
 * @returns The first account number if successful.
 * @throws ErrorWithStatus if the request fails or the response is invalid.
 * @remarks This function performs a direct HTTP request to Questrade's API.
 * @example
 * ```ts
 * const accountNumber = await fetchAccountNumber(tokens);
 * ```
 */
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

/**
 * Writes the playground demo output to a JSON file for inspection.
 * @param tokens - The token set used in the run.
 * @param accountNumber - The fetched account number, if any.
 * @param statusCode - Optional HTTP status code for error cases.
 * @param errorBlob - Optional detailed error information.
 * @remarks Output is written to DEMO_FILE for debugging and agentic workflows.
 */
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
/**
 * Main playground workflow: validates environment, loads or refreshes tokens,
 * fetches account number, and writes results to disk.
 * @remarks This is the entry point for manual SDK prototyping and debugging.
 */
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

// Start the playground execution.
main();
