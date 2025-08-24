# projectbrief.md

## Purpose
Foundational brief for Vigilant Codex K3a. Defines core objectives, scope, requirements, and collaboration model powering all other Memory Bank files. Acts as the single upstream source of truth; every downstream document derives or refines content from this file.

## Structure
- Project Overview
- Core Requirements
- Scope Definition
- AI Agent Collaboration Framework
- Development Standards (Snapshot)
- Dependencies and Relationships
- Call to Action
- Metadata

---

## Project Overview

**Vigilant Codex K3a** is a polyvalent AI‑augmented development workspace enabling rapid, resilient multi‑language (TypeScript, Python, Next.js, Jupyter) delivery with stateful multi‑agent collaboration and strict self‑documentation.

### Primary Objectives
- Polyvalent architecture (TS SDK, Next.js app, Python agent system, multi‑agent framework)
- Advanced AI agent collaboration (Cline AI, Codex CLI, VS Code Copilot)
- Conditional runtime environment framework (parameterized decision architecture)
- Production readiness focus (testing, security, documentation, reproducibility)
- Persistent contextual knowledge via the Memory Bank

### Key Innovations
- Parameter‑driven conditional framework (zero hard‑coded environment lock‑in)
- Three‑agent ecosystem with shared state synchronization
- Official Cline Memory Bank compliance + archival discipline
- Native Fetch modernization (Node.js 22) with near‑complete coverage
- Self‑documenting operational protocols (scripts + documentation parity)

---

## Core Requirements

### AI Agent Framework
- Mandatory Memory Bank protocol: all agents read all core files at session start
- Cross‑agent compatibility (Cline AI / Codex CLI / VS Code Copilot)
- Persistent context preservation across resets (no information loss)
- Self‑documentation: every significant action reflected in active/progress files
- Coordinated stateful collaboration via standardized update triggers

### Development Environment
- Script‑driven, idempotent setup (no manual creation)
- Conditional architecture (runtime parameter selection)
- Multi‑language seamless workflows (TypeScript, Python, Next.js, notebooks)
- Docker orchestration (Codex Universal + volume workflows)
- Comprehensive automated testing (target ≥98% branch coverage)

### Quality & Standards
- Strict markdown‑lint compliance (single H1, ordered headings, no drift)
- Cross‑reference integrity and dependency tracking
- Zero information loss (historical archiving instead of deletion)
- Enterprise readiness: security, reproducibility, clarity

### Application Architecture
- Next.js v15+ with Server Actions & cache revalidation
- PostgreSQL + Prisma schema governance
- Native Fetch API (Node.js 22) with strict type safety
- Security baseline: least privilege containers & dependency validation
- Unified type discipline across TS and Python boundaries

---

## Scope Definition

### Included
- Core TypeScript SDK (native fetch powered)
- Next.js v15+ application & database integration
- Python conditional environment + deployment modes
- Docker orchestration (Codex Universal & supporting scripts)
- AI agent ecosystem (instructions / prompts / chatmodes)
- Memory Bank system (archival + active context)
- Testing infrastructure (≥98% target coverage)
- Documentation framework + TSDoc / Typedoc alignment

### Excluded
- Cloud vendor‑specific deployment stacks
- Advanced enterprise auth / multi‑tenant identity
- Real‑time websockets / streaming features
- Native mobile (only responsive web support)
- Arbitrary third‑party integrations beyond core tooling

### Future Considerations
- Broader conditional framework expansion
- Deeper AI automation & autonomous refactors
- Performance tuning (caching, resource heuristics)
- Enterprise security & observability extensions

---

## AI Agent Collaboration Framework

Three cooperative agents with distinct entry points:

| Agent | Entry Point | Focus |
| ----- | ----------- | ----- |
| Cline AI | `.clinerules/main-rules.md` | Architectural reasoning, memory stewardship |
| Codex CLI | `AGENTS.md` | Script & container orchestration, terminal automation |
| VS Code Copilot | `.github/copilot-instructions.md` | Inline generation, standards reinforcement |

Collaboration Principles:
- Shared Memory Bank is the synchronization layer
- Complementary responsibility boundaries
- Cross‑agent workflows rely on consistent script protocols
- Archives protect history; active files remain concise

(See also: root-contexts.md for authoritative folder role classification.)

---

## Development Standards (Snapshot)

| Dimension | Standard |
| --------- | -------- |
| Directory Roots | Managed centrally in `root-contexts.md` |
| Scripts | Idempotent; every `.sh` has purpose header; README synchronized |
| Testing | ≥98% branch coverage target; zero uncontrolled regressions |
| Documentation | One H1; ordered sections; archival for legacy verbosity |
| Type Safety | Strict TS config + Python typing enforcement + lint gates |
| Security | Non‑root containers, minimal images, dependency verification |
| Conditional Architecture | Runtime selection (no premature binding) |
| Archiving | Historical material moved to `archives/` not deleted |

For expanded architectural and tooling details: `systemPatterns.md`, `techContext.md`.

---

## Dependencies and Relationships
- **Depends On:** None (foundational origin document)
- **Required By:** productContext.md, systemPatterns.md, techContext.md, activeContext.md, progress.md, dependencies.md
- **Related References:** root-contexts.md (folder roles), scripts/README.md (operational workflows)
- **Impact Analysis:** Drift here invalidates downstream alignment; triggers mandatory review of all referencing documents
- **Historical Changes Archive:** See `archives/projectbrief-archive.md` for migration and structural history

---

## Call to Action
> Maintain this brief as the minimal, authoritative upstream definition. On any foundational change (scope, objectives, architecture), update here first, then propagate references. Archive removed narrative—never delete without preservation.

---

**Last Updated:** 2025-11-08 | **Status:** Concise Foundation Normalized | **Scope:** Polyvalent AI Workspace Core
