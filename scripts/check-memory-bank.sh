#!/usr/bin/env bash
set -euo pipefail

log() {
  echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] $1"
}

dir="memory-bank"

if [ ! -d "$dir" ]; then
  log "[ERROR] $dir not found"
  exit 1
fi

log "Running markdownlint on $dir/*.md"
if command -v markdownlint >/dev/null; then
  markdownlint --config .markdownlint.yaml "$dir"/*.md || {
    echo "[ERROR] Markdownlint failed for $dir"
    exit 1
  }
else
  log "[WARN] markdownlint not found, skipping"
fi
