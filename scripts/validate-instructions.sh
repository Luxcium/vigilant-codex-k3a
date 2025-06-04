#!/usr/bin/env bash
set -euo pipefail

log() {
  echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] $1"
}

pattern=".github/instructions/*.instructions.md"

log "Linting instructions files"
markdownlint --config .markdownlint.yaml $pattern || {
  echo "[ERROR] instructions markdownlint failed"
  exit 1
}
