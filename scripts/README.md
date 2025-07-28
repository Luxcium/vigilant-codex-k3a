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

## Consolidated Script Structure (22 Scripts)

**Reduced from 41 to 22 scripts (46% reduction) on 2025-07-23**

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

### Validation & Quality Scripts (2 scripts)

- `verify-all.sh` - **Master validation script with selective checking**
  - Usage: `./verify-all.sh [--check dependencies|markdown|instructions|prompts|tests] [--analyze tests]`
  - Consolidates functionality from 5 previous validation scripts
  - Comprehensive repository validation suite
- `check-memory-bank.sh` - Memory bank specific validation

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
npm install
pip install -r python/requirements.txt

# Stop environment when done
./scripts/codex_stop.sh
```

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

## Script Index by Function

### Environment Setup
- `setup_python_env.sh` — **Consolidated Python environment setup (5-in-1)**
- `setup_python_docker.sh` — Advanced Docker Python features
- `setup_python_local.sh` — Advanced local Python optimizations
- `setup_web_dev_environment.sh` — Complete web development setup
- `activate_web_dev_environment.sh` — Quick web environment activation
- `setup_project.sh` — Master project initialization

### Docker Lifecycle
- `setup_codex_universal.sh` — Complete Codex Universal setup
- `codex_start.sh` — Start Docker environment
- `codex_stop.sh` — Stop Docker environment
- `codex_shell.sh` — Enter container shell
- `codex_rebuild.sh` — Rebuild containers
- `codex_test.sh` — Test Docker environment
- `run_codex_cli.sh` — Single container execution

### TypeScript/SDK
- `setup_ts_sdk.sh` — **Consolidated TypeScript/SDK setup (6-in-1)**
- `setup_db_prisma.sh` — Database configuration

### Validation & Quality
- `verify-all.sh` — **Consolidated validation suite (5-in-1)**
- `check-memory-bank.sh` — Memory bank validation

### Code Generation
- `generate-instruction-file.sh` — AI instruction file generation
- `generate-prompt-file.sh` — AI prompt file generation

### Development Tools
- `browser-error-monitor.sh` — Browser error monitoring
- `make-scripts-executable.sh` — Script permission management
- `autonomous-state-manager.sh` — **Development state automation (2-in-1)**

## Verification

- Run `markdownlint --config .markdownlint.yaml scripts/README.md`
- Execute `scripts/verify-all.sh` before committing
- Test consolidated scripts with all parameter combinations
