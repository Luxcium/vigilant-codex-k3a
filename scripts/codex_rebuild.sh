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
