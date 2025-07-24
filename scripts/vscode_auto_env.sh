#!/bin/bash

## =============================================================================
#? Script Name: vscode_auto_env.sh
#? Aim: Automatically configure VS Code terminal environment for Python development
#? Purpose: Activate Python virtual environment, set PYTHONPATH, load environment variables, and provide development aliases
#? Decision Rationale: Streamlines VS Code terminal setup to provide immediate Python development readiness with helpful shortcuts
#? Usage: ./vscode_auto_env.sh (typically called automatically by VS Code terminal)
#? Dependencies: Python virtual environment, python/.venv/bin/activate, optional python/.env
#? Last Updated: 2025-07-24 by GitHub Copilot
#? References: python/.venv/, python/.env, notebooks/, WORKSPACE_FOLDER environment variable
## =============================================================================
# VS Code Terminal Auto-setup Script
# This script automatically configures the terminal environment for Python development

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color
echo -e "${GREEN}⌚ DATE NOW:${RED} $(date) ${NC}"

echo -e "${BLUE}🐍 Setting up Python development environment...${NC}"


# Navigate to the workspace root
cd "${WORKSPACE_FOLDER:-$(pwd)}"

# Check if Python virtual environment exists
if [ -f "python/.venv/bin/activate" ]; then
  echo -e "${GREEN}✓ Activating Python virtual environment${NC}"
  source python/.venv/bin/activate

  # Set PYTHONPATH
  export PYTHONPATH="${PWD}/python/src:${PWD}/python:${PYTHONPATH}"

  # Load environment variables if .env exists
  if [ -f "python/.env" ]; then
    echo -e "${GREEN}✓ Loading environment variables from .env${NC}"
    set -a
    source python/.env
    set +a
  fi

  # Display Python info
  echo -e "${GREEN}✓ Python environment ready${NC}"
  echo "  Python: $(python --version)"
  echo "  Virtual env: ${VIRTUAL_ENV}"
  echo "  Working directory: $(pwd)"

  # Add helpful aliases
  alias pytest="python -m pytest"
  alias pip-install="pip install"
  alias pip-freeze="pip freeze > requirements.txt"
  alias start-jupyter="jupyter lab --notebook-dir=./notebooks --ip=0.0.0.0"
  alias run-tests="pytest tests/ -v --cov=src"
  alias lint-code="pylint src/"
  alias format-code="black src/ tests/"
  alias type-check="mypy src/"

  echo -e "${GREEN}✓ Helpful aliases added:${NC}"
  echo "  pytest, pip-install, pip-freeze"
  echo "  start-jupyter, run-tests, lint-code"
  echo "  format-code, type-check"

else
  echo -e "${YELLOW}⚠ Python virtual environment not found${NC}"
  echo "Run: ./scripts/setup_python_env.sh --mode local"
fi

echo -e "${GREEN}🚀 Ready for Python development!${NC}"

#? Validation Status: Actively Validated on 2025-07-24
