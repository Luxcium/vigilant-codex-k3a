#!/usr/bin/env bash
# setup_agent_framework.sh: Initialize multi-agent retrieval framework project
set -euo pipefail

log(){
  echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] $1"
}

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FRAMEWORK_DIR="$PROJECT_ROOT/agent-framework"

if [ -d "$FRAMEWORK_DIR" ]; then
  log "agent-framework already exists, skipping setup"
  exit 0
fi

mkdir -p "$FRAMEWORK_DIR"
cd "$FRAMEWORK_DIR"

log "Initializing package.json"
yes "" | pnpm init >/dev/null

log "Installing dev dependencies"
pnpm add -D typescript@5.8 ts-node @types/node esbuild vitest >/dev/null
pnpm add -D p-limit pinecone-client >/dev/null

log "Creating tsconfig.json"
pnpm dlx tsc --init --target es2022 --moduleResolution node >/dev/null

log "Creating source directories"
mkdir -p src/{core,patterns,examples,cli,tests}

# Remove lockfile if generated
rm -f pnpm-lock.yaml

log "agent-framework setup complete"
