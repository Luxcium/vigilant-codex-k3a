## =============================================================================
#? Script Name: check-memory-bank.sh
#? Aim: Validate markdown files in the memory-bank directory
#? Purpose: Ensure memory-bank documentation follows markdownlint standards
#? Decision Rationale: Provides automated linting for critical project documentation
#? Usage: ./check-memory-bank.sh
#? Dependencies: markdownlint, .markdownlint.yaml
#? Last Updated: 2025-07-23 by GitHub Copilot
#? References: memory-bank/*.md, markdownlint documentation
## =============================================================================


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
npx prettier --write "$dir"/*.md
if command -v markdownlint > /dev/null; then
  markdownlint --config .markdownlint.yaml "$dir"/*.md || {
    echo "[ERROR] Markdownlint failed for $dir"
    exit 1
  }
else
  log "[WARN] markdownlint not found, skipping"
fi

#? Validation Status: Actively Validated on 2025-08-31
