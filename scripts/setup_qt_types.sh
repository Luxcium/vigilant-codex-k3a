#!/usr/bin/env bash
set -euo pipefail

log(){ echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] $1"; }

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

if [ ! -d "src/api" ]; then
  mkdir -p src/api
  log "Created directory src/api"
else
  log "Directory src/api already exists"
fi

log "qt types setup complete"
