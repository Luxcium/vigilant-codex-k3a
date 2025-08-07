# Test Results

This document captures attempts to run the project's test suites using three different runners: Node's built-in test runner, Jest, and Vitest.

## Node —test

- **Command:** `node --test`
- **Outcome:** Succeeded immediately but reported zero tests.
- **Details:**
  - Output indicated `1..0` suites and tests, with a total duration of about 12 ms.
- **Resolution:** No Node test files are currently present. Add `.test.js` or `.test.ts` files recognized by Node's test runner to use this method.

## Jest

- **Command:** `npx jest`
- **Outcome:** Failed before executing tests.
- **Error:** npm attempted to fetch `jest` from the npm registry and returned `403 Forbidden` due to the offline environment.
- **Resolution:** Preinstall dependencies or configure an offline npm mirror. Once `node_modules` contains Jest, the existing `jest.config.js` should allow running tests with `npx jest` or a dedicated script.

## Vitest

- **Command:** `npx vitest run` (also `pnpm test`)
- **Outcome:** Failed because `vitest` was not found in the environment. The package manager tried to download it and encountered the same `403 Forbidden` error.
- **Resolution:** Similar to Jest, Vitest requires installing dependencies. Use `pnpm install` (with network access or an offline cache) to populate `node_modules`. Afterward `pnpm test` or `npx vitest run` will execute the suite defined under `src/tests/`.

## Quick Setup Guidance

1. Ensure internet access or prepare an offline package mirror.
2. Run `pnpm install` to install dev dependencies (Jest, Vitest, ts-jest, etc.).
3. Use `pnpm test` to run Vitest (current default) or `npx jest` to run Jest if desired.
4. For Node's built-in runner, add tests under a `test/` directory or with the `.test.js`/`.test.ts` suffix and execute `node --test`.

All test attempts were executed from a clean repository state, and the failures were due solely to missing dependencies in the offline environment.
