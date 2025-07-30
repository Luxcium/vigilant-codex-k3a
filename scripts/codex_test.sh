#!/usr/bin/env bash
## =============================================================================
#? Script Name: codex_test.sh
#? Aim: Test OpenAI API Key in Codex Universal Environment
#? Purpose: Verify that the Codex container has access to the required environment variables and tools
#? Decision Rationale: Ensures container readiness for development and API usage
#? Usage: ./codex_test.sh
#? Dependencies: Docker
#? Last Updated: 2025-07-23 by GitHub Copilot
#? References: codex_start.sh, container environment variables
## =============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
PROJECT_NAME="$(basename "$PROJECT_ROOT")"

echo "Testing OpenAI API key availability in container..."

# Check if container is running
if ! docker ps | grep "${PROJECT_NAME}-codex" > /dev/null; then
  echo "Error: Codex container is not running"
  echo "Start it with: ./scripts/codex_start.sh"
  exit 1
fi

# Test API key in container
echo "Checking environment variables in container..."
docker exec "${PROJECT_NAME}-codex" bash -c '
echo "Container environment:"
echo "- CODEX_ENV_PYTHON_VERSION: $CODEX_ENV_PYTHON_VERSION"
echo "- CODEX_ENV_NODE_VERSION: $CODEX_ENV_NODE_VERSION"
if [[ -n "${OPENAI_API_KEY:-}" ]]; then
    echo "- OPENAI_API_KEY: [SET] (${#OPENAI_API_KEY} characters)"
else
    echo "- OPENAI_API_KEY: [NOT SET]"
fi
echo ""
echo "Available commands:"
echo "- node: $(node --version)"
echo "- python: $(python --version)"
echo "- npm: $(npm --version)"
echo "- pip: $(pip --version)"
'

echo "Test complete."

#? Validation Status: Actively Validated on 2025-07-23
