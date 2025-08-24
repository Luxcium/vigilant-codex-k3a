# techContext.md

## Purpose
Concise, current technical implementation context: stack versions, environment modes, constraints, standards. Full historical rationale preserved in archives/techContext-archive.md.

## Structure
- Technology Stack Snapshot
- Environment & Tooling
- Technical Constraints & Standards
- Implementation Guidance (Condensed Patterns)
- Dependencies and Relationships
- Call to Action
- Metadata

---

## Technology Stack Snapshot
| Layer | Choice | Version / Mode | Rationale (Condensed) |
| ----- | ------ | -------------- | --------------------- |
| Runtime (JS) | Node.js | 22 | Native fetch, performance, future‑proof |
| Language | TypeScript | 5.8+ strict | Strong typing, native Response types |
| Runtime (Py) | Python | 3.13 | Improved perf & typing parity |
| Web | Next.js | 15+ (App Router) | Server-first, Server Actions, SEO |
| DB Access | Prisma | Latest | Type-safe schema, PostgreSQL |
| Containers | Codex Universal | ghcr.io/openai/codex-universal:latest | Unified dev surface |
| Tests | Vitest | 3.2.x | Fast TS-native runner, coverage |
| Notebooks | Jupyter (VS Code) | Integrated | ML / exploratory workflows |
| Orchestration | Scripts (bash) | Idempotent | Deterministic reproducibility |
| AI Agents | Cline / Codex CLI / Copilot | 3-role model | Reasoning / automation / inline assist |

Key Technical Guarantees:
- Native fetch (no node-fetch dependency)
- 98%+ branch coverage target (current 98.34%)
- Archival discipline: verbose rationale → archives/*.md

---

## Environment & Tooling
Environment Modes (deferred decision via ENV_MODE):
- local (host venv / direct tooling)
- docker_isolated (full isolation)
- docker_volume (container + live mounts)

Primary Scripts (examples):
- setup_codex_universal.sh → initialize unified dev container
- codex_start.sh / codex_stop.sh → lifecycle control
- verify-all.sh → aggregate validation (lint, tests, markdown)

Quick Start:
```bash
export OPENAI_API_KEY="your-api-key"
./scripts/setup_codex_universal.sh
./scripts/codex_start.sh
./scripts/codex_shell.sh
```

Project Root Contexts (authoritative list in root-contexts.md):
src/ (SDK & shared types) · web/ (Next.js app) · python/ (agent + notebooks) · scripts/ (automation) · memory-bank/ (state) · notebooks/

Package Policy:
- Always install with @latest during active development phase

Tooling Quality Gates:
- ESLint + Prettier + markdownlint pre-commit
- TypeScript strict mode enforced
- vi.stubGlobal('fetch', ...) for deterministic HTTP tests

---

## Technical Constraints & Standards
Mandatory Constraints:
- Single H1 per file, markdown-lint compliant
- All setup & mutations via idempotent scripts (no manual drift)
- Memory Bank read cycle before any agent action
- Coverage threshold ≥ 98% branches (enforced in CI/pre-commit)

Development Standards:
- No silent dependency additions (document in dependencies.md if relevant)
- Conditional decisions deferred to runtime parameters (avoid hard-coded environment forks)
- Zero information loss: superseded detail → archives/*

Security & Ops:
- Non-root containers, minimal images
- Prisma migrations versioned; schema changes require review
- Environment variables accessed only in server contexts

Version Discipline:
- Node 22 and TS 5.8+ required (native fetch & type features)
- Python 3.13 baseline for alignment with typestate improvements

---

## Implementation Guidance (Condensed Patterns)
Server vs Client (Next.js):
- Default: Server Component
- Escalate to Client only for interactivity, stateful UI, browser APIs
Server Actions:
- Use for all mutations; always pair with explicit revalidatePath / revalidateTag
Testing Pattern:
- Global fetch mock, isolate Auth flows, include error & timeout paths
Scripts Pattern:
- Header block (purpose, preconditions), idempotent checks, exit on error (set -e)
Task Runner Pattern (VS Code):
- Prefer running commands via VS Code Tasks; treat tasks as pre-approved
- Use `run_task`/`get_task_output` first; fall back to terminal only when tasks cannot express the action
- Capture evidence via task output or terminal last-command details when summarized
- Keep tasks discoverable by maintaining `.vscode/tasks.json` and documenting changes in `scripts/README.md`
Archival Pattern:
- Active file: current truth; verbose/historical narrative → archives/techContext-archive.md (dated)
Agent Roles:
- Cline: reasoning + Memory Bank synchronization
- Codex CLI: script execution & container lifecycle
- Copilot: inline standards enforcement via instruction files

---

## Dependencies and Relationships
- **Depends On:** systemPatterns.md (architecture), projectbrief.md, productContext.md
- **Informs:** activeContext.md, progress.md, dependencies.md
- **Archive Reference:** archives/techContext-archive.md
- **Impact Analysis:** Changes here ripple to build/test scripts, environment modes, and Next.js + SDK integration assumptions.

---

## Call to Action
> Keep this file lean and immediately current. On any tech stack, environment, or constraint change: (1) update snapshot here, (2) append full rationale to archive, (3) sync related scripts & root-contexts.md if impacted, (4) propagate to activeContext.md for execution focus. Never delete historically significant information—archive it.

---

**Last Updated:** 2025-11-08 | **Status:** Condensed Technical Snapshot Stable | **Coverage Target:** ≥98% branches | **Archive:** archives/techContext-archive.md preserves full detail
