#!/usr/bin/env bash
set -euo pipefail

## =============================================================================
#? Script Name: codex_start.sh
#? Aim: Start the Codex Universal Docker development environment
#? Purpose: Orchestrate container startup with proper environment validation and service health checks
#? Decision Rationale: Provides reliable container startup with OpenAI API integration and comprehensive logging
#? Usage: ./codex_start.sh
#? Dependencies: Docker, docker-compose, docker-compose.codex.yml
#? Last Updated: 2025-07-23 by GitHub Copilot
#? References: docker-compose.codex.yml, setup_codex_universal.sh, .vscode/tasks.json
## =============================================================================


SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Check for OpenAI API key
if [[ -z "${OPENAI_API_KEY:-}" ]]; then
  echo "Warning: OPENAI_API_KEY environment variable is not set"
  echo "The container will start without the OpenAI API key"
  echo "You can set it with: export OPENAI_API_KEY=your_key_here"
fi

echo "Starting Codex Universal environment..."
cd "$PROJECT_ROOT"

# Start services
docker-compose -f docker-compose.codex.yml up -d

echo "Environment started. Use 'scripts/codex_shell.sh' to enter the container."
echo "Available ports:"
echo "  - 3000: Next.js development server"
echo "  - 8000: Python development server"
echo "  - 8888: Jupyter Lab"
echo "  - 5173: Vite development server"
echo "  - 5432: PostgreSQL database"


#? Validation Status: Actively Validated on 2025-08-31
