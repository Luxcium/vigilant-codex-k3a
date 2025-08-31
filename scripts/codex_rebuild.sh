## =============================================================================
#? Script Name: codex_rebuild.sh
#? Aim: Rebuild and restart Codex Universal environment
#? Purpose: Pull latest image, stop existing containers, and start fresh containers
#? Decision Rationale: Ensures environment is up-to-date and cleanly restarted
#? Usage: ./codex_rebuild.sh
#? Dependencies: Docker, docker-compose, docker-compose.codex.yml
#? Last Updated: 2025-07-23 by GitHub Copilot
#? References: docker-compose.codex.yml, OpenAI API key
## =============================================================================


#!/bin/bash
# Rebuild and Restart Codex Universal Environment

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Check for OpenAI API key
if [[ -z "${OPENAI_API_KEY:-}" ]]; then
  echo "Warning: OPENAI_API_KEY environment variable is not set"
  echo "The container will start without the OpenAI API key"
fi

echo "Rebuilding Codex Universal environment..."
cd "$PROJECT_ROOT"

# Pull latest image
docker pull ghcr.io/openai/codex-universal:latest

# Stop existing containers
docker-compose -f docker-compose.codex.yml down

# Start with fresh containers
docker-compose -f docker-compose.codex.yml up -d --force-recreate

echo "Environment rebuilt and restarted."

#? Validation Status: Actively Validated on 2025-08-31
