#!/bin/bash

# Create necessary directories
mkdir -p .github/prompts
mkdir -p memory-bank
mkdir -p .vscode
mkdir -p .clinerules

# Must not introduce noticeable side-effects.
# Must be pure unless the things that must exist do not exist.
# Create necessary files without overwriting existing ones.
[ -f .github/copilot-instructions.md ] || touch .github/copilot-instructions.md
[ -f AGENTS.md ] || touch AGENTS.md
[ -f .github/prompts/default.prompt.md ] || touch .github/prompts/default.prompt.md
[ -f .vscode/settings.json ] || touch .vscode/settings.json

echo "✅ VSCode Copilot structure created safely."
