#!/usr/bin/env bash

## =============================================================================
#? Script Name: inventory-prompts.sh
#? Aim: List all prompt files and counts
#? Purpose: Provide quick inventory of prompt files under memory-bank/prompts
#? Decision Rationale: Enables visibility into prompt assets for maintenance
#? Usage: ./inventory-prompts.sh
#? Dependencies: bash, coreutils
#? Last Updated: 2025-08-31 by Codex CLI
#? References: memory-bank/prompts/README.md
## =============================================================================

set -euo pipefail

PROMPTS_DIR="memory-bank/prompts"
README="$PROMPTS_DIR/README.md"

echo "== Prompt Inventory =="
COUNT=$(ls "$PROMPTS_DIR"/*.prompt.md -1 | wc -l)
echo "Files: $COUNT"
echo

echo "== Filenames =="
ls "$PROMPTS_DIR"/*.prompt.md -1
echo

#? Validation Status: Actively Validated on 2025-08-31
