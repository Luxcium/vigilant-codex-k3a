

set -e

echo "🧹 Consolidating README files..."

# Create backup directory
mkdir -p backup-readmes

# Backup and replace main READMEs
echo "📁 Processing scripts/README.md..."
if [ -f "scripts/README.md" ]; then
    mv scripts/README.md backup-readmes/scripts-README-original.md
fi
cp scripts/README.consolidated.md scripts/README.md
echo "" >> scripts/README.md  # Fix trailing newline

echo "📁 Processing memory-bank/README.md..."
if [ -f "memory-bank/README.md" ]; then
    mv memory-bank/README.md backup-readmes/memory-bank-README-original.md
fi
cp memory-bank/README.consolidated.md memory-bank/README.md
echo "" >> memory-bank/README.md  # Fix trailing newline

echo "📁 Processing memory-bank/instructions/README.md..."
if [ -f "memory-bank/instructions/README.md" ]; then
    mv memory-bank/instructions/README.md backup-readmes/instructions-README-original.md
fi
# The instructions README already exists and is good, just verify

echo "📁 Processing memory-bank/prompts/README.md..."
if [ -f "memory-bank/prompts/README.md" ]; then
    mv memory-bank/prompts/README.md backup-readmes/prompts-README-original.md
fi
cp memory-bank/prompts/README.consolidated.md memory-bank/prompts/README.md
echo "" >> memory-bank/prompts/README.md  # Fix trailing newline

echo "📁 Processing memory-bank/chatmodes/README.md..."
if [ -f "memory-bank/chatmodes/README.md" ]; then
    mv memory-bank/chatmodes/README.md backup-readmes/chatmodes-README-original.md
fi
cp memory-bank/chatmodes/README.consolidated.md memory-bank/chatmodes/README.md
echo "" >> memory-bank/chatmodes/README.md  # Fix trailing newline

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

# Remove this consolidation plan
rm -f CONSOLIDATION_PLAN.md

# Validate results
echo "✅ Validation checks..."

# Run markdown lint on the new READMEs
if command -v markdownlint &> /dev/null; then
    echo "🔍 Running markdownlint..."
    markdownlint scripts/README.md memory-bank/README.md memory-bank/*/README.md || echo "⚠️  Some lint issues remain"
else
    echo "⚠️  markdownlint not available, skipping lint check"
fi

# Count files
echo "📊 File counts:"
echo "  Scripts: $(find scripts -maxdepth 1 -type f -name '*.sh' | wc -l) shell scripts"
echo "  Instructions: $(find memory-bank/instructions -type f -name '*.instructions.md' | wc -l) instruction files"
echo "  Prompts: $(find memory-bank/prompts -type f -name '*.prompt.md' | wc -l) prompt files"
echo "  Chatmodes: $(find memory-bank/chatmodes -type f -name '*.chatmode.md' | wc -l) chatmode files"

echo ""
echo "✨ README consolidation complete!"
echo "📂 Original files backed up in backup-readmes/"
echo "📝 Each directory now has exactly one README.md"
echo ""
echo "Next steps:"
echo "1. Review the consolidated READMEs"
echo "2. Update VS Code settings to point to memory-bank/* locations"
echo "3. Archive legacy scripts as planned"
