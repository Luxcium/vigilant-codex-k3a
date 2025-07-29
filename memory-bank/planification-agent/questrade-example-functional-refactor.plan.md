# Modularization and Functional Refactor Plan for Questrade Example

## Overview

Refactor the current Questrade authentication demo (`example.ts`) into a modular, functional style. All file output (tokens and demo info) must be written only to `.keys/example-sdk-demo.json` (not split between `.questrade-tokens.json` and `.keys/`). All parameters (paths, API URLs, etc.) will be declared as constants at the top, clearly labeled for future configuration. Each logical step will be a pure, composable function.

## Requirements

- All output (tokens, account info, metadata) must be written to `.keys/example-sdk-demo.json` only.
- No duplicate or split file output.
- All parameters (paths, API URLs, etc.) must be constants at the top, with clear comments.
- Each logical step (load, save, fetch, etc.) must be a pure function.
- The main orchestration should be a simple composition of these functions.
- Add comments labeling this as an intermediate refactor phase.
- Prepare for future dependency injection/configuration.

## Implementation Steps

1. **Declare All Parameters as Constants**
   - Paths, API URLs, and any other configuration at the top of the file.
   - Add comments: `// CONFIGURABLE PARAMETERS (to be injected later)`

2. **Write Pure Functions for Each Step**
   - `loadTokens(filePath: string): TokenSet | null`
   - `saveTokens(filePath: string, tokens: TokenSet): void`
   - `fetchNewTokens(apiUrl: string, refreshToken: string): Promise<TokenSet>`
   - `fetchAccountNumber(apiServer: string, accessToken: string): Promise<string | undefined>`
   - `writeDemoInfo(filePath: string, info: object): void`

3. **Remove All Other File Output**
   - Only `.keys/example-sdk-demo.json` should be written.
   - Remove `.questrade-tokens.json` output.

4. **Compose Main Logic**
   - Orchestrate the above functions in a clear, top-down flow.
   - Add comments labeling this as an intermediate, functional refactor.

5. **Add Progression Notes**
   - At the top, add a comment block describing this as an intermediate phase and what will change in the next phase (e.g., moving to dependency injection, SDK integration, etc.).

## Testing

- Run the script and verify that only `.keys/example-sdk-demo.json` is created/updated.
- Ensure the file contains all expected fields: tokens, account number, ISO and human-readable date.
- Remove or ignore `.questrade-tokens.json` if present.
- Test with both valid and invalid tokens to ensure error handling is preserved.

---

This plan ensures a clean, functional, and future-proof refactor, with all configuration and output in one place, ready for further modularization or SDK integration.
