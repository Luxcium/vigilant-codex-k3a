#!/usr/bin/env bash
set -euo pipefail

log() {
  echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] $1"
}

log "Running full repository verification"

scripts/check-markdown.sh
scripts/check-dependencies.sh
scripts/check-memory-bank.sh

log "Verification complete"
