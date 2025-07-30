# Implementation Plan: Improvements for `src/` Folder

## Overview

This plan outlines the steps to implement the improvements described in the engineering note. The changes aim to modernize the codebase, improve maintainability, and align with best practices such as the Twelve-Factor App methodology, TypeScript standards, and Questrade API guidelines. The tasks include centralizing configuration, improving key storage, implementing OAuth token refresh, creating a REST gateway, and more.

## Requirements

1. **Centralized Configuration**
   - Create a single configuration file (`src/config/index.ts`) to manage environment variables.
   - Remove all ad-hoc `process.env` reads from other modules.

2. **Safe Key Storage**
   - Replace ad-hoc `.keys/` logic with a `KeyManager` class.
   - Ensure tests do not touch production keys.

3. **OAuth Token Refresh**
   - Use Axios interceptors to handle token refresh automatically.
   - Retry failed requests after refreshing the token.

4. **REST Gateway Layer**
   - Create a single REST gateway (`src/http/QuestradeApi.ts`) to wrap all API calls.
   - Implement typed errors for better error handling.

5. **Error Taxonomy & Retry Logic**
   - Use `axios-retry` for exponential back-off on HTTP 429 and 5xx errors.
   - Map Questrade error codes to typed exceptions.

6. **Path Aliases & Barrel Exports**
   - Add TypeScript `paths` configuration for cleaner imports.
   - Use barrel exports for better module organization.

7. **Environment-Driven Logging**
   - Install `pino` for structured logging.
   - Control log levels via `LOG_LEVEL` in `.env`.

8. **Test Isolation**
   - Ensure tests use a temporary directory for key storage.
   - Mock Axios with `msw` to avoid hitting real endpoints.

9. **Strict Domain Models**
   - Define strict TypeScript models for domain entities.
   - Enable `"strict": true` and `"exactOptionalPropertyTypes": true` in `tsconfig.json`.

10. **Bootstrap Example**
    - Create a `main.ts` file to demonstrate a working request round-trip.
    - Include a `.env` template for local testing.

## Implementation Steps

### 1. Centralized Configuration
- Create `src/config/index.ts`.
- Use `dotenv` to load environment variables.
- Export a typed configuration object.
- Remove all `process.env` reads from other modules.

### 2. Safe Key Storage
- Create `src/security/KeyManager.ts`.
- Implement methods for saving, loading, and ensuring the key directory.
- Replace all ad-hoc `.keys/` logic with the `KeyManager` class.
- Update tests to use a temporary directory for key storage.

### 3. OAuth Token Refresh
- Create `src/http/client.ts`.
- Use Axios interceptors to add `Authorization` headers and handle 401 errors.
- Implement token refresh logic and retry failed requests.

### 4. REST Gateway Layer
- Create `src/http/QuestradeApi.ts`.
- Wrap all REST calls in class methods.
- Throw typed errors for better error handling.

### 5. Error Taxonomy & Retry Logic
- Install `axios-retry`.
- Configure exponential back-off for HTTP 429 and 5xx errors.
- Map Questrade error codes to typed exceptions.

### 6. Path Aliases & Barrel Exports
- Update `tsconfig.json` to include `paths` configuration.
- Refactor imports to use path aliases.
- Create barrel exports for better module organization.

### 7. Environment-Driven Logging
- Install `pino`.
- Configure logging levels via `LOG_LEVEL` in `.env`.
- Replace all `console.log` calls with structured logging.

### 8. Test Isolation
- Update tests to use a temporary directory for key storage.
- Mock Axios with `msw` to avoid hitting real endpoints.

### 9. Strict Domain Models
- Define TypeScript models for domain entities in `src/types.ts`.
- Enable `"strict": true` and `"exactOptionalPropertyTypes": true` in `tsconfig.json`.

### 10. Bootstrap Example
- Create `src/main.ts` to demonstrate a working request round-trip.
- Include a `.env` template for local testing.

## Testing

1. **Centralized Configuration**
   - Verify all modules use the centralized configuration.
   - Test with missing or invalid environment variables.

2. **Safe Key Storage**
   - Ensure keys are saved and loaded correctly.
   - Verify tests do not touch production keys.

3. **OAuth Token Refresh**
   - Test token refresh logic with expired tokens.
   - Verify failed requests are retried after refreshing the token.

4. **REST Gateway Layer**
   - Test all REST methods for correct behavior.
   - Verify typed errors are thrown for API errors.

5. **Error Taxonomy & Retry Logic**
   - Test retry logic for HTTP 429 and 5xx errors.
   - Verify Questrade error codes are mapped to typed exceptions.

6. **Path Aliases & Barrel Exports**
   - Verify all imports use path aliases.
   - Ensure barrel exports work as expected.

7. **Environment-Driven Logging**
   - Test logging at different levels (info, debug, error).
   - Verify no `console.log` calls remain in the codebase.

8. **Test Isolation**
   - Ensure tests use a temporary directory for key storage.
   - Verify no real API endpoints are hit during tests.

9. **Strict Domain Models**
   - Validate TypeScript models with sample data.
   - Ensure strict type checking is enforced.

10. **Bootstrap Example**
    - Run `src/main.ts` and verify the output.
    - Test with different `.env` configurations.

## Demonstration Checklist

| Step                     | Expected Outcome                    |
| ------------------------ | ----------------------------------- |
| `pnpm test`              | All tests pass, `.keys/` untouched  |
| `pnpm tsx src/main.ts`   | Console prints candle table         |
| Kill token / wait 30 min | Interceptor refreshes automatically |
