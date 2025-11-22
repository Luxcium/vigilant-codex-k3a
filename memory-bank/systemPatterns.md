# systemPatterns.md

## Purpose

Concise canonical record of current system architecture: structural principles, key technical decisions, core design patterns, and critical component relationships. Replaces verbose narrative (preserved in archives/systemPatterns-archive.md) with an operationally focused summary that other Memory Bank files and AI agents can reliably ingest quickly.

## Structure

- Architecture Overview
- Key Technical Decisions (Snapshot)
- Core Design & Implementation Patterns
- Component & Knowledge Relationships
- Dependencies and Relationships
- Call to Action
- Metadata

---

## Architecture Overview

Polyvalent monorepo supporting coordinated TypeScript SDK, Next.js app, Python agent system, multi‑agent frameworks, and shared documentation.

Foundational Principles:

- Clear root contexts (src, web, python, agent-framework) with isolated configs
- Script‑driven, idempotent setup (no manual mutations; all lifecycle in scripts/)
- Memory Bank enforced for session context (all agents read core files first)
- Conditional environment selection (ENV_MODE defers binding: local | docker_isolated | docker_volume)
- Native modern runtime (Node.js 22 w/ built‑in fetch; Python 3.13 alignment)
- Documentation-lint & single-H1 discipline; verbose rationale archived

Root Contexts (authoritative list in root-contexts.md):

- src/: TypeScript SDK (native fetch, shared types)
- web/: Next.js v15+ (Server/Client Components, Server Actions, Prisma)
- python/: Python agent environments + notebooks integration
- agent-framework/: TS-based multi-agent orchestration layer

---

## Key Technical Decisions (Snapshot)

| Domain | Decision | Rationale (Condensed) | Impact |
| ------ | -------- | --------------------- | ------ |
| HTTP Layer | Native fetch (Node 22) | Reduce deps, future-proof | Lean runtime, strong typing |
| AI Collaboration | Three-agent ecosystem (Cline / Codex CLI / Copilot) | Complementary roles | Coordinated automation & reasoning |
| Environment Model | Parameterized conditional framework | Avoid premature lock‑in | Runtime flexibility |
| Container Strategy | Codex Universal base image | Consistency + tooling parity | Uniform dev surface |
| Memory System | Cline Memory Bank + archival | Zero context loss | Fast session boot (<30s target) |
| Web Stack | Next.js Server Actions + cache revalidation | Modern DX & performance | Simplified state & mutation paths |
| Script Governance | Consolidation & header standards | Maintainability + clarity | Reduced script count, easier audits |
| Documentation | Active vs Archive separation | Ingestion speed | Concise active files |

(Full rationale & historical narrative: archives/systemPatterns-archive.md)

---

## Core Design & Implementation Patterns

Architecture & Collaboration:

- Memory Bank Bootstrap Pattern: mandatory read cycle before action
- Role Segmentation: reasoning (Cline), orchestration (Codex CLI), inline assist (Copilot)
- Self-Documentation Loop: every structural change → Memory Bank update → archive if verbose

Environment & Scripts:

- Idempotent Script Pattern: safe re-runs; explicit precondition checks
- Consolidation Protocol: periodic reduction of overlapping scripts (documented in progress.md)
- Header Compliance: 10-line descriptive block + validation status footer

Web & Component Model:

- Server-first default; elevate to client only for interaction/stateful UI
- Server Actions for mutations; explicit cache revalidation via revalidatePath / revalidateTag
- Serializable boundary contract between Server and Client components

Testing & Quality:

- Global fetch stub with vi.stubGlobal for deterministic HTTP tests
- Coverage Gate ≥98% branch; error & boundary cases required
- Lint + markdown-lint as pre-commit guards (see scripts/verify-all.sh)

Container & Deployment (Dev Scope):

- Volume-based iteration; no rebuild on code changes
- Minimal privilege baseline; dependency verification scripts
- ENV_MODE pivot without rewriting configuration artifacts

Archival Discipline:

- Active files retain only current operational material
- superseded rationale → archives/*.md with date stamp
- ensures ingestion speed and preserves provenance

---

## Component & Knowledge Relationships

Memory Bank Flow:
projectbrief.md → (scope baseline)
  ↳ productContext.md (why/goals)
  ↳ systemPatterns.md (this file: architecture)
      ↳ techContext.md (tools & constraints)
          ↳ activeContext.md (current focus/state)
              ↳ progress.md (execution status)
                  ↳ dependencies.md (dependency tracking)

Technology Interaction (Condensed):

- src (SDK) supplies shared types/utilities → web & python
- web (Next.js) uses Prisma + Server Actions + SDK abstractions
- python integrates via API / shared contracts; supports notebooks
- scripts orchestrate lifecycle across all roots
- Memory Bank underpins all agent reasoning phases

---

## Dependencies and Relationships

- **Depends On:** projectbrief.md, productContext.md
- **Informs:** techContext.md, activeContext.md, progress.md, dependencies.md
- **Archive Reference:** archives/systemPatterns-archive.md (full legacy + rationale)
- **Impact Analysis:** Any alteration here may invalidate tooling assumptions, script flows, or AI suggestion accuracy—triggers review cascade across dependent files and script headers.

---

## Call to Action
> Keep this file lean: only current architecture & patterns in force. On change: (1) update snapshot here, (2) append detailed rationale to archive, (3) reconcile root-contexts.md & scripts/README.md if impacted, (4) propagate constraints to techContext.md and activeContext.md. Never remove historically significant rationale—archive it.

---

**Last Updated:** 2025-11-08 | **Status:** Condensed Architectural Snapshot Stable | **Scope:** Active Patterns & Decisions Only | **Archive:** Full detail in archives/systemPatterns-archive.md
