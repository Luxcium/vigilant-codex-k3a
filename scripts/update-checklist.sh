#!/usr/bin/env bash

## =============================================================================
#? Script Name: update-checklist.sh
#? Aim: Verify feature references exist in memory bank files
#? Purpose: Check that key features like rate limiter and web architecture are properly documented in memory bank tracking files
#? Decision Rationale: Ensures critical features are tracked and documented for project continuity and context preservation
#? Usage: ./update-checklist.sh
#? Dependencies: bash, grep, memory-bank files
#? Last Updated: 2025-07-24 by GitHub Copilot
#? References: memory-bank/activeContext.md, memory-bank/progress.md, memory-bank/systemPatterns.md
## =============================================================================
set -euo pipefail

log() {
  echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] $1"
}

declare -A checklist=(
  ["rate limiter"]="memory-bank/activeContext.md memory-bank/progress.md"
  ["web architecture"]="memory-bank/systemPatterns.md memory-bank/activeContext.md memory-bank/progress.md"
)

missing=0
for feature in "${!checklist[@]}"; do
  for file in ${checklist[$feature]}; do
    if ! grep -qi "$feature" "$file"; then
      log "Missing reference to '$feature' in $file"
      missing=1
    fi
  done
done

if [ "$missing" -eq 1 ]; then
  log "Update checklist failed"
  exit 1
fi

log "Update checklist passed"


#? Validation Status: Actively Validated on 2025-08-31
