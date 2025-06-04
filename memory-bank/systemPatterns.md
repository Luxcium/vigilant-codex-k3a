# systemPatterns.md

## Purpose
This file documents the system architecture, key technical decisions, design patterns, and component relationships for any project. It serves as a living reference for how the system is structured and how its parts interact, independent of any specific project topic at initialization.

## Structure
- **Architecture Overview:** General structure and organization principles.
- **Key Technical Decisions:** Rationale for major choices.
- **Design Patterns:** Patterns and conventions to be followed.
- **Component Relationships:** How parts of the system interact.
- **Call to Action:** Instructions for agents to update and self-regulate this file.

---

## Architecture Overview

**Project Root Code Organization Standard**

- `src/` — Main TypeScript project source. When both a TypeScript library and a Next.js web app coexist, place the TS code in `src/` and the Next.js app in `web/`. If the codebase consists solely of a Next.js application, you may omit `web/` and host the app directly at the project root.
- `web/` — Next.js application when coexisting with other code.
- `scripts/` — Shell scripts for setup and automation. Only shell scripts should live here.
- `python/` — Python projects, modules, and utilities.
- `notebooks/` — Jupyter notebooks and related resources.

**Rationale:**  
Organizing code by language and framework at the project root ensures clarity, modularity, and scalability. This structure supports multi-language, multi-framework projects and enforces separation of concerns. All directory and file creation must be performed via scripts in `scripts/`, never manually, and all documentation must remain markdown-lint compliant.

```
/
├── src/
├── web/
├── python/
├── scripts/
└── notebooks/
```

This Memory Bank is initialized to provide a clear, adaptable template for documenting system architecture and patterns. It is designed to be updated as soon as a project context or architecture is defined.

## Key Technical Decisions

- Adopted a standardized project root organization by language and framework (see Architecture Overview).
- All setup and file/folder creation must be performed via scripts in the `scripts/` directory, never manually.
- Scripts must be idempotent, must not overwrite existing files, and must warn or skip if files/folders exist.
- All documentation and scripts must be markdown-lint strict mode compliant.
- All major technical decisions must be documented here.
- Rationale for each decision should be clear and accessible.
- Updates must be made as the system evolves.

## Design Patterns

- **Command Pattern**
- **Adapter Pattern**
- **Observer Pattern**

## Component Relationships

- Clearly describe how components interact and depend on each other.
- Update this section as new components are added or relationships change.

## Dependencies and Relationships

| File | Relationship |
| --- | --- |
| [projectbrief.md](./projectbrief.md) | foundation |
| [productContext.md](./productContext.md) | defines goals |
| [techContext.md](./techContext.md) | implementation guidance |
| [activeContext.md](./activeContext.md) | consumes patterns |
| [progress.md](./progress.md) | tracks decisions |


## Call to Action

> **All agents and contributors must review, update, and self-regulate this file as the system architecture and patterns evolve.**  
> **Do not proceed with system-level changes until this file is aligned with the current architecture.**  
> **Update this file immediately upon any change in system structure, patterns, or technical decisions.**

**See [.clinerules/pattern-examples.md](../.clinerules/pattern-examples.md), [.clinerules/reading-protocol.md](../.clinerules/reading-protocol.md), and [.clinerules/verification.md](../.clinerules/verification.md) for required protocols and implementation patterns.**

---
