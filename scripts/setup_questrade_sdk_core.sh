#!/usr/bin/env bash

## =============================================================================
#? Script Name: setup_questrade_sdk_core.sh
#? Aim: Scaffold Questrade SDK core directory structure and authentication components
#? Purpose: Create organized directory layout for Questrade SDK implementation with authentication, rate limiting, and client modules
#? Decision Rationale: Provides standardized structure following SDK implementation playbook for consistent development
#? Usage: ./setup_questrade_sdk_core.sh
#? Dependencies: bash, mkdir commands, PROJECT_ROOT environment
#? Last Updated: 2025-07-24 by GitHub Copilot
#? References: src/ directory structure, Implementation Playbook
## =============================================================================
# setup_questrade_sdk_core.sh: scaffold Questrade SDK directory structure
set -euo pipefail

log() { echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] $1"; }

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

# directories per Implementation Playbook
DIRS=(
  "src/auth/providers"
  "src/auth/tokenStore"
  "src/rateLimit"
  "src/errors"
  "src/http"
  "src/client"
  "examples"
  "tests"
)

for d in "${DIRS[@]}"; do
  if [ ! -d "$d" ]; then
    mkdir -p "$d"
    log "Created directory $d"
  else
    log "Directory $d already exists"
  fi
done

# token file directory
if [ ! -d .cache ]; then
  mkdir .cache
  log "Created directory .cache"
fi

log "Questrade SDK core scaffold complete"


#? Validation Status: Actively Validated on 2025-08-31
