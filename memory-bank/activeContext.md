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

Finishing Questrade SDK core features. Implemented hourly rate-limit buckets with 429 back-off logic while continuing web integration work.

## Recent Changes

- **Next.js Web Environment**: Generated project scaffold via `setup_web_env.sh` with TypeScript and ESLint.
- **Database Setup**: Added PostgreSQL service and Prisma schema with user model through `setup_db_prisma.sh`.
- **Login Feature**: Created simple login API routes using Prisma and bcrypt.
- **Ledger Protocol**: Added Memory Bank ledger instructions to `AGENTS.md` and
  updated documentation for markdownlint compliance.
- **Rate Limit Patch**: Added hourly token buckets and 429 handling logic in SDK core.
- **Error Module Consolidation**: Merged duplicate `src/error/` and `src/errors/` directories into a single `src/errors/` module and updated imports.
- **Memory Bank Protocol**: Documented Codex memory reset workflow and detailed ledger instructions in `AGENTS.md`.

## Next Steps

### Documentation Updates
- Document Prisma and PostgreSQL dependencies in `memory-bank/dependencies.md`
- Record web architecture in `memory-bank/systemPatterns.md`
- Update `memory-bank/progress.md` with web environment status
- Note rate limiter patch in `memory-bank/progress.md`

### Testing
- Verify Next.js app starts and connects to database
- Validate `scripts/genesis_boot.sh` initialization script
- Run unit tests for updated rate limiter
- Follow [testing-guide.md](./testing-guide.md) for detailed steps

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
