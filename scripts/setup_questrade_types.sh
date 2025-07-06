#!/usr/bin/env bash
# setup_questrade_types.sh: scaffold Questrade type modules
set -euo pipefail

log() { echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] $1"; }

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

TYPES_DIR="src/types"
FILES=(enums.ts accounts.ts orders.ts markets.ts symbols.ts responses.ts index.ts)

if [ ! -d "$TYPES_DIR" ]; then
  mkdir -p "$TYPES_DIR"
  log "Created directory $TYPES_DIR"
else
  log "Directory $TYPES_DIR already exists"
fi

for f in "${FILES[@]}"; do
  path="$TYPES_DIR/$f"
  if [ ! -f "$path" ]; then
    echo "// auto-generated placeholder" > "$path"
    log "Created $path"
  else
    log "File $path already exists"
  fi
done

log "Questrade type module scaffold complete"
