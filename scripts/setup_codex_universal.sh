#!/bin/bash

# Setup Codex Universal Docker Environment
# This script sets up a Docker environment using the codex-universal image
# with Node.js 22 and Python 3.13, using volumes instead of COPY operations

set -euo pipefail

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
PROJECT_NAME="$(basename "$PROJECT_ROOT")"
IMAGE_NAME="ghcr.io/openai/codex-universal:latest"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is available
check_docker() {
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed or not in PATH"
        exit 1
    fi

    if ! docker info &> /dev/null; then
        log_error "Docker daemon is not running"
        exit 1
    fi
}

# Check if OpenAI API key is available
check_openai_key() {
    if [[ -z "${OPENAI_API_KEY:-}" ]]; then
        log_warning "OPENAI_API_KEY environment variable is not set"
        log_info "The container will start without the OpenAI API key"
        log_info "You can set it later with: export OPENAI_API_KEY=your_key_here"
    else
        log_success "OPENAI_API_KEY is available and will be passed to the container"
    fi
}

# Pull the latest codex-universal image
pull_image() {
    log_info "Pulling latest codex-universal image..."
    if docker pull "$IMAGE_NAME"; then
        log_success "Successfully pulled $IMAGE_NAME"
    else
        log_error "Failed to pull $IMAGE_NAME"
        exit 1
    fi
}

# Create .codex directory if it doesn't exist
setup_codex_directory() {
    local codex_dir="$PROJECT_ROOT/.codex"
    
    if [[ ! -d "$codex_dir" ]]; then
        log_info "Creating .codex directory..."
        mkdir -p "$codex_dir"
        
        # Create basic config if it doesn't exist
        if [[ ! -f "$codex_dir/config.json" ]]; then
            cat > "$codex_dir/config.json" << EOF
{
  "model": "gpt-4.1-mini",
  "approvalMode": "suggest",
  "fullAutoErrorMode": "ask-user",
  "notify": true,
  "INPUT_CODEX_HOME": "."
}
EOF
        fi
        
        log_success "Created .codex directory and configuration"
    else
        log_info ".codex directory already exists"
    fi
}

# Create Docker Compose file for codex-universal
create_docker_compose() {
    local compose_file="$PROJECT_ROOT/docker-compose.codex.yml"
    
    log_info "Creating Docker Compose file for codex-universal..."
    
    cat > "$compose_file" << EOF
version: '3.8'

services:
  codex-universal:
    image: ghcr.io/openai/codex-universal:latest
    container_name: ${PROJECT_NAME}-codex
    environment:
      - CODEX_ENV_PYTHON_VERSION=3.13
      - CODEX_ENV_NODE_VERSION=22
      - PYTHONPATH=/workspace/${PROJECT_NAME}/python/src:/workspace/${PROJECT_NAME}/python
      - OPENAI_API_KEY=\${OPENAI_API_KEY}
    volumes:
      # Mount the entire project as a volume
      - .:/workspace/${PROJECT_NAME}
      # Mount specific directories for better performance
      - ./python:/workspace/${PROJECT_NAME}/python
      - ./src:/workspace/${PROJECT_NAME}/src
      - ./web:/workspace/${PROJECT_NAME}/web
      - ./scripts:/workspace/${PROJECT_NAME}/scripts
      - ./notebooks:/workspace/${PROJECT_NAME}/notebooks
      - ./.codex:/workspace/${PROJECT_NAME}/.codex
      # Create named volumes for node_modules and Python cache
      - node_modules_cache:/workspace/${PROJECT_NAME}/node_modules
      - python_cache:/workspace/${PROJECT_NAME}/python/.venv
      - web_node_modules:/workspace/${PROJECT_NAME}/web/node_modules
    working_dir: /workspace/${PROJECT_NAME}
    stdin_open: true
    tty: true
    command: bash
    ports:
      - "3000:3000"  # Next.js dev server
      - "8000:8000"  # Python dev server
      - "8888:8888"  # Jupyter Lab
      - "5173:5173"  # Vite dev server
    networks:
      - codex-network

  # Optional: Include existing database if needed
  db:
    image: postgres:14-alpine
    container_name: ${PROJECT_NAME}-db
    restart: unless-stopped
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: codexapp
    ports:
      - "5432:5432"
    volumes:
      - db_data:/var/lib/postgresql/data
    networks:
      - codex-network

volumes:
  node_modules_cache:
  python_cache:
  web_node_modules:
  db_data:

networks:
  codex-network:
    driver: bridge
EOF

    log_success "Created docker-compose.codex.yml"
}

# Create convenience scripts
create_convenience_scripts() {
    local scripts_dir="$PROJECT_ROOT/scripts"
    
    # Script to start the environment
    cat > "$scripts_dir/codex_start.sh" << 'EOF'
#!/bin/bash
# Start Codex Universal Environment

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Check for OpenAI API key
if [[ -z "${OPENAI_API_KEY:-}" ]]; then
    echo "Warning: OPENAI_API_KEY environment variable is not set"
    echo "The container will start without the OpenAI API key"
    echo "You can set it with: export OPENAI_API_KEY=your_key_here"
fi

echo "Starting Codex Universal environment..."
cd "$PROJECT_ROOT"

# Start services
docker-compose -f docker-compose.codex.yml up -d

echo "Environment started. Use 'scripts/codex_shell.sh' to enter the container."
echo "Available ports:"
echo "  - 3000: Next.js development server"
echo "  - 8000: Python development server"
echo "  - 8888: Jupyter Lab"
echo "  - 5173: Vite development server"
echo "  - 5432: PostgreSQL database"
EOF

    # Script to enter the container shell
    cat > "$scripts_dir/codex_shell.sh" << 'EOF'
#!/bin/bash
# Enter Codex Universal Container Shell

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
PROJECT_NAME="$(basename "$PROJECT_ROOT")"

echo "Entering Codex Universal container..."
docker exec -it "${PROJECT_NAME}-codex" bash
EOF

    # Script to stop the environment
    cat > "$scripts_dir/codex_stop.sh" << 'EOF'
#!/bin/bash
# Stop Codex Universal Environment

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "Stopping Codex Universal environment..."
cd "$PROJECT_ROOT"

docker-compose -f docker-compose.codex.yml down
echo "Environment stopped."
EOF

    # Script to rebuild and restart
    cat > "$scripts_dir/codex_rebuild.sh" << 'EOF'
#!/bin/bash
# Rebuild and Restart Codex Universal Environment

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Check for OpenAI API key
if [[ -z "${OPENAI_API_KEY:-}" ]]; then
    echo "Warning: OPENAI_API_KEY environment variable is not set"
    echo "The container will start without the OpenAI API key"
fi

echo "Rebuilding Codex Universal environment..."
cd "$PROJECT_ROOT"

# Pull latest image
docker pull ghcr.io/openai/codex-universal:latest

# Stop existing containers
docker-compose -f docker-compose.codex.yml down

# Start with fresh containers
docker-compose -f docker-compose.codex.yml up -d --force-recreate

echo "Environment rebuilt and restarted."
EOF

    # Make scripts executable
    chmod +x "$scripts_dir/codex_start.sh"
    chmod +x "$scripts_dir/codex_shell.sh"
    chmod +x "$scripts_dir/codex_stop.sh"
    chmod +x "$scripts_dir/codex_rebuild.sh"
    
    log_success "Created convenience scripts"
}

# Create .dockerignore for better performance
create_dockerignore() {
    local dockerignore_file="$PROJECT_ROOT/.dockerignore"
    
    if [[ ! -f "$dockerignore_file" ]]; then
        log_info "Creating .dockerignore file..."
        
        cat > "$dockerignore_file" << EOF
# Version control
.git
.gitignore

# Dependencies
node_modules
*/node_modules
**/.venv
**/venv

# Build outputs
dist
build
coverage
.next

# Cache directories
.cache
.npm
.yarn
__pycache__
*.pyc
.pytest_cache

# IDE and editor files
.vscode
.idea
*.swp
*.swo

# OS generated files
.DS_Store
Thumbs.db

# Logs
*.log
logs

# Environment files
.env
.env.local
.env.*.local

# Temporary files
tmp
temp
*.tmp
EOF
        
        log_success "Created .dockerignore file"
    else
        log_info ".dockerignore already exists"
    fi
}

# Update .codex/instructions.md with Docker information
update_codex_instructions() {
    local codex_instructions="$PROJECT_ROOT/.codex/instructions.md"
    
    if [[ -f "$codex_instructions" ]]; then
        log_info "Updating .codex/instructions.md with Docker environment information..."
        
        # Check if Docker section already exists
        if ! grep -q "## Docker Environment" "$codex_instructions"; then
            cat >> "$codex_instructions" << EOF

## Docker Environment

This project uses the codex-universal Docker image for development with:
- Node.js 22
- Python 3.13
- All necessary tools pre-installed

### Quick Start Commands:
- \`scripts/codex_start.sh\` - Start the development environment
- \`scripts/codex_shell.sh\` - Enter the container shell
- \`scripts/codex_stop.sh\` - Stop the environment
- \`scripts/codex_rebuild.sh\` - Rebuild and restart

### Environment Variables:
- CODEX_ENV_PYTHON_VERSION=3.13
- CODEX_ENV_NODE_VERSION=22
- OPENAI_API_KEY=\${OPENAI_API_KEY} (passed from host environment)

### Mounted Volumes:
- Project root mounted to /workspace/$(basename \$PWD)
- Separate volumes for node_modules and Python virtual environments
- Direct access to all source code without COPY operations

### Available Ports:
- 3000: Next.js development server
- 8000: Python development server  
- 8888: Jupyter Lab
- 5173: Vite development server
- 5432: PostgreSQL database
EOF
            log_success "Updated .codex/instructions.md"
        else
            log_info "Docker section already exists in .codex/instructions.md"
        fi
    fi
}

# Main execution
main() {
    log_info "Setting up Codex Universal Docker environment for $PROJECT_NAME"
    
    check_docker
    check_openai_key
    setup_codex_directory
    pull_image
    create_docker_compose
    create_convenience_scripts
    create_dockerignore
    update_codex_instructions
    
    log_success "Codex Universal environment setup complete!"
    echo
    log_info "To get started:"
    echo "  1. Run: scripts/codex_start.sh"
    echo "  2. Enter container: scripts/codex_shell.sh"
    echo "  3. Verify versions: node --version && python --version"
    echo
    log_info "The environment uses volumes instead of COPY operations for better development experience."
}

# Run main function if script is executed directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
