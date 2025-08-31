## =============================================================================
#? Script Name: setup_questrade_types.sh
#? Aim: Scaffold Questrade TypeScript type definition modules
#? Purpose: Create comprehensive type structure for enums, accounts, orders, markets, symbols and API responses
#? Decision Rationale: Provides type safety foundation for Questrade SDK with organized module separation
#? Usage: ./setup_questrade_types.sh
#? Dependencies: bash, mkdir commands, PROJECT_ROOT environment
#? Last Updated: 2025-07-24 by GitHub Copilot
#? References: src/types/ directory structure, TypeScript type definitions
## =============================================================================


#!/usr/bin/env bash

## =============================================================================
#? Script Name: setup_questrade_types.sh
#? Aim: Scaffold Questrade TypeScript type module structure
#? Purpose: Create organized type definition files for Questrade API integration including enums, accounts, orders, markets, symbols, and responses
#? Decision Rationale: Provides consistent TypeScript type definitions following API schema standards for type-safe development
#? Usage: ./setup_questrade_types.sh
#? Dependencies: bash, mkdir commands, PROJECT_ROOT environment
#? Last Updated: 2025-07-24 by GitHub Copilot
#? References: src/types/ directory structure, TypeScript type definitions
## =============================================================================
# setup_questrade_types.sh: scaffold Questrade type modules
set -euo pipefail

log() { echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] $1"; }

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

TYPES_DIR="src/types"
FILES=(enums.ts accounts.ts orders.ts markets.ts symbols.ts responses.ts index.ts)

if [ ! -d "$TYPES_DIR" ]; then
  mkdir -p "$TYPES_DIR"
  log "Created directory $TYPES_DIR"
else
  log "Directory $TYPES_DIR already exists"
fi

for f in "${FILES[@]}"; do
  path="$TYPES_DIR/$f"
  if [ ! -f "$path" ]; then
    echo "// auto-generated placeholder" > "$path"
    log "Created $path"
  else
    log "File $path already exists"
  fi
done

log "Questrade type module scaffold complete"


#? Status: Script reviewed and validated on 2025-07-24

#? Validation Status: Actively Validated on 2025-08-31
