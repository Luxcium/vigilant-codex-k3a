---
mode: 'agent'
tools: ['filesystem', 'terminal', 'codebase']
description: 'Consolidated Docker & Dev Container workflow template following four-phase approach with exotic patterns and security-first principles'
---

# Docker & Dev Container Workflow Template

Your goal is to generate a complete Docker containerization setup following the consolidated four-phase approach with exotic patterns, security-first principles, and comprehensive documentation.

## Context

You are working in a VS Code workspace with the following project structure:
- `src/` — TypeScript source code
- `python/` — Python modules and utilities  
- `notebooks/` — Jupyter notebooks
- `scripts/` — Shell scripts for automation
- `memory-bank/` — Project context and dependencies
- `web/` — Next.js application (when coexisting)

## Parametric Inputs

- **${input:projectName:my-app}** — Name of the project/application
- **${input:runtimeVersion:node:18-alpine}** — Base runtime and version
- **${input:databaseType:postgresql}** — Database service (postgresql, mysql, mongodb, redis, none)
- **${input:includeDevContainer:true}** — Generate VS Code dev container configuration
- **${input:networkName:app-net}** — Docker network name
- **${input:registryUrl:myregistry.com}** — Container registry URL

## Requirements

Generate a complete Docker setup following the four-phase workflow with:
- Security-first approach (non-root users, minimal images, vulnerability scanning)
- Multi-environment support (development and production)
- Exotic Docker Compose patterns with health checks
- Complete documentation and troubleshooting guides
- VS Code dev container integration
- CI/CD automation scripts

## Implementation Process

### Phase 1: Design & Planning

Create a planning checklist covering:

**Runtime Versions:**
- ❏ Node: 18.x  
- ❏ Python: 3.10  
- ❏ Other: `${input:runtimeVersion}`

**Required Services:**
- ❏ Database: ${input:databaseType}
- ❏ Cache: Redis 7  
- ❏ Message Broker: (if needed)

**Networking Strategy:**
- ❏ Network Name: `${input:networkName}` (bridge driver)

**Volume Strategy:**
- ❏ Data volume: `data-volume` (named volume for persistent data)

**Security Considerations:**
- ❏ Run as non-root user (e.g., `USER appuser`)  
- ❏ Use minimal base images (`-alpine` / `-slim`)  
- ❏ Scan images (e.g., `docker scan <image>`)

### Phase 2: Container Creation

#### 2.1. Development Dockerfile (`Dockerfile.dev`)

```dockerfile
FROM ${input:runtimeVersion}
# Install package manager
RUN npm install -g pnpm
# Create and switch to non-root user
RUN addgroup -S appuser && adduser -S appuser -G appuser
USER appuser
WORKDIR /workspace
COPY package*.json ./
RUN pnpm install
COPY . .
EXPOSE 3000
CMD ["pnpm", "run", "dev"]
```

#### 2.2. Production Dockerfile (`Dockerfile.prod`) with Multi-Stage Build

```dockerfile
FROM ${input:runtimeVersion} AS build
# Install pnpm
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

### Phase 3: Exotic Docker Compose Patterns

#### 3.1. Base Docker Compose (`docker-compose.yml`)

```yaml
version: "3.9"
services:
  ${input:projectName}:
    build:
      context: .
      dockerfile: Dockerfile.prod
    image: ${input:registryUrl}/${input:projectName}/backend:latest
    networks:
      - ${input:networkName}
    depends_on:
      - db
    environment:
      POSTGRES_HOST: db
      NODE_ENV: production
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    ports:
      - "8080:8080"

  db:
    image: postgres:14-alpine
    networks:
      - ${input:networkName}
    environment:
      POSTGRES_DB: ${input:projectName}
      POSTGRES_USER: appuser
      POSTGRES_PASSWORD: secure_password
    volumes:
      - data-volume:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U appuser"]
      interval: 30s
      timeout: 10s

  redis:
    image: redis:7-alpine
    networks:
      - ${input:networkName}
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 30s
      timeout: 10s

networks:
  ${input:networkName}:
    driver: bridge
    labels:
      com.${input:projectName}.network: "main"

volumes:
  data-volume:
```

#### 3.2. Development Override (`docker-compose.override.yml`)

```yaml
version: "3.9"
services:
  ${input:projectName}:
    build:
      dockerfile: Dockerfile.dev
    volumes:
      - .:/workspace
      - /workspace/node_modules
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: development
```

### Phase 4: Documentation & Replication Guide

#### 4.1. Quick Start Documentation (`README-Docker.md`)

```markdown
# ${input:projectName} Docker Setup

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/${input:projectName}.git
   cd ${input:projectName}
   ```

2. **Build & Run Production Containers**
   ```bash
   docker-compose up --build -d
   ```

3. **Verify Health Checks**
   ```bash
   docker ps        # Ensure all services are "healthy"
   ```

4. **Access Services**
   - Backend API: http://localhost:8080
   - Redis: tcp://localhost:6379

## Development Mode

1. Use override configuration:
   ```bash
   docker-compose -f docker-compose.yml -f docker-compose.override.yml up --build
   ```

2. Access dev server: http://localhost:3000
```

#### 4.2. Dev Container Setup (if `${input:includeDevContainer}` is true)

**`.devcontainer/devcontainer.json`**

```json
{
  "name": "${input:projectName} Dev Container",
  "dockerComposeFile": [
    "../docker-compose.yml",
    "../docker-compose.override.yml"
  ],
  "service": "${input:projectName}",
  "workspaceFolder": "/workspace",
  "forwardPorts": [3000, 5432, 6379],
  "postCreateCommand": "pnpm install && pnpm run build",
  "remoteUser": "appuser",
  "customizations": {
    "vscode": {
      "settings": {
        "editor.formatOnSave": true,
        "editor.tabSize": 2
      },
      "extensions": [
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode",
        "ms-azuretools.vscode-docker"
      ]
    }
  },
  "features": {
    "ghcr.io/devcontainers/features/github-cli:1": {},
    "ghcr.io/devcontainers/features/azure-cli:1": {}
  }
}
```

#### 4.3. CI/CD Pipeline (`.github/workflows/docker-ci.yml`)

```yaml
name: Build and Push Docker Images

on:
  push:
    branches:
      - main

jobs:
  build_and_push:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up QEMU
        uses: docker/setup-qemu-action@v2

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and push backend image
        uses: docker/build-push-action@v4
        with:
          context: .
          file: Dockerfile.prod
          push: true
          tags: ${input:registryUrl}/${input:projectName}/backend:latest, ${input:registryUrl}/${input:projectName}/backend:${{ github.sha }}
```

#### 4.4. Troubleshooting Guide (`TROUBLESHOOTING-Docker.md`)

```markdown
# Docker Troubleshooting Guide

## Common Issues

### "Port already in use"
- Run `lsof -i :8080` or on Windows `netstat -ano | findstr :8080` to see which process is blocking
- Solution: Stop the conflicting process or change the port mapping

### "Permission denied" when writing to volume
- Ensure volume is owned by the correct UID/GID: `chown -R 1000:1000 /path/to/data`
- Check container user matches volume permissions

### "Image not found"
- Confirm the image name and tag in `docker-compose.yml`
- Verify registry URL and authentication

### "Health check failed"
- Run container manually to test health endpoint:
  ```bash
  docker run --rm ${input:registryUrl}/${input:projectName}/backend:latest curl -f http://localhost:8080/health
  ```
- Inspect logs: `docker logs <container_id>`
- Verify health check command and endpoint availability
```

#### 4.5. Docker Ignore (`.dockerignore`)

```
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.nyc_output
coverage
.nyc_output
.vscode
.devcontainer
```

## Memory Bank Integration

Update the following files:

- **`memory-bank/dependencies.md`** — Add Docker services and container dependencies
- **`memory-bank/docker-workflow.md`** — Document implemented exotic patterns
- **`memory-bank/techContext.md`** — Record container architecture decisions

## Success Criteria

- [ ] All four phases completed with comprehensive documentation
- [ ] Security-first approach implemented (non-root users, minimal images)
- [ ] Health checks configured for all services
- [ ] Development and production environments working
- [ ] VS Code dev container functional (if enabled)
- [ ] Troubleshooting guide covers common issues
- [ ] CI/CD pipeline configured and tested
- [ ] Memory Bank files updated with Docker context

## Quality Validation

Before completing, verify:

- [ ] All containers use minimal base images (`-alpine` variants)
- [ ] Non-root users configured in all Dockerfiles
- [ ] Health checks respond correctly
- [ ] Volume permissions properly set
- [ ] Network isolation working as expected
- [ ] No hardcoded secrets in configurations
- [ ] Documentation is complete and accurate
