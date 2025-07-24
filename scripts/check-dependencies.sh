## =============================================================================
#? Script Name: check-dependencies.sh
#? Aim: Validate dependencies and relationships in memory-bank/dependencies.md
#? Purpose: Ensure proper structure and compliance with markdownlint
#? Decision Rationale: Provides automated validation for dependency tracking
#? Usage: ./check-dependencies.sh
#? Dependencies: markdownlint, memory-bank/dependencies.md
#? Last Updated: 2025-07-23 by GitHub Copilot
#? References: memory-bank/dependencies.md, .markdownlint.yaml
## =============================================================================

#? Validation Status: Actively Validated on 2025-07-23

#!/usr/bin/env bash
set -euo pipefail

# ARCHIVED: This script has been consolidated into verify-all.sh
echo "This script has been archived and consolidated into verify-all.sh"
echo "Use: ./verify-all.sh --check dependencies"
echo "Original functionality preserved in archives/check-dependencies.sh"
exit 1
  exit 1
fi

if grep -q "Dependencies and Relationships" "$FILE"; then
  log "dependencies.md structure valid"
else
  log "[ERROR] dependencies.md missing structure"
  exit 1
fi

log "Verifying Markdown compliance…"
if command -v markdownlint > /dev/null; then
  markdownlint --config .markdownlint.yaml "$FILE" || {
    echo "[ERROR] $FILE failed markdownlint."
    exit 1
  }
else
  log "[WARN] markdownlint not found, skipping"
fi
