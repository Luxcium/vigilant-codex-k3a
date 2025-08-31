

## Get Current Date/Time Task

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

## Script Organization Goals

- Provide a single source of truth for all scripts.
- Keep documentation synchronized with the actual directory contents.
- Surface consolidation opportunities and deprecations.
- Maintain lint-clean documentation.

## Script Conventions

- All scripts begin with a header comment describing aim, purpose, rationale, usage, dependencies, last updated, and references.
- Every script ends with a validation status line: `#? Validation Status: Actively Validated on YYYY-MM-DD`.
- Prefer parameterized master scripts over many single-purpose variants.

## Consolidated Script Structure (23 Scripts)

### Consolidation Progress

Reduced from 41 to 22 scripts (46% reduction) on 2025-07-23; now 23 with internal local-ci orchestration (no external cost) added on 2025-08-08.

### Environment Setup Scripts (6 scripts)

#### Python Environment

- `setup_python_env.sh` — **Master Python environment setup with mode selection**
  - Usage: `./setup_python_env.sh --mode [local|docker_isolated|docker_volume|venv_only]`
  - Supports all Python deployment modes with unified interface
- `setup_python_docker.sh` — Advanced Docker Python features
- `setup_python_local.sh` — Advanced local Python optimizations

#### Web Development

- `setup_web_dev_environment.sh` — Complete web development setup
- `activate_web_dev_environment.sh` — Quick web environment activation

#### Project Initialization

- `setup_project.sh` — Master project initialization with type selection

### Docker Lifecycle Scripts (7 scripts)

- `setup_codex_universal.sh` — Complete Codex Universal Docker setup
- `codex_start.sh` — Start Docker Compose environment
- `codex_stop.sh` — Stop environment
- `codex_shell.sh` — Enter container shell
- `codex_rebuild.sh` — Rebuild and restart with latest image
- `codex_test.sh` — Test environment and verify API key availability
- `run_codex_cli.sh` — Quick single-container run for testing

### TypeScript/SDK Setup Scripts (2 scripts)

- `setup_ts_sdk.sh` — **Master TypeScript/SDK setup with module selection**
  - Usage: `./setup_ts_sdk.sh --module [questrade-core|questrade-types|agent-framework|agent-system|api-error|helpers|all]`
  - Supports modular SDK component setup
- `setup_db_prisma.sh` — Database setup and configuration

### Validation & Quality Scripts (5 scripts)

- `local-ci.sh` — **Full local CI pipeline (install, typecheck, lint, test, coverage, docs)** replacing removed GitHub Actions workflow to cut costs
  - Usage: `./scripts/local-ci.sh [--fast] [--skip stage]`
  - Mirrors former `.github/workflows/ci.yml` stages entirely locally
  - Eliminates remote CI usage cost; adjustable stages for rapid iteration
- `commit-guard.sh` — **Hook-executed validation gate** (fast local-ci subset, override with `FORCE_COMMIT=1`)
- `install-hooks.sh` — Installs git hooks (pre-commit, pre-push, commit-msg) calling `commit-guard.sh`
- `check-markdown.sh` — Lint and format all markdown and custom agent files
  - Usage: `./check-markdown.sh`
  - Ensures all documentation and agent files are consistently formatted and linted
- `check-memory-bank.sh` — Memory bank specific validation

### Code Generation Scripts (2 scripts)

- `generate-instruction-file.sh` — Generate AI instruction files
- `generate-prompt-file.sh` — Generate AI prompt files

### Development Tools Scripts (3 scripts)

- `browser-error-monitor.sh` — Monitor and report browser errors
- `make-scripts-executable.sh` — Ensure all scripts have execute permissions
- `autonomous-state-manager.sh` — **Development state management with automation**
  - Consolidates functionality from 2 previous scripts

### Additional Scripts

- `analyze-test-structure.sh` — Analyze tests layout and coverage shape
- `cdp-browser-monitor.mjs` — Chrome DevTools Protocol target/error monitor
- `genesis_boot.sh` — Bootstrap entrypoint for initial bring-up
- `inventory-prompts.sh` — Inventory prompt files for sync
- `launch_dev_environment.sh` — Orchestrate local dev services/tasks

## Legacy Scripts (Deprecated - Consider Archiving)

**These scripts are marked for consolidation:**

- `setup_python_docker_isolated.sh` → `setup_python_env.sh --mode docker_isolated`
- `setup_python_docker_volume.sh` → `setup_python_env.sh --mode docker_volume`
- `setup_questrade_sdk_core.sh` → `setup_ts_sdk.sh --module questrade-core`
- `setup_questrade_types.sh` → `setup_ts_sdk.sh --module questrade-types`
- `setup_agent_framework.sh` → `setup_ts_sdk.sh --module agent-framework`
- `setup_agent_system.sh` → `setup_ts_sdk.sh --module agent-system`
- `setup_api_error.sh` → `setup_ts_sdk.sh --module api-error`
- `setup_helpers.sh` → `setup_ts_sdk.sh --module helpers`

## Validation Commands

```bash
# Count shell scripts and special monitors
find ./scripts -maxdepth 1 -type f -name '*.sh' | wc -l
find ./scripts -maxdepth 1 -type f -name 'cdp-browser-monitor.mjs' | wc -l

# List deprecated scripts still present
ls -1 ./scripts | grep -E 'setup_(python_docker_isolated|python_docker_volume|questrade_|agent_|api_error|helpers)'

# Ensure all scripts are executable
find ./scripts -type f -name '*.sh' -not -perm -u+x -print

# Markdown lint
./scripts/check-markdown.sh || true
```

## Git Hooks Integration

### Usage

- Install hooks: `./scripts/install-hooks.sh` (one-time)
- Override a failing guard intentionally: `FORCE_COMMIT=1 git commit -m "feat(scope): :sparkles: message"`
- Temporarily disable all hooks (audited): `export DISABLE_LOCAL_GUARDS=1`

## Next Actions

- Move deprecated scripts to `scripts/archives/` or convert to shims that exec the consolidated command and warn.
- Confirm presence/absence of `verify-all.sh` and reconcile references.
- Continue consolidation to reduce script count further while maintaining functionality.
