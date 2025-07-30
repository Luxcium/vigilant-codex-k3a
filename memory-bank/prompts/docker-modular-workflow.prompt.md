mode: 'agent'
mode: 'agent'
description: 'Generate a modular Docker Compose workflow.'

# Docker Modular Workflow Generator

## Description

Generate modular Docker configurations with separate build and run Dockerfiles, volume-first development strategies, and extensive CLI parameterization. This approach separates build concerns from runtime concerns and emphasizes volume mounting for development workflows.

## Context Requirements

You are working in a development environment with:

- **Operating System**: Linux (Fedora KDE, Ubuntu, etc.) or compatible
- **Node.js Management**: fnm, nvm, or direct Node.js installation
- **Project Structure**:
  - `src/` — TypeScript/JavaScript source code
  - `python/` — Python modules and utilities
  - `notebooks/` — Jupyter notebooks
  - `scripts/` — Shell scripts for automation
  - `memory-bank/` — Project context and dependencies
  - `web/` — Next.js application (when coexisting)

## Instructions Integration

Apply the following instruction files during code generation:

- `memory-bank/instructions/typescript-standards.instructions.md` for TypeScript code
- `memory-bank/instructions/python-standards.instructions.md` for Python code
- `memory-bank/instructions/file-organization.instructions.md` for project structure
- `memory-bank/instructions/no_dummy-no_placeholders.instruction.md` for real, executable configurations

## Parametric Inputs

Define your inputs using the format: `${input:variableName:defaultValue}`

### Required Parameters

- **${input:projectName:my-app}** — Name of the project/application
- **${input:runtimeVersion:node:18-alpine}** — Base runtime and version (node:18-alpine, python:3.11-slim, etc.)
- **${input:packageManager:pnpm}** — Package manager (pnpm, npm, yarn)
- **${input:buildTarget:dist}** — Build output directory

### Optional Parameters

- **${input:nodeEnv:development}** — Default NODE_ENV value
- **${input:devPort:3000}** — Development server port
- **${input:prodPort:8080}** — Production server port
- **${input:includeDatabase:postgresql}** — Database service (postgresql, mysql, mongodb, redis, none)
- **${input:includeCompose:true}** — Generate Docker Compose configuration
- **${input:volumeStrategy:source-mount}** — Volume strategy (source-mount, copy-strategy, hybrid)

## Task Definition

Generate a complete modular Docker setup with separate build and run configurations, emphasizing volume mounting for development and parameterized CLI usage for flexible deployment scenarios.

### Primary Objectives

1. **Modular Dockerfile Creation**: Generate separate `Dockerfile.build` and `Dockerfile.run` for distinct purposes
2. **Volume-First Development**: Implement volume mounting strategies instead of copy-heavy approaches
3. **CLI Parameterization**: Enable extensive build args and environment variable configuration
4. **Multi-Service Orchestration**: Create parameterizable Docker Compose configurations

### Success Criteria

- [ ] Separate Dockerfiles for build and run phases created
- [ ] Volume mounting configured for development workflow
- [ ] CLI commands documented with build args and environment variables
- [ ] Docker Compose configuration supports multiple services
- [ ] All configurations are immediately executable with real values
- [ ] Memory Bank integration maintains dependency tracking

## Implementation Process

### 1. Modular Dockerfile Creation

#### 1.1. Build Dockerfile (`Dockerfile.build`)

```dockerfile
# Dockerfile.build - Handles compilation and dependency installation
ARG RUNTIME_VERSION=${input:runtimeVersion}
FROM ${RUNTIME_VERSION} AS builder

# Install package manager
RUN npm install -g ${input:packageManager}

# Set working directory
WORKDIR /app

# Define build arguments with defaults
ARG NODE_ENV=${input:nodeEnv}
ARG BUILD_TARGET=${input:buildTarget}

# Set environment variables
ENV NODE_ENV=${NODE_ENV}

# Copy only dependency files first for better caching
COPY package*.json ./
COPY pnpm-lock.yaml* ./

# Install dependencies
RUN ${input:packageManager} install --frozen-lockfile

# Copy source code for compilation
COPY src ./src
COPY tsconfig.json ./

# Build the application
RUN ${input:packageManager} run build

# Create production node_modules
RUN ${input:packageManager} install --prod --frozen-lockfile
ARG RUNTIME_VERSION=${input:runtimeVersion}
FROM ${RUNTIME_VERSION} AS builder

# Install package manager
RUN npm install -g ${input:packageManager}

# Set working directory
```

#### 1.2. Runtime Dockerfile (`Dockerfile.run`)

```dockerfile
# Dockerfile.run - Lightweight runtime container
ARG RUNTIME_VERSION=${input:runtimeVersion}
FROM ${RUNTIME_VERSION} AS runtime

# Create non-root user
RUN addgroup -S appuser && adduser -S appuser -G appuser

# Set working directory
WORKDIR /app

# Define runtime arguments
ARG NODE_ENV=production
ARG BUILD_TARGET=${input:buildTarget}

# Set environment variables
ENV NODE_ENV=${NODE_ENV}

# Copy built application from builder stage
COPY --from=builder /app/${BUILD_TARGET} ./${BUILD_TARGET}
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Switch to non-root user
USER appuser

# Expose port
EXPOSE ${input:prodPort}

# Define entry point
CMD ["node", "${BUILD_TARGET}/index.js"]
```

### 2. Volume Mounting Strategy

#### 2.1. Development Volume Configuration

For development mode with volume mounting:

```bash
# Build development image
docker build \
  --file Dockerfile.build \
  --target builder \
  --build-arg NODE_ENV=development \
  --build-arg RUNTIME_VERSION=${input:runtimeVersion} \
  -t ${input:projectName}:dev .

# Run with source code mounted as volume
docker run \
  --name ${input:projectName}-dev \
  -e NODE_ENV=development \
  -p ${input:devPort}:${input:devPort} \
  -v $(pwd)/src:/app/src:ro \
  -v ${input:projectName}_node_modules:/app/node_modules \
  ${input:projectName}:dev \
  ${input:packageManager} run dev
```

#### 2.2. Production Copy Strategy

For production deployment without volumes:

```bash
# Build production image
docker build \
  --file Dockerfile.run \
  --build-arg NODE_ENV=production \
  --build-arg RUNTIME_VERSION=${input:runtimeVersion} \
  -t ${input:projectName}:prod .

# Run production container
docker run \
  --name ${input:projectName}-prod \
  -e NODE_ENV=production \
  -p ${input:prodPort}:${input:prodPort} \
  ${input:projectName}:prod
```

### 3. Docker Compose Configuration

#### 3.1. Base Docker Compose (`docker-compose.yml`)

```yaml
version: '3.9'

services:
  ${input:projectName}:
    build:
      context: .
      dockerfile: Dockerfile.build
      target: builder
      args:
        NODE_ENV: ${input:nodeEnv}
        RUNTIME_VERSION: ${input:runtimeVersion}
        BUILD_TARGET: ${input:buildTarget}
    image: ${input:projectName}:dev
    command: ['${input:packageManager}', 'run', 'dev']
    volumes:
      # Mount source code for development
      - ./src:/app/src:ro
      # Persist node_modules in named volume
      - ${input:projectName}_node_modules:/app/node_modules
    ports:
      - '${input:devPort}:${input:devPort}'
    environment:
      NODE_ENV: ${input:nodeEnv}
    depends_on:
      - db
    networks:
      - ${input:projectName}-network

  db:
    image: postgres:14-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: ${input:projectName}
    volumes:
      - db_data:/var/lib/postgresql/data
    ports:
      - '5432:5432'
    networks:
      - ${input:projectName}-network

  redis:
    image: redis:7-alpine
    ports:
      - '6379:6379'
    networks:
      - ${input:projectName}-network

volumes:
  db_data:
  ${input:projectName}_node_modules:

networks:
  ${input:projectName}-network:
    driver: bridge
```

#### 3.2. Production Override (`docker-compose.prod.yml`)

```yaml
version: '3.9'

services:
  ${input:projectName}:
    build:
      dockerfile: Dockerfile.run
      args:
        NODE_ENV: production
    image: ${input:projectName}:prod
    command: ['node', '${input:buildTarget}/index.js']
    volumes: [] # No volume mounting in production
    ports:
      - '${input:prodPort}:${input:prodPort}'
    environment:
      NODE_ENV: production
```

### 4. CLI Parameterization Scripts

#### 4.1. Development Script (`scripts/docker-dev.sh`)

```bash
#!/bin/bash
# Development Docker workflow script

PROJECT_NAME="${input:projectName}"
RUNTIME_VERSION="${input:runtimeVersion}"
PACKAGE_MANAGER="${input:packageManager}"
DEV_PORT="${input:devPort}"
NODE_ENV="${input:nodeEnv}"

echo "Starting ${PROJECT_NAME} development environment..."

# Build development image
docker build \
  --file Dockerfile.build \
  --target builder \
  --build-arg NODE_ENV=${NODE_ENV} \
  --build-arg RUNTIME_VERSION=${RUNTIME_VERSION} \
  -t ${PROJECT_NAME}:dev .

# Start with Docker Compose
docker-compose up --build

echo "Development environment ready at http://localhost:${DEV_PORT}"
```

#### 4.2. Production Script (`scripts/docker-prod.sh`)

```bash
#!/bin/bash
# Production Docker deployment script

PROJECT_NAME="${input:projectName}"
RUNTIME_VERSION="${input:runtimeVersion}"
PROD_PORT="${input:prodPort}"

echo "Building ${PROJECT_NAME} production image..."

# Build production image
docker build \
  --file Dockerfile.run \
  --build-arg NODE_ENV=production \
  --build-arg RUNTIME_VERSION=${RUNTIME_VERSION} \
  -t ${PROJECT_NAME}:prod .

# Deploy with production overrides
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

echo "Production deployment ready at http://localhost:${PROD_PORT}"
```

## Memory Bank Integration

### Required Updates

- **`memory-bank/dependencies.md`** — Add modular Docker workflow dependencies
- **`memory-bank/docker-workflow.md`** — Document modular build/run patterns
- **`memory-bank/techContext.md`** — Record volume mounting and CLI parameterization decisions

### Cross-References

Reference these files for context:

- `memory-bank/projectbrief.md` — Project requirements and containerization goals
- `memory-bank/systemPatterns.md` — Modular architecture patterns
- `memory-bank/docker-workflow.md` — Four-phase workflow integration

## Quality Assurance

### Modular Configuration Checks

- [ ] Separate Dockerfiles for build and run phases
- [ ] Build arguments have default values (e.g., `ARG NODE_ENV=production`)
- [ ] Volume mounting configured for development workflow
- [ ] Production images are lightweight and secure
- [ ] CLI commands are documented with parameterization

### Volume Strategy Validation

- [ ] Development uses volume mounting for source code
- [ ] Production excludes unnecessary volumes
- [ ] Named volumes persist important data (node_modules, database)
- [ ] Volume permissions properly configured

### CLI Parameterization Checks

- [ ] All build arguments configurable via command line
- [ ] Environment variables properly defaulted
- [ ] Scripts provided for common workflows
- [ ] Docker Compose supports environment-specific overrides

## Output Requirements

Provide the following deliverables:

1. **Modular Docker Files**
   - `Dockerfile.build` - Build and compilation stage
   - `Dockerfile.run` - Lightweight runtime stage
   - `docker-compose.yml` - Development orchestration
   - `docker-compose.prod.yml` - Production overrides

2. **CLI Scripts**
   - `scripts/docker-dev.sh` - Development workflow automation
   - `scripts/docker-prod.sh` - Production deployment automation
   - Parameterized build and run commands

3. **Documentation**
   - Volume mounting strategy explanation
   - CLI parameterization guide
   - Environment-specific deployment instructions

4. **Memory Bank Updates**
   - Dependencies tracking for modular Docker approach
   - Technical context updates for volume and CLI strategies

## Success Criteria

- [ ] Modular Dockerfiles created with clear separation of concerns
- [ ] Volume mounting strategy implemented for development efficiency
- [ ] CLI parameterization enables flexible deployments
- [ ] Docker Compose configuration supports multi-service development
- [ ] Production deployment optimized and secure
- [ ] All configurations immediately executable without placeholders
- [ ] Memory Bank properly updated with new dependencies

## Usage Examples

### VS Code Copilot

```
@workspace Use docker-modular-workflow.prompt.md to create modular Docker setup for:
- Project: ${input:projectName}
- Runtime: ${input:runtimeVersion}
- Package Manager: ${input:packageManager}
- Volume Strategy: ${input:volumeStrategy}
```

### Cline AI

```
Generate modular Docker configuration with:
- Separate build and run Dockerfiles
- Volume mounting for development
- CLI parameterization for flexible deployment
- Multi-service Docker Compose setup
```

### Codex CLI

```bash
# Generate modular Docker workflow
codex generate --prompt=docker-modular-workflow.prompt.md \
  --params="projectName=my-modular-app,runtimeVersion=node:18-alpine,packageManager=pnpm,volumeStrategy=source-mount"
```

## Verification

- `markdownlint --strict` on updated Markdown files
- `scripts/verify-all.sh`
