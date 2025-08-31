#!/usr/bin/env bash
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

echo "== README Listed Filenames =="
grep -oP "\[.*?\.prompt\.md\]" "$README" | sed -E 's/^\[|\]$//g' | sort -u
echo

echo "== Missing in README (present on disk, not listed) =="
comm -23 <(ls "$PROMPTS_DIR"/*.prompt.md -1 | xargs -n1 basename | sort) <(grep -oP "\[.*?\.prompt\.md\]" "$README" | sed -E 's/^\[|\]$//g' | sort -u)
echo

echo "== Orphans in README (listed but not present on disk) =="
comm -13 <(ls "$PROMPTS_DIR"/*.prompt.md -1 | xargs -n1 basename | sort) <(grep -oP "\[.*?\.prompt\.md\]" "$README" | sed -E 's/^\[|\]$//g' | sort -u)
echo

echo "Done."
