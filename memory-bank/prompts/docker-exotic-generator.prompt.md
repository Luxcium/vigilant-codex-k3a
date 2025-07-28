---
mode: 'agent'
tools: ['codebase', 'editFiles', 'runInTerminal', 'search', 'usages']
description: 'Generate advanced Docker configurations with exotic patterns and security-first approach'
---

# Docker Exotic Configuration Generator

## Description

Generate advanced Docker configurations with exotic patterns, multi-environment support, and security-first approach following the enhanced four-phase workflow from `memory-bank/docker-workflow.md`.

## Context Requirements

You are working in a VS Code workspace with the following project structure:

- `src/` — TypeScript source code
- `python/` — Python modules and utilities
- `notebooks/` — Jupyter notebooks
- `scripts/` — Shell scripts for automation
- `memory-bank/` — Project context and dependencies
- `web/` — Next.js application (when coexisting)

## Instructions Integration

Apply the following instruction files during code generation:

- `memory-bank/instructions/typescript-standards.instructions.md` for TypeScript code
- `memory-bank/instructions/python-standards.instructions.md` for Python code
- `memory-bank/instructions/python-notebook-standards.instructions.md` for Jupyter notebooks
- `memory-bank/instructions/file-organization.instructions.md` for project structure
- `memory-bank/instructions/no_dummy-no_placeholders.instruction.md` for real, executable configurations

## Parametric Inputs

Define your inputs using the format: `${input:variableName:defaultValue}`

### Required Parameters

- **${input:projectName:my-app}** — Name of the project/application
- **${input:environment:development}** — Target environment (development, staging, production, all)
- **${input:runtimeVersion:node:18-alpine}** — Base runtime and version
- **${input:serviceType:web-app}** — Service type (web-app, api, microservice, full-stack, database)

### Optional Parameters

- **${input:includeDatabase:postgresql}** — Database service to include (postgresql, mysql, mongodb, redis, none)
- **${input:networkPattern:bridge}** — Network strategy (bridge, overlay, host, custom)
- **${input:exoticPatterns:health-checks}** — Exotic patterns to implement (health-checks, service-discovery, load-balancing, scaling, multi-arch)
- **${input:securityLevel:standard}** — Security implementation level (minimal, standard, hardened)
- **${input:includeDevContainer:true}** — Generate VS Code dev container configuration
- **${input:volumeStrategy:named}** — Volume strategy (named, bind-mount, tmpfs, hybrid)

## Task Definition

Generate comprehensive Docker configurations following the enhanced four-phase workflow with exotic patterns, security-first approach, and multi-environment support. This prompt creates production-ready containerization with advanced orchestration patterns.

### Primary Objectives

1. **Phase 1 Implementation**: Design and plan container architecture with exotic patterns
2. **Phase 2 Execution**: Create secure, optimized Dockerfiles for development and production
3. **Phase 3 Orchestration**: Implement advanced Docker Compose configurations with exotic patterns
4. **Phase 4 Integration**: Generate comprehensive documentation and AI agent integration

### Success Criteria

- [ ] All four phases of docker-workflow.md are completed
- [ ] Security-first approach implemented (non-root users, minimal images, vulnerability scanning)
- [ ] Multi-environment configurations generated (dev, staging, production)
- [ ] Exotic patterns implemented based on ${input:exoticPatterns}
- [ ] Complete documentation and troubleshooting guides created
- [ ] Integration with Memory Bank and AI Agent Framework
- [ ] All configurations are immediately executable without placeholders
- [ ] Version control and infrastructure-as-code principles followed

## Implementation Steps

### Phase 1: Design & Planning

**Objective**: Define comprehensive container requirements and exotic patterns

1. **Architecture Analysis**
   - Analyze project structure and identify containerization requirements
   - Determine runtime versions for `${input:runtimeVersion}` and additional services
   - Plan service architecture for `${input:serviceType}` with `${input:includeDatabase}` integration
   - Design network strategy using `${input:networkPattern}` approach

2. **Security Planning**
   - Implement `${input:securityLevel}` security measures
   - Plan non-root user configuration and minimal base images
   - Design vulnerability scanning and compliance checks
   - Plan secret management and secure configuration injection

3. **Exotic Patterns Design**
   - Plan implementation of `${input:exoticPatterns}` patterns
   - Design custom network drivers and service mesh integration
   - Plan advanced health checks with recovery mechanisms
   - Design container intercept points for debugging and monitoring

### Phase 2: Container Creation

**Objective**: Implement secure, optimized containers with development and production variants

1. **Development Dockerfile** (`Dockerfile.dev`)

   ```dockerfile
   FROM ${input:runtimeVersion}
   # Install package manager (pnpm for Node.js, pip for Python)
   RUN npm install -g pnpm
   # Create non-root user for security
   RUN addgroup -S appuser && adduser -S appuser -G appuser
   USER appuser
   WORKDIR /workspace
   # Copy dependency files first for better caching
   COPY package*.json ./
   RUN pnpm install
   COPY . .
   EXPOSE 3000
   CMD ["pnpm", "run", "dev"]
   ```

2. **Production Dockerfile** (`Dockerfile.prod`) with Multi-Stage Build

   ```dockerfile
   FROM ${input:runtimeVersion} AS build
   RUN npm install -g pnpm
   WORKDIR /workspace
   COPY package*.json ./
   RUN pnpm install --frozen-lockfile
   COPY . .
   RUN pnpm run build
   
   FROM ${input:runtimeVersion} AS runtime
   RUN addgroup -S appuser && adduser -S appuser -G appuser
   WORKDIR /app
   COPY --from=build /workspace/dist ./dist
   COPY --from=build /workspace/package*.json ./
   RUN pnpm install --prod --frozen-lockfile
   USER appuser
   EXPOSE 8080
   CMD ["node", "dist/index.js"]
   ```

3. **Security Implementation**
   - Implement vulnerability scanning commands
   - Configure least privilege principles
   - Add health check endpoints and validation

### Phase 3: Exotic Docker Compose Implementation

**Objective**: Implement advanced orchestration patterns and exotic configurations

1. **Base Docker Compose** (`docker-compose.yml`)

   ```yaml
   version: '3.9'
   services:
     ${input:projectName}:
       build:
         context: .
         dockerfile: Dockerfile.prod
       image: ${input:projectName}:latest
       networks:
         - app-net
       depends_on:
         - db
       environment:
         NODE_ENV: production
         DATABASE_URL: postgresql://user:pass@db:5432/${input:projectName}
       healthcheck:
         test: ['CMD', 'curl', '-f', 'http://localhost:8080/health']
         interval: 30s
         timeout: 10s
         retries: 3
       ports:
         - '8080:8080'

     db:
       image: postgres:14-alpine
       networks:
         - app-net
       environment:
         POSTGRES_DB: ${input:projectName}
         POSTGRES_USER: appuser
         POSTGRES_PASSWORD: secure_password
       volumes:
         - postgres-data:/var/lib/postgresql/data
       healthcheck:
         test: ['CMD-SHELL', 'pg_isready -U appuser']
         interval: 30s
         timeout: 10s

   networks:
     app-net:
       driver: bridge
       labels:
         com.${input:projectName}.network: 'main'

   volumes:
     postgres-data:
   ```

2. **Development Override** (`docker-compose.override.yml`)

   ```yaml
   version: '3.9'
   services:
     ${input:projectName}:
       build:
         dockerfile: Dockerfile.dev
       volumes:
         - .:/workspace
         - /workspace/node_modules
       ports:
         - '3000:3000'
       environment:
         NODE_ENV: development
   ```

3. **Exotic Patterns Implementation**
   - Advanced health checks with dependency management
   - Custom network configurations and service discovery
   - Load balancing and scaling strategies
   - Multi-architecture support and optimization

### Phase 4: Documentation & AI Agent Integration

**Objective**: Create comprehensive documentation and AI agent automation

1. **Quick Start Documentation**

   ```markdown
   # ${input:projectName} Docker Setup

   ## Quick Start

   1. Clone repository: `git clone <repo-url>`
   2. Build and run: `docker-compose up --build -d`
   3. Verify health: `docker ps` (ensure all services are "healthy")
   4. Access application: http://localhost:8080

   ## Development Mode

   1. Use override: `docker-compose -f docker-compose.yml -f docker-compose.override.yml up --build`
   2. Access dev server: http://localhost:3000
   ```

2. **Dev Container Configuration** (if `${input:includeDevContainer}` is true)

   ```json
   {
     "name": "${input:projectName} Dev Container",
     "dockerComposeFile": ["docker-compose.yml", "docker-compose.override.yml"],
     "service": "${input:projectName}",
     "workspaceFolder": "/workspace",
     "forwardPorts": [3000, 5432],
     "postCreateCommand": "pnpm install",
     "remoteUser": "appuser",
     "customizations": {
       "vscode": {
         "extensions": ["ms-azuretools.vscode-docker", "dbaeumer.vscode-eslint"]
       }
     }
   }
   ```

3. **Troubleshooting Guide**
   - Common Docker issues and solutions
   - Health check debugging procedures
   - Port conflict resolution
   - Volume permission problems
   - Network connectivity issues

## Memory Bank Integration

### Required Updates

- **`memory-bank/dependencies.md`** — Add Docker service dependencies, image repositories, and network configurations
- **`memory-bank/activeContext.md`** — Update current containerization work and exotic patterns implemented
- **`memory-bank/progress.md`** — Log completion of Docker workflow phases and deployment milestones
- **`memory-bank/docker-workflow.md`** — Update with specific exotic patterns and configurations implemented
- **`memory-bank/techContext.md`** — Document container architecture and infrastructure decisions

### Cross-References

Reference these files for context:

- `memory-bank/projectbrief.md` — Project requirements and containerization goals
- `memory-bank/techContext.md` — Technical architecture and infrastructure decisions
- `memory-bank/systemPatterns.md` — Container orchestration patterns and conventions
- `memory-bank/docker-workflow.md` — Enhanced four-phase workflow and exotic pattern documentation

## Quality Assurance

### Docker Configuration Checks

- [ ] All Dockerfiles use minimal base images (`-alpine` or `-slim` variants)
- [ ] Non-root users configured in all containers
- [ ] Multi-stage builds implemented for production optimizations
- [ ] Health checks configured for all services
- [ ] Proper dependency ordering in docker-compose.yml
- [ ] Environment variables and secrets properly managed
- [ ] Network configurations follow security best practices
- [ ] Volume strategies align with `${input:volumeStrategy}` requirements

### Security Validation

- [ ] Vulnerability scanning commands included
- [ ] Least privilege principles applied
- [ ] No hardcoded secrets or credentials
- [ ] Container registry security implemented
- [ ] Network isolation properly configured
- [ ] Resource limits and constraints defined

### Exotic Patterns Validation

- [ ] Requested `${input:exoticPatterns}` successfully implemented
- [ ] Advanced health checks with recovery mechanisms
- [ ] Service discovery and load balancing configured
- [ ] Scaling strategies properly defined
- [ ] Container intercept points functional

### Documentation Checks

- [ ] Quick start guide provides complete setup instructions
- [ ] Troubleshooting guide covers common issues
- [ ] Dev container configuration works with VS Code
- [ ] All environment variants (dev/staging/prod) documented
- [ ] Memory Bank files updated with Docker dependencies
- [ ] Cross-references are accurate and bidirectional
- [ ] Markdown follows strict lint requirements

## Output Requirements

Provide the following deliverables:

1. **Docker Configuration Files**
   - `Dockerfile.dev` - Development container with hot reload
   - `Dockerfile.prod` - Production-optimized multi-stage build
   - `docker-compose.yml` - Base orchestration configuration
   - `docker-compose.override.yml` - Development environment overrides
   - `.dockerignore` - Optimized build context exclusions

2. **VS Code Dev Container** (if `${input:includeDevContainer}` is true)
   - `.devcontainer/devcontainer.json` - VS Code dev container configuration
   - `.devcontainer/docker-compose.yml` - Dev container orchestration

3. **Documentation and Guides**
   - `README-Docker.md` - Complete setup and usage guide
   - `TROUBLESHOOTING-Docker.md` - Common issues and solutions
   - Environment-specific deployment guides
   - Security validation checklists

4. **Memory Bank Updates**
   - Updated `memory-bank/dependencies.md` with Docker services
   - Updated `memory-bank/docker-workflow.md` with implemented patterns
   - Updated `memory-bank/techContext.md` with container architecture

5. **Automation Scripts**
   - Build and deployment scripts in `scripts/` directory
   - Health check and monitoring scripts
   - Environment setup and validation scripts

## Related Files

### Prompt Files

- [script-generator.prompt.md](./script-generator.prompt.md) - Generate Docker automation scripts
- [memory-bank-update.prompt.md](./memory-bank-update.prompt.md) - Update Memory Bank documentation
- [dependency-management.prompt.md](./dependency-management.prompt.md) - Track Docker dependencies

### Instruction Files

- [file-organization.instructions.md](../instructions/file-organization.instructions.md) - Project structure standards
- [no_dummy-no_placeholders.instruction.md](../instructions/no_dummy-no_placeholders.instruction.md) - Real configuration requirements
- [self-documentation.instructions.md](../instructions/self-documentation.instructions.md) - Documentation protocols

### Memory Bank Files

- [docker-workflow.md](../../memory-bank/docker-workflow.md) - Enhanced four-phase workflow
- [dependencies.md](../../memory-bank/dependencies.md) - Project dependency tracking
- [techContext.md](../../memory-bank/techContext.md) - Technical architecture context
- [systemPatterns.md](../../memory-bank/systemPatterns.md) - Container orchestration patterns

## Usage Examples

### VS Code Copilot

```
@workspace Use the docker-exotic-generator.prompt.md prompt to generate Docker configurations for:
- Project: ${input:projectName}
- Environment: ${input:environment}
- Runtime: ${input:runtimeVersion}
- Service Type: ${input:serviceType}
- Database: ${input:includeDatabase}
- Exotic Patterns: ${input:exoticPatterns}
```

### Cline AI

```
Use docker-exotic-generator.prompt.md to create comprehensive Docker setup with:
- Full-stack application containerization
- Multi-environment support (dev/staging/prod)
- Security-first approach with non-root users
- Advanced health checks and monitoring
- VS Code dev container integration
```

### Codex CLI

```bash
# Generate full-stack Docker configuration
codex generate --prompt=docker-exotic-generator.prompt.md \
  --params="projectName=my-fullstack-app,environment=all,runtimeVersion=node:18-alpine,serviceType=full-stack,includeDatabase=postgresql,exoticPatterns=health-checks,securityLevel=hardened"

# Generate microservice with exotic patterns
codex generate --prompt=docker-exotic-generator.prompt.md \
  --params="projectName=user-service,environment=production,runtimeVersion=node:18-alpine,serviceType=microservice,includeDatabase=redis,exoticPatterns=service-discovery,networkPattern=overlay"
```
