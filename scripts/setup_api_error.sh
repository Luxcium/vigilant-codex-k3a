#!/usr/bin/env bash
set -euo pipefail
log() { echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] $1"; }
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

FILE="src/types/apiError.ts"
TEST="src/tests/types/apiError.test.ts"

if [ ! -f "$FILE" ]; then
  mkdir -p "$(dirname "$FILE")"
  echo "// auto-generated placeholder" > "$FILE"
  log "Created $FILE"
else
  log "File $FILE already exists"
fi

if [ ! -f "$TEST" ]; then
  mkdir -p "$(dirname "$TEST")"
  echo "// auto-generated placeholder" > "$TEST"
  log "Created $TEST"
else
  log "File $TEST already exists"
fi

log "ApiError scaffold complete"
