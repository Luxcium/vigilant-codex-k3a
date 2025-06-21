# projectbrief.md
<!-- markdownlint-disable MD013 MD022 MD032 MD041 -->
STATUS: 🟢 Active

## Purpose
This file is the foundation of the Memory Bank. It defines the core requirements, goals, and scope for any project. It is the primary source of truth for all subsequent documentation and must be maintained with precision.

## Structure
- **Purpose:** Why this Memory Bank exists.
- **Scope:** What is included and excluded.
- **Core Requirements:** High-level objectives and constraints.
- **Call to Action:** Instructions for agents to update and self-regulate this file.

---

## Scope

- Covers all stages of project documentation, from inception to completion.
- Excludes any project-specific details at this stage.
- Must be updated as soon as a project topic or context is defined.

## Core Requirements

- Maintain clarity and completeness at all times.
- Ensure all documentation is up-to-date and reflects the current state of the project.
- Facilitate seamless collaboration between agents and contributors.
- **All setup and file/folder creation must be performed via scripts in the `scripts/` directory, never manually.**
- **Scripts must be idempotent, must not overwrite existing files, and must warn or skip if files/folders exist.**
- **All rules and intentions must be documented in the README before implementation.**
- **The README and all scripts must remain markdown-lint strict mode compliant at all times.**

## Dependencies and Relationships

- **Depends On:** None — this file establishes the core rules and goals for the repository.
- **Required By:** [productContext.md](./productContext.md), [systemPatterns.md](./systemPatterns.md), [techContext.md](./techContext.md), [docker-workflow.md](./docker-workflow.md), [activeContext.md](./activeContext.md), [progress.md](./progress.md), [dependencies.md](./dependencies.md)
- **Why This Order:** `projectbrief.md` defines foundational requirements that every other Memory Bank file builds upon.
- **Impact Analysis:** If this document becomes outdated, all downstream documentation and automation may diverge from the project’s objectives, leading to inconsistent workflows and rework.

## Call to Action

> **All agents and contributors must review, update, and self-regulate this file as the project evolves.**  
> **Do not proceed with project-specific work until this file is reviewed and aligned with the current project context.**  
> **Update this file immediately upon any change in project scope or requirements.**

## AI Agent Instructions

This project supports three AI agents with specific entry points:
- **Cline AI** → `.clinerules/main-rules.md` (Cline AI's primary instruction file)
- **Codex CLI** → `AGENTS.md` (Codex CLI's primary instruction file)
- **VS Code Copilot** → `.github/copilot-instructions.md` (VS Code Copilot's primary instruction file)

**See [.clinerules/reading-protocol.md](../.clinerules/reading-protocol.md), [.clinerules/writing-protocol.md](../.clinerules/writing-protocol.md), and [.clinerules/verification.md](../.clinerules/verification.md) for required protocols.**

---
