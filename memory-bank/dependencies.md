# dependencies.md

<!-- markdownlint-disable MD013 MD012 MD022 MD032 MD024 MD040 MD001 -->


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
- **Zod Validation Library**: Runtime data validation for TypeScript types
- **PostgreSQL Database**: Service defined in `docker-compose.yml`


## Development Dependencies


### Conditional Python Environment System


- **Runtime Parameter System**:

  - `ENV_MODE` - Primary mode selector (local, docker_isolated, docker_volume)

  - `PYTHON_VERSION` - Python version specification (default: 3.11)

  - `PROJECT_NAME` - Container/project naming (default: my-python-app)

- **Mode-Specific Scripts**:

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


### Instruction Files (`.github/instructions/`)


- **python-environment-conditional.instructions.md**: Conditional Python setup standards

  - **Depends On**: `memory-bank/systemPatterns.md`, Docker workflow patterns

  - **Required By**: All Python environment setup operations

  - **Parameters**: ENV_MODE, PYTHON_VERSION, PROJECT_NAME

  - **Integration**: Three AI agents (Cline AI, Codex CLI, VS Code Copilot)

- **typescript-standards.instructions.md**: TypeScript coding standards

- **python-standards.instructions.md**: Python coding guidelines

- **file-organization.instructions.md**: Project structure standards

- **no_dummy-no_placeholders.instruction.md**: Real configuration requirements


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


---

**Last Updated**: 2025-02-06 (Conditional Python environment framework implementation)  
**Status**: Active tracking of conditional framework and AI Agent Framework dependencies  
**Next Review**: After testing conditional framework and extending to other language environments
