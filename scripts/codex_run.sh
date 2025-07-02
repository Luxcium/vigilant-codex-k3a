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

# Run the container with volume mounting
docker run --rm -it \
  --name "${PROJECT_NAME}-codex-dev" \
  -e CODEX_ENV_PYTHON_VERSION=3.13 \
  -e CODEX_ENV_NODE_VERSION=22 \
  -e PYTHONPATH="/workspace/${PROJECT_NAME}/python/src:/workspace/${PROJECT_NAME}/python" \
  -e OPENAI_API_KEY="${OPENAI_API_KEY}" \
  -v "$PROJECT_ROOT:/workspace/$PROJECT_NAME" \
  -w "/workspace/$PROJECT_NAME" \
  -p 3000:3000 \
  -p 8000:8000 \
  -p 8888:8888 \
  -p 5173:5173 \
  ghcr.io/openai/codex-universal:latest

log_success "Container exited"
