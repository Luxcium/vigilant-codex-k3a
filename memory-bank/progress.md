# Progress Tracker

This document is the living status report for the Vigilant Codex K3a workspace. It must stay concise, accurate, and synchronized with the repository state at all times.

## Purpose

Provide a trustworthy summary of shipped capabilities, outstanding work, active focus, and known risks so any agent can resume execution without re-auditing the entire codebase.

## Structure

- **What Works** – Completed capabilities that demonstrably function today.
- **What’s Left** – Prioritized gaps and partially complete work.
- **Current Status** – Snapshot of the present focus and notable changes.
- **Known Issues** – Risks, blockers, or regressions that require follow-up.
- **Historical Archive** – Pointer to previous narrative moved out of the active file.
- **Dependencies** – Related Memory Bank files and instruction sets.
- **Call to Action** – Mandatory maintenance steps for future updates.

## What Works

- **Remote actor infrastructure** – `src/remote-actors` and `src/rpc` provide worker-based dispatch, HTTP/TCP transports, and protocol codecs ready for extension.
- **Polyglot automation inventory** – `scripts/` currently contains 67 documented scripts, each with standardized headers that describe purpose, usage, and validation status.
- **Instruction and prompt ecosystem** – Memory Bank hosts 70 instruction files and 41 prompt templates that align all three agents around shared policies.
- **Testing harness** – `vitest` configuration in `config/testing/vitest.config.ts` and script targets in `package.json` support targeted suites (auth, client, http, rate limit, types) when dependencies are installed.
- **Next.js workspace** – The `web/` app retains Prisma-backed server actions, lint/test scripts, and documentation describing its live development workflow.

## What’s Left

- **CI reinstatement** – GitHub Actions were removed; recreate a validated pipeline for linting, tests, and coverage reporting.
- **Script consolidation follow-through** – Large script count (67) exceeds the documented 22-script target; re-run consolidation plan or update targets and automation to reflect current reality.
- **Automated documentation health** – Re-enable or replace README synchronization and verification scripts to prevent drift across instructions and prompts.
- **Environment validation** – Validate pnpm tasks (`test`, `lint`, `verify-all.sh`) inside the sandbox harness and log outcomes for reproducibility.

## Current Status

- **2025-12-07** – Progress file rewritten to eliminate mojibake, align counts with the repository (scripts: 67, instructions: 70, prompts: 41), and re-establish authoritative sections. Superseded narrative relocated to `memory-bank/archives/progress-archive-2025-12-07.md`. Focus is on rebuilding automation guardrails and ensuring self-healing documentation loops.

## Known Issues

- No `.github/workflows/` automation is present; manual checks are required.
- Script inventory includes multiple near-duplicate helpers (e.g., setup variants) that complicate onboarding until consolidation is renewed.
- Tests, linting, and scripts require locally installed dependencies; offline containers without `pnpm install` will fail `pnpm test` and related commands.
- Historical achievements referenced outdated counts; all new updates must verify actual filesystem metrics before logging achievements.

## Historical Archive

- All pre-2025-12-07 progress entries, including script consolidation narratives and automation retrospectives, are preserved in [`memory-bank/archives/progress-archive-2025-12-07.md`](archives/progress-archive-2025-12-07.md).

## Dependencies

- **Memory Bank** – `projectbrief.md`, `productContext.md`, `activeContext.md`, `systemPatterns.md`, and `techContext.md` define scope, architecture, and technology constraints that govern progress updates.
- **Instructions** – Follow `memory-bank/instructions/self-documentation.instructions.md`, `layer-4-v2-automation-and-health.instructions.md`, and the new progress maintenance instructions to keep this document trustworthy.

## Call to Action

1. Before editing, run quick counts (`scripts`, instruction files, prompt files) and cite evidence in the update entry.
2. Archive superseded narrative immediately to keep this file concise; never delete history without moving it to `memory-bank/archives/`.
3. Document test or script runs (pass/fail) inside `Known Issues` or `What Works` with timestamps so future agents can reproduce results.
4. After each change, cross-check `activeContext.md` for alignment and update it if the current focus shifts.
