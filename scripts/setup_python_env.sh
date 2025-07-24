#!/usr/bin/env bash
set -euo pipefail

## =============================================================================
#? Script Name: setup_python_env.sh
#? Aim: Set up Python development environment with configurable deployment modes
#? Purpose: Provide unified Python environment setup supporting local venv, Docker isolated, and Docker volume modes
#? Decision Rationale: Consolidates multiple scripts to reduce redundancy and provide consistent interface
#? Usage: ./setup_python_env.sh --mode [local|docker_isolated|docker_volume|venv_only]
#? Dependencies: Python 3.13+, Docker (for Docker modes), python/.venv directory
#? Last Updated: 2025-07-23 by GitHub Copilot
#? References: .vscode/tasks.json (Python: Setup Environment), python/README.md
## =============================================================================

#? Validation Status: Actively Validated on 2025-07-23

#==============================================================================
# Script Name: setup_python_env.sh
# Aim: Set up Python development environment with configurable deployment modes
# Purpose: Provide unified Python environment setup supporting local venv, Docker isolated, and Docker volume modes
# Decision Rationale: Consolidates 5 separate scripts to reduce redundancy and provide consistent interface
# Usage: ./setup_python_env.sh --mode [local|docker_isolated|docker_volume|venv_only]
# Dependencies: Python 3.13+, Docker (for Docker modes), python/.venv directory
# Last Updated: 2025-07-23 by GitHub Copilot
# References: .vscode/tasks.json (Python: Setup Environment), python/README.md
#==============================================================================

# Script directory and project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
PYTHON_DIR="$PROJECT_ROOT/python"

# Default values
MODE="${1#--mode=}"
MODE="${MODE:-${ENV_MODE:-local}}"
PYTHON_VERSION="${PYTHON_VERSION:-3.13}"
PROJECT_NAME="${PROJECT_NAME:-vigilant-codex-python}"

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
    --mode)
      MODE="$2"
      shift 2
      ;;
    --mode=*)
      MODE="${1#*=}"
      shift
      ;;
    -m | --version)
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

# Validate MODE
case "$MODE" in
  local | docker_isolated | docker_volume | venv_only)
    log "Environment mode: $MODE"
    ;;
  *)
    error "Invalid mode: $MODE"
    error "Must be one of: local, docker_isolated, docker_volume, venv_only"
    exit 1
    ;;
esac

# Create python directory if it doesn't exist
if [ ! -d "$PYTHON_DIR" ]; then
  log "Creating python directory..."
  mkdir -p "$PYTHON_DIR"
fi

# Export variables for sub-scripts
export MODE
export ENV_MODE="$MODE"  # Backward compatibility
export PYTHON_VERSION
export PROJECT_NAME
export PYTHON_DIR
export PROJECT_ROOT

log "Starting Python environment setup..."
log "Mode: $MODE"
log "Python Version: $PYTHON_VERSION"
log "Project Name: $PROJECT_NAME"
log "Python Directory: $PYTHON_DIR"

# Route to appropriate setup logic
case "$MODE" in
  local)
    log "Setting up local virtual environment..."
    # Inline local setup logic
    if ! command -v python3 &> /dev/null; then
      error "Python 3 is not installed or not in PATH"
      error "Please install Python 3.${PYTHON_VERSION} and try again"
      exit 1
    fi

    # Create virtual environment
    if [ ! -d "$PYTHON_DIR/.venv" ]; then
      log "Creating Python virtual environment..."
      python3 -m venv "$PYTHON_DIR/.venv"
      success "Virtual environment created"
    else
      log "Virtual environment already exists"
    fi

    # Create requirements.txt if it doesn't exist
    if [ ! -f "$PYTHON_DIR/requirements.txt" ]; then
      log "Creating requirements.txt..."
      cat > "$PYTHON_DIR/requirements.txt" << 'EOF'
# Python dependencies for local virtual environment
# Add your project dependencies below

# Example common dependencies:
# requests>=2.28.0
# python-dotenv>=1.0.0
# pytest>=7.0.0
# jupyter>=1.0.0
EOF
      success "Created requirements.txt"
    fi

    # Install dependencies
    log "Installing Python dependencies..."
    source "$PYTHON_DIR/.venv/bin/activate"
    pip install --upgrade pip
    if [ -f "$PYTHON_DIR/requirements.txt" ]; then
      pip install -r "$PYTHON_DIR/requirements.txt"
    fi
    ;;

  venv_only)
    log "Creating Python virtual environment only..."
    if ! command -v python3 &> /dev/null; then
      error "Python 3 is not installed or not in PATH"
      exit 1
    fi

    if [ ! -d "$PYTHON_DIR/.venv" ]; then
      log "Creating Python virtual environment..."
      python3 -m venv "$PYTHON_DIR/.venv"
      success "Virtual environment created"
    else
      log "Virtual environment already exists"
    fi
    ;;

  docker_isolated)
    log "Setting up Docker isolated environment..."
    # Inline Docker isolated setup logic from setup_python_docker_isolated.sh
    if ! command -v docker &> /dev/null; then
      error "Docker is not installed or not in PATH"
      exit 1
    fi

    # Create requirements.txt if it doesn't exist
    if [ ! -f "$PYTHON_DIR/requirements.txt" ]; then
      log "Creating requirements.txt..."
      cat > "$PYTHON_DIR/requirements.txt" << 'EOF'
# Python dependencies for isolated Docker environment
# requests>=2.28.0
# python-dotenv>=1.0.0
# pytest>=7.0.0
EOF
      success "Created requirements.txt"
    fi

    # Create Dockerfile for isolated environment
    if [ ! -f "$PYTHON_DIR/Dockerfile" ]; then
      log "Creating Dockerfile for isolated environment..."
      cat > "$PYTHON_DIR/Dockerfile" << EOF
FROM python:${PYTHON_VERSION}-slim
WORKDIR /app
RUN apt-get update && apt-get install -y build-essential curl git && rm -rf /var/lib/apt/lists/*
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && pip install --no-cache-dir -r requirements.txt
COPY . .
RUN useradd --create-home --shell /bin/bash app && chown -R app:app /app
USER app
CMD ["python", "--version"]
EOF
      success "Created Dockerfile for isolated environment"
    fi
    ;;

  docker_volume)
    log "Setting up Docker volume-mounted environment..."
    # Inline Docker volume setup logic from setup_python_docker_volume.sh
    if ! command -v docker &> /dev/null; then
      error "Docker is not installed or not in PATH"
      exit 1
    fi

    # Create requirements.txt if it doesn't exist
    if [ ! -f "$PYTHON_DIR/requirements.txt" ]; then
      log "Creating requirements.txt..."
      cat > "$PYTHON_DIR/requirements.txt" << 'EOF'
# Python dependencies for volume-mounted Docker environment
# requests>=2.28.0
# python-dotenv>=1.0.0
# pytest>=7.0.0
# jupyter>=1.0.0
EOF
      success "Created requirements.txt"
    fi

    # Create Dockerfile for volume-mounted environment
    if [ ! -f "$PYTHON_DIR/Dockerfile" ]; then
      log "Creating Dockerfile for volume-mounted environment..."
      cat > "$PYTHON_DIR/Dockerfile" << EOF
FROM python:${PYTHON_VERSION}-slim
WORKDIR /app
RUN apt-get update && apt-get install -y build-essential curl git vim nano && rm -rf /var/lib/apt/lists/*
RUN pip install --no-cache-dir --upgrade pip
COPY requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt || echo "No requirements.txt found, skipping..."
RUN useradd --create-home --shell /bin/bash --uid 1000 app && chown -R app:app /app
USER app
ENV PYTHONUNBUFFERED=1 PYTHONDONTWRITEBYTECODE=1 PYTHONPATH=/app
CMD ["bash"]
EOF
      success "Created Dockerfile for volume-mounted environment"
    fi

    # Create docker-compose.yml if docker-compose is available
    if command -v docker-compose &> /dev/null && [ ! -f "$PYTHON_DIR/docker-compose.yml" ]; then
      log "Creating docker-compose.yml..."
      cat > "$PYTHON_DIR/docker-compose.yml" << EOF
version: '3.8'
services:
  python:
    build: .
    container_name: ${PROJECT_NAME}-dev
    volumes:
      - .:/app
      - pip-cache:/home/app/.cache/pip
    environment:
      - PYTHONUNBUFFERED=1
      - PYTHONDONTWRITEBYTECODE=1
      - PYTHONPATH=/app
    env_file:
      - .env
    working_dir: /app
    stdin_open: true
    tty: true
    command: bash
volumes:
  pip-cache:
    driver: local
EOF
      success "Created docker-compose.yml"
    fi
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
ENV_MODE=$MODE
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

success "Python environment setup completed for mode: $MODE"
log "Next steps:"
log "  1. Navigate to the python/ directory"
log "  2. Copy .env.example to .env and update with your values"
log "  3. Follow mode-specific instructions in python/README.md"

case "$MODE" in
  local | venv_only)
    log "  4. Activate the virtual environment: source python/.venv/bin/activate"
    ;;
  docker_isolated)
    log "  4. Build and run the container: docker build -t $PROJECT_NAME python/ && docker run --rm -it $PROJECT_NAME"
    ;;
  docker_volume)
    log "  4. Use docker-compose: cd python/ && docker-compose up"
    ;;
esac
