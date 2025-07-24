# dependencies.md

## Purpose

This file tracks all pro### Script Management and Optimization Protocol

**Purpose**: Continuous script consolidation and optimization to reduce maintenance overhead

**Current State**: Script optimization review plan created for advanced consolidation (42 → 22-25 scripts target)

**Dependencies and Relationships**:

- **scripts/README.md** → **ALL script files** (Why: Must be synchronized whenever scripts change)
  - Impact: Documentation accuracy and developer onboarding efficiency
  
- **systemPatterns.md script consolidation principles** → **file-organization.instructions.md** (Why: Architecture drives implementation standards)
  - Impact: Consistent script management approach across all AI agents

- **Monthly script reviews** → **script usage analytics** (Why: Data-driven consolidation decisions)
  - Impact: Optimization priorities based on actual usage patterns

- **Script header standardization** → **All 42 scripts in scripts/ directory** (Why: Consistent documentation and validation)
  - Impact: Enhanced maintainability and automated validation capabilities

**Advanced Consolidation Dependencies**:
- `setup_web_env.sh` + `setup_web_dev_environment.sh` → **Planned unified web setup script**
- `validate-instructions.sh` + `validate-prompt.sh` → **Planned unified validation script** 
- `generate-instruction-file.sh` + `generate-prompt-file.sh` → **Planned unified generator script**
- `setup_questrade_sdk_core.sh` + `setup_questrade_types.sh` → **Planned unified Questrade setup**
- `setup_agent_framework.sh` + `setup_agent_system.sh` → **Planned unified agent setup**

**Quality Assurance Dependencies**:
- **Header Format Validation** → **Automated checker for 10-line standardized format**
- **Functional Testing** → **Parameter combination testing for consolidated scripts**
- **Integration Testing** → **.vscode/tasks.json validation with consolidated scripts**
- **Continuous Monitoring** → **Monthly review protocol and usage analytics**

### Development Environment Dependenciesect dependencies, their relationships, and integration points for the Vigilant Codex K3a polyvalent AI development workspace. It serves as a comprehensive dependency map enabling proper management and coordination between components across multiple languages, frameworks, and AI agents.

## Structure

- **Core Dependencies** - Essential runtime and development dependencies
- **Development Dependencies** - Tools and utilities for development workflow
- **AI Agent Dependencies** - Files and systems required for AI agent collaboration
- **Cross-References** - Dependency relationships and integration points
- **Historical Changes Archive** - Chronological record of major dependency changes
- **Dependencies and Relationships** - File relationships and impact analysis
- **Call to Action** - Instructions for maintaining this file

---

## Core Dependencies

### TypeScript/Node.js Core Stack

- **Node.js 22** - Runtime with native fetch API support
- **TypeScript 5.8+** - Strict type checking with native Response types
- **Native Fetch API** - HTTP client using Node.js 22 native implementation
- **Vitest 3.2.4** - Test runner with Istanbul coverage provider (98.34% coverage)
- **Prisma ORM** - Database integration with PostgreSQL backend

### Next.js v15+ Web Application Stack

- **Next.js 15+** - App Router with Server Components by default
- **Server Actions** - Form handling and mutations with `'use server'`
- **Client Components** - Interactive UI with `'use client'` for state management
- **PostgreSQL** - Database service via Docker Compose
- **Docker Integration** - Containerized development environment

### Python Development Environment

- **Python 3.13** - Core language runtime
- **Conditional Environment Framework** - Runtime mode selection:
  - `local` - Host-based virtual environment with direct IDE integration
  - `docker_isolated` - Fully containerized with complete isolation
  - `docker_volume` - Containerized with live host file mounting
- **Jupyter Notebooks** - VS Code integration with advanced API support
- **pip/virtualenv** - Package management across all environment modes

### Docker Orchestration Platform

- **Codex Universal Environment** - `ghcr.io/openai/codex-universal:latest`
- **Node.js 22 + Python 3.13** - Pre-configured development environment
- **Volume-Based Development** - Instant file changes without container rebuilds
- **OpenAI API Integration** - Seamless API access within containers
- **Multi-Service Support** - PostgreSQL, Redis, development servers
- **Health Monitoring** - Comprehensive service validation

## Development Dependencies

### Testing Infrastructure

- **Vitest 3.2.4** - Primary test runner with Istanbul coverage
- **259 Tests Passing** - Zero regression development with 98.34% branch coverage
- **Native Fetch Mocking** - `vi.stubGlobal('fetch', mockFetch)` for HTTP isolation
- **AuthManager Mocking** - Complete authentication system mocking
- **Edge Case Coverage** - NaN handling, timeout management, error scenarios
- **CommonJS Compatibility** - Maintained throughout test infrastructure

### Code Quality & Formatting

- **ESLint** - JavaScript/TypeScript linting with strict rules
- **Prettier** - Code formatting with consistent style
- **Markdown-Lint** - Documentation formatting compliance
- **Husky** - Pre-commit hooks for code quality enforcement
- **TypeScript Strict Mode** - Enhanced type checking and null safety

### Container Development Tools

- **Docker Engine** - Container runtime and management
- **Docker Compose** - Multi-service orchestration
- **Dev Container Configuration** - VS Code integration with `.devcontainer/`
- **Security Scanning** - Container vulnerability validation
- **Non-root User Configuration** - Security best practices (UID 1000)

## AI Agent Dependencies

### Memory Bank System

- **Stateful Documentation** - Persistent context across development sessions
- **Cross-File Dependencies** - Comprehensive dependency tracking
- **Self-Documentation Protocol** - Automatic context preservation
- **Memory Reset Resilience** - Complete project understanding from documentation
- **Markdown-Lint Compliance** - Strict formatting standards for all files

### Three AI Agent Ecosystem

- **Cline AI** - Primary development agent (`.clinerules/main-rules.md`)
- **Codex CLI** - Terminal automation and orchestration (`AGENTS.md`)
- **VS Code Copilot** - Code generation (`.github/copilot-instructions.md`)
- **Cross-Agent Workflows** - Sophisticated collaboration patterns
- **Stateful Collaboration** - Memory bank integration across all agents

### Instruction & Prompt Framework

- **26 Instruction Files** - Automated coding standards in `.github/instructions/`
- **27 Prompt Files** - Executable workflow templates in `.github/prompts/`
- **Conditional Architecture** - Runtime decision frameworks
- **Parameter-Driven Configuration** - ENV_MODE and similar runtime selection
- **Quality Assurance Standards** - Comprehensive validation and testing patterns

## Cross-References and Relationships

### Memory Bank File Hierarchy

```
projectbrief.md (foundation)
├── productContext.md (purpose & goals)
├── systemPatterns.md (architecture & decisions)
├── techContext.md (technologies & constraints)
└── activeContext.md (current state)
    └── progress.md (achievements & status)
        └── dependencies.md (this file)
```

### AI Agent Collaboration Flow

```
User Request → AI Agent (Cline/Codex/Copilot)
├── Reads: Memory Bank files (mandatory at session start)
├── Applies: Instruction files for coding standards
├── Executes: Prompt files for workflow automation
├── Updates: Memory Bank with architectural decisions
└── Maintains: Cross-session context preservation
```

### Conditional Environment Integration

```
ENV_MODE Parameter Selection
├── local: Host virtual environment
│   ├── Dependencies: Python 3.13, pip, virtualenv
│   └── Generated: .venv/, requirements.txt, local README
├── docker_isolated: Fully containerized
│   ├── Dependencies: Docker Engine, custom image
│   └── Generated: Dockerfile, .dockerignore, isolated README
└── docker_volume: Container + live editing
    ├── Dependencies: Docker Compose, volume mounting
    └── Generated: docker-compose.yml, volume README
```

## Historical Changes Archive

### [2025-07-14] Microsoft Edge DevTools Integration

**Rationale:** Comprehensive Edge DevTools debugging with protocol compliance restoration and CSS variables solution.
**Technical Implementation:** Complete VS Code configuration, launch setups for debugging/mobile/performance analysis, CSS variables pattern for no-inline-styles compliance.
**Impact:** Professional web debugging with mobile testing and security best practices.

### [2025-07-13] README Drift Resolution

**Rationale:** Synchronized documentation between instruction files, prompt files, and main README to accurately represent workspace sophistication.
**Technical Implementation:** Analysis of 26 instruction files and 27 prompt files, complete README reconstruction reflecting AI agent ecosystem.
**Impact:** Proper workspace representation for AI agents and developers.

### [2025-07-20] Native Fetch API Conversion

**Rationale:** Modernized HTTP client using Node.js 22 native fetch for performance and reduced dependencies.
**Technical Implementation:** Complete conversion from node-fetch, updated TypeScript types, modified test mocking strategies.
**Impact:** Zero regression with 259 tests passing, improved performance characteristics.

### [2025-07-06] Test Suite Achievement

**Rationale:** Comprehensive test coverage with production-ready patterns and proper isolation.
**Technical Implementation:** Module-level mocking, AuthManager isolation, edge case coverage, timeout resolution.
**Impact:** 98.34% branch coverage, robust foundation for ongoing development.

### [2025-07-01] Codex Universal Environment

**Rationale:** Standardized Docker development environment with OpenAI API integration.
**Technical Implementation:** Volume-based development, multi-service orchestration, health monitoring.
**Impact:** Consistent development across platforms and AI agents.

### [2025-02-06] Conditional Python Framework

**Rationale:** Runtime environment selection without hard-coded implementation choices.
**Technical Implementation:** Parameter-driven scripts, mode-specific configurations, comprehensive documentation generation.
**Impact:** Revolutionary approach to environment management with AI agent compatibility.

## Dependencies and Relationships

- **Depends On:** [projectbrief.md](./projectbrief.md), [systemPatterns.md](./systemPatterns.md), [techContext.md](./techContext.md)
- **Required By:** All AI agents, development workflows, automation scripts, instruction files, prompt files
- **Why This Order:** Dependencies must be documented before implementation to ensure proper integration and impact analysis
- **Impact Analysis:** Changes to dependencies affect the entire AI Agent Framework, development workflows, and cross-session context preservation

## Call to Action

> **All agents and contributors must review, update, and self-regulate this file as dependencies evolve.**  
> **Do not add new dependencies without documenting them here and their relationships.**  
> **Update this file immediately upon any change in project dependencies, tools, or integration points.**  
> **Maintain strict markdown-lint compliance and proper cross-referencing at all times.**

## AI Agent Instructions

This project supports three AI agents with specific dependency management responsibilities:

- **Cline AI** → Updates `.clinerules/` dependencies and learning protocols
- **Codex CLI** → Updates `AGENTS.md` context and script dependencies
- **VS Code Copilot** → Updates `.github/copilot-instructions.md` and instruction files

**All agents must maintain dependency tracking in this file and ensure cross-references remain accurate.**

**For meta-configuration standards, consult [when-to-use-what-matrix.instructions.md](../.github/instructions/when-to-use-what-matrix.instructions.md) for authoritative mapping of integration goals to configuration files.**

---

**Last Updated:** 2025-07-18 | **Status:** Production-Ready Dependencies | **Coverage:** 98.34%

**Rationale:** Enables local development environment matching Codex cloud setup with Node.js 22 and Python 3.13 using volume-based workflows.
**Depends On:** Docker Engine, OpenAI API access, project structure standards
**Required By:** All development workflows, AI agent environments, testing procedures
**Impact Analysis:** Provides consistent development environment across all platforms and agents, eliminates environment-specific issues.

#### Dependency: Conditional Python Environment Framework (2025-02-06)

**Rationale:** Enables runtime selection of environment via ENV_MODE.
**Depends On:** projectbrief.md, systemPatterns.md, techContext.md
**Required By:** scripts/setup_python_env.sh and related scripts
**Impact Analysis:** Provides flexible environments without hard-coded assumptions.

## Purpose

This file tracks all project dependencies, their relationships, and integration points. It serves as a comprehensive dependency map for any project, enabling proper management and coordination between components.

## Structure

- **Core Dependencies:** Essential project dependencies and their purposes.

- **Development Dependencies:** Tools and utilities for development workflow.

- **AI Agent Dependencies:** Files and systems required for AI agent collaboration.

- **Cross-References:** How dependencies relate to each other and to Memory Bank files.

- **Call to Action:** Instructions for agents to update and self-regulate this file.

---

## Core Dependencies

### Conditional Python Environment Framework

- **Python 3.11+**: Core language runtime (for local mode)

- **pip**: Package management for all Python modes

- **virtualenv**: Local virtual environment creation (local mode)

- **Docker Engine**: Container runtime (docker_isolated, docker_volume modes)

- **Docker Compose**: Multi-container orchestration (docker_volume mode, optional)

- **Parameter System**: ENV_MODE runtime decision framework
  - `local` - Host-based virtual environment

  - `docker_isolated` - Fully containerized with no host dependencies

  - `docker_volume` - Containerized with live host file mounting

### Codex Universal Docker Environment

- **Docker Engine**: Container runtime and management
- **Codex Universal Image**: `ghcr.io/openai/codex-universal:latest` - Pre-configured development environment
- **OpenAI API Access**: Required for API functionality within containers
- **Volume Management**: Named volumes for dependencies, bind mounts for source code
- **Network Configuration**: Custom bridge networks for service isolation
- **Environment Variables**: Python 3.13, Node.js 22, API keys, paths
- **Health Monitoring**: Container health checks and service validation

### Docker and Containerization

- **Docker Engine**: Container runtime and management

- **Docker Compose**: Multi-container orchestration

- **Container Images**: Base images for development and production
  - `python:3.11-slim` - Minimal Python runtime for Docker modes

  - `node:18-alpine` - Minimal Node.js runtime

  - `postgres:14-alpine` - PostgreSQL database

  - `redis:7-alpine` - Redis cache/message broker

- **Container Registries**: Image storage and distribution

### AI Agent Framework

- **Memory Bank System**: Cross-referencing and documentation framework

- **Prompt Files**: Executable workflow templates in `.github/prompts/`

- **Instruction Files**: Coding standards and guidelines in `.github/instructions/`

- **Script System**: Automation tools in `scripts/` directory

- **Genesis Boot-Phase Script**: Checks Node dependencies, container state, and Git repo

### Project Structure Dependencies

- **TypeScript Runtime**: Core language support in `src/`

- **Python Environment**: Conditional module support in `python/`

- **Jupyter Notebooks**: Research and analysis in `notebooks/`

- **Shell Scripts**: Automation and setup in `scripts/`

- **Web Framework**: Next.js application in `web/` (when applicable)

- **Prisma ORM**: Database schema and client under `web/prisma/`

- **PostgreSQL Database**: Service defined in `docker-compose.yml`

## Development Dependencies

### Conditional Python Environment System

- **Runtime Parameter System**:
  - `ENV_MODE` - Primary mode selector (local, docker_isolated, docker_volume)

  - `PYTHON_VERSION` - Python version specification (default: 3.11)

  - `PROJECT_NAME` - Container/project naming (default: my-python-app)

### Codex Universal Environment Scripts

- **Runtime Management Scripts**:
  - `scripts/setup_codex_universal.sh` - Complete environment setup and configuration
  - `scripts/codex_start.sh` - Start Docker Compose environment with validation
  - `scripts/codex_stop.sh` - Clean environment shutdown
  - `scripts/codex_shell.sh` - Interactive container shell access
  - `scripts/codex_rebuild.sh` - Update and restart with latest image
  - `scripts/codex_run.sh` - Quick single-container development run
  - `scripts/codex_test.sh` - Environment validation and verification

- **Configuration Management**:
  - `docker-compose.codex.yml` - Complete orchestration configuration
  - `.dockerignore` - Optimized build context exclusions
  - `.codex/config.json` - Codex-specific environment settings
  - `.codex/docker.md` - Comprehensive documentation and troubleshooting

- **Generated Artifacts** (script-dependent):
  - `docker-compose.codex.yml` - Service orchestration configuration
  - Convenience scripts for environment management
  - `.dockerignore` file optimized for development
  - Updated `.codex/instructions.md` with Docker environment information

### Mode-Specific Scripts

- `scripts/setup_python_env.sh` - Main entry point with parameter routing

- `scripts/setup_python_local.sh` - Local virtual environment setup

- `scripts/setup_python_docker_isolated.sh` - Isolated Docker environment

- `scripts/setup_python_docker_volume.sh` - Volume-mounted Docker environment

- **Generated Artifacts** (mode-dependent):
  - `python/requirements.txt` - Python dependencies (all modes)

  - `python/.env.example` - Environment variable template (all modes)

  - `python/.venv/` - Virtual environment (local mode only)

  - `python/Dockerfile` - Container definition (Docker modes only)

  - `python/docker-compose.yml` - Orchestration (docker_volume mode, if compose available)

  - `python/.dockerignore` - Build context exclusions (Docker modes only)

  - `python/README.md` - Mode-specific documentation (generated per mode)

### Docker Workflow Dependencies

- **Dockerfile Variants**:
  - `Dockerfile.dev` - Development container configuration

  - `Dockerfile.prod` - Production-optimized multi-stage build

- **Docker Compose Configurations**:
  - `docker-compose.yml` - Base orchestration

  - `docker-compose.override.yml` - Development overrides

- **Dev Container Configuration**:
  - `.devcontainer/devcontainer.json` - VS Code integration

  - `.devcontainer/docker-compose.yml` - Dev container orchestration

### Security and Compliance

- **Vulnerability Scanning**: Container security validation

- **Non-root User Configuration**: Security best practices (UID 1000 for volume mounts)

- **Minimal Base Images**: Attack surface reduction

- **Secret Management**: Secure configuration handling via .env files

## AI Agent Dependencies

### Prompt Files (`.github/prompts/`)

### Prompt Files (`.github/prompts/`)

- **codex-universal-environment.prompt.md**: Comprehensive Docker environment management
  - **Depends On**: `memory-bank/docker-workflow.md`, Docker environment instruction files
  - **Required By**: Docker environment setup workflows, container orchestration
  - **Integration**: Codex Universal image with Node.js 22 and Python 3.13, volume-based development

- **python-environment-setup.prompt.md**: Python environment mode selection and setup
  - **Depends On**: `memory-bank/docker-workflow.md`, conditional instruction files

  - **Required By**: Python environment setup workflows, mode selection

  - **Integration**: Three-mode conditional system, runtime parameter selection

- **docker-exotic-generator.prompt.md**: Advanced Docker configuration generation
  - **Depends On**: `memory-bank/docker-workflow.md`, instruction files

  - **Required By**: Container setup workflows, multi-environment deployments

  - **Integration**: Four-phase Docker workflow, exotic pattern implementation

- **docker-consolidated-template.prompt.md**: Consolidated Docker workflow template
  - **Depends On**: Validated four-phase approach, security best practices

  - **Required By**: Standardized Docker implementations across all AI agents

  - **Integration**: Simplified template following consolidated recommendations from external agent evaluation

- **docker-modular-workflow.prompt.md**: Modular Docker build/run workflow generator
  - **Depends On**: Modular development patterns, volume mounting strategies

  - **Required By**: Development workflows requiring build/run separation

  - **Integration**: Volume-first development, CLI parameterization, multi-service orchestration

- **notebook-development-workflow.prompt.md**: Comprehensive notebook development workflow automation
  - **Depends On**: VS Code Notebook API, python-notebook-standards.instructions.md, vscode-notebook-integration.instructions.md
  - **Required By**: Jupyter notebook development, data science workflows, ML experimentation
  - **Integration**: VS Code extended capabilities, notebook-specialist chat mode, memory bank synchronization

### Instruction Files (`.github/instructions/`)

### Instruction Files (`.github/instructions/`)

- **docker-environment.instructions.md**: Comprehensive Docker environment standards
  - **Depends On**: `memory-bank/docker-workflow.md`, container security best practices
  - **Required By**: All Docker environment operations, container management
  - **ApplyTo**: `**/docker-compose*.yml,**/Dockerfile*,scripts/codex_*.sh,scripts/setup_codex_universal.sh`
  - **Integration**: Codex Universal environment, OpenAI API integration, volume-based development

- **python-environment-conditional.instructions.md**: Conditional Python setup standards
  - **Depends On**: `memory-bank/systemPatterns.md`, Docker workflow patterns

  - **Required By**: All Python environment setup operations

  - **Parameters**: ENV_MODE, PYTHON_VERSION, PROJECT_NAME

  - **Integration**: Three AI agents (Cline AI, Codex CLI, VS Code Copilot)

- **typescript-standards.instructions.md**: TypeScript coding standards

- **python-standards.instructions.md**: Python coding guidelines

- **file-organization.instructions.md**: Project structure standards

- **no_dummy-no_placeholders.instruction.md**: Real configuration requirements

- **vscode-notebook-integration.instructions.md**: VS Code notebook API integration standards
  - **Depends On**: VS Code Notebook API, Jupyter extension, python-notebook-standards.instructions.md
  - **Required By**: All notebook development workflows, VS Code notebook optimization
  - **ApplyTo**: `**/*.ipynb`
  - **Integration**: VS Code extended capabilities, custom commands, notebook automation

### Memory Bank Files

- **docker-workflow.md**: Enhanced four-phase containerization workflow
  - **Depends On**: `systemPatterns.md`, `techContext.md`, `projectbrief.md`

  - **Required By**: Docker prompt files, container automation scripts

  - **Integration**: AI agent collaboration, exotic pattern documentation

## Cross-References and Relationships

### Conditional Python Environment Integration

```
.github/instructions/python-environment-conditional.instructions.md
├── Defines: Three-mode conditional setup (local, docker_isolated, docker_volume)
├── Parameters: ENV_MODE, PYTHON_VERSION, PROJECT_NAME
├── Integrates: AI agent collaboration patterns
└── Enables: .github/prompts/python-environment-setup.prompt.md
    ├── Presents: Mode selection to users
    ├── Routes: scripts/setup_python_env.sh
    ├── Generates: Mode-specific configurations and documentation
    └── Updates: memory-bank/dependencies.md (this file)
```

### Script Dependency Flow

```
scripts/setup_python_env.sh (main entry)
├── Validates: ENV_MODE parameter
├── Routes to mode-specific scripts:
│   ├── scripts/setup_python_local.sh (ENV_MODE=local)
│   ├── scripts/setup_python_docker_isolated.sh (ENV_MODE=docker_isolated)
│   └── scripts/setup_python_docker_volume.sh (ENV_MODE=docker_volume)
├── Generates: .env.example, .gitignore updates
└── Reports: Next steps and activation instructions
```

### AI Agent Collaboration Flow

```
User Request → GitHub Copilot/Cline AI/Codex CLI
├── Reads: .github/prompts/python-environment-setup.prompt.md
├── Applies: .github/instructions/python-environment-conditional.instructions.md
├── References: memory-bank/docker-workflow.md (for Docker modes)
├── Executes: scripts/setup_python_env.sh with chosen ENV_MODE
├── Generates: Mode-specific configurations and documentation
└── Updates: Memory Bank documentation per Self-Documentation Protocol
```

### Project Structure Dependencies

```
Project Root
├── src/ (TypeScript) → Containerized in Docker
├── python/ (Python) → Conditional environment setup
│   ├── .venv/ (local mode only)
│   ├── Dockerfile (Docker modes only)
│   ├── docker-compose.yml (docker_volume mode, optional)
│   ├── requirements.txt (all modes)
│   ├── .env.example (all modes)
│   └── README.md (mode-specific, generated)
├── web/ (Next.js) → Containerized in Docker
├── scripts/ → Conditional automation
├── memory-bank/ → Documentation and context
└── .github/
    ├── prompts/ → Workflow automation
    └── instructions/ → Conditional coding standards
```

## Dependencies and Relationships

- **Depends On**: projectbrief.md (project scope), systemPatterns.md (architecture), techContext.md (technical context)

- **Required By**: All AI agents, prompt files, instruction files, automation scripts

- **Why This Order**: Dependencies must be documented before implementation to ensure proper integration

- **Impact Analysis**: Changes to dependencies affect entire AI Agent Framework and development workflow

## Recent Additions

### Conditional Python Environment Framework

- **Added**: Complete conditional framework replacing hard-coded Python setup
  - `python-environment-conditional.instructions.md` - Parameter-driven conditional instructions

  - `python-environment-setup.prompt.md` - User-facing mode selection prompt

  - `setup_python_env.sh` - Main entry script with parameter routing

  - `setup_python_local.sh` - Enhanced local virtual environment setup

  - `setup_python_docker_isolated.sh` - Fully isolated Docker environment

  - `setup_python_docker_volume.sh` - Volume-mounted Docker with live editing

- **Parameter System**: ENV_MODE runtime decision framework
  - Defers implementation choices to script execution time

  - Supports switching between modes without rebuilding project structure

  - Generates mode-appropriate documentation and configurations

- **Integration**: Three AI agent collaboration with conditional logic
  - VS Code Copilot applies conditional instructions via `applyTo: "python/**"`

  - Cline AI follows `.clinerules/` protocols for conditional setup

  - Codex CLI executes script-driven conditional automation

### AI Agent Framework Enhancement

- **Improved**: Cross-referencing between prompt files and Memory Bank

- **Added**: Parametric input system for dynamic configuration generation

- **Enhanced**: Quality assurance checklists for all environment modes

- **Integration**: VS Code Copilot, Cline AI, and Codex CLI collaboration

### Web Application Stack

- **Added**: Next.js application scaffolded via `setup_web_env.sh`

- **Added**: PostgreSQL and Prisma setup via `setup_db_prisma.sh`

- **Impact**: Enables full-stack TypeScript and Python interoperability

### Testing Infrastructure

#### Jest with TypeScript Path Aliases (2025-06-22)

**Rationale:** Enables clean import paths using @/ alias for src/ directory in tests, improving maintainability and following modern TypeScript practices.
**Depends On:** tsconfig.json baseUrl and paths configuration, TypeScript standards from .github/instructions/
**Required By:** All test files in src/tests/ directory structure
**Impact Analysis:** Enables mirrored directory structure in tests with clean imports, supporting comprehensive test coverage goals.

- **Jest Configuration**: Updated to support @/ path aliases and focused test discovery
- **TypeScript Config**: Added baseUrl and paths mapping for @/_ to src/_
- **Test Structure**: Mirrored src/ folder structure in src/tests/ for organized testing
- **Coverage Goals**: Targeting full coverage except src/types/ (saved for last as requested)

## Call to Action

> **All agents and contributors must review, update, and self-regulate this file as dependencies evolve.**  
> **Do not add new dependencies without documenting them here and their relationships.**  
> **Update this file immediately upon any change in project dependencies, tools, or integration points.**

## AI Agent Instructions

This project supports three AI agents with specific dependency management responsibilities:

- **Cline AI** → Updates `.clinerules/` dependencies and learning protocols

- **Codex CLI** → Updates `AGENTS.md` context and script dependencies

- **VS Code Copilot** → Updates `.github/copilot-instructions.md` and instruction files

**All agents must maintain dependency tracking in this file and ensure cross-references remain accurate.**

**Meta-Configuration & Manifest Standards:**

All agents must consult the [when-to-use-what-matrix.instructions.md](../.github/instructions/when-to-use-what-matrix.instructions.md) for a one-page mapping of integration goals to configuration files and authoritative sources. For detailed implementation, see `.github/instructions/README.md` and `.github/prompts/README.md`.

**UI Theming Standards:**
All agents must consult the [theme-ui-meta.instructions.md](../.github/instructions/theme-ui-meta.instructions.md) for detailed theming meta tag standards and the [theme-ui-meta.prompt.md](../.github/prompts/theme-ui-meta.prompt.md) for workflow automation. These files cover syntax, validation, and platform-specific quirks for `theme-color`, `color-scheme`, and related tags.

---

**Last Updated**: 2025-02-06 (Conditional Python environment framework implementation)  
**Status**: Active tracking of conditional framework and AI Agent Framework dependencies  
**Next Review**: After testing conditional framework and extending to other language environments
