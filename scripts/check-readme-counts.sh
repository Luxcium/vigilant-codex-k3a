## =============================================================================
#? Script Name: check-readme-counts.sh
#? Aim: Ensure README AI framework counts align with actual file totals
#? Purpose: Prevent drift between documentation and memory-bank inventory
#? Decision Rationale: Automate verification of instruction/prompt bullet accuracy
#? Usage: bash ./scripts/check-readme-counts.sh
#? Dependencies: bash, find, awk, sed
#? Last Updated: 2025-12-07 by Codex CLI
#? References: README.md (AI Framework Components section)
## =============================================================================

#? Validation Status: Actively Validated on 2025-12-07

#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
README_FILE="$REPO_ROOT/README.md"
INSTRUCTIONS_DIR="$REPO_ROOT/memory-bank/instructions"
PROMPTS_DIR="$REPO_ROOT/memory-bank/prompts"

log() {
  printf '[%s] %s\n' "$(date -u '+%Y-%m-%dT%H:%M:%SZ')" "$1"
}

require_dir() {
  if [ ! -d "$1" ]; then
    log "[ERROR] Missing directory: $1"
    exit 1
  fi
}

extract_declared_count() {
  local pattern="$1"
  local label="$2"
  local section
  section=$(awk '/### AI Framework Components/{flag=1;next}/^## /{flag=0}flag' "$README_FILE")
  local line
  line=$(printf '%s\n' "$section" | grep "$pattern" || true)
  if [ -z "$line" ]; then
    log "[ERROR] Could not locate $label bullet in README"
    exit 1
  fi
  local value
  value=$(printf '%s\n' "$line" | sed -E 's/.*\*\*[^0-9]*([0-9]+).*/\1/')
  if [ -z "$value" ]; then
    log "[ERROR] Unable to parse numeric value for $label"
    exit 1
  fi
  printf '%s' "$value"
}

count_files() {
  local dir="$1"
  local glob="$2"
  find "$dir" -maxdepth 1 -type f -name "$glob" | wc -l | awk '{print $1}'
}

require_dir "$INSTRUCTIONS_DIR"
require_dir "$PROMPTS_DIR"

actual_instructions=$(count_files "$INSTRUCTIONS_DIR" '*.instructions.md')
actual_prompts=$(count_files "$PROMPTS_DIR" '*.prompt.md')

declared_instructions=$(extract_declared_count 'Instruction Files' 'Instruction Files')
declared_prompts=$(extract_declared_count 'Prompt Files' 'Prompt Files')

status=0

if [ "$actual_instructions" != "$declared_instructions" ]; then
  log "[ERROR] Instruction file count mismatch: declared $declared_instructions vs actual $actual_instructions"
  status=1
fi

if [ "$actual_prompts" != "$declared_prompts" ]; then
  log "[ERROR] Prompt file count mismatch: declared $declared_prompts vs actual $actual_prompts"
  status=1
fi

if [ "$status" -eq 0 ]; then
  log "[OK] README AI framework counts are accurate ($actual_instructions instructions, $actual_prompts prompts)"
else
  log "[HINT] Update README.md AI Framework Components bullets to match actual counts"
fi

exit "$status"
