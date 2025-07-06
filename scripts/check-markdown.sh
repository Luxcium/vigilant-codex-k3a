#!/usr/bin/env bash
set -euo pipefail

log() {
  echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] $1"
}

log "Running markdownlint on all tracked markdown files"
files=$(git ls-files '*.md')
if command -v markdownlint > /dev/null; then
  markdownlint --config .markdownlint.yaml --ignore-path .markdownlintignore $files || {
    echo "[ERROR] markdownlint failed"
    exit 1
  }
else
  log "[WARN] markdownlint not found, skipping"
fi
