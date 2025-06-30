<!-- markdownlint-disable MD013 MD041 MD022 MD032 -->

## [2025-06-04]
# activeContext.md

## Purpose
This file tracks the current work focus, recent changes, next steps, and active decisions for any project. It is the primary reference for understanding the present state of the project, independent of any specific topic at initialization.

## Structure
- **Current Work Focus:** What is being worked on right now.
- **Recent Changes:** Summary of the latest updates.
- **Next Steps:** Planned actions and priorities.
- **Active Decisions:** Key choices and considerations.
- **Call to Action:** Instructions for agents to update and self-regulate this file.

---

## Current Work Focus

### TEST MIGRATION AND NPM DEPENDENCY MANAGEMENT TASK COMPLETED ✅

All test files have been successfully migrated from `test/` and `tests/` directories to `src/tests/`. The package.json has been updated with CI/CD-compatible test scripts. The dependency management imperative has been enforced using command-line only approaches.

- ### Task Status: COMPLETED
- ✅ 15 test files migrated to `src/tests/` with 28 tests passing
- ✅ Package.json updated: `npm test` (CI mode), `npm run test:watch` (dev mode)  
- ✅ Command-line only dependency management enforced
- ✅ Old test directories removed after successful migration
- ✅ Source code compatibility fixes applied (tokenBucket.ts, smartFetch.ts)

## Recent Changes

- **Next.js Web Environment**: Generated project scaffold via `setup_web_env.sh` with TypeScript and ESLint.
- **Database Setup**: Added PostgreSQL service and Prisma schema with user model through `setup_db_prisma.sh`.
- **Login Feature**: Created simple login API routes using Prisma and bcrypt.
- **Ledger Protocol**: Added Memory Bank ledger instructions to `AGENTS.md` and
  updated documentation for markdownlint compliance.
- **Rate Limit Patch**: Added hourly token buckets and 429 handling logic in SDK core.
- **Error Module Consolidation**: Merged duplicate `src/error/` and `src/errors/` directories into a single `src/errors/` module and updated imports.
- **Memory Bank Protocol**: Documented Codex memory reset workflow and detailed ledger instructions in `AGENTS.md`.

- [2025-06-22T22:23:13Z] Ingested Memory Bank context and agent instructions; validated absence of codex.instructions.md in root. Ready for src/ folder coverage validation.

- [2025-06-22T22:27:26Z] Completed coverage analysis for `src/` folder; overall coverage at 63.84%; identified untested modules. Next Intent: Write missing tests for untested modules.
- [2025-06-22T22:33:04Z] Added test for handleQuestradeError non-order branch; handle.ts now fully covered (100%). Next Intent: Continue coverage on next easiest module.
- [2025-06-22T22:34:58Z] Added test for TokenBucketLimiter.handle429; tokenBucket.ts now 100% statements and functions. Next Intent: Continue coverage on next easiest module.

- [2025-06-22T22:36:19Z] Added tests for RestClient constructor HTTPS enforcement, rate-limit 429 handling, and post/delete wrappers; restClient.ts now 95% statements, 100% functions, 100% lines. Next Intent: Cover next easiest module.

- [2025-06-22T22:37:56Z] Added tests for ImplicitProvider authorizeUrl and thrown errors; implicit.ts now 100% coverage. Next Intent: Continue covering easy auth providers.
- [2025-06-22T22:47:39Z] Added tests for AuthCodeProvider authorize, exchangeCode, refreshToken, revokeToken; authCode.ts now 100% statements, 66.66% branches, 100% functions, 100% lines. Next Intent: Cover next easiest module memory token stores.
- [2025-06-22T22:48:40Z] Added tests for MemoryStore load/save/clear; memory.ts now 100% statements, branches, functions, lines. Next Intent: Cover next easiest tokenStore module env.ts.
- [2025-06-22T22:50:24Z] Added tests for EnvStore load/save/clear; env.ts now 100% statements, 66.66% branches, 100% functions, 100% lines. Next Intent: Cover next easiest tokenStore module file.ts.
- [2025-06-22T22:52:12Z] Added default constructor test for FileStore; file.ts now 100% statements, branches, functions, lines. Next Intent: Cover next easiest tokenStore module webStorage.ts.
- [2025-06-22T23:01:33Z] Added tests for WebStorageStore load/save/clear; webStorage.ts now 92.3% statements, 71.42% branches, 100% functions, 100% lines. Next Intent: Review remaining branch coverage gaps and plan further tests.
- [2025-06-22T23:47:25Z] Added tests for OrderLeg and Order schemas; orders.ts now 100% statements, 80% branches, 100% functions, 100% lines. Next Intent: Cover response schemas.

- [2025-06-22T23:50:48Z] Added tests for response schemas (Accounts, Balances, Positions, Executions, Activities, Orders, Time, Markets, Quotes, OptionQuotes, StrategyQuotes, Candles, Symbols, SymbolSearch, OptionsChain); responses.ts now 100% statements, 80% branches, 100% functions, 100% lines. Next Intent: Cover symbols schemas.

- [2025-06-22T23:56:42Z] Added tests for OptionDeliverable, MinTick, OptionDeliverables, SymbolDetail, SymbolSearchResult, OptionChain schemas; symbols.ts now 100% statements, 75% branches, 100% functions, 100% lines. Next Intent: Cover types index.
- [2025-06-30T04:11:14Z] Created `python/agent_system` directory and `setup_agent_system.sh` script to scaffold hierarchical multi-agent retrieval system.

- [2025-06-22T23:50:48Z] Added tests for response schemas (Accounts, Balances, Positions, Executions, Activities, Orders, Time, Markets, Quotes, OptionQuotes, StrategyQuotes, Candles, Symbols, SymbolSearch, OptionsChain); responses.ts now 100% statements, 80% branches, 100% functions, 100% lines. Next Intent: Cover symbols schemas.
- [2025-06-22T17:36:42Z] Current State: Test migration and dependency management task completed successfully with all 15 test files migrated to src/tests/ and CI/CD test configuration applied; Last Action: Updated package.json test script to use "vitest run" for CI/CD mode and added "test:watch" for development, confirmed all 28 tests passing; Rationale: Ensure npm test doesn't block in CI/CD pipelines while providing separate watch mode for development workflow; Next Intent: Task complete - all requirements fulfilled including command-line dependency management, test consolidation, and CI/CD compatibility. Note: Executing Self-Documentation Protocol. This entry reaffirms that all actions and context changes must be documented and that this rule itself is part of the ongoing protocol.

## Next Steps

### Documentation Updates
- Document Prisma and PostgreSQL dependencies in `memory-bank/dependencies.md`
- Record web architecture in `memory-bank/systemPatterns.md`
- Update `memory-bank/progress.md` with web environment status
- Note rate limiter patch in `memory-bank/progress.md`

-### Testing
- Verify Next.js app starts and connects to database
- Validate `scripts/genesis_boot.sh` initialization script
- Run unit tests for updated rate limiter
- Follow [testing-guide.md](./testing-guide.md) for detailed steps
- Add tests for untested modules in `src/` folder based on coverage report.

### Expansion
- Integrate Python API routes with Next.js front end
- Extend authentication to token-based system

## Active Decisions

- Adopted and documented a standardized project root organization by language and framework.
- All setup and file/folder creation must be performed via scripts in the `scripts/` directory, never manually.
- Scripts must be idempotent, must not overwrite existing files, and must warn or skip if files/folders exist.
- All documentation and scripts must be markdown-lint strict mode compliant.
- **Conditional Framework Standard**: Instruction files must use parameter-driven conditional sections rather than hard-coded implementation choices.
- **Runtime Decision Deferral**: Environment setup modes determined by ENV_MODE parameter at script execution time, not at instruction creation time.
- **Mode-Specific Documentation**: Each environment mode generates complete, standalone documentation appropriate for that specific setup.
- **No Lock Files**: Package manager lock files will not be generated or committed until further notice.

## Dependencies and Relationships

- **Depends On:** techContext.md, systemPatterns.md, projectbrief.md
- **Required By:** progress.md, all prompt and instruction file creation
- **Why This Order:** activeContext.md must reflect current AI Agent Framework understanding before implementing new conditional prompt patterns
- **Impact Analysis:** Changes to prompt file protocols affect all AI agents (Cline AI, Codex CLI, VS Code Copilot) and their collaborative workflows

## Call to Action

> **All agents and contributors must review, update, and self-regulate this file as work progresses.**  
> **Do not proceed with new work or changes until this file accurately reflects the current state and priorities.**  
> **Update this file immediately upon any change in work focus, plans, or decisions.**

## AI Agent Instructions

This project supports three AI agents with specific entry points:
- **Cline AI** → `.clinerules/main-rules.md` (Cline AI's primary instruction file)
- **Codex CLI** → `AGENTS.md` (Codex CLI's primary instruction file)
- **VS Code Copilot** → `.github/copilot-instructions.md` (VS Code Copilot's primary instruction file)

**See [.clinerules/process-evolution.md](../.clinerules/process-evolution.md), [.clinerules/verification.md](../.clinerules/verification.md), and [.clinerules/learning-journal.md](../.clinerules/learning-journal.md) for required protocols and self-regulation guidance.**

---
