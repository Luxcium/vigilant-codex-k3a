## =============================================================================
#? Script Name: setup_helpers.sh
#? Aim: Scaffold helpers directory and placeholder files
#? Purpose: Create helpers and test directories with initial placeholder files
#? Decision Rationale: Ensures consistent structure for helper utilities
#? Usage: ./setup_helpers.sh
#? Dependencies: bash
#? Last Updated: 2025-07-23 by GitHub Copilot
#? References: src/helpers/candles.ts, src/tests/helpers/candles.test.ts
## =============================================================================

#? Validation Status: Actively Validated on 2025-07-23

#!/usr/bin/env bash
# setup_helpers.sh: scaffold helpers directory and placeholder files
set -euo pipefail

log() { echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] $1"; }

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

HELPERS_DIR="src/helpers"
TEST_DIR="src/tests/helpers"

if [ ! -d "$HELPERS_DIR" ]; then
  mkdir -p "$HELPERS_DIR"
  log "Created directory $HELPERS_DIR"
else
  log "Directory $HELPERS_DIR already exists"
fi

if [ ! -f "$HELPERS_DIR/candles.ts" ]; then
  echo "// auto-generated placeholder" > "$HELPERS_DIR/candles.ts"
  log "Created $HELPERS_DIR/candles.ts"
else
  log "File $HELPERS_DIR/candles.ts already exists"
fi

if [ ! -d "$TEST_DIR" ]; then
  mkdir -p "$TEST_DIR"
  log "Created directory $TEST_DIR"
else
  log "Directory $TEST_DIR already exists"
fi

if [ ! -f "$TEST_DIR/candles.test.ts" ]; then
  echo "// auto-generated placeholder" > "$TEST_DIR/candles.test.ts"
  log "Created $TEST_DIR/candles.test.ts"
else
  log "File $TEST_DIR/candles.test.ts already exists"
fi

log "Helpers scaffold complete"
