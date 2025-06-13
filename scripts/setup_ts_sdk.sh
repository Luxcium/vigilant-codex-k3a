#!/usr/bin/env bash
# setup_ts_sdk.sh: Initialize TypeScript SDK project structure
set -euo pipefail

log() {
  echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] $1"
}

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

# Directories
DIRS=("src/auth" "src/rateLimit" "src/errors" ".keys")
for d in "${DIRS[@]}"; do
  if [ ! -d "$d" ]; then
    mkdir -p "$d"
    log "Created directory $d"
  else
    log "Directory $d already exists"
  fi
done

# .gitignore entry
if [ -f .gitignore ] && ! grep -q "^\.keys/" .gitignore; then
  echo ".keys/" >> .gitignore
  log "Added .keys/ to .gitignore"
fi

# package.json
if [ ! -f package.json ]; then
  log "Initializing package.json"
  yes "" | pnpm init >/dev/null
fi

log "Installing dev dependencies"
pnpm add -D typescript @types/node vitest >/dev/null

# tsconfig
if [ ! -f tsconfig.json ]; then
  log "Creating tsconfig.json"
  npx tsc --init --strict >/dev/null
fi

log "TypeScript SDK setup complete"
