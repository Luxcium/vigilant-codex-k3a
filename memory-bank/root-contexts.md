# The `root-contexts.md` Memory Bank File

Your AI Agent will actively strive to keep this file up to date with the latest root contexts, including project roots, pseudo roots, and their purposes. This file MUST be updated by any AI Agent eagerly each time it will make changes on each chat completion and each task or subtask as the authoritative guide for all top-level folder structures in the Vigilant Codex K3a polyvalent AI development workspace. You the ai agent responsible for maintaining this file autonomously.

## Purpose

Document all top-level folders, identifying which are true project roots and which are supporting directories. This ensures AI agents and developers have a clear understanding of the workspace layout.

## Structure

- **Root Contexts** - Folders that act as independent project roots
- **Pseudo Root Folders** - Supporting folders without standalone project roots
- **Dependencies and Relationships** - Related files and context
- **Call to Action** - Maintenance instructions
- **AI Agent Instructions** - Responsibilities for autonomous updates

---

## Root Contexts

| Folder | Purpose |
| ------ | ------- |
| `src/` | TypeScript SDK – main codebase with native fetch implementation |
| `web/` | Next.js v15+ application with Prisma integration |
| `python/` | Python agent system with conditional environments |
| `agent-framework/` | TypeScript 22 multi‑agent framework |
| `scripts/` | Lifecycle and maintenance scripts (bash) |
| `memory-bank/` | AI agent documentation and state management |
| `notebooks/` | Jupyter notebooks and experimentation |

## Pseudo Root Folders

| Folder | Purpose |
| ------ | ------- |
| `templates/` | Project scaffolding templates |
| `examples/` | Small example files |
| `prisma/` | Database schema for web application |
| `init/` | Initial bootstrapping notes |

System folders such as `.git/`, `.vscode/`, `.github/`, `.clinerules/`, `.codex/`, and `node_modules/` are excluded from root context classification.

## Dependencies and Relationships

- **Depends On:** [systemPatterns.md](./systemPatterns.md)
- **Required By:** [techContext.md](./techContext.md), [activeContext.md](./activeContext.md)
- **Why This Order:** System patterns define overall architecture; root contexts clarify folder roles for technical implementation
- **Impact Analysis:** Accurate folder classification ensures documentation, scripts, and AI agent behaviors remain consistent and self‑documenting

## Call to Action

> **Update this file whenever a new top‑level folder is added or removed.**
> **Ensure the README and `.clinerules/main-rules.md` reflect the same list.**

## AI Agent Instructions

- Maintain this list autonomously and keep documentation in sync
- Verify that each shell script has comments describing its purpose
- Update `scripts/README.md` whenever scripts change

---

**Last Updated:** 2025-07-23
