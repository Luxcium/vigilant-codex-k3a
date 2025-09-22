#!/bin/bash

# Remove all sync/variant files
echo "🗑️  Removing duplicate README variants..."

# Scripts variants
rm -f scripts/README.sync.md
rm -f scripts/README.rewrite.md
rm -f scripts/README.synced.md
rm -f scripts/README.final.md
rm -f scripts/README.consolidated.md

# Memory bank variants
rm -f memory-bank/README.sync.md
rm -f memory-bank/README.consolidated.md
rm -f memory-bank/instructions/README.sync.md
rm -f memory-bank/prompts/README.sync.md
rm -f memory-bank/prompts/README.consolidated.md
rm -f memory-bank/chatmodes/README.sync.md
rm -f memory-bank/chatmodes/README.consolidated.md

# Audit files
rm -f memory-bank/AUDIT.sync.md

# Remove consolidation artifacts
rm -f CONSOLIDATION_PLAN.md
rm -f consolidate-readmes.sh

echo "✅ Cleanup complete! All duplicate README variants removed."
echo "📊 Remaining README files:"
find . -maxdepth 3 -name "README*.md" -type f | sort
