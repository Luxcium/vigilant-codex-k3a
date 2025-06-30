#!/usr/bin/env bash
# setup_agent_framework.sh: Initialize multi-agent retrieval framework directory
set -euo pipefail

log() {
  echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] $1"
}

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
AGENT_DIR="$PROJECT_ROOT/agent-framework"

if [ ! -d "$AGENT_DIR" ]; then
  mkdir -p "$AGENT_DIR"
  log "Created directory $AGENT_DIR"
  cd "$AGENT_DIR"
  yes "" | pnpm init >/dev/null
  rm -f pnpm-lock.yaml
  pnpm add -D typescript@5.8 ts-node @types/node esbuild vitest >/dev/null
  pnpm add -D p-limit pinecone-client >/dev/null
  pnpm dlx tsc --init --target es2022 --moduleResolution node >/dev/null
  mkdir -p src/{core,patterns,examples,cli,tests}
  cd "$PROJECT_ROOT"
else
  log "Directory $AGENT_DIR already exists"
fi

GITIGNORE="$PROJECT_ROOT/.gitignore"
if [ -f "$GITIGNORE" ] && ! grep -q "agent-framework/node_modules" "$GITIGNORE"; then
  echo "agent-framework/node_modules/" >> "$GITIGNORE"
  log "Updated .gitignore for agent-framework directory"
fi

log "Agent framework setup complete"
"$PROJECT_ROOT/scripts/verify-all.sh"
log "Verification after setup complete"
