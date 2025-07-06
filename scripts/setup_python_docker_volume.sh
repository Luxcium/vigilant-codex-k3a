#!/bin/bash
# Python Docker Volume-Mounted Environment Setup
# Creates a Docker environment with volume mounting for live code editing

set -e

# Import environment variables from main script
PYTHON_DIR="${PYTHON_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../python" && pwd)}"
PYTHON_VERSION="${PYTHON_VERSION:-3.11}"
PROJECT_NAME="${PROJECT_NAME:-my-python-app}"

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

log "Setting up Docker volume-mounted Python environment..."
log "Python Directory: $PYTHON_DIR"
log "Python Version: $PYTHON_VERSION"
log "Project Name: $PROJECT_NAME"

# Check if Docker is available
if ! command -v docker &> /dev/null; then
  error "Docker is not installed or not in PATH"
  error "Please install Docker and try again"
  exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
  warn "docker-compose not found, will use docker run commands instead"
  USE_COMPOSE=false
else
  USE_COMPOSE=true
  log "docker-compose found, will create compose configuration"
fi

# Create requirements.txt if it doesn't exist
REQUIREMENTS_FILE="$PYTHON_DIR/requirements.txt"
if [ ! -f "$REQUIREMENTS_FILE" ]; then
  log "Creating requirements.txt..."
  cat > "$REQUIREMENTS_FILE" << EOF
# Python dependencies for volume-mounted Docker environment
# Add your project dependencies below

# Example common dependencies:
# requests>=2.28.0
# python-dotenv>=1.0.0
# pytest>=7.0.0
# jupyter>=1.0.0
EOF
  success "Created requirements.txt"
else
  log "requirements.txt already exists"
fi

# Create Dockerfile for volume-mounted environment
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
  log "Creating Dockerfile for volume-mounted environment..."
  cat > "$DOCKERFILE" << EOF
# Python Docker Volume-Mounted Environment
FROM python:${PYTHON_VERSION}-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \\
    build-essential \\
    curl \\
    git \\
    vim \\
    nano \\
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip
RUN pip install --no-cache-dir --upgrade pip

# Copy requirements and install dependencies
# Note: requirements.txt will be available via volume mount
# but we install a base set here for container functionality
COPY requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt || echo "No requirements.txt found, skipping..."

# Create non-root user for better file permissions with volume mounts
RUN useradd --create-home --shell /bin/bash --uid 1000 app \\
    && chown -R app:app /app

# Switch to non-root user
USER app

# Set environment variables for better volume mount experience
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONPATH=/app

# Default command - keep container running for interactive use
CMD ["bash"]
EOF
  success "Created Dockerfile for volume-mounted environment"
fi

# Create docker-compose.yml if docker-compose is available
if [ "$USE_COMPOSE" = true ]; then
  COMPOSE_FILE="$PYTHON_DIR/docker-compose.yml"
  if [ -f "$COMPOSE_FILE" ]; then
    warn "docker-compose.yml already exists"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
      log "Skipping docker-compose.yml creation"
    else
      rm "$COMPOSE_FILE"
    fi
  fi

  if [ ! -f "$COMPOSE_FILE" ]; then
    log "Creating docker-compose.yml..."
    cat > "$COMPOSE_FILE" << EOF
version: '3.8'

services:
  python:
    build: .
    container_name: ${PROJECT_NAME}-dev
    volumes:
      # Mount the entire python directory to /app in container
      - .:/app
      # Optional: Mount a separate volume for pip cache
      - pip-cache:/home/app/.cache/pip
    environment:
      # Load environment variables from .env file
      - PYTHONUNBUFFERED=1
      - PYTHONDONTWRITEBYTECODE=1
      - PYTHONPATH=/app
    env_file:
      - .env
    working_dir: /app
    # Keep container running for interactive development
    stdin_open: true
    tty: true
    # Optionally expose ports (uncomment and modify as needed)
    # ports:
    #   - "8000:8000"  # FastAPI/Flask development server
    #   - "8888:8888"  # Jupyter notebook
    command: bash

volumes:
  pip-cache:
    driver: local
EOF
    success "Created docker-compose.yml"
  fi
fi

# Create .dockerignore if it doesn't exist
DOCKERIGNORE="$PYTHON_DIR/.dockerignore"
if [ ! -f "$DOCKERIGNORE" ]; then
  log "Creating .dockerignore..."
  cat > "$DOCKERIGNORE" << EOF
# Docker ignore file for Python volume-mounted environment
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
# Note: We don't ignore .env here since it's needed for volume mount
README.md
Dockerfile
.dockerignore
docker-compose.yml
EOF
  success "Created .dockerignore"
else
  log ".dockerignore already exists"
fi

# Update python/README.md with volume-mounted instructions
README_FILE="$PYTHON_DIR/README.md"
log "Updating README.md with Docker volume-mounted instructions..."

COMPOSE_INSTRUCTIONS=""
if [ "$USE_COMPOSE" = true ]; then
  COMPOSE_INSTRUCTIONS="
## Using Docker Compose (Recommended)

### Start the development environment:
\`\`\`bash
docker-compose up -d
\`\`\`

### Enter the container for interactive development:
\`\`\`bash
docker-compose exec python bash
\`\`\`

### Run Python scripts:
\`\`\`bash
# From outside the container
docker-compose exec python python your_script.py

# From inside the container (after exec bash)
python your_script.py
\`\`\`

### Stop the environment:
\`\`\`bash
docker-compose down
\`\`\`"
else
  COMPOSE_INSTRUCTIONS="
## Using Docker Run Commands

Since docker-compose is not available, use these docker run commands:"
fi

cat > "$README_FILE" << EOF
# Python Environment - Docker Volume-Mounted Mode

This Python environment is configured for **Docker Volume-Mounted** mode, providing container isolation with live code editing.

## Environment Details

- **Mode:** Docker Volume-Mounted
- **Python Version:** ${PYTHON_VERSION}
- **Project Name:** ${PROJECT_NAME}
- **Volume Mounting:** Live sync between host and container

$COMPOSE_INSTRUCTIONS

## Using Docker Run (Alternative)

### Build the image:
\`\`\`bash
docker build -t ${PROJECT_NAME} .
\`\`\`

### Run with volume mount:
\`\`\`bash
# Interactive development session
docker run --rm -it -v \$(pwd):/app -w /app --env-file .env ${PROJECT_NAME} bash

# Run a specific script
docker run --rm -v \$(pwd):/app -w /app --env-file .env ${PROJECT_NAME} python your_script.py

# Run with port forwarding (for web apps)
docker run --rm -it -v \$(pwd):/app -w /app -p 8000:8000 --env-file .env ${PROJECT_NAME} bash
\`\`\`

## Development Workflow

1. **Edit code** on your host system using your favorite editor/IDE
2. **Changes are immediately reflected** in the container (no rebuild needed)
3. **Run/test** your code from within the container
4. **Install new dependencies** by updating requirements.txt and rebuilding

## Environment Variables

Copy \`.env.example\` to \`.env\` and update with your values:
\`\`\`bash
cp .env.example .env
# Edit .env with your settings
\`\`\`

## Adding Dependencies

1. **Edit requirements.txt** to add new packages
2. **Rebuild the image** to install new dependencies:
   \`\`\`bash
   docker-compose build
   # OR
   docker build -t ${PROJECT_NAME} .
   \`\`\`
3. **Restart the container** to use new dependencies

## File Permissions

This setup uses a non-root user (uid 1000) to avoid file permission issues with volume mounts. If you encounter permission problems:

1. **Check your host user ID:** \`id -u\`
2. **If different from 1000, rebuild with your UID:**
   \`\`\`bash
   docker build --build-arg USER_ID=\$(id -u) -t ${PROJECT_NAME} .
   \`\`\`

## Advantages of Volume-Mounted Mode

- ✅ **Live code editing** without rebuilds
- ✅ **Container isolation** for dependencies
- ✅ **IDE integration** works with host files
- ✅ **Fast iteration** cycles

## Considerations

- ❌ **File permission complexity** on some systems
- ❌ **Performance overhead** for file I/O intensive operations
- ❌ **Platform differences** (Windows vs Linux file systems)

## Switching Modes

To switch to a different environment mode:

\`\`\`bash
# Switch to local virtual environment
../scripts/setup_python_env.sh --mode local

# Switch to Docker isolated
../scripts/setup_python_env.sh --mode docker_isolated
\`\`\`

## Troubleshooting

### Volume Mount Issues
- Ensure Docker has permission to access your project directory
- Check file permissions: \`ls -la\`
- Try running container as root: \`docker run --user root ...\`

### Container Issues
- Check if container is running: \`docker ps\`
- View container logs: \`docker-compose logs\` or \`docker logs <container_id>\`
- Rebuild if needed: \`docker-compose build --no-cache\`

## File Structure

\`\`\`
python/
├── Dockerfile              # Container definition
├── docker-compose.yml     # Compose configuration (if available)
├── .dockerignore          # Files excluded from build context
├── requirements.txt       # Python dependencies
├── .env.example          # Environment variable template
├── .env                  # Your environment variables (create from example)
├── README.md             # This file
└── your_code.py          # Your Python application code (live-edited)
\`\`\`

For more information, see:
- Instructions: \`../.github/instructions/python-environment-conditional.instructions.md\`
- Prompt: \`../.github/prompts/python-environment-setup.prompt.md\`
EOF

success "Updated README.md with Docker volume-mounted instructions"

# Build the Docker image
log "Building Docker image..."
cd "$PYTHON_DIR"

if docker build -t "$PROJECT_NAME" .; then
  success "Docker image built successfully!"

  # Test the setup
  log "Testing volume mount functionality..."
  if [ "$USE_COMPOSE" = true ]; then
    log "Testing with docker-compose..."
    if docker-compose run --rm python python --version; then
      success "Docker compose setup is working correctly"
    else
      warn "Docker compose test failed, but image was built"
    fi
  else
    log "Testing with docker run..."
    if docker run --rm -v "$(pwd):/app" -w /app "$PROJECT_NAME" python --version; then
      success "Volume mount setup is working correctly"
    else
      warn "Volume mount test failed, but image was built"
    fi
  fi
else
  error "Docker build failed"
  exit 1
fi

success "Docker volume-mounted environment setup completed!"
log ""
log "Next steps:"
log "  1. Navigate to the python/ directory: cd python/"
log "  2. Copy .env.example to .env: cp .env.example .env"
log "  3. Edit .env with your environment variables"
log "  4. Add your Python code to the python/ directory"

if [ "$USE_COMPOSE" = true ]; then
  log "  5. Start development environment: docker-compose up -d"
  log "  6. Enter container for development: docker-compose exec python bash"
else
  log "  5. Run development container: docker run --rm -it -v \$(pwd):/app -w /app --env-file .env $PROJECT_NAME bash"
fi

log "  7. Your code changes will be immediately reflected in the container!"
