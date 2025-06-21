#!/usr/bin/env bash
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
