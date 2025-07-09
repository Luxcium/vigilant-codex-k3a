#!/bin/bash
# Stop Codex Universal Environment

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "Stopping Codex Universal environment..."
cd "$PROJECT_ROOT"

docker-compose -f docker-compose.codex.yml down
echo "Environment stopped."
