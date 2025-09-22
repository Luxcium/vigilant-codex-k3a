---
title: Script Sandbox Usage
applyTo: ["scripts/**", "memory-bank/**", "AGENTS.md"]
tools: [ { name: "bash", description: "Run project scripts" } ]
---

# Script Sandbox Usage

You run project scripts in isolation first.

- Use `scripts/sandbox_docker_run.sh` for default runs. It mounts the repo read‑only at `/repo`, writes to `/work`, disables network, and invokes the inner sandbox with safe mocks for `npx`, `pip`, and `docker`.
- Keep outputs for inspection with `SANDBOX_KEEP=1`. Disable mocks only when the container image has required tools and a real run is intended (`SANDBOX_MOCK=0`).
- For quick local checks, `scripts/sandbox_run.sh` isolates writes under `.sandbox/` and injects mocks without Docker. Prefer Docker for maximum isolation.

Quick examples:

```bash
bash scripts/sandbox_docker_run.sh scripts/setup_questrade_types.sh
SANDBOX_KEEP=1 bash scripts/sandbox_docker_run.sh scripts/setup_web_env.sh
SANDBOX_MOCK=0 bash scripts/sandbox_docker_run.sh scripts/setup_python_local.sh
```

Agent guidance:

- Codex CLI and Cline: Always start in the Docker sandbox. Document what you validated and the outcome in comments or in the PR description. Respect the repository preference `no-lock-files`.
- Copilot Chat: When proposing commands, prefer these wrappers and reference this file in your response’s References section. Avoid running networked scaffolds directly.

Verification:

- After sandbox runs, inspect `/work` (or `.sandbox/`) for expected files. Only after a successful dry run should you perform a real run without mocks.
- Never write outside `PROJECT_ROOT`. Never require network by default.

