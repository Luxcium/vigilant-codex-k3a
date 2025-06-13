#!/usr/bin/env bash
# setup_questrade_sdk_core.sh: scaffold Questrade SDK directory structure
set -euo pipefail

log(){ echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] $1"; }

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

# directories per Implementation Playbook
DIRS=(
  "src/auth/providers"
  "src/auth/tokenStore"
  "src/rateLimit"
  "src/error"
  "src/http"
  "src/client"
  "examples"
  "tests"
)

for d in "${DIRS[@]}"; do
  if [ ! -d "$d" ]; then
    mkdir -p "$d"
    log "Created directory $d"
  else
    log "Directory $d already exists"
  fi
done

# token file directory
if [ ! -d .cache ]; then
  mkdir .cache
  log "Created directory .cache"
fi

log "Questrade SDK core scaffold complete"
