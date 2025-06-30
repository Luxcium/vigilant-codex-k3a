#!/usr/bin/env bash
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
