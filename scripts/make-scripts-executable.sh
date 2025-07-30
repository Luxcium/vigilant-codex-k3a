## =============================================================================
#? Script Name: make-scripts-executable.sh
#? Aim: Make all scripts in the current directory executable
#? Purpose: Ensure all shell scripts have the correct permissions for execution
#? Decision Rationale: Simplifies permission management for development scripts
#? Usage: ./make-scripts-executable.sh
#? Dependencies: bash
#? Last Updated: 2025-07-23 by GitHub Copilot
#? References: None
## =============================================================================

#? Validation Status: Actively Validated on 2025-07-23

#!/bin/bash
chmod +x "$(dirname "$0")"/*.sh
echo "All scripts made executable"
