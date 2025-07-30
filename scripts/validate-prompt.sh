#!/usr/bin/env bash

## =============================================================================
#? Script Name: validate-prompt.sh
#? Aim: Lint and validate .prompt.md files
#? Purpose: Run markdownlint on prompt files to ensure consistent formatting and adherence to markdown standards
#? Decision Rationale: Maintains documentation quality and consistency across all prompt files using automated linting
#? Usage: ./validate-prompt.sh
#? Dependencies: markdownlint, .markdownlint.yaml config, .github/prompts/*.prompt.md files
#? Last Updated: 2025-07-24 by GitHub Copilot
#? References: .github/prompts/ directory, .markdownlint.yaml
## =============================================================================
set -euo pipefail

log() {
  echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] $1"
}

pattern=".github/prompts/*.prompt.md"

log "Linting prompt files"
npx prettier --write $pattern
markdownlint --config .markdownlint.yaml $pattern || {
  echo "[ERROR] prompt markdownlint failed"
  exit 1
}

#? Validation Status: Actively Validated on 2025-07-24
