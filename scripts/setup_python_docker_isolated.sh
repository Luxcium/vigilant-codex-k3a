## =============================================================================
#? Script Name: setup_python_docker_isolated.sh
#? Aim: Configure Docker isolated Python environment
#? Purpose: Create Dockerfile, requirements.txt, and .dockerignore for isolated mode
#? Decision Rationale: Provides complete isolation for Python development
#? Usage: ./setup_python_docker_isolated.sh
#? Dependencies: Docker, Python
#? Last Updated: 2025-07-23 by GitHub Copilot
#? References: python/Dockerfile, python/README.md
## =============================================================================

#? Validation Status: Actively Validated on 2025-07-23

#!/usr/bin/env bash
set -euo pipefail

# ARCHIVED: This script has been consolidated into setup_python_env.sh
echo "This script has been archived and consolidated into setup_python_env.sh"
echo "Use: ./setup_python_env.sh --mode docker_isolated"
echo "Original functionality preserved in archives/setup_python_docker_isolated.sh"
exit 1

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

log "Setting up Docker isolated Python environment..."
log "Python Directory: $PYTHON_DIR"
log "Python Version: $PYTHON_VERSION"
log "Project Name: $PROJECT_NAME"

# Check if Docker is available
if ! command -v docker &> /dev/null; then
  error "Docker is not installed or not in PATH"
  error "Please install Docker and try again"
  exit 1
fi

# Create requirements.txt if it doesn't exist
REQUIREMENTS_FILE="$PYTHON_DIR/requirements.txt"
if [ ! -f "$REQUIREMENTS_FILE" ]; then
  log "Creating requirements.txt..."
  cat > "$REQUIREMENTS_FILE" << EOF
# Python dependencies for isolated Docker environment
# Add your project dependencies below

# Example common dependencies:
# requests>=2.28.0
# python-dotenv>=1.0.0
# pytest>=7.0.0
EOF
  success "Created requirements.txt"
else
  log "requirements.txt already exists"
fi

# Create Dockerfile for isolated environment
DOCKERFILE="$PYTHON_DIR/Dockerfile"
if [ -f "$DOCKERFILE" ]; then
  warn "Dockerfile already exists"
  read -p "Do you want to overwrite it? (y/N): " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    log "Skipping Dockerfile creation"
  else
    rm "$DOCKERFILE"
  fi
fi

if [ ! -f "$DOCKERFILE" ]; then
  log "Creating Dockerfile for isolated environment..."
  cat > "$DOCKERFILE" << EOF
# Python Docker Isolated Environment
FROM python:${PYTHON_VERSION}-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \\
    build-essential \\
    curl \\
    git \\
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better layer caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir --upgrade pip \\
    && pip install --no-cache-dir -r requirements.txt

# Copy all application code
COPY . .

# Create non-root user for security
RUN useradd --create-home --shell /bin/bash app \\
    && chown -R app:app /app
USER app

# Set default command
CMD ["python", "--version"]
EOF
  success "Created Dockerfile for isolated environment"
fi

# Create .dockerignore if it doesn't exist
DOCKERIGNORE="$PYTHON_DIR/.dockerignore"
if [ ! -f "$DOCKERIGNORE" ]; then
  log "Creating .dockerignore..."
  cat > "$DOCKERIGNORE" << EOF
# Docker ignore file for Python isolated environment
.git
.gitignore
.venv
__pycache__
*.pyc
*.pyo
*.pyd
.Python
env
pip-log.txt
pip-delete-this-directory.txt
.tox
.coverage
.coverage.*
.pytest_cache
.cache
nosetests.xml
coverage.xml
*.cover
*.log
.DS_Store
.vscode
.idea
README.md
Dockerfile
.dockerignore
EOF
  success "Created .dockerignore"
else
  log ".dockerignore already exists"
fi

# Update python/README.md with isolated instructions
README_FILE="$PYTHON_DIR/README.md"
log "Updating README.md with Docker isolated instructions..."

cat > "$README_FILE" << EOF
# Python Environment - Docker Isolated Mode

This Python environment is configured for **Docker Isolated** mode, providing complete environment isolation.

## Environment Details

- **Mode:** Docker Isolated
- **Python Version:** ${PYTHON_VERSION}
- **Project Name:** ${PROJECT_NAME}
- **Isolation Level:** Complete (no host dependencies)

## Quick Start

### Build the Docker image:
\`\`\`bash
docker build -t ${PROJECT_NAME} .
\`\`\`

### Run the container:
\`\`\`bash
# Interactive bash session
docker run --rm -it ${PROJECT_NAME} bash

# Run a specific Python script
docker run --rm -it ${PROJECT_NAME} python your_script.py

# Run with environment variables
docker run --rm -it --env-file .env ${PROJECT_NAME} python your_script.py
\`\`\`

## Development Workflow

1. **Make code changes** on your host system
2. **Rebuild the image** to include changes: \`docker build -t ${PROJECT_NAME} .\`
3. **Run the updated container** with your changes

## Environment Variables

Copy \`.env.example\` to \`.env\` and update with your values:
\`\`\`bash
cp .env.example .env
# Edit .env with your settings
\`\`\`

## Adding Dependencies

1. **Edit requirements.txt** to add new packages
2. **Rebuild the Docker image** to install new dependencies
3. **Test the updated environment**

## Advantages of Isolated Mode

- ✅ **Complete isolation** from host system
- ✅ **Reproducible** across all systems
- ✅ **No version conflicts** with host Python
- ✅ **Perfect for CI/CD** and deployment

## Considerations

- ❌ **Slower iteration** (requires rebuild for code changes)
- ❌ **No live editing** without rebuilds
- ❌ **Debugging complexity** (requires container-aware tools)

## Switching Modes

To switch to a different environment mode:

\`\`\`bash
# Switch to local virtual environment
../scripts/setup_python_env.sh --mode local

# Switch to Docker volume-mounted
../scripts/setup_python_env.sh --mode docker_volume
\`\`\`

## Troubleshooting

### Build Issues
- Check Docker is running: \`docker info\`
- Check requirements.txt syntax
- Verify Python version availability

### Runtime Issues
- Check environment variables in .env
- Verify file permissions
- Check container logs: \`docker logs <container_id>\`

## File Structure

\`\`\`
python/
├── Dockerfile              # Container definition
├── .dockerignore          # Files excluded from build
├── requirements.txt       # Python dependencies
├── .env.example          # Environment variable template
├── .env                  # Your environment variables (create from example)
├── README.md             # This file
└── your_code.py          # Your Python application code
\`\`\`

For more information, see:
- Instructions: \`../.github/instructions/python-environment-conditional.instructions.md\`
- Prompt: \`../.github/prompts/python-environment-setup.prompt.md\`
EOF

success "Updated README.md with Docker isolated instructions"

# Build the Docker image to verify everything works
log "Building Docker image to verify setup..."
cd "$PYTHON_DIR"

if docker build -t "$PROJECT_NAME" .; then
  success "Docker image built successfully!"
  log "Testing Python installation..."
  if docker run --rm "$PROJECT_NAME" python --version; then
    success "Python is working correctly in the container"
  else
    warn "Python test failed, but image was built"
  fi
else
  error "Docker build failed"
  exit 1
fi

success "Docker isolated environment setup completed!"
log ""
log "Next steps:"
log "  1. Navigate to the python/ directory: cd python/"
log "  2. Copy .env.example to .env: cp .env.example .env"
log "  3. Edit .env with your environment variables"
log "  4. Add your Python code to the python/ directory"
log "  5. Rebuild when you make changes: docker build -t $PROJECT_NAME ."
log "  6. Run your code: docker run --rm -it $PROJECT_NAME python your_script.py"
