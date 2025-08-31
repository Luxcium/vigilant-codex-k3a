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
- **Goal**: Continuously review usage patterns and consolidate redundant scripts

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

## Script Inventory (49 Scripts)

- `activate_web_dev_environment.sh` — Activate web development environment variables and tools
- `analyze-test-structure.sh` — Analyze and organize test structure for 1:1 mapping with source code
- `autonomous-state-manager.sh` — Manage project state automatically after AI agent actions
- `browser-error-monitor.sh` — Monitor Next.js app for runtime errors and report them to VS Code Problems panel
- `cdp-browser-monitor.mjs` — Stream browser console errors via Chrome DevTools Protocol
- `check-dependencies.sh` — Validate dependencies and relationships in memory-bank/dependencies.md
- `check-markdown.sh` — Validate markdown files for compliance with markdownlint
- `check-memory-bank.sh` — Validate markdown files in the memory-bank directory
- `codex_rebuild.sh` — Rebuild and restart Codex Universal environment
- `codex_run.sh` — Quick Codex Universal Docker Runner
- `codex_shell.sh` — Enter interactive shell in the running Codex Universal container
- `codex_start.sh` — Start the Codex Universal Docker development environment
- `codex_stop.sh` — Stop the Codex Universal Docker development environment
- `codex_test.sh` — Test OpenAI API Key in Codex Universal Environment
- `commit-guard.sh` — Enforce repository validation before allowing commit/push
- `create-nextjs-web.sh` — Scaffold a Next.js 15+ project inside web/ directory
- `generate-instruction-file.sh` — Generate structured templates for .instructions.md files
- `generate-prompt-file.sh` — Generate structured templates for .prompt.md files
- `genesis_boot.sh` — Perform minimal genesis boot-phase checks
- `get_current_datetime.sh` — Output current date/time in ISO 8601 format
- `init-empty-copilot-project.sh` — Initialize an empty VS Code Copilot project structure
- `install-hooks.sh` — Install local Git hooks enforcing validation before commits/pushes
- `inventory-prompts.sh` — List all prompt files and counts
- `launch_dev_environment.sh` — Launch the web development environment
- `local-ci.sh` — Provide a zero-cost local replacement for the previous GitHub Actions CI
- `make-scripts-executable.sh` — Make all scripts in the current directory executable
- `run_codex_cli.sh` — Run Codex CLI container for project development
- `setup_agent_framework.sh` — Initialize multi-agent retrieval framework directory
- `setup_agent_system.sh` — Initialize hierarchical agent system in python/agent_system
- `setup_api_error.sh` — Scaffold ApiError type and test files
- `setup_codex_universal.sh` — Set up Codex Universal Docker environment
- `setup_db_prisma.sh` — Setup PostgreSQL service and Prisma schema
- `setup_helpers.sh` — Scaffold helpers directory and placeholder files
- `setup_project.sh` — Idempotent project setup script
- `setup_python_docker.sh` — Idempotent Docker Python environment setup script
- `setup_python_docker_isolated.sh` — Configure Docker isolated Python environment
- `setup_python_docker_volume.sh` — Configure Docker volume-mounted Python environment
- `setup_python_env.sh` — Set up Python development environment with configurable deployment modes
- `setup_python_local.sh` — Configure local Python virtual environment
- `setup_questrade_sdk_core.sh` — Scaffold Questrade SDK core directory structure and authentication components
- `setup_questrade_types.sh` — Scaffold Questrade TypeScript type definition modules
- `setup_ts_sdk.sh` — Set up comprehensive TypeScript SDK with modular architecture
- `setup_web_dev_environment.sh` — Configure comprehensive web development environment in VS Code
- `setup_web_env.sh` — Initialize Next.js application in web/ directory
- `update-checklist.sh` — Verify feature references exist in memory bank files
- `validate-instructions.sh` — Lint and validate .instructions.md files
- `validate-prompt.sh` — Lint and validate .prompt.md files
- `verify-all.sh` — Run comprehensive validation suite for the entire repository
- `vscode_auto_env.sh` — Automatically configure VS Code terminal environment for Python development


## Verification

- Run `markdownlint --config .markdownlint.yaml scripts/README.md`
- Test consolidated scripts with all parameter combinations
- Run `./scripts/local-ci.sh --fast` for a quick full-stack validation prior to commits
 - Install hooks: `./scripts/install-hooks.sh` (one-time)
 - Override a failing guard intentionally: `FORCE_COMMIT=1 git commit -m "feat(scope): :sparkles: message"`
 - Temporarily disable all hooks (audited): `export DISABLE_LOCAL_GUARDS=1`

## Remote CI Deactivation Notice (2025-08-08)

The previous GitHub Actions workflow at `.github/workflows/ci.yml` has been removed to immediately halt remote CI spending. All equivalent checks are now performed locally via `scripts/local-ci.sh` and enforced pre-commit/push with `commit-guard.sh`. Reinstatement, if needed later, should reference these scripts as the canonical stage definitions.
