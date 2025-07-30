#!/usr/bin/env bash

## =============================================================================
#? Script Name: validate-instructions.sh
#? Aim: Lint and validate .instructions.md files
#? Purpose: Run markdownlint on instruction files to ensure consistent formatting and adherence to markdown standards
#? Decision Rationale: Maintains documentation quality and consistency across all instruction files using automated linting
#? Usage: ./validate-instructions.sh
#? Dependencies: markdownlint, .markdownlint.yaml config, memory-bank/instructions/*.instructions.md files
#? Last Updated: 2025-07-30 by GitHub Copilot
#? References: memory-bank/instructions/ directory, .markdownlint.yaml
## =============================================================================
set -euo pipefail

log() {
  echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] $1"
}

pattern="memory-bank/instructions/*.instructions.md"

log "Linting instructions files"
npx prettier --write $pattern
markdownlint --config .markdownlint.yaml $pattern || {
  echo "[ERROR] instructions markdownlint failed"
  exit 1
}

#? Validation Status: Actively Validated on 2025-07-24
