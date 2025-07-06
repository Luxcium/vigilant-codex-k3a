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
