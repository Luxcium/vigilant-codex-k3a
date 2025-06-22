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
