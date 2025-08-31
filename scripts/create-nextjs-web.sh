#!/usr/bin/env bash

## =============================================================================
#? Script Name: create-nextjs-web.sh
#? Aim: Scaffold a Next.js 15+ project inside web/ directory
#? Purpose: Generate a TypeScript Next.js app with Tailwind, ESLint, and alias setup
#? Decision Rationale: Provides consistent web app bootstrapping for monorepos
#? Usage: ./create-nextjs-web.sh [project_name]
#? Dependencies: npx, create-next-app, Node.js
#? Last Updated: 2025-08-31 by Codex CLI
#? References: https://nextjs.org/docs
## =============================================================================

set -euo pipefail

DEFAULT_PROJECT_NAME="web"
DEFAULT_ALIAS="@/*"
PROJECT_NAME="${1:-$DEFAULT_PROJECT_NAME}"
PROJECT_DIR="./$PROJECT_NAME"

run_create_next_app() {
  echo "Creating Next.js project: $PROJECT_NAME in $PROJECT_DIR"
  npx create-next-app@latest "$PROJECT_DIR" \
    --ts \
    --tailwind \
    --eslint \
    --app \
    --src-dir \
    --turbopack \
    --use-npm \
    --import-alias "$DEFAULT_ALIAS" \
    --disable-git \
    --yes
  echo "Project created at: $PROJECT_DIR"
}

run_create_next_app

#? Validation Status: Actively Validated on 2025-08-31
