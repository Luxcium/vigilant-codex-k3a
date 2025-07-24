#!/usr/bin/env bash

# Quick Codex Universal Docker Runner
# This script provides a simple way to run codex-universal with volume mounting


#? Set strict mode for safety
set -euo pipefail

## =============================================================================
#? Script Name: codex_run.sh
#? Aim: Quick Codex Universal Docker Runner
#? Purpose: Provide a simple way to run codex-universal with volume mounting
#? Decision Rationale: Allows ad-hoc container runs with project context
#? Usage: ./codex_run.sh
#? Dependencies: Docker, lsof
#? Last Updated: 2025-07-23 by GitHub Copilot
#? References: codex_start.sh, container run conventions
## =============================================================================

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




# Generic reference-based port allocation and retry logic
# Each service has a static index, port = BASE_PORT + (index*10) + retry
# Supports changing BASE_PORT (default 3000)

BASE_PORT=3000
MAX_RETRIES=10

# Define your services here: name, index, container_port, directory_to_check
SERVICES=(
  "nextjs:0:3000:web"
  "python:1:8000:python"
  "jupyter:2:8888:notebooks"
  # Add more as needed: "servicename:index:container_port:dir"
)

find_free_port_block() {
  local base_port=$1
  local max_retries=$2
  for ((i=0; i<max_retries; i++)); do
    local port=$((base_port + i))
    if lsof -iTCP:"$port" -sTCP:LISTEN -n -P | grep -qE "(LISTEN)"; then
      log_info "Port $port is in use (localhost/0.0.0.0), retrying..."
      continue
    fi
    echo $port
    return 0
  done
  return 1
}

PORT_ARGS=()
declare -A CHOSEN_PORTS

for svc in "${SERVICES[@]}"; do
  IFS=":" read -r name idx cport dir <<< "$svc"
  if [[ -d "$dir" ]]; then
    base_port=$((BASE_PORT + idx * 10))
    host_port=$(find_free_port_block $base_port $MAX_RETRIES)
    if [[ -n "$host_port" ]]; then
      PORT_ARGS+=("-p" "$host_port:$cport")
      CHOSEN_PORTS[$name]=$host_port
      log_info "$name will be mapped to host port $host_port -> container $cport"
    else
      echo -e "\033[0;31m[ERROR]\033[0m No free port found for $name in range $base_port-$((base_port+MAX_RETRIES-1))."
      exit 1
    fi
  fi
done

# Detect and log any other services running in the reference port ranges
log_info "Scanning for other services in reference port ranges..."
for ((block=BASE_PORT; block<BASE_PORT+100; block+=10)); do
  for ((i=0; i<10; i++)); do
    port=$((block + i))
    if lsof -iTCP:"$port" -sTCP:LISTEN -n -P | grep -qE "(LISTEN)"; then
      log_info "Detected service running on port $port (host)"
    fi
  done
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

#? Validation Status: Actively Validated on 2025-07-23
