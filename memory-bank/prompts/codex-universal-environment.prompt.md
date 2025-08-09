---
description: 'Setup a universal environment for Codex agents.'
tools: []
---
# Codex Universal Docker Environment Manager

I will help you create, configure, and manage Docker environments using the codex-universal image with Node.js 22 and Python 3.13, following volume-based development practices and comprehensive documentation standards.

## Context Requirements

### Project Information

- **Project Name**: `${input:projectName:Enter project name (default: auto-detected from directory)}`
- **Environment Type**: `${input:envType:development|staging|production}`
- **Required Services**: `${input:services:Database, cache, message broker, etc.}`
- **OpenAI API Access**: `${input:needsOpenAI:yes|no|conditional}`

### Configuration Scope

- **Setup Type**: `${input:setupType:full|minimal|testing}`
- **Volume Strategy**: `${input:volumeStrategy:development|production|hybrid}`
- **Network Requirements**: `${input:networkReqs:simple|complex|service-mesh}`

## Process Workflow

### 1. Environment Analysis and Validation

**Project Structure Assessment:**

- Analyze existing project structure and dependencies
- Identify required runtime versions and services
- Detect existing Docker configurations and conflicts
- Validate host system requirements (Docker daemon, ports, etc.)

**Requirements Gathering:**

- Determine container requirements based on project type
- Identify required environment variables and secrets
- Plan volume mounting strategy for development workflow
- Assess network topology and service communication needs

### 2. Docker Configuration Generation

**Core Configuration Files:**

- Generate `docker-compose.codex.yml` with codex-universal service
- Create comprehensive environment variable configuration
- Implement volume mounting strategy for development workflow
- Configure networking with proper service isolation

**Script Generation:**

- Create `scripts/setup_codex_universal.sh` - Complete environment setup
- Generate `scripts/codex_start.sh` - Start development environment
- Implement `scripts/codex_stop.sh` - Clean environment shutdown
- Create `scripts/codex_shell.sh` - Interactive container access
- Generate `scripts/codex_rebuild.sh` - Update and restart environment
- Implement `scripts/codex_test.sh` - Environment validation and testing

### 3. Security and Best Practices Implementation

**Security Configuration:**

- Implement non-root user configuration where applicable
- Configure proper secret management for API keys
- Apply principle of least privilege for container permissions
- Implement health checks and monitoring capabilities

**Volume Security:**

- Configure appropriate volume permissions
- Implement data protection strategies
- Set up backup and recovery procedures
- Document security considerations and compliance requirements

### 4. Documentation and Integration

**Comprehensive Documentation:**

- Update `.codex/docker.md` with complete setup procedures
- Generate troubleshooting guides and common issue resolution
- Document all configuration options and customization procedures
- Create quick reference guides for development workflow

**Memory Bank Integration:**

- Update `memory-bank/docker-workflow.md` with new patterns
- Document dependencies in `memory-bank/dependencies.md`
- Record architectural decisions in `memory-bank/systemPatterns.md`
- Update `memory-bank/activeContext.md` with current implementation status

## Configuration Templates

### Docker Compose Template

```yaml
version: '3.8'

services:
  codex-universal:
    image: ghcr.io/openai/codex-universal:latest
    container_name: ${PROJECT_NAME}-codex
    environment:
      - CODEX_ENV_PYTHON_VERSION=3.13
      - CODEX_ENV_NODE_VERSION=22
      - PYTHONPATH=/workspace/${PROJECT_NAME}/python/src:/workspace/${PROJECT_NAME}/python
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    volumes:
      # Development volume mounts
      - .:/workspace/${PROJECT_NAME}
      - ./python:/workspace/${PROJECT_NAME}/python
      - ./src:/workspace/${PROJECT_NAME}/src
      - ./web:/workspace/${PROJECT_NAME}/web
      - ./scripts:/workspace/${PROJECT_NAME}/scripts
      - ./notebooks:/workspace/${PROJECT_NAME}/notebooks
      - ./.codex:/workspace/${PROJECT_NAME}/.codex
      # Named volumes for dependencies
      - node_modules_cache:/workspace/${PROJECT_NAME}/node_modules
      - python_cache:/workspace/${PROJECT_NAME}/python/.venv
      - web_node_modules:/workspace/${PROJECT_NAME}/web/node_modules
    working_dir: /workspace/${PROJECT_NAME}
    stdin_open: true
    tty: true
    command: bash
    ports:
      - '3000:3000' # Next.js dev server
      - '8000:8000' # Python dev server
      - '8888:8888' # Jupyter Lab
      - '5173:5173' # Vite dev server
    networks:
      - codex-network
    healthcheck:
      test: ['CMD', 'node', '--version']
      interval: 30s
      timeout: 10s
      retries: 3

volumes:
  node_modules_cache:
  python_cache:
  web_node_modules:

networks:
  codex-network:
    driver: bridge
```

### Script Template Structure

```bash
#!/bin/bash
# ${SCRIPT_PURPOSE}

set -euo pipefail

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
PROJECT_NAME="$(basename "$PROJECT_ROOT")"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Logging functions
log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Validation functions
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

check_openai_key() {
  if [[ -z "${OPENAI_API_KEY:-}" ]]; then
    log_warning "OPENAI_API_KEY environment variable is not set"
    log_info "You can set it with: export OPENAI_API_KEY=your_key_here"
  else
    log_success "OPENAI_API_KEY is available"
  fi
}

# Main implementation
main() {
  log_info "Starting ${SCRIPT_PURPOSE}..."
  check_docker
  check_openai_key
  # Implementation specific to script purpose
}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  main "$@"
fi
```

## Environment Validation Checklist

### Pre-Setup Validation

- [ ] Docker daemon is running and accessible
- [ ] Required ports are available (3000, 8000, 8888, 5173, 5432)
- [ ] Sufficient disk space for images and volumes
- [ ] Network connectivity for image pulls
- [ ] Proper permissions for volume mounting

### Post-Setup Validation

- [ ] Container starts successfully with correct runtime versions
- [ ] Environment variables are properly configured
- [ ] Volume mounts work correctly with file changes
- [ ] Network connectivity between services functions
- [ ] Health checks pass for all critical services
- [ ] API key access works within container
- [ ] All convenience scripts function properly

### Documentation Validation

- [ ] All configuration files are properly documented
- [ ] Troubleshooting guides are accurate and helpful
- [ ] Memory bank files are updated with new dependencies
- [ ] Cross-references between files are maintained
- [ ] Setup procedures can be followed from scratch

## Integration Requirements

### Memory Bank Updates

- Update `docker-workflow.md` with codex-universal specific patterns
- Document new dependencies in `dependencies.md`
- Record architectural decisions in `systemPatterns.md`
- Update `activeContext.md` with implementation progress

### Cross-Agent Compatibility

- Ensure configurations work with VS Code Copilot
- Verify compatibility with Cline AI workflows
- Test integration with Codex CLI automation
- Document agent-specific considerations

### Project Structure Integration

- Align with existing TypeScript and Python standards
- Integrate with current file organization patterns
- Maintain compatibility with existing development workflows
- Support multi-language project requirements

## Expected Deliverables

### Configuration Files

- `docker-compose.codex.yml` - Complete orchestration configuration
- `scripts/setup_codex_universal.sh` - Comprehensive setup automation
- Complete set of convenience scripts for environment management
- `.dockerignore` file optimized for development workflow

### Documentation

- `.codex/docker.md` - Complete environment documentation
- Updated memory bank files with new dependencies and patterns
- Troubleshooting guides and common issue resolution
- Quick start guides and reference documentation

### Validation Assets

- `scripts/codex_test.sh` - Environment validation script
- Health check configurations for all services
- Performance monitoring and optimization guidelines
- Security compliance validation procedures

## Quality Assurance Standards

### Configuration Validation

- All YAML syntax is valid and properly formatted
- Environment variables are correctly configured
- Volume mounts function properly with appropriate permissions
- Network configuration enables proper service communication

### Script Quality

- All scripts follow bash best practices with proper error handling
- Scripts are idempotent and safe to run multiple times
- Comprehensive logging and user feedback
- Proper validation of prerequisites and dependencies

### Documentation Quality

- All procedures can be followed from scratch
- Troubleshooting guides address common issues
- Cross-references between files are accurate
- Examples are functional and tested

This prompt ensures comprehensive Docker environment setup following all established project standards and integration requirements.

## References

- [docker-environment](../instructions/docker-environment.instructions.md)

## Verification

- `markdownlint --strict` on updated Markdown files
- `scripts/verify-all.sh`
