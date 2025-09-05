#!/usr/bin/env bash

## =============================================================================
#? Script Name: setup_web_env.sh
#? Aim: Initialize Next.js application in web/ directory
#? Purpose: Create new Next.js project with TypeScript, ESLint, and proper import aliases, then update project .gitignore
#? Decision Rationale: Provides standardized Next.js setup with modern configuration and consistent project structure
#? Usage: ./setup_web_env.sh
#? Dependencies: npx, create-next-app, Node.js, project .gitignore
#? Last Updated: 2025-07-24 by GitHub Copilot
#? References: web/package.json, .gitignore
## =============================================================================
# setup_web_env.sh: Initialize Next.js app in web/ directory
set -euo pipefail

# AI Agents: Run this script through scripts/sandbox_docker_run.sh to test
# without network or repo writes. Prefer mocked runs by default. When
# executing for real, ensure network access is approved and respect the
# no-lock-files preference.

log() {
  echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] $1"
}

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WEB_DIR="$PROJECT_ROOT/web"

if [ ! -f "$WEB_DIR/package.json" ]; then
  log "Creating Next.js project in $WEB_DIR"
  CI=1 npx create-next-app@latest "$WEB_DIR" --typescript --eslint --use-pnpm --skip-install --no-git --import-alias "@/*" --src-dir
  log "Next.js project created"
else
  log "Next.js project already exists in $WEB_DIR"
fi

GITIGNORE="$PROJECT_ROOT/.gitignore"
if [ -f "$GITIGNORE" ] && ! grep -q "web/node_modules" "$GITIGNORE"; then
  cat >> "$GITIGNORE" << 'GIT'
# Node environment
web/node_modules/
web/.next/
web/.env
GIT
  log "Updated .gitignore for web directory"
fi

log "Web environment setup complete"
# Verification steps can be executed separately
