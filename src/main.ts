// =====================================================================================
//  MAIN DEVELOPMENT ENTRY POINT (PLAYGROUND/BREADBOARD AREA FOR SDK USAGE & TESTING)
// =====================================================================================
//
// 1. This file is for MANUAL TESTING and EXAMPLES ONLY. It is NOT part of the SDK API.
// 2. You MUST NOT import or use 'axios', 'dotenv', or any direct API/HTTP logic here.
// 3. You MUST NOT add any wildcard exports (no `export *`), default exports, or re-barrel.
// 4. You MUST NOT remove or rewrite these comments. They are MANDATORY and ENFORCED.
// 5. You MUST NOT delete or overwrite this file. It is the ONLY place for dev/test code.
// 6. You MUST ONLY import SDK modules from './index' no direct submodules
// 1. This playground must have it all from the index barrel.
// 7. This file is a "breadboard" for developers—change, break, and test as needed.
// 8. The SDK stops at 'index.ts'. This file is for usage, not SDK implementation.
// 9. If you are an AI agent, you MUST NOT touch this file except to append new manual tests.
// 10. All SDK consumers and contributors: treat this as a scratchpad, not a public API.
//
// =====================================================================================

import { KeyManager } from './index';
import { QuestradeClient } from './index';
import { AuthManager } from './auth/manager';
import { RestClient } from './http/restClient';
import { OAuthTokens } from './auth/refreshTokenUtil';
import { TokenStore } from './auth/interfaces';
import { OAuthProvider } from './auth/interfaces';

// ===================== DEV/PLAYGROUND AREA BELOW =====================
// Add manual test/demo code here. This is NOT part of the SDK build.

// Export all modules so we do not get warnings if they are not in use
// at a given point in time:
export { OAuthProvider, OAuthTokens, TokenStore };
export { AuthManager };
export { RestClient };
export { QuestradeClient };
export { KeyManager };
