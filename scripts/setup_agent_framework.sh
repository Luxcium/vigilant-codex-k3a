#!/usr/bin/env bash
# setup_agent_framework.sh: Initialize multi-agent retrieval framework directory
set -euo pipefail

log() {
  echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] $1"
}

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FRAMEWORK_DIR="$PROJECT_ROOT/agent-framework"
TEMPLATE_DIR="$PROJECT_ROOT/templates/agent-framework"

if [ -d "$FRAMEWORK_DIR" ]; then
  log "agent-framework already exists, skipping setup"
  exit 0
fi

log "Creating agent-framework directory"
mkdir -p "$FRAMEWORK_DIR"
cd "$FRAMEWORK_DIR"

log "Copying template package.json"
cp "$TEMPLATE_DIR/package.json" package.json

log "Installing dev dependencies"
pnpm install > /dev/null 2>&1 || true
pnpm add -D typescript@5.8 ts-node @types/node esbuild vitest p-limit pinecone-client > /dev/null

log "Copying tsconfig template"
cp "$TEMPLATE_DIR/tsconfig.json" tsconfig.json

log "Creating source directories"
mkdir -p src/{core,patterns,examples,cli,tests}

GITIGNORE="$PROJECT_ROOT/.gitignore"
if [ -f "$GITIGNORE" ] && ! grep -q "agent-framework/node_modules" "$GITIGNORE"; then
  echo "agent-framework/node_modules/" >> "$GITIGNORE"
  log "Updated .gitignore for agent-framework directory"
fi

log "Agent framework setup complete"
"$PROJECT_ROOT/scripts/verify-all.sh"
log "Verification after setup complete"
