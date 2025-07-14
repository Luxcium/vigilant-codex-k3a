#### Dependency: Microsoft Edge DevTools Integration and CSS Variables Solution (2025-07-14)

**Rationale:** Comprehensive Edge DevTools debugging capabilities with protocol compliance restoration and CSS variables solution for no-inline-styles warning resolution.
**Depends On:** Microsoft Edge DevTools VS Code Extension (ms-edgedevtools.vscode-edge-devtools), Microsoft Edge browser, Next.js development environment, TypeScript source maps
**Required By:** Web development debugging workflows, mobile testing, performance analysis, CSS styling without inline styles violations
**Technical Implementation:**

- Complete edge-devtools-debugging.instructions.md creation following strict protocol requirements in .github/instructions/
- Comprehensive VS Code settings configuration with Edge DevTools extension settings, warning controls, and panel management
- Individual launch configurations for standard debugging, headless mode, mobile emulation, attach mode, and direct DevTools access
- Compound debugging workflows for complete web development, mobile testing, performance analysis, and headless testing
- CSS variables solution implementation using `style={{ '--dynamic-color': value }}` with CSS classes containing `var(--custom-property, fallback)`
- ESLint configuration updates to support CSS variables pattern while maintaining code quality standards
- User data directory isolation with proper browser arguments and security configurations for development-only usage
- Path mapping and source map configuration for Next.js projects with TypeScript support
**Resolution Results:** No-inline-styles warning completely resolved through CSS variables pattern, comprehensive debugging environment established, protocol compliance restored
**Target Configuration Achievements:** Complete Edge DevTools integration with mobile testing, performance analysis, and automated testing capabilities
**Impact Analysis:** Enables professional web development debugging with CSS styling compliance, mobile testing capabilities, and comprehensive performance analysis while maintaining strict protocol adherence and security best practices.

#### Dependency: README Drift Resolution and Documentation Synchronization (2025-07-13)

**Rationale:** Resolve significant documentation drift between README files and ensure accurate representation of the sophisticated Vigilant Codex K3a polyvalent AI development workspace.
 **Depends On:** 25 instruction files analysis, 27 prompt files inventory, Memory Bank system understanding, AI agent ecosystem comprehension
**Required By:** All AI agent operations, developer onboarding, workspace understanding, future development workflows
**Technical Implementation:**

 Systematic analysis of all 25 instruction files in .github/instructions/ covering AI framework, environments, languages, web standards, and quality assurance
- Complete inventory of all 27 prompt files in .github/prompts/ organized by template management, environment setup, development workflows, and web standards
- Reconstruction of .github/instructions/README.md with proper categorization and cross-references for sophisticated instruction ecosystem
- Reconstruction of .github/prompts/README.md with comprehensive workflow automation documentation and usage patterns
- Complete overhaul of main README.md to represent true workspace sophistication including polyvalent architecture, AI agent collaboration, native fetch achievements, conditional environments, and Memory Bank statefulness
- Memory Bank synchronization reflecting README resolution process and current project capabilities
  **Resolution Results:** All README files now accurately represent workspace as sophisticated AI development environment with advanced multi-language architecture, comprehensive testing (259 tests, 98.34% coverage), stateful AI collaboration, and automated workflow execution
  **Impact Analysis:** Ensures AI agents and human developers immediately understand workspace's true capabilities for rapid, robust application development across TypeScript, Python, Next.js, Docker, and Jupyter notebooks with sophisticated AI agent integration and persistent context management.

#### Dependency: Native Fetch API Conversion (2025-07-20)

**Rationale:** Modernize HTTP client implementation using native Node.js 22 fetch API for improved performance, reduced dependencies, and future compatibility.
**Depends On:** Node.js 22 native fetch support, TypeScript 5.7 native Response types, Vitest test runner global stubbing
**Required By:** All HTTP client operations, API testing, rate limiting, authentication workflows
**Technical Implementation:**

- Complete conversion from node-fetch package to native fetch API
- Updated import statements throughout src/errors/smartFetch.ts, toError.ts, handle.ts, and src/http/restClient.ts
- Changed type annotations from FetchResponse to native Response interface
- Modified test mocking from vi.mock('node-fetch') to vi.stubGlobal('fetch', mockFetch)
- Recreated src/tests/restClient.test.ts and updated src/tests/error.test.ts
  **Conversion Results:** Zero regression with all 259 tests passing, improved performance characteristics, eliminated external dependency
  **Target File Achievements:** Complete API compatibility maintained while modernizing HTTP client architecture
  **Impact Analysis:** Provides cleaner dependency tree, better long-term maintenance, and leverages native Node.js capabilities for HTTP operations.

#### Dependency: Comprehensive Test Suite with 98.34% Branch Coverage (2025-07-06)

**Rationale:** Complete test suite resolution with production-ready coverage patterns and proper mocking strategies.
**Depends On:** Vitest test runner, vi.mock module mocking, Istanbul coverage provider, Node-fetch HTTP library
**Required By:** All development workflows, CI/CD pipelines, code quality assurance
**Technical Implementation:**

- Module-level mocking with `vi.mock('node-fetch')` for HTTP client tests
- AuthManager mocking for client tests to avoid authentication requirements
- Timeout resolution by removing problematic fake timers in rate limiting tests
- Edge case coverage including NaN handling, error responses, and refill logic
  **Coverage Results:** 259 tests passing (up from 248 with 3 failures), 98.34% branch coverage
  **Target File Achievements:** webStorage.ts 100%, tokenBucket.ts 100%, restClient.ts 96.15%, QuestradeClient.ts 87.5%
  **Impact Analysis:** Provides robust foundation for ongoing development with comprehensive test isolation and realistic scenarios.

#### Dependency: Notebook Specialist Chat Mode and Integration (2025-07-10)

**Rationale:** Comprehensive Jupyter notebook development support with full VS Code integration, leveraging extended capabilities for enhanced data science workflows.
**Depends On:** VS Code Notebook API, Jupyter extension, Python environment framework, established project standards
**Required By:** Data science workflows, ML model development, research documentation, notebook-based analysis
**Technical Implementation:**

- notebook-specialist.chatmode.md - Comprehensive chat mode with notebook development, VS Code integration, and ML workflow support
- vscode-notebook-integration.instructions.md - VS Code notebook API integration standards and configuration
- notebook-development-workflow.prompt.md - Automated workflow for notebook creation, optimization, and management
- Integration with python-notebook-standards.instructions.md for consistent quality standards
- Memory bank integration for progress tracking and dependency management
  **Integration Results:** Full VS Code notebook API utilization, custom command support, automated workflow management, ML experiment tracking
  **Target Capabilities:** Advanced cell execution control, custom renderers, performance profiling, reproducible research workflows
  **Impact Analysis:** Enables sophisticated notebook development with VS Code extended capabilities while maintaining project standards and memory bank protocols.

# dependencies.md

<!-- markdownlint-disable MD013 MD012 MD022 MD032 MD024 MD040 MD001 -->

#### Dependency: Codex Universal Docker Environment (2025-07-01)

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
