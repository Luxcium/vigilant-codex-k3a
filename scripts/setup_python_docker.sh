## =============================================================================
#? Script Name: setup_python_docker.sh
#? Aim: Idempotent Docker Python environment setup script
#? Purpose: Build Docker image for Python application if not already present
#? Decision Rationale: Ensures consistent Docker environment for Python development
#? Usage: ./setup_python_docker.sh
#? Dependencies: Docker
#? Last Updated: 2025-07-23 by GitHub Copilot
#? References: python/Dockerfile
## =============================================================================

#? Validation Status: Actively Validated on 2025-07-23

#!/usr/bin/env bash
# Idempotent Docker Python environment setup script
set -euo pipefail

log() {
  echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] $1"
}

cd "$(dirname "$0")/../python"

if docker image inspect my-python-app > /dev/null 2>&1; then
  log "Docker image 'my-python-app' already exists"
else
  log "Building Docker image 'my-python-app'"
  docker build -t my-python-app .
  log "Docker Python image built"
fi
