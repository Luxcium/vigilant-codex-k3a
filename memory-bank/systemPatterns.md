# systemPatterns.md

<!-- markdownlint-disable MD013 MD022 MD032 MD041 MD040 MD036 -->

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
- `web/prisma/` — Prisma schema and migrations for database.
- `docker-compose.yml` manages PostgreSQL service for development.
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

## Key Technical Decisions

### Development Environment Standardization

- Adopted Codex Universal Docker image (`ghcr.io/openai/codex-universal:latest`) for consistent development environments across all platforms and AI agents
- Implemented volume-based development workflow instead of COPY operations for instant file changes and better development experience
- Standardized on Node.js 22 and Python 3.13 for all development environments
- Integrated OpenAI API key passing from host environment to containers for seamless API access

### Container Orchestration Strategy

- Use Docker Compose for multi-service orchestration with custom networks for service isolation
- Implement named volumes for dependency caching (node_modules, Python virtual environments)
- Apply security-first approach with non-root users and minimal base images
- Include comprehensive health checks and monitoring for all critical services

### Script-Based Environment Management

- All Docker environment setup and management performed via scripts in `scripts/` directory
- Implemented idempotent scripts that are safe to run multiple times
- Comprehensive validation and error handling with colored logging output
- Support for both full environment setup and quick development runs

- Adopted a standardized project root organization by language and framework (see Architecture Overview).
- All setup and file/folder creation must be performed via scripts in the `scripts/` directory, never manually.
- Scripts must be idempotent, must not overwrite existing files, and must warn or skip if files/folders exist.
- All documentation and scripts must be markdown-lint strict mode compliant.
- All major technical decisions must be documented here.
- Rationale for each decision should be clear and accessible.
- Updates must be made as the system evolves.

## Design Patterns

## Design Patterns

### Container Orchestration Patterns

- **Volume-Based Development Pattern**: Use bind mounts for source code and named volumes for dependencies
- **Environment Variable Injection Pattern**: Pass sensitive configuration from host environment using `${VARIABLE}` syntax
- **Health Check Pattern**: Implement comprehensive health validation for all services with proper timeouts and retries
- **Service Discovery Pattern**: Use custom networks with descriptive service names for internal communication

### Script Automation Patterns

- **Idempotent Operation Pattern**: Design all scripts to be safely re-runnable without side effects
- **Validation-First Pattern**: Check prerequisites before performing operations with helpful error messages
- **Colored Logging Pattern**: Use consistent color coding for different log levels (info, success, warning, error)
- **Graceful Degradation Pattern**: Continue operation when possible, warn about missing optional components

### AI Agent Collaboration Patterns

- **Instruction File Pattern**: Create specific instruction files for different domains (docker-environment.instructions.md)
- **Prompt File Pattern**: Generate comprehensive workflow automation with context requirements
- **Memory Bank Integration Pattern**: Update all relevant memory bank files with architectural decisions and dependencies
- **Cross-Agent Compatibility Pattern**: Ensure configurations work across VS Code Copilot, Cline AI, and Codex CLI

- **Command Pattern**
- **Adapter Pattern**
- **Observer Pattern**

## Component Relationships

- Clearly describe how components interact and depend on each other.
- Update this section as new components are added or relationships change.

## Dependencies and Relationships

| File                                       | Relationship                 |
| ------------------------------------------ | ---------------------------- |
| [projectbrief.md](./projectbrief.md)       | foundation                   |
| [productContext.md](./productContext.md)   | defines goals                |
| [techContext.md](./techContext.md)         | implementation guidance      |
| [docker-workflow.md](./docker-workflow.md) | container workflow reference |
| [activeContext.md](./activeContext.md)     | consumes patterns            |
| [progress.md](./progress.md)               | tracks decisions             |

| [when-to-use-what-matrix.instructions.md](../.github/instructions/when-to-use-what-matrix.instructions.md) | one-page manifest/meta config mapping |

> For meta-configuration and manifest standards, always start with the matrix above, then consult `.github/instructions/README.md` and `.github/prompts/README.md` for detailed implementation and workflow automation guidance.

## Call to Action

> **All agents and contributors must review, update, and self-regulate this file as the system architecture and patterns evolve.**  
> **Do not proceed with system-level changes until this file is aligned with the current architecture.**  
> **Update this file immediately upon any change in system structure, patterns, or technical decisions.**

**See [.clinerules/pattern-examples.md](../.clinerules/pattern-examples.md), [.clinerules/reading-protocol.md](../.clinerules/reading-protocol.md), and [.clinerules/verification.md](../.clinerules/verification.md) for required protocols and implementation patterns.**

---
