#!/usr/bin/env bash
set -euo pipefail

## =============================================================================
#? Script Name: codex_stop.sh
#? Aim: Stop the Codex Universal Docker development environment
#? Purpose: Gracefully shutdown containers and clean up resources
#? Decision Rationale: Provides reliable container shutdown with proper cleanup and resource management
#? Usage: ./codex_stop.sh
#? Dependencies: Docker, docker-compose, docker-compose.codex.yml
#? Last Updated: 2025-07-23 by GitHub Copilot
#? References: docker-compose.codex.yml, codex_start.sh, .vscode/tasks.json
## =============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "Stopping Codex Universal environment..."
cd "$PROJECT_ROOT"

docker-compose -f docker-compose.codex.yml down
echo "Environment stopped."


#? Validation Status: Actively Validated on 2025-08-31
