#!/bin/bash
# Python Environment Setup - Main Entry Script
# Handles conditional setup based on ENV_MODE parameter

set -e

# Script directory and project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
PYTHON_DIR="$PROJECT_ROOT/python"

# Default values
ENV_MODE="${ENV_MODE:-local}"
PYTHON_VERSION="${PYTHON_VERSION:-3.11}"
PROJECT_NAME="${PROJECT_NAME:-my-python-app}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
  echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

warn() {
  echo -e "${YELLOW}[WARNING]${NC} $1"
}

error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

success() {
  echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# Usage function
usage() {
  cat << EOF
Usage: $0 [OPTIONS]

Python Environment Setup Script

Options:
    -m, --mode MODE         Environment mode: local, docker_isolated, docker_volume
    -v, --version VERSION   Python version (default: 3.11)
    -n, --name NAME         Project name for containers (default: my-python-app)
    -h, --help             Show this help message

Environment Variables:
    ENV_MODE               Same as --mode
    PYTHON_VERSION         Same as --version
    PROJECT_NAME           Same as --name

Examples:
    $0 --mode local
    $0 --mode docker_volume --version 3.12 --name my-project
    ENV_MODE=docker_isolated $0

EOF
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    -m | --mode)
      ENV_MODE="$2"
      shift 2
      ;;
    -v | --version)
      PYTHON_VERSION="$2"
      shift 2
      ;;
    -n | --name)
      PROJECT_NAME="$2"
      shift 2
      ;;
    -h | --help)
      usage
      exit 0
      ;;
    *)
      error "Unknown option: $1"
      usage
      exit 1
      ;;
  esac
done

# Validate ENV_MODE
case "$ENV_MODE" in
  local | docker_isolated | docker_volume)
    log "Environment mode: $ENV_MODE"
    ;;
  *)
    error "Invalid ENV_MODE: $ENV_MODE"
    error "Must be one of: local, docker_isolated, docker_volume"
    exit 1
    ;;
esac

# Create python directory if it doesn't exist
if [ ! -d "$PYTHON_DIR" ]; then
  log "Creating python directory..."
  mkdir -p "$PYTHON_DIR"
fi

# Export variables for sub-scripts
export ENV_MODE
export PYTHON_VERSION
export PROJECT_NAME
export PYTHON_DIR
export PROJECT_ROOT

log "Starting Python environment setup..."
log "Mode: $ENV_MODE"
log "Python Version: $PYTHON_VERSION"
log "Project Name: $PROJECT_NAME"
log "Python Directory: $PYTHON_DIR"

# Route to appropriate setup script
case "$ENV_MODE" in
  local)
    log "Setting up local virtual environment..."
    "$SCRIPT_DIR/setup_python_local.sh"
    ;;
  docker_isolated)
    log "Setting up Docker isolated environment..."
    "$SCRIPT_DIR/setup_python_docker_isolated.sh"
    ;;
  docker_volume)
    log "Setting up Docker volume-mounted environment..."
    "$SCRIPT_DIR/setup_python_docker_volume.sh"
    ;;
esac

# Create or update .env.example if it doesn't exist
ENV_EXAMPLE="$PYTHON_DIR/.env.example"
if [ ! -f "$ENV_EXAMPLE" ]; then
  log "Creating .env.example file..."
  cat > "$ENV_EXAMPLE" << EOF
# Python Environment Variables
# Copy this file to .env and update with your values

# Example application settings
# DEBUG=true
# LOG_LEVEL=info

# Database settings (if needed)
# DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# API keys (never commit real values)
# API_KEY=your_api_key_here
# SECRET_KEY=your_secret_key_here

# Environment mode used for setup
ENV_MODE=$ENV_MODE
PYTHON_VERSION=$PYTHON_VERSION
PROJECT_NAME=$PROJECT_NAME
EOF
  success "Created .env.example"
else
  log ".env.example already exists, skipping creation"
fi

# Update .gitignore if needed
GITIGNORE="$PROJECT_ROOT/.gitignore"
if [ -f "$GITIGNORE" ]; then
  if ! grep -q "python/.venv" "$GITIGNORE"; then
    log "Adding Python-specific entries to .gitignore..."
    cat >> "$GITIGNORE" << EOF

# Python environment files
python/.venv/
python/.env
python/__pycache__/
python/*.pyc
python/*.pyo
python/*.egg-info/
EOF
    success "Updated .gitignore"
  else
    log ".gitignore already contains Python entries"
  fi
fi

success "Python environment setup completed for mode: $ENV_MODE"
log "Next steps:"
log "  1. Navigate to the python/ directory"
log "  2. Copy .env.example to .env and update with your values"
log "  3. Follow mode-specific instructions in python/README.md"

case "$ENV_MODE" in
  local)
    log "  4. Activate the virtual environment: source python/.venv/bin/activate"
    ;;
  docker_isolated)
    log "  4. Build and run the container: docker build -t $PROJECT_NAME python/ && docker run --rm -it $PROJECT_NAME"
    ;;
  docker_volume)
    log "  4. Use docker-compose: cd python/ && docker-compose up"
    ;;
esac
