#!/usr/bin/env bash
set -euo pipefail

log() {
  echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] $1"
}

log "Running markdownlint --strict on all tracked markdown files"
files=$(git ls-files '*.md')
markdownlint --config .markdownlint.yaml --strict "$files" || {
  echo "[ERROR] markdownlint failed"
  exit 1
}
