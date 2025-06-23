- <!-- markdownlint-disable MD013 MD041 -->
- [2025-02-06T22:17:00Z] Current State: Conditional Python environment framework completed; Last Action: Created comprehensive conditional instructions, prompts, and scripts for three Python environment modes (local, docker_isolated, docker_volume) without hard-coding implementation choices; Rationale: User required truly flexible, parameter-driven approach that defers decisions until runtime and follows project protocols; Next Intent: Update remaining Memory Bank files and test the conditional framework.
- [2025-06-04T03:37:00Z] Current State: Next.js web app with Prisma initialized; Last Action: Created setup scripts and login routes; Rationale: Provide full-stack example with database integration; Next Intent: Complete migrations and integrate Python API.
- [2025-06-13T12:17:49Z] Added Memory Bank ledger protocol to AGENTS.md and updated Markdown files to pass verification.

- [2025-06-13T19:58:36Z] Started SDK core bootstrap from Implementation Playbook; unzipping skipped (file absent). Created branch feat/sdk-core-bootstrap. Planning to restructure TS code to Questrade SDK core per blueprint.
- [2025-06-13T21:22:19Z] Removed pnpm-lock.yaml and added rule to avoid lock files; updated AGENTS.md with no-lock-files preference and activeContext with decision note.
- [2025-06-13T22:45:12Z] Implemented rate limiter hourly buckets and 429 handling in TokenBucketLimiter and RestClient. Updated markdown check script. Verification failing due to existing lint errors.
- [2025-06-16T04:31:11Z] Consolidated duplicate error handling into src/errors and updated imports.
- [2025-06-22T11:22:40Z] Updated AGENTS.md with full Memory Bank workflow and appended protocol note to activeContext.md.

- [2025-06-22T22:23:13Z] Ingested Memory Bank context and agent instructions; validated absence of codex.instructions.md in root. Ready for src/ folder coverage validation.

- [2025-06-22T22:27:26Z] Completed coverage analysis for src/ folder; overall coverage at 63.84%; identified untested modules. Next Intent: Write missing tests for untested modules.

- [2025-06-22T22:33:04Z] Added test for handleQuestradeError non-order branch; handle.ts now fully covered (100%). Next Intent: Continue coverage on next easiest module.

- [2025-06-22T22:34:58Z] Added test for TokenBucketLimiter.handle429; tokenBucket.ts now 100% statements and functions. Next Intent: Continue coverage on next easiest module.

- [2025-06-22T22:36:19Z] Added tests for RestClient constructor HTTPS enforcement, rate-limit 429 handling, and post/delete wrappers; restClient.ts now 95% statements, 100% functions, 100% lines. Next Intent: Cover next easiest module.

- [2025-06-22T22:37:56Z] Added tests for ImplicitProvider authorizeUrl and thrown errors; implicit.ts now 100% coverage. Next Intent: Continue covering easy auth providers.

- [2025-06-22T22:47:39Z] Added tests for AuthCodeProvider authorize, exchangeCode, refreshToken, revokeToken; authCode.ts now 100% statements, 66.66% branches, 100% functions, 100% lines. Next Intent: Cover next easiest module memory token stores.

- [2025-06-22T22:48:40Z] Added tests for MemoryStore load/save/clear; memory.ts now 100% statements, branches, functions, lines. Next Intent: Cover next easiest tokenStore module env.ts.

- [2025-06-22T22:50:24Z] Added tests for EnvStore load/save/clear; env.ts now 100% statements, 66.66% branches, 100% functions, 100% lines. Next Intent: Cover next easiest tokenStore module file.ts.

- [2025-06-22T22:52:12Z] Added default constructor test for FileStore; file.ts now 100% statements, branches, functions, lines. Next Intent: Cover next easiest tokenStore module webStorage.ts.

- [2025-06-22T23:01:33Z] Added tests for WebStorageStore load/save/clear; webStorage.ts now 92.3% statements, 71.42% branches, 100% functions, 100% lines. Next Intent: Review remaining branch coverage gaps and plan further tests.

- [2025-06-22T23:42:43Z] Added tests for Account, Balance, Position, Execution, AccountActivity schemas; accounts.ts now 100% statements, branches, functions, lines. Next Intent: Cover enums.

- [2025-06-22T23:43:09Z] Added tests for all enum schemas; enums.ts now 100% statements, 80% branches, 100% functions, 100% lines. Next Intent: Cover Market schemas.

- [2025-06-22T23:43:46Z] Added tests for Market, Quote, OptionQuote, StrategyQuote, Candle schemas; markets.ts now 100% statements, 80% branches, 100% functions, 100% lines. Next Intent: Cover Order schemas.

- [2025-06-22T23:47:25Z] Added tests for OrderLeg and Order schemas; orders.ts now 100% statements, 80% branches, 100% functions, 100% lines. Next Intent: Cover response schemas.

- [2025-06-22T23:50:48Z] Added tests for response schemas (Accounts, Balances, Positions, Executions, Activities, Orders, Time, Markets, Quotes, OptionQuotes, StrategyQuotes, Candles, Symbols, SymbolSearch, OptionsChain); responses.ts now 100% statements, 80% branches, 100% functions, 100% lines. Next Intent: Cover symbols schemas.

- [2025-06-22T23:56:42Z] Added tests for OptionDeliverable, MinTick, OptionDeliverables, SymbolDetail, SymbolSearchResult, OptionChain schemas; symbols.ts now 100% statements, 75% branches, 100% functions, 100% lines. Next Intent: Cover types index.
