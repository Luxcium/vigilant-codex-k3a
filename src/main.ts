import 'dotenv/config';
import { APP } from './config';
import api from './http/QuestradeApi';

// messy conflict should be resolved now by your ai agent imediatly <<<<<<< codex/remove-verification-script-references-2025-07-3003-01-48
import { KeyManager } from './index';
import { QuestradeClient } from './index';
import { AuthManager } from './auth/manager';
import { RestClient } from './http/restClient';
import { OAuthTokens } from './auth/refreshTokenUtil';
import { TokenStore } from './auth/interfaces';
import { OAuthProvider } from './auth/interfaces';

// ===================== DEV/PLAYGROUND AREA BELOW =====================
// Add manual test/demo code here. This is NOT part of the SDK build.
// Example: Instantiate QuestradeClient and print its type (manual test)
const client = new QuestradeClient({ clientId: '0' });
console.log('QuestradeClient instance created:', client instanceof QuestradeClient);
// Export all modules so we do not get warnings if they are not in use
// at a given point in time:
export { OAuthProvider, OAuthTokens, TokenStore };
export { AuthManager };
export { RestClient };
export { QuestradeClient };
export { KeyManager };
// ===================== END OF DEV/PLAYGROUND AREA =====================

// Example bootstrap using centralized config and REST gateway
import api from './http/QuestradeApi';

(async () => {
  const candles = await api.getCandles({
    symbolId: 38738,
    start: '2024-10-01T00:00:00-04:00',
    end: '2024-10-31T00:00:00-04:00',
    interval: 'OneDay',
  });
  console.table(candles.slice(0, 5));
})();
