# Get Current Date/Time Task

## Task: Get Current Date/Time

**Purpose:**
Provides the current date and time in ISO 8601 format for timestamping and logging, as required by the Self-Documentation Protocol and other workflows.

**Command:**

```bash
date --iso-8601=seconds
```

**Usage:**

- Use this task whenever a current timestamp is needed for logging or documentation.
- Reference this task in all instructions and documentation instead of using the raw command directly.

**Referenced By:**

- `memory-bank/instructions/self-documentation.instructions.md`

**Last Updated:** 2025-08-03

# `scripts/` Directory

This folder contains utility scripts for setting up, validating, and maintaining the repository.

## Script Optimization and Maintenance Protocol ⚡ **ONGOING EFFORT**

**CRITICAL MANDATE**: All scripts must be continuously optimized, consolidated, and maintained with the following principles:

### Script Consolidation Strategy

- **Target**: Continuously reduce script quantity while maintaining full functionality
- **Method**: Strategic consolidation, parameter-driven interfaces, elimination of redundancy
- **Achievement**: Recently reduced from 41 scripts to 22 scripts (46% reduction)
- **Goal**: Continue optimization through monthly reviews and usage pattern analysis

### Documentation Standards (MANDATORY)

- **Header Format**: 10-line standardized header with script name, aim, purpose, decision rationale, usage, dependencies, last updated, references
- **Inline Documentation**: Critical sections documented throughout with purpose-driven comments
- **Validation Status**: Every script ends with `#? Validation Status: Actively Validated on [DATE]`
- **README Synchronization**: This file MUST be updated whenever scripts are added, modified, or removed

### Maintenance Requirements

- **Monthly Reviews**: Analyze usage patterns and identify consolidation opportunities
- **Flow Optimization**: Remove redundant operations and streamline logic
- **Dependency Reduction**: Minimize external and cross-script dependencies
- **Soul Preservation**: Maintain comprehensive documentation that preserves script intent and rationale
- **Automated Checks**: Header format compliance and README synchronization validation

Every `.sh` file must start with comments describing its aim and purpose.
Whenever a script is added or modified, update this README to keep the script index current.

**All scripts must pass strict markdown-lint on any Markdown they generate or update.**
Every script must start with a comment header describing its aim, purpose, and decision rationale.
When a script is created or modified, update this README with a brief description of the change and remove or merge duplicate functionality.

## Script Documentation Protocol

1. Every script must contain internal comments explaining its aim, purpose, and decision process.
2. Whenever a script is added or modified, update this `scripts/README.md` with a concise description.
3. AI agents must keep this file synchronized autonomously with the actual scripts directory.

**Self-Documentation Protocol**: Whenever a script is added or modified, update this README accordingly. Each `.sh` file must begin with comments describing its aim, purpose, and decision rationale. Detect and consolidate duplicate scripts whenever possible.

## Consolidated Script Structure (23 Scripts)

**Reduced from 41 to 22 scripts (46% reduction) on 2025-07-23; now 23 with internal local-ci orchestration (no external cost) added on 2025-08-08**

### Environment Setup Scripts (6 scripts)

#### Python Environment

- `setup_python_env.sh` - **Master Python environment setup with mode selection**
  - Usage: `./setup_python_env.sh --mode [local|docker_isolated|docker_volume|venv_only]`
  - Consolidates functionality from 5 previous scripts
  - Supports all Python deployment modes with unified interface
- `setup_python_docker.sh` - Advanced Docker Python features
- `setup_python_local.sh` - Advanced local Python optimizations

#### Web Development

- `setup_web_dev_environment.sh` - Complete web development setup
- `activate_web_dev_environment.sh` - Quick web environment activation

#### Project Initialization

- `setup_project.sh` - Master project initialization with type selection

### Docker Lifecycle Scripts (7 scripts)

- `setup_codex_universal.sh` - Complete Codex Universal Docker setup
- `codex_start.sh` - Start Docker Compose environment
- `codex_stop.sh` - Stop environment
- `codex_shell.sh` - Enter container shell
- `codex_rebuild.sh` - Rebuild and restart with latest image
- `codex_test.sh` - Test environment and verify API key availability
- `run_codex_cli.sh` - Quick single-container run for testing

### TypeScript/SDK Setup Scripts (2 scripts)

- `setup_ts_sdk.sh` - **Master TypeScript/SDK setup with module selection**
  - Usage: `./setup_ts_sdk.sh --module [questrade-core|questrade-types|agent-framework|agent-system|api-error|helpers|all]`
  - Consolidates functionality from 6 previous scripts
  - Supports modular SDK component setup
- `setup_db_prisma.sh` - Database setup and configuration

### Validation & Quality Scripts (5 scripts)

- `verify-all.sh` - **Master validation script with selective checking**
  - Usage: `./verify-all.sh [--check dependencies|markdown|instructions|prompts|tests] [--analyze tests]`
  - Consolidates functionality from 5 previous validation scripts
  - Comprehensive repository validation suite
- `check-memory-bank.sh` - Memory bank specific validation
- `check-readme-counts.sh` - Validates README AI Framework Components counts stay in sync with instruction/prompt inventories
 - `local-ci.sh` - **Full local CI pipeline (install, typecheck, lint, test, coverage, docs)** replacing removed GitHub Actions workflow to cut costs
   - Usage: `./scripts/local-ci.sh [--fast] [--skip stage]`
   - Mirrors former `.github/workflows/ci.yml` stages entirely locally
   - Eliminates remote CI usage cost; adjustable stages for rapid iteration
 - `commit-guard.sh` - **Hook-executed validation gate** (fast local-ci subset, override with `FORCE_COMMIT=1`)
 - `install-hooks.sh` - Installs git hooks (pre-commit, pre-push, commit-msg) calling `commit-guard.sh`

#### Markdown Linting and Formatting

- `check-markdown.sh` - Lint and format all markdown and custom agent files
  - Usage: `./check-markdown.sh`
  - Steps:
    1. Run Prettier: `npx prettier --write "**/*.chatmode.md" "**/*.prompt.md" "**/*.instructions.md"`
    2. Run markdownlint: `markdownlint --config .markdownlint.yaml "**/*.md" "**/*.chatmode.md" "**/*.prompt.md" "**/*.instructions.md"`
  - Ensures all documentation and agent files are consistently formatted and linted

### Code Generation Scripts (2 scripts)

- `generate-instruction-file.sh` - Generate AI instruction files
- `generate-prompt-file.sh` - Generate AI prompt files

### Development Tools Scripts (3 scripts)

- `browser-error-monitor.sh` - Monitor and report browser errors
- `make-scripts-executable.sh` - Ensure all scripts have execute permissions
- `autonomous-state-manager.sh` - **Development state management with automation**
  - Consolidates functionality from 2 previous scripts

## Archived Scripts

**Moved to `scripts/archives/` directory:**

- `setup_python_docker_isolated.sh` → `setup_python_env.sh --mode docker_isolated`
- `setup_python_docker_volume.sh` → `setup_python_env.sh --mode docker_volume`

Additional archived scripts:

- `setup_questrade_sdk_core.sh` → `setup_ts_sdk.sh --module questrade-core`
- `setup_questrade_types.sh` → `setup_ts_sdk.sh --module questrade-types`
- `setup_agent_framework.sh` → `setup_ts_sdk.sh --module agent-framework`
- `setup_agent_system.sh` → `setup_ts_sdk.sh --module agent-system`
- `setup_api_error.sh` → `setup_ts_sdk.sh --module api-error`
- `setup_helpers.sh` → `setup_ts_sdk.sh --module helpers`
- `check-dependencies.sh` → `verify-all.sh --check dependencies`
- `check-markdown.sh` → `verify-all.sh --check markdown`
- `validate-instructions.sh` → `verify-all.sh --check instructions`
- `validate-prompt.sh` → `verify-all.sh --check prompts`

See `scripts/archives/ARCHIVED_SCRIPTS.md` for complete consolidation details.

## Sandboxed Script Execution

Use these wrappers to run any script without side effects:

- `scripts/sandbox_docker_run.sh`: Runs a script inside Docker with `--network=none`, the repo mounted read‑only at `/repo`, and a writable workspace at `/work`. It invokes our inner sandbox to mock networked tools and keep outputs contained.
  - Example: `bash scripts/sandbox_docker_run.sh scripts/setup_web_env.sh`
  - Keep outputs for inspection: `SANDBOX_KEEP=1 bash scripts/sandbox_docker_run.sh scripts/setup_questrade_types.sh`
  - Disable mocks for real runs (only if image has tools): `SANDBOX_MOCK=0 bash scripts/sandbox_docker_run.sh scripts/setup_python_local.sh`

- `scripts/sandbox_run.sh`: Lightweight local harness that isolates writes under `.sandbox/` and injects safe mocks for `npx`, `pip`, `docker`, and friends. Prefer the Docker wrapper above for maximum isolation.
  - Example: `bash scripts/sandbox_run.sh scripts/setup_questrade_sdk_core.sh`

### Script Usage (one‑paragraph quickstart each)

- `analyze-test-structure.sh`: Analyzes `src/` for a 1:1 test mapping, reports missing tests, and can create test directories. Run in sandbox to preview changes; with mocks enabled it only scans and logs. Real runs create test directories under `src/tests/` where missing.

- `setup_web_env.sh`: Initializes a Next.js app in `web/` with TypeScript, ESLint, and import aliases. In Docker sandbox it uses a mocked `create-next-app` to generate a minimal `web/package.json` for verification. Outside the sandbox, it uses `npx create-next-app@latest --skip-install --no-git` to avoid network installs and Git init.

- `setup_questrade_types.sh`: Scaffolds `src/types/` with placeholder TypeScript modules (enums, accounts, orders, markets, symbols, responses, index). Safe and idempotent; sandbox run shows created paths under `/work`.

- `setup_questrade_sdk_core.sh`: Creates the Questrade SDK core directory structure (`src/auth/...`, `src/rateLimit`, `src/http`, `src/client`, `examples`, `tests`) and a `.cache` folder. Idempotent; sandboxed run logs which directories are created versus already present.

- `setup_python_local.sh`: Creates a local Python virtual environment under `python/.venv`, upgrades `pip`, and installs dependencies if listed in `python/requirements.txt`. In sandbox, Python and pip are mocked to validate flow without installing anything; use a real image and `SANDBOX_MOCK=0` when you want to actually build the venv.

- `setup_python_docker_volume.sh` and `setup_python_docker_isolated.sh`: Scaffolds Dockerized Python development with either volume‑mounted or isolated approaches. In sandbox, `docker` is mocked so you can review generated files without starting containers; for real use, run outside mocks after verifying `docker info` works.

## Codex Universal Docker Environment

Scripts for managing the Docker development environment with Node.js 22 and Python 3.13:

### Prerequisites

- Docker Engine installed and running
- OpenAI API key (optional but recommended): `export OPENAI_API_KEY="your-key"`
- Sufficient disk space for images and volumes
- Available ports: 3000, 8000, 8888, 5173, 5432

### Quick Start Guide

```bash
# Set your OpenAI API key (required for API access)
export OPENAI_API_KEY="your-api-key-here"

# First time setup (creates docker-compose.codex.yml and convenience scripts)
./scripts/setup_codex_universal.sh

# Start development environment
./scripts/codex_start.sh

# Test the environment and verify API key
./scripts/codex_test.sh

# Enter container for development
./scripts/codex_shell.sh

# Inside container - verify environment
node --version   # v22.x.x
python --version # Python 3.13.x

# Install dependencies inside container
pnpm install
pip install -r python/requirements.txt

# Stop environment when done
./scripts/codex_stop.sh
```

### Non-Blocking Dev Sessions (Important)

- Use the VS Code task "Dev: Web + Monitor (bg)" to start both the Next.js dev server and the browser error monitor in the background without blocking your terminal.
- Each sub-task is configured with `isBackground: true` and a problem matcher so VS Code knows when they are "ready". This prevents long-running processes from hanging the UI.
- If you need a one-off error snapshot, run the task "Browser Error Check (single)" instead of the continuous monitor.

Manual alternatives:

```bash
# Start Next.js dev server in the background
pnpm --dir web dev >/tmp/next-dev.log 2>&1 &

# Start the browser error monitor in the background
./scripts/browser-error-monitor.sh --monitor >/tmp/browser-monitor.log 2>&1 &

# Stop background jobs (example)
pkill -f "next dev" || true
pkill -f "browser-error-monitor.sh --monitor" || true
```

Notes:
- Never run long-lived servers directly in a foreground terminal during automated sessions; prefer background tasks or VS Code Tasks with `isBackground`.
- For compound runs, use the task "Dev: Web + Monitor (bg)" which runs both in parallel and returns control immediately.

### Volume-Based Development

These scripts use **volume mounting instead of COPY operations** for:

- Instant file changes without rebuilds
- Preserved dependencies between restarts
- Better development performance
- Direct file editing on host machine

### Configuration

The setup is configured in:

- `docker-compose.codex.yml` - Main Docker Compose configuration
- `.codex/config.json` - Codex-specific settings
- `.codex/docker.md` - Comprehensive documentation

### Environment Variables

- `CODEX_ENV_PYTHON_VERSION=3.13` - Python runtime version
- `CODEX_ENV_NODE_VERSION=22` - Node.js runtime version
- `OPENAI_API_KEY` - API access (passed from host)
- `PYTHONPATH` - Python module path configuration

### Available Ports

- `3000` - Next.js development server
- `8000` - Python development server
- `8888` - Jupyter Lab
- `5173` - Vite development server
- `5432` - PostgreSQL database

### Troubleshooting

#### Common Issues

- **Docker not running**: Ensure Docker daemon is started
- **Port conflicts**: Check if ports are already in use with `lsof -i :3000`
- **API key warnings**: Set `OPENAI_API_KEY` environment variable
- **Permission issues**: Ensure proper Docker permissions for your user

#### Getting Help

- Run `./scripts/codex_test.sh` to verify environment setup
- Check container logs: `docker-compose -f docker-compose.codex.yml logs`
- Review documentation in `.codex/docker.md`

### Integration with Other Tools

- **VS Code**: Use "Remote - Containers" extension to develop inside container
- **Git**: Git configuration from host is available in container
- **IDE Integration**: All language servers and tools pre-installed in container

## Conventions

1. **Shebang & Strict Mode**
   ```bash
   #!/usr/bin/env bash
   set -euo pipefail
   ```
2. **Documentation Header**

   ```bash
   #==============================================================================
   # Script Name: script-name.sh
   # Aim: Single sentence describing what this script does
   # Purpose: Why this script exists and when to use it
   # Decision Rationale: Why this approach was chosen over alternatives
   # Usage: Command syntax with examples
   # Dependencies: Required tools, files, or environment
   # Last Updated: YYYY-MM-DD by Author
   # References: Related scripts, tasks, or documentation
   #==============================================================================
   ```

3. **Idempotent Operations**
   Before creating a directory or file, check if it already exists:

   ```bash
   if [ ! -d "some_dir" ]; then
     mkdir -p "some_dir"
     echo "[$(date '+%Y-%m-%dT%H:%M:%S%z')] Created some_dir"
   else
     echo "[$(date '+%Y-%m-%dT%H:%M:%S%z')] some_dir already exists"
   fi
   ```

4. **Timestamped Logging**
   Every major step must echo a log line in [YYYY-MM-DDThh:mm:ssZ] format.
5. **Markdown-lint Verification**
   If a script modifies any \*.md, it must run:

   ```bash
   markdownlint --config .markdownlint.yaml < path/to/file > .md
   ```

   and exit non-zero if lint errors occur.

6. **Duplicate Detection and Consolidation**
   Continuously review scripts for overlapping functionality and consolidate them systematically.
   Monthly reviews required to identify consolidation opportunities and optimize script flow.

## Future Consolidation Targets ⚡

**Identified for Next Optimization Phase**:

- **Web Environment Scripts**: Evaluate merging `setup_web_env.sh` and `setup_web_dev_environment.sh`
- **Validation Scripts**: Consider consolidating `validate-instructions.sh` and `validate-prompt.sh`
- **Agent Setup Scripts**: Assess consolidation of `setup_agent_framework.sh` and `setup_agent_system.sh`
- **Questrade Scripts**: Merge `setup_questrade_sdk_core.sh` and `setup_questrade_types.sh` if overlap exists
- **Generate Scripts**: Consolidate `generate-instruction-file.sh` and `generate-prompt-file.sh` into unified generator

## Complete File Index

### **Total Files: 50 scripts + 1 README + 1 JavaScript module + 1 archives directory**

**By Extension:**
- `.sh` files: 50 (shell scripts)
- `.md` files: 1 (README.md)
- `.mjs` files: 1 (ES module JavaScript)
- `archives/` directory: 1 (archived scripts)

### Per-File Summary

#### Environment Setup Scripts (12 files)
- `activate_web_dev_environment.sh` — Quick activation of web development environment with dependency checks
- `create-nextjs-web.sh` — Create and configure new Next.js web application with TypeScript
- `init-empty-copilot-project.sh` — Initialize empty project structure for GitHub Copilot development
- `launch_dev_environment.sh` — Launch complete development environment with all services
- `setup_agent_framework.sh` — Setup TypeScript-based multi-agent orchestration framework
- `setup_agent_system.sh` — Setup AI agent system integration and coordination
- `setup_api_error.sh` — Setup API error handling and response patterns
- `setup_helpers.sh` — Setup utility helper functions and common libraries
- `setup_project.sh` — Master project initialization with workspace configuration
- `setup_web_dev_environment.sh` — Complete web development environment setup
- `setup_web_env.sh` — Web environment configuration and deployment
- `vscode_auto_env.sh` — Automatic VS Code environment configuration

#### Python Environment Scripts (5 files)
- `setup_python_docker.sh` — Advanced Docker Python environment configuration
- `setup_python_docker_isolated.sh` — Isolated Docker Python environment setup
- `setup_python_docker_volume.sh` — Volume-mounted Docker Python environment
- `setup_python_env.sh` — **Master Python environment setup with mode selection**
- `setup_python_local.sh` — Local Python environment configuration and optimization

#### Docker Lifecycle Scripts (7 files)
- `codex_rebuild.sh` — Rebuild Docker containers with latest images and configuration
- `codex_run.sh` — Run Codex CLI in Docker container environment
- `codex_shell.sh` — Enter interactive shell in Codex Docker container
- `codex_start.sh` — Start Docker Compose development environment
- `codex_stop.sh` — Stop Docker Compose environment and cleanup
- `codex_test.sh` — Test Docker environment functionality and API connectivity
- `run_codex_cli.sh` — Execute Codex CLI commands in containerized environment

#### TypeScript/SDK Scripts (4 files)
- `setup_codex_universal.sh` — Complete Codex Universal Docker environment setup
- `setup_db_prisma.sh` — Database setup with Prisma ORM configuration
- `setup_questrade_sdk_core.sh` — Setup Questrade SDK core functionality and types
- `setup_questrade_types.sh` — Setup Questrade TypeScript type definitions
- `setup_ts_sdk.sh` — **Master TypeScript/SDK setup with module selection**

#### Validation & Quality Scripts (10 files)
- `analyze-test-structure.sh` — Analyze and report on test suite structure and coverage
- `check-dependencies.sh` — Validate project dependencies and version compatibility
- `check-markdown.sh` — Lint and format markdown files with strict compliance
- `check-memory-bank.sh` — Validate memory bank file structure and cross-references
- `check-readme-variants.sh` — Check for duplicate README variant files (safeguard)
- `commit-guard.sh` — **Pre-commit validation gate with override support**
- `install-hooks.sh` — Install Git hooks for automated validation
- `local-ci.sh` — **Complete local CI pipeline replacing remote GitHub Actions**
- `validate-instructions.sh` — Validate instruction file structure and compliance
- `validate-prompt.sh` — Validate prompt file format and metadata
- `verify-all.sh` — **Master validation script with selective checking**

#### Code Generation Scripts (4 files)
- `generate-instruction-file.sh` — Generate AI instruction files with template compliance
- `generate-prompt-file.sh` — Generate AI prompt files with proper metadata
- `inventory-prompts.sh` — Inventory and catalog existing prompt files
- `update-checklist.sh` — Update project checklists and task tracking

#### Development Tools (6 files)
- `autonomous-state-manager.sh` — **Automated development state management**
- `browser-error-monitor.sh` — Monitor and report browser JavaScript errors
- `cdp-browser-monitor.mjs` — Chrome DevTools Protocol browser monitoring (ES module)
- `cleanup_readmes.sh` — Clean up duplicate and variant README files
- `get_current_datetime.sh` — Get current ISO 8601 timestamp for logging
- `make-scripts-executable.sh` — Ensure all shell scripts have execute permissions

#### Utility Scripts (4 files)
- `genesis_boot.sh` — Minimal genesis boot-phase dependency and workspace validation

## Verification

- Run `markdownlint --config .markdownlint.yaml scripts/README.md`
- Test consolidated scripts with all parameter combinations
- Run `./scripts/local-ci.sh --fast` for a quick full-stack validation prior to commits
 - Install hooks: `./scripts/install-hooks.sh` (one-time)
 - Override a failing guard intentionally: `FORCE_COMMIT=1 git commit -m "feat(scope): :sparkles: message"`
 - Temporarily disable all hooks (audited): `export DISABLE_LOCAL_GUARDS=1`

## Remote CI Deactivation Notice (2025-08-08)

The previous GitHub Actions workflow at `.github/workflows/ci.yml` has been removed to immediately halt remote CI spending. All equivalent checks are now performed locally via `scripts/local-ci.sh` and enforced pre-commit/push with `commit-guard.sh`. Reinstatement, if needed later, should reference these scripts as the canonical stage definitions.
