#!/usr/bin/env bash
set -euo pipefail

log(){
  echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] $1"
}

ROOT_DIR="agent-system"

if [ ! -d "$ROOT_DIR" ]; then
  mkdir -p "$ROOT_DIR"
  log "Created $ROOT_DIR directory"
else
  log "$ROOT_DIR directory already exists"
fi

cd "$ROOT_DIR"

if [ ! -f package.json ]; then
  log "Initializing package.json"
  cat <<'JSON' > package.json
{
  "name": "agent-system",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "build": "tsc",
    "test": "vitest"
  },
  "dependencies": {},
  "devDependencies": {}
}
JSON
  log "Created package.json"
else
  log "package.json already exists"
fi

# Remove lock file if generated
if [ -f pnpm-lock.yaml ]; then
  rm pnpm-lock.yaml
  log "Removed pnpm-lock.yaml to respect no-lock-files preference"
fi

log "Adding dev dependencies (skipped if offline)"
if ! pnpm ls typescript >/dev/null 2>&1; then
  pnpm add -D typescript@5.8 ts-node @types/node esbuild vitest p-limit pinecone-client >/dev/null || log "Dependency install failed (offline?)"
else
  log "Dependencies already installed"
fi

if [ ! -f tsconfig.json ]; then
  log "Creating tsconfig.json"
  cat <<'JSON' > tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "moduleResolution": "node",
    "module": "es2022",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "dist"
  },
  "include": ["src"]
}
JSON
else
  log "tsconfig.json already exists"
fi

mkdir -p src/{core,patterns,examples,cli,tests}
log "Ensured src directory structure"

# Restore the original working directory
cd "$ORIGINAL_DIR"

log "setup_multi_agent_framework.sh complete"
