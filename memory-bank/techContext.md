# techContext.md

<!-- markdownlint-disable MD013 MD022 MD032 MD041 MD005 MD007 -->

## Purpose

This file documents the technologies, development setup, technical constraints, and dependencies for any project. It provides a clear reference for all technical aspects, independent of any specific project topic at initialization.

## Structure

- **Technologies Used:** General categories and rationale.
- **Development Setup:** Environment and tooling guidelines.
- **Technical Constraints:** Known limitations or requirements.
- **Dependencies:** How to manage and document them.
- **Call to Action:** Instructions for agents to update and self-regulate this file.

---

## Technologies Used

- **Node.js 22**
- **TypeScript 5.7**
- **Python 3.11**
- **Next.js 14**

## Development Setup

- The project root must be organized by language and framework as specified in [systemPatterns.md](./systemPatterns.md):
  - `src/` for TypeScript sources
  - `web/` for Next.js apps (when coexisting)
  - `scripts/` for shell scripts only
  - `python/` for Python code
  - `notebooks/` for Jupyter notebooks
  - All directory and file creation must be performed via scripts in `scripts/`, never manually.

Refer to the centralized directory structure diagram in [systemPatterns.md](./systemPatterns.md) for the latest and authoritative version.

- Document environment setup and configuration.
- Ensure instructions are clear for onboarding new agents or contributors.
- Update as tooling or setup changes.

## Technical Constraints

- Codebase organization must follow the standard described in [systemPatterns.md](./systemPatterns.md).
- All setup and file/folder creation must follow the patterns in [.clinerules/pattern-examples.md](../.clinerules/pattern-examples.md).
- List any known limitations or requirements.
- Update as new constraints are discovered or resolved.

## Dependencies

- Document all dependencies and their purposes.
- Update this section as dependencies are added, removed, or updated.

## Dependencies and Relationships

- **Depends On:** [systemPatterns.md](./systemPatterns.md), [projectbrief.md](./projectbrief.md)
- **Required By:** [activeContext.md](./activeContext.md), [progress.md](./progress.md), [docker-workflow.md](./docker-workflow.md), [dependencies.md](./dependencies.md)
- **Why This Order:** `techContext.md` establishes tools and constraints before active work or progress tracking.
- **Impact Analysis:** Outdated tooling information causes misaligned setups and wasted effort across the entire workflow.

## Call to Action

> **All agents and contributors must review, update, and self-regulate this file as the technical context evolves.**  
> **Do not proceed with technical implementation until this file is aligned with the current technology stack and constraints.**  
> **Update this file immediately upon any change in technologies, setup, constraints, or dependencies.**

**See [.clinerules/pattern-examples.md](../.clinerules/pattern-examples.md), [.clinerules/reading-protocol.md](../.clinerules/reading-protocol.md), and [.clinerules/verification.md](../.clinerules/verification.md) for required protocols and implementation patterns.**

---
