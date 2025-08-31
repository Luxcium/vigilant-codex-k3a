#!/usr/bin/env bash
set -euo pipefail

## =============================================================================
#? Script Name: codex_shell.sh
#? Aim: Enter interactive shell in the running Codex Universal container
#? Purpose: Provide direct container access for development, debugging, and command execution
#? Decision Rationale: Essential for container-based development workflow and troubleshooting
#? Usage: ./codex_shell.sh
#? Dependencies: Docker, running Codex Universal container
#? Last Updated: 2025-07-23 by GitHub Copilot
#? References: codex_start.sh, docker-compose.codex.yml, development workflows
## =============================================================================


SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
PROJECT_NAME="$(basename "$PROJECT_ROOT")"

echo "Entering Codex Universal container..."
docker exec -it "${PROJECT_NAME}-codex" bash

# This script has been reviewed for relevancy and usability. It is essential for container-based workflows.

#? Validation Status: Actively Validated on 2025-08-31
