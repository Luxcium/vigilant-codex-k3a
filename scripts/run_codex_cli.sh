## =============================================================================
#? Script Name: run_codex_cli.sh
#? Aim: Run Codex CLI container for project development
#? Purpose: Start a container with Node.js and Python environments for the specified project
#? Decision Rationale: Provides a consistent development environment using Docker
#? Usage: ./run_codex_cli.sh [project_path]
#? Dependencies: Docker
#? Last Updated: 2025-07-23 by GitHub Copilot
#? References: ghcr.io/openai/codex-universal:latest
## =============================================================================


#!/usr/bin/env bash
set -euo pipefail

log() {
  echo "[$(date -u +'%Y-%m-%dT%H:%M:%SZ')] $*"
}

if ! command -v docker > /dev/null 2>&1; then
  log "ERROR: 'docker' command not found. Please install Docker."
  exit 1
fi

PROJECT_PATH="${1:-$(pwd)}"
if [ ! -d "${PROJECT_PATH}" ]; then
  log "ERROR: Project path '${PROJECT_PATH}' is not a directory."
  exit 1
fi
PROJECT_NAME="$(basename "${PROJECT_PATH}")"
IMAGE="ghcr.io/openai/codex-universal:latest"

log "Pulling image ${IMAGE}..."
docker pull "${IMAGE}"

log "Starting Codex CLI container with Node.js 22 and Python 3.13 for project '${PROJECT_NAME}'..."
docker run --rm -it \
  -e CODEX_ENV_PYTHON_VERSION=3.13 \
  -e CODEX_ENV_NODE_VERSION=22 \
  -v "${PROJECT_PATH}:/workspace/${PROJECT_NAME}" \
  -w "/workspace/${PROJECT_NAME}" \
  "${IMAGE}"

#? Validation Status: Actively Validated on 2025-08-31
