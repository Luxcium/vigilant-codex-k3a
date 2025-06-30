# `scripts/` Directory

This folder contains utility scripts for setting up, validating, and maintaining the repository.  
**All scripts must pass strict markdown-lint on any Markdown they generate or update.**

## Conventions
1. **Shebang & Strict Mode**  
   ```bash
   #!/usr/bin/env bash
   set -euo pipefail
   ```
2. **Idempotent Operations**
   Before creating a directory or file, check if it already exists:

   ```bash
   if [ ! -d "some_dir" ]; then
     mkdir -p "some_dir"
     echo "[`date '+%Y-%m-%dT%H:%M:%S%z'`] Created some_dir"
   else
     echo "[`date '+%Y-%m-%dT%H:%M:%S%z'`] some_dir already exists"
   fi
   ```
3. **Timestamped Logging**
   Every major step must echo a log line in [YYYY-MM-DDThh:mm:ssZ] format.
4. **Markdown-lint Verification**
   If a script modifies any *.md, it must run:

   ```bash
   markdownlint --config .markdownlint.yaml <path/to/file>.md
   ```

   and exit non-zero if lint errors occur.

## Script Index
- `setup_project.sh` — Base scaffolding (no overwrites)
- `setup_python_local.sh` — Sets up Python venv + dependencies
- `setup_python_docker.sh` — Builds Python Docker image
- `setup_agent_system.sh` — Creates the hierarchical agent system skeleton
- `check-dependencies.sh` — Verifies memory-bank/dependencies.md structure
- `check-memory-bank.sh` — Runs markdownlint on memory-bank/*.md
- `validate-instructions.sh` — Lints .github/instructions/*.instructions.md
- `validate-prompt.sh` — Lints .github/prompts/*.prompt.md
- `check-markdown.sh` — Runs markdownlint on all Markdown files in repo
- `verify-all.sh` — Runs full verification suite

## Verification
- Run `markdownlint --config .markdownlint.yaml scripts/README.md`
- Execute `scripts/verify-all.sh` before committing
