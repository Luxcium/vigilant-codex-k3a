#!/usr/bin/env bash
set -euo pipefail

log() {
  echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] $1"
}

pattern=".github/prompts/*.prompt.md"

log "Linting prompt files"
markdownlint --config .markdownlint.yaml $pattern || {
  echo "[ERROR] prompt markdownlint failed"
  exit 1
}
