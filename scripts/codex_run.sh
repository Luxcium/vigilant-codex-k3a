#!/bin/bash

# Quick Codex Universal Docker Runner
# This script provides a simple way to run codex-universal with volume mounting


set -euo pipefail

# Configuration
PROJECT_ROOT="$(pwd)"
PROJECT_NAME="$(basename "$PROJECT_ROOT")"
IMAGE_NAME="ghcr.io/openai/codex-universal:latest"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() {
  echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
  echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# Check if we're in a project directory
if [[ ! -f "package.json" && ! -f "pyproject.toml" && ! -f "requirements.txt" ]]; then
  echo "Warning: This doesn't appear to be a project directory"
  echo "Make sure you're in your project root before running this script"
fi

# Check for OpenAI API key
if [[ -z "${OPENAI_API_KEY:-}" ]]; then
  echo "Warning: OPENAI_API_KEY environment variable is not set"
  echo "The container will start without the OpenAI API key"
  echo "You can set it with: export OPENAI_API_KEY=your_key_here"
else
  log_success "OPENAI_API_KEY is available"
fi

log_info "Pulling latest codex-universal image..."
docker pull "$IMAGE_NAME"

log_info "Starting codex-universal container with volumes..."
log_info "Project: $PROJECT_NAME"
log_info "Mount: $PROJECT_ROOT -> /workspace/$PROJECT_NAME"


# Dynamic port mapping: only map ports that are not in use in range 3000 + 10
PORTS=(3010 3011 3012 3013 3014 3015)
PORT_ARGS=()
for PORT in "${PORTS[@]}"; do
  if lsof -iTCP:"$PORT" -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "\033[0;33m[WARN]\033[0m Port $PORT is already in use on host, skipping mapping."
  else
    PORT_ARGS+=("-p" "$PORT:$PORT")
  fi
done

docker run --rm -it \
  --name "${PROJECT_NAME}-codex-dev" \
  -e CODEX_ENV_PYTHON_VERSION=3.13 \
  -e CODEX_ENV_NODE_VERSION=22 \
  -e PYTHONPATH="/workspace/${PROJECT_NAME}/python/src:/workspace/${PROJECT_NAME}/python" \
  -e OPENAI_API_KEY="${OPENAI_API_KEY}" \
  -v "$PROJECT_ROOT:/workspace/$PROJECT_NAME" \
  -w "/workspace/$PROJECT_NAME" \
  "${PORT_ARGS[@]}" \
  ghcr.io/openai/codex-universal:latest

log_success "Container exited"
