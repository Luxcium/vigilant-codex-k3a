#!/usr/bin/env bash
set -euo pipefail

log() {
  echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] $1"
}

FILE="memory-bank/dependencies.md"

if [ ! -f "$FILE" ]; then
  log "[ERROR] $FILE not found"
  exit 1
fi

if grep -q "Dependencies and Relationships" "$FILE"; then
  log "dependencies.md structure valid"
else
  log "[ERROR] dependencies.md missing structure"
  exit 1
fi

log "Verifying Markdown compliance…"
if command -v markdownlint > /dev/null; then
  markdownlint --config .markdownlint.yaml "$FILE" || {
    echo "[ERROR] $FILE failed markdownlint."
    exit 1
  }
else
  log "[WARN] markdownlint not found, skipping"
fi
