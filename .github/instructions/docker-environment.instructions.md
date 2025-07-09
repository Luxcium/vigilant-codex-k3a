---
applyTo: '**/docker-compose*.yml,**/Dockerfile*,scripts/codex_*.sh,scripts/setup_codex_universal.sh'
---

# Docker Environment Standards

## Container Configuration Requirements

### Base Image Selection

- Use official images from verified publishers
- Prefer minimal variants (`-alpine`, `-slim`) for production
- Use specific version tags, never `latest` in production
- Document rationale for image choices in comments

### Environment Variable Management

- Pass sensitive variables from host environment using `${VARIABLE_NAME}` syntax
- Required environment variables:
  - `CODEX_ENV_PYTHON_VERSION` - Python version specification
  - `CODEX_ENV_NODE_VERSION` - Node.js version specification
  - `OPENAI_API_KEY` - API access from host environment
  - `PYTHONPATH` - Python module path configuration
- Use `.env` files for development defaults
- Never hardcode secrets in Docker configurations

### Volume Configuration Standards

- Use named volumes for dependencies and caches:
  - `node_modules_cache` - Node.js dependencies
  - `python_cache` - Python virtual environments
  - `web_node_modules` - Frontend dependencies
- Mount project directories as bind volumes for development
- Use absolute paths in volume specifications
- Document volume purposes in comments

### Security Requirements

- Run containers as non-root users when possible
- Use multi-stage builds for production images
- Implement health checks for all services
- Apply principle of least privilege
- Scan images for vulnerabilities before deployment

## Docker Compose Standards

### Service Naming

- Use descriptive service names matching project functionality
- Include project name prefix for containers: `${PROJECT_NAME}-service`
- Use consistent naming patterns across environments

### Network Configuration

- Create custom networks for service isolation
- Use bridge networks for development
- Document network topology and communication patterns
- Implement service discovery where appropriate

### Port Mapping Standards

- Reserve standard ports for consistent development:
  - `3000` - Next.js development server
  - `8000` - Python development server
  - `8888` - Jupyter Lab
  - `5173` - Vite development server
  - `5432` - PostgreSQL database
- Document port usage in service definitions
- Avoid port conflicts with host services

### Health Check Implementation

- Implement health checks for all critical services
- Use appropriate check intervals and timeouts
- Define failure thresholds and recovery strategies
- Log health check results for monitoring

## Script Standards for Docker Management

### Script Structure Requirements

- Use consistent shebang: `#!/bin/bash`
- Enable strict mode: `set -euo pipefail`
- Implement proper error handling and logging
- Use colored output for better user experience
- Include descriptive comments for complex operations

### Environment Validation

- Check Docker daemon availability before operations
- Validate required environment variables
- Provide helpful error messages for missing dependencies
- Implement graceful fallbacks where appropriate

### Idempotent Operations

- Design scripts to be safely re-runnable
- Check for existing resources before creation
- Provide clear status messages for each operation
- Avoid overwriting existing configurations without confirmation

### API Key Management

- Check for `OPENAI_API_KEY` availability before container start
- Provide clear instructions for setting API keys
- Warn users when API key is missing but continue operation
- Document API key requirements in script headers

## Codex Universal Environment Standards

### Environment Setup

- Use `ghcr.io/openai/codex-universal:latest` as base image
- Configure Python 3.13 and Node.js 22 environment variables
- Mount project root to `/workspace/${PROJECT_NAME}`
- Pass through OpenAI API key from host environment

### Development Workflow

- Provide convenience scripts for common operations:
  - `codex_start.sh` - Start development environment
  - `codex_stop.sh` - Stop environment cleanly
  - `codex_shell.sh` - Enter container shell
  - `codex_rebuild.sh` - Rebuild with latest image
  - `codex_test.sh` - Verify environment setup
- Support both Docker Compose and direct container workflows
- Enable live file editing through volume mounts

### Volume Strategy

- Use volume mounting instead of COPY operations
- Preserve dependencies between container restarts
- Enable instant file changes without rebuilds
- Maintain separate volumes for build artifacts

## Testing and Validation Standards

### Environment Verification

- Verify correct Python and Node.js versions
- Test API key availability and configuration
- Validate volume mounting and file access
- Check service connectivity and health

### Script Testing

- Test scripts with and without API keys
- Verify graceful handling of missing dependencies
- Test idempotent behavior with multiple runs
- Validate error handling and recovery

### Documentation Verification

- Ensure all configuration options are documented
- Verify troubleshooting guides are accurate
- Test setup procedures from scratch
- Validate cross-references and links

## Integration Standards

### Memory Bank Integration

- Document Docker configurations in `memory-bank/docker-workflow.md`
- Update `memory-bank/dependencies.md` with container dependencies
- Record architectural decisions in appropriate memory bank files
- Follow self-documentation protocols for configuration changes

### AI Agent Collaboration

- Create instruction files for container-specific coding standards
- Generate prompt files for Docker configuration automation
- Ensure configurations work across all AI agents
- Document agent-specific considerations and limitations

### Project Structure Alignment

- Integrate with existing project organization standards
- Support multi-language project structures
- Align with TypeScript and Python coding standards
- Maintain compatibility with existing development workflows

## Error Prevention and Troubleshooting

### Common Issues Prevention

- Validate Docker daemon status before operations
- Check for port conflicts during service start
- Verify adequate disk space for images and volumes
- Ensure proper permissions for volume mounts

### Debugging Support

- Provide container logs access through scripts
- Enable debug modes for development containers
- Document common troubleshooting procedures
- Include performance monitoring and optimization guides

### Recovery Procedures

- Document procedures for container recovery
- Provide data backup and restoration guidelines
- Include disaster recovery procedures
- Maintain rollback capabilities for configuration changes

## Quality Assurance Requirements

### Configuration Validation

- Validate YAML syntax in Docker Compose files
- Test configurations in clean environments
- Verify security compliance requirements
- Check performance implications of configurations

### Documentation Standards

- Maintain comprehensive setup documentation
- Include troubleshooting sections in all guides
- Document all configuration options and their purposes
- Provide examples for common use cases

### Cross-Platform Compatibility

- Test configurations on multiple operating systems
- Document platform-specific considerations
- Ensure compatibility with different Docker versions
- Address known limitations and workarounds
