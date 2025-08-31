#!/usr/bin/env bash

## =============================================================================
#? Script Name: get_current_datetime.sh
#? Aim: Output current date/time in ISO 8601 format
#? Purpose: Provide consistent timestamp for logging and documentation
#? Decision Rationale: Centralizes timestamp generation for self-documentation
#? Usage: ./get_current_datetime.sh
#? Dependencies: coreutils (date)
#? Last Updated: 2025-08-31 by Codex CLI
#? References: scripts/README.md
## =============================================================================

set -euo pipefail

date --iso-8601=seconds

#? Validation Status: Actively Validated on 2025-08-31
