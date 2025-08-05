#!/usr/bin/env bash
# get_current_datetime.sh
# Aim: Output the current date/time in ISO 8601 format for logging and documentation
# Purpose: Used by VS Code tasks and documentation for timestamping
# Decision Rationale: Centralizes date/time retrieval for protocol compliance
# Usage: Called by VS Code task 'Get Current Date/Time'
# Dependencies: None (uses coreutils 'date')
# Last Updated: 2025-08-03

# Output current date/time in ISO 8601 format

date --iso-8601=seconds

#? Validation Status: Actively Validated on 2025-08-03
