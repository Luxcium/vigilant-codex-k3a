

## Goals

- Provide a single source of truth for all scripts.
- Keep documentation synchronized with the actual directory contents.
- Surface consolidation opportunities and deprecations.

## Conventions

- All scripts begin with a header comment describing aim, purpose, rationale, usage, dependencies, last updated, and references.
- Every script ends with a validation status line: `#? Validation Status: Actively Validated on YYYY-MM-DD`.
- Prefer parameterized master scripts over many single-purpose variants.

## Inventory Overview

Environment & Bootstrap

- `activate_web_dev_environment.sh` — Quick activation of the web dev environment.
- `launch_dev_environment.sh` — Orchestrate local dev services/tasks.
- `genesis_boot.sh` — Bootstrap entrypoint for initial bring-up.
- `get_current_datetime.sh` — Output current ISO-8601 timestamp.

Docker / Codex Universal

- `setup_codex_universal.sh` — Prepare Codex Universal Docker stack.
- `codex_start.sh` — Start Docker Compose services.
- `codex_stop.sh` — Stop Docker services cleanly.
- `codex_rebuild.sh` — Rebuild images and restart services.
- `codex_shell.sh` — Enter a container shell.
- `codex_run.sh` — Run a single container for quick tests.
- `codex_test.sh` — Validate environment and API token availability.

Python Environment

- `setup_python_env.sh` — Master Python env with mode selection.
- `setup_python_docker.sh` — Advanced Docker-based Python features.
- `setup_python_local.sh` — Local Python setup and optimizations.
- `setup_python_docker_isolated.sh` — Deprecated; use `setup_python_env.sh --mode docker_isolated`.
- `setup_python_docker_volume.sh` — Deprecated; use `setup_python_env.sh --mode docker_volume`.

TypeScript / SDK / DB

- `setup_ts_sdk.sh` — Master TypeScript/SDK setup with module selection.
- `setup_db_prisma.sh` — Database setup and Prisma configuration.
- `setup_agent_framework.sh` — Deprecated; use `setup_ts_sdk.sh --module agent-framework`.
- `setup_agent_system.sh` — Deprecated; use `setup_ts_sdk.sh --module agent-system`.
- `setup_api_error.sh` — Deprecated; use `setup_ts_sdk.sh --module api-error`.
- `setup_helpers.sh` — Deprecated; use `setup_ts_sdk.sh --module helpers`.
- `setup_questrade_sdk_core.sh` — Deprecated; use `setup_ts_sdk.sh --module questrade-core`.
- `setup_questrade_types.sh` — Deprecated; use `setup_ts_sdk.sh --module questrade-types`.

Project / Web Scaffolding

- `setup_project.sh` — Master project initialization with type selection.
- `setup_web_dev_environment.sh` — Install/configure web dev toolchain.
- `create-nextjs-web.sh` — Scaffold a Next.js web app.

Validation & CI

- `local-ci.sh` — Local CI pipeline (install, typecheck, lint, test, coverage, docs).
- `commit-guard.sh` — Validation gate for git hooks; override with `FORCE_COMMIT=1`.
- `install-hooks.sh` — Install git hooks (pre-commit, pre-push, commit-msg).
- `check-markdown.sh` — Lint/format markdown and agent files.
- `check-memory-bank.sh` — Memory bank validation.
- `check-dependencies.sh` — Dependency audit.
- `analyze-test-structure.sh` — Analyze tests layout and coverage shape.
- `inventory-prompts.sh` — Inventory prompt files for sync.

Automation / Monitoring

- `autonomous-state-manager.sh` — Development state management automation.
- `browser-error-monitor.sh` — Collect browser console errors.
- `cdp-browser-monitor.mjs` — Chrome DevTools Protocol target/error monitor.
- `make-scripts-executable.sh` — Ensure `*.sh` are executable.
- `run_codex_cli.sh` — Quick run helper for Codex CLI.
- `init-empty-copilot-project.sh` — Initialize minimal repo for Copilot/agents.
- `generate-instruction-file.sh` — Scaffold new `.instructions.md` files.
- `generate-prompt-file.sh` — Scaffold new `.prompt.md` files.

## Consolidation Status

- Python: Use `setup_python_env.sh --mode {local|docker_isolated|docker_volume|venv_only}`. Archive legacy docker variants or keep as thin shims.
- TypeScript/SDK: Use `setup_ts_sdk.sh --module {questrade-core|questrade-types|agent-framework|agent-system|api-error|helpers|all}`. Deprecate subset scripts accordingly.
- Verify script: Some docs mention `verify-all.sh`. If missing, prefer `local-ci.sh`, `check-markdown.sh`, `check-memory-bank.sh`, and `check-dependencies.sh`.

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

## Next Actions

- Move deprecated scripts to `scripts/archives/` or convert to shims that exec the consolidated command and warn.
- Confirm presence/absence of `verify-all.sh` and reconcile references.
- Replace `scripts/README.md` with this rewrite after review.
