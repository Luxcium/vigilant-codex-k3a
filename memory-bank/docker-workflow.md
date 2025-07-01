# Docker Workflow Documentation
<!-- markdownlint-disable MD013 MD022 MD032 MD041 MD009 -->

## Purpose

This document provides a comprehensive workflow for creating and managing Docker containers with exotic Docker Compose approaches and advanced configuration patterns. It is designed to be replicated by AI agents (Cline AI, Codex CLI, VS Code Copilot) and human collaborators following the established Memory Bank protocols.

## Scope

- **Exotic Docker Compose Patterns**: Advanced orchestration, networking, and service discovery
- **Multi-Environment Configurations**: Development, staging, and production variants
- **Security-First Container Design**: Non-root users, minimal images, vulnerability scanning
- **AI Agent Integration**: Prompt files, instruction files, and automated workflow generation
- **Infrastructure-as-Code**: Version-controlled, reproducible container configurations

## Core Requirements

- All Docker configurations must be version-controlled and script-generated
- Containers must implement security best practices (non-root users, minimal base images)
- Documentation must enable complete workflow replication by any AI agent
- Follow infrastructure-as-code principles with automated validation
- Integrate with Memory Bank cross-referencing and dependency tracking
- Support multi-language project structure (TypeScript, Python, Jupyter notebooks)

## Enhanced Four-Phase Workflow

### Phase 1: Design & Planning
**Objective**: Define comprehensive container requirements and exotic patterns

**Planning Checklist:**
- ❏ Target runtime versions (Node.js, Python, etc.)
- ❏ Required services (databases, caches, message brokers)
- ❏ Network strategy (bridge, overlay, host, custom drivers)
- ❏ Volume strategy (bind mounts, named volumes, tmpfs)
- ❏ Security considerations (non-root users, image scanning)
- ❏ Environment-specific requirements (dev vs staging vs production)
- ❏ Health check and monitoring strategies
- ❏ Scaling and deployment patterns

**Exotic Pattern Considerations:**
- Custom network drivers and service mesh integration
- Advanced health checks with recovery mechanisms
- Dynamic service discovery and load balancing
- Container intercept points for debugging and monitoring
- Multi-stage builds with optimization strategies

### Phase 2: Container Creation
**Objective**: Implement secure, optimized containers with development and production variants

**Security-First Approach:**
- Use minimal base images (`-alpine`, `-slim` variants)
- Run containers as non-root users
- Implement multi-stage builds for production optimization
- Include vulnerability scanning in build process
- Apply principle of least privilege

**Development vs Production Variants:**
- `Dockerfile.dev` - Hot reload, debugging tools, development dependencies
- `Dockerfile.prod` - Optimized, minimal, production-ready
- Environment-specific configurations and overrides
- Automated testing and validation for both variants

### Phase 3: Exotic Docker Compose Implementation
**Objective**: Implement advanced orchestration patterns and exotic configurations

**Advanced Patterns:**
- **Named Networks**: Custom bridge and overlay networks with labels
- **Compose Overrides**: Cascading configuration files (`docker-compose.override.yml`)
- **Health Check Orchestration**: Advanced health validation and dependency management
- **Service Discovery**: Dynamic service registration and discovery patterns
- **Load Balancing**: HAProxy, Nginx, Traefik integration
- **Scaling Strategies**: Auto-scaling based on metrics and resource utilization
- **Volume Management**: Advanced volume patterns and data persistence strategies

**Exotic Configuration Examples:**
- Container intercept configurations for network traffic analysis
- Custom init systems and signal handling
- Advanced logging and monitoring integration
- Secret management and secure configuration injection
- Multi-architecture builds and deployment

### Phase 4: Documentation & AI Agent Integration
**Objective**: Create comprehensive documentation and AI agent automation

**Documentation Requirements:**
- Complete setup and replication procedures
- Troubleshooting guides with common issues and solutions
- Security validation and compliance checklists
- Performance optimization guidelines
- Integration with existing project structure

**AI Agent Integration:**
- **Prompt Files**: Generate Docker configurations based on project context
- **Instruction Files**: Coding standards for containerized applications
- **Memory Bank Updates**: Track dependencies and architectural decisions
- **Script Automation**: Idempotent container setup and management via `scripts/setup_python_docker.sh`, `scripts/setup_python_local.sh`, and related helpers
- **Cross-Agent Collaboration**: Workflows spanning multiple AI agents

### Bootstrapping Codex CLI Environment Locally

To bootstrap a local Codex CLI environment with Node.js 22 and Python 3.13:

1. Ensure Docker is installed and running.
2. Run the provided `scripts/run_codex_cli.sh` script, optionally passing your project directory:

   ```bash
   bash scripts/run_codex_cli.sh /path/to/your/project
   ```

   This script will:
   - Pull the latest `ghcr.io/openai/codex-universal:latest` image.
   - Mount your project directory at `/workspace/<project_name>`.
   - Set `CODEX_ENV_PYTHON_VERSION=3.13` and `CODEX_ENV_NODE_VERSION=22`.
   - Start an interactive shell in the container at your project root.

## Dependencies

- **Depends On:** 
  - projectbrief.md (core project requirements)
  - systemPatterns.md (architectural patterns)
  - techContext.md (technical context)
  - activeContext.md (current implementation focus)
  - progress.md (feature status tracking)
- **Required By:**
  - Development environment setup
  - Production deployment procedures
  - CI/CD pipeline configuration
  - dependencies.md (dependency map)
- **Why This Order:** Docker workflow must align with project architecture and technical requirements
- **Impact Analysis:** Updates to this workflow influence environment setup scripts and deployment pipelines across the project

## Next Steps

1. Define exotic Docker Compose approach specifics
2. Create container architecture diagrams
3. Implement base Docker configurations
4. Document step-by-step replication procedures

---

**Last Updated:** 2025-07-01  
**Status:** Added Bootstrapping Codex CLI Environment instructions  
**Next Review:** After exotic Docker Compose approach definition
