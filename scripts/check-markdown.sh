#!/usr/bin/env bash
set -euo pipefail

log() {
  echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] $1"
}

log "Running markdownlint on all tracked markdown files"
files=$(git ls-files '*.md')
pnpm exec markdownlint --config .markdownlint.yaml $files || {
  echo "[ERROR] markdownlint failed"
  exit 1
}
