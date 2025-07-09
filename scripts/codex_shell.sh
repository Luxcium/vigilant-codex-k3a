#!/bin/bash
# Enter Codex Universal Container Shell

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
PROJECT_NAME="$(basename "$PROJECT_ROOT")"

echo "Entering Codex Universal container..."
docker exec -it "${PROJECT_NAME}-codex" bash
