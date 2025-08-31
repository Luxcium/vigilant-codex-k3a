

## Scope and Purpose

- Provide a single source of truth for all scripts.
- Ensure documentation is synchronized with actual files present.
- Surface inconsistencies, deprecations, and consolidation opportunities.

## Documentation Standards

- One top-level H1 only.
- Proper list indentation and blank lines around fenced blocks.
- Avoid emphasis-as-heading (MD036) and ensure consistent structure.

## Current Inventory (by filename)

Environment & Bootstrap

- `activate_web_dev_environment.sh`: Activate configured web dev environment quickly.
- `launch_dev_environment.sh`: Orchestrate starting dev services/tasks locally.
- `genesis_boot.sh`: Bootstrapping entrypoint for initial environment bring-up.
- `get_current_datetime.sh`: Echo current ISO-8601 timestamp (self-doc workflows).

Docker / Codex Universal

- `setup_codex_universal.sh`: Prepare Codex Universal Docker stack.
- `codex_start.sh`: Start Docker Compose environment.
- `codex_stop.sh`: Stop Docker environment cleanly.
- `codex_rebuild.sh`: Rebuild images and restart services.
- `codex_shell.sh`: Enter container shell for diagnostics.
- `codex_run.sh`: Run a single container for quick tests.
- `codex_test.sh`: Validate environment and API key availability.

Python Environment

- `setup_python_env.sh`: Master Python env setup with mode selection.
- `setup_python_docker.sh`: Advanced Docker-based Python features.
- `setup_python_local.sh`: Local Python setup and optimizations.
- `setup_python_docker_isolated.sh`: Legacy/archived mode (should be mapped to `setup_python_env.sh --mode docker_isolated`).
- `setup_python_docker_volume.sh`: Legacy/archived mode (should be mapped to `setup_python_env.sh --mode docker_volume`).

TypeScript / SDK / DB

- `setup_ts_sdk.sh`: Master TypeScript/SDK setup with module selection.
- `setup_db_prisma.sh`: Database setup and Prisma configuration.
- `setup_agent_framework.sh`: Legacy; expected consolidated into `setup_ts_sdk.sh --module agent-framework`.
- `setup_agent_system.sh`: Legacy; expected consolidated into `setup_ts_sdk.sh --module agent-system`.
- `setup_api_error.sh`: Legacy; expected consolidated into `setup_ts_sdk.sh --module api-error`.
- `setup_helpers.sh`: Legacy; expected consolidated into `setup_ts_sdk.sh --module helpers`.
- `setup_questrade_sdk_core.sh`: Legacy; expected consolidated into `setup_ts_sdk.sh --module questrade-core`.
- `setup_questrade_types.sh`: Legacy; expected consolidated into `setup_ts_sdk.sh --module questrade-types`.

Project / Web Scaffolding

- `setup_project.sh`: Master project initialization with type selection.
- `setup_web_dev_environment.sh`: Install/configure web dev toolchain.
- `create-nextjs-web.sh`: Scaffolds a Next.js web app.

Validation & CI

- `local-ci.sh`: Full local CI pipeline (install, typecheck, lint, test, coverage, docs).
- `commit-guard.sh`: Hook-executed validation gate; override with `FORCE_COMMIT=1` if needed.
- `install-hooks.sh`: Install git hooks calling `commit-guard.sh`.
- `check-markdown.sh`: Lint/format markdown and agent files.
- `check-memory-bank.sh`: Validate memory bank content consistency.
- `check-dependencies.sh`: Dependencies audit (may be consolidated under a master verify script).
- `analyze-test-structure.sh`: Analyze tests layout/coverage shape (project-specific).
- `inventory-prompts.sh`: Inventory prompt files in memory bank (used for sync reports).

Automation / Monitoring

- `autonomous-state-manager.sh`: Development state management and automation control.
- `browser-error-monitor.sh`: Tail/collect browser console errors.
- `cdp-browser-monitor.mjs`: Chrome DevTools Protocol target/error monitor.
- `make-scripts-executable.sh`: Ensure `*.sh` have execute permissions.
- `run_codex_cli.sh`: Quick run helper for Codex CLI.
- `init-empty-copilot-project.sh`: Initialize minimal repo for Copilot/agents.
- `generate-instruction-file.sh`: Scaffold new `.instructions.md` files.
- `generate-prompt-file.sh`: Scaffold new `.prompt.md` files.

## Detected Inconsistencies (to resolve)

- Archived vs present: Legacy scripts like `setup_python_docker_isolated.sh`, `setup_python_docker_volume.sh`, `setup_questrade_*`, `setup_agent_*`, `setup_api_error.sh`, and `setup_helpers.sh` are still present. They should either:
  - Move to `scripts/archives/` (preferred), or
  - Remain as thin wrappers that `exec` the consolidated command and are marked as deprecated with a sunset date.
- Master verify script: References to `verify-all.sh` appear in prior docs; this file is not confirmed present in the repo snapshot. Either add it back or update docs to point to the available subset (`check-markdown.sh`, `check-memory-bank.sh`, `check-dependencies.sh`, `local-ci.sh`).
- Markdown lint: The original `scripts/README.md` has multiple MD0xx issues (headings, list indents). This synced version conforms to markdownlint rules.

## Validation Commands (bash)

Use these to validate inventory and counts locally.

```bash
# Count shell scripts and CDP monitor script
find ./scripts -maxdepth 1 -type f -name '*.sh' | wc -l
find ./scripts -maxdepth 1 -type f -name 'cdp-browser-monitor.mjs' | wc -l

# List legacy scripts expected to be archived
ls -1 ./scripts | grep -E 'setup_(python_docker_isolated|python_docker_volume|questrade_|agent_|api_error|helpers)'

# Ensure all scripts are executable
find ./scripts -type f -name '*.sh' -not -perm -u+x -print

# Run markdown lint (example)
./scripts/check-markdown.sh || true
```

## Next Actions

- Decide deprecation approach for legacy scripts (archive vs shim).
- Confirm presence/absence of `verify-all.sh` and reconcile docs.
- Replace `scripts/README.md` with this synced version after review.
