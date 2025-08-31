## =============================================================================
#? Script Name: init-empty-copilot-project.sh
#? Aim: Initialize an empty VS Code Copilot project structure
#? Purpose: Create necessary directories and files for Copilot integration
#? Decision Rationale: Ensures a safe and consistent setup for new projects
#? Usage: ./init-empty-copilot-project.sh
#? Dependencies: bash
#? Last Updated: 2025-07-23 by GitHub Copilot
#? References: .github/copilot-instructions.md, .vscode/settings.json
## =============================================================================


#!/bin/bash

# Create necessary directories
mkdir -p memory-bank/prompts
mkdir -p memory-bank/instructions
mkdir -p memory-bank/chatmodes
mkdir -p .github
mkdir -p .vscode
mkdir -p .clinerules

# Must not introduce noticeable side-effects.
# Must be pure unless the things that must exist do not exist.
# Create necessary files without overwriting existing ones.
[ -f .github/copilot-instructions.md ] || touch .github/copilot-instructions.md
[ -f AGENTS.md ] || touch AGENTS.md
[ -f memory-bank/prompts/default.prompt.md ] || touch memory-bank/prompts/default.prompt.md
[ -f .vscode/settings.json ] || touch .vscode/settings.json

echo "✅ VSCode Copilot structure created safely."

#? Validation Status: Actively Validated on 2025-08-31
