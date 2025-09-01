#!/bin/bash
# IMMEDIATE CLEANUP EXECUTION SCRIPT
# This script will be executed to remove old config files

echo "🗑️ EXECUTING IMMEDIATE CLEANUP..."

# Backup old files first
BACKUP_DIR="./backup-old-configs-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

# Files to remove
FILES_TO_REMOVE=(
    "tsconfig.json"
    "tsconfig.typedoc.json" 
    "vitest.config.ts"
    "eslint.config.mjs"
    "docker-compose.yml"
    "docker-compose.codex.yml"
    "typedoc.json"
    "jest.config.js"
)

echo "📦 Creating backup..."
for file in "${FILES_TO_REMOVE[@]}"; do
    if [ -f "$file" ]; then
        cp "$file" "$BACKUP_DIR/"
        echo "   ✓ Backed up $file"
    fi
done

echo "🗑️ Removing old config files..."
for file in "${FILES_TO_REMOVE[@]}"; do
    if [ -f "$file" ]; then
        rm "$file"
        echo "   ✓ Removed $file"
    else
        echo "   - $file (not found)"
    fi
done

echo "✅ CLEANUP COMPLETED!"
echo "   Backup saved to: $BACKUP_DIR"
echo "   Old config files removed from root"
echo ""
echo "🧪 Test these commands to verify:"
echo "   pnpm test"
echo "   pnpm lint" 
echo "   pnpm docs"