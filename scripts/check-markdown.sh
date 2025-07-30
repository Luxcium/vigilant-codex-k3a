## =============================================================================
#? Script Name: check-markdown.sh
#? Aim: Validate markdown files for compliance with markdownlint
#? Purpose: Ensure all markdown files follow project standards
#? Decision Rationale: Provides automated linting for markdown documentation
#? Usage: ./check-markdown.sh
#? Dependencies: markdownlint, .markdownlint.yaml, .markdownlintignore
#? Last Updated: 2025-07-23 by GitHub Copilot
#? References: markdownlint documentation, git tracked files
## =============================================================================

#? Validation Status: Actively Validated on 2025-07-23

#!/usr/bin/env bash
set -euo pipefail

log() {
  echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] $1"
}

log "Running markdownlint on all tracked markdown files"
files=$(git ls-files '*.md')
if command -v markdownlint > /dev/null; then
  # Run Prettier first on all markdown and custom agent files
  npx prettier --write "**/*.md" "**/*.chatmode.md" "**/*.prompt.md" "**/*.instructions.md"
  markdownlint --config .markdownlint.yaml --ignore-path .markdownlintignore $files || {
    echo "[ERROR] markdownlint failed"
    exit 1
  }
else
  log "[WARN] markdownlint not found, skipping"
fi
