#!/usr/bin/env bash
# must resolve conflicts <<<<<<< codex/initialiser-le-repo-mono-et-créer-la-structure-2025-06-3004-08-28
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
  pnpm init -y >/dev/null
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
# 'merge conflict' commented out to be resolved now please decide the smartes way to use both or one or the other rewriting the entire file accordingly now =======
set -euo pipefail

log(){
  echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] $1"
}

DIR="agent-framework"

if [ -d "$DIR" ]; then
  log "$DIR already exists, skipping setup"
  exit 0
fi

log "Creating $DIR directory"
mkdir -p "$DIR"
cd "$DIR"

log "Initializing project"
npm init -y >/dev/null
rm -f pnpm-lock.yaml

log "Writing package.json with dependencies"
cat > package.json <<'EOF'
{
  "name": "agent-framework",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "build": "tsc",
    "test": "vitest"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "esbuild": "^0.21.0",
    "p-limit": "^5.0.0",
    "pinecone-client": "^3.2.0",
    "ts-node": "^10.9.2",
    "typescript": "^5.8.0",
    "vitest": "^1.5.0"
  }
}
EOF

log "Creating tsconfig.json"
cat > tsconfig.json <<'EOF'
{
  "compilerOptions": {
    "target": "es2022",
    "module": "es2022",
    "moduleResolution": "node",
    "outDir": "dist",
    "rootDir": "src",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
EOF

log "Creating source directories"
mkdir -p src/{core,patterns,examples,cli,tests}

log "Setup complete"
# you are the ai agent who must cleverly resolve this comment out conflict >>>>>>> luxcium/main
