#!/bin/bash

# Script to remove old configuration files after reorganization
# Run this from the project root directory

set -e  # Exit on error

echo "🧹 Removing old configuration files from project root..."

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "config" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    echo "   (where package.json and config/ directory exist)"
    exit 1
fi

echo "📋 Current project root files to be removed:"

# List files that will be removed
OLD_CONFIG_FILES=(
    "tsconfig.json"
    "tsconfig.typedoc.json"
    "vitest.config.ts"
    "eslint.config.mjs"
    "docker-compose.yml"
    "docker-compose.codex.yml"
    "typedoc.json"
    "jest.config.js"
)

for file in "${OLD_CONFIG_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✓ $file (exists, will be removed)"
    else
        echo "   - $file (not found, skipping)"
    fi
done

echo ""
echo "🔍 Verifying new config structure exists..."

# Verify new config structure
NEW_CONFIG_STRUCTURE=(
    "config/typescript/tsconfig.json"
    "config/typescript/tsconfig.typedoc.json"
    "config/testing/vitest.config.ts"
    "config/linting/eslint.config.mjs"
    "config/docker/docker-compose.yml"
    "config/docker/docker-compose.codex.yml"
    "config/docs/typedoc.json"
)

MISSING_NEW_FILES=()
for file in "${NEW_CONFIG_STRUCTURE[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✓ $file (exists)"
    else
        echo "   ❌ $file (MISSING!)"
        MISSING_NEW_FILES+=("$file")
    fi
done

if [ ${#MISSING_NEW_FILES[@]} -ne 0 ]; then
    echo ""
    echo "❌ ERROR: Missing new configuration files!"
    echo "   Cannot proceed with removal until all new config files exist."
    echo "   Missing files:"
    for file in "${MISSING_NEW_FILES[@]}"; do
        echo "     - $file"
    done
    exit 1
fi

echo ""
echo "✅ All new configuration files exist!"

# Backup old files before removal (optional safety measure)
echo ""
echo "📦 Creating backup of old files..."
BACKUP_DIR="./backup-old-configs-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

for file in "${OLD_CONFIG_FILES[@]}"; do
    if [ -f "$file" ]; then
        cp "$file" "$BACKUP_DIR/"
        echo "   ✓ Backed up $file"
    fi
done

echo ""
echo "🗑️  Removing old configuration files..."

# Remove old files
for file in "${OLD_CONFIG_FILES[@]}"; do
    if [ -f "$file" ]; then
        rm "$file"
        echo "   ✓ Removed $file"
    fi
done

echo ""
echo "🧪 Testing configuration with a quick validation..."

# Test that package.json scripts reference correct paths
echo "   Testing package.json script references..."
if grep -q "config/typescript\|config/testing\|config/linting\|config/docs" package.json; then
    echo "   ✓ package.json contains new config references"
else
    echo "   ⚠️  Warning: package.json might not reference new config paths"
fi

# Quick test that configs can be parsed
echo "   Testing TypeScript config..."
if command -v npx &> /dev/null; then
    if npx tsc --noEmit --project config/typescript/tsconfig.json &> /dev/null; then
        echo "   ✓ TypeScript config is valid"
    else
        echo "   ⚠️  Warning: TypeScript config validation failed"
    fi
else
    echo "   - Skipping TypeScript validation (npx not available)"
fi

echo ""
echo "✅ Cleanup completed successfully!"
echo ""
echo "📋 Summary:"
echo "   - Old config files removed from project root"
echo "   - Backup created in: $BACKUP_DIR"
echo "   - New config structure in place under config/"
echo ""
echo "🚀 Next steps:"
echo "   1. Test your key commands: pnpm test, pnpm lint, pnpm docs"
echo "   2. If everything works, you can remove the backup: rm -rf $BACKUP_DIR"
echo "   3. Commit the cleaned project structure"
echo ""
echo "   Key commands to test:"
echo "     pnpm test"
echo "     pnpm lint"
echo "     pnpm docs"
echo "     pnpm build (if available)"
