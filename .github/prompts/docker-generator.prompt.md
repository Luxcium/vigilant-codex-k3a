---
mode: 'agent'
description: 'Generate Dockerfiles and Compose files.'
---

# Docker Configuration Generator

I will help you create parametrized Docker configurations (Dockerfiles and Compose files) optimized for different environments while following security and performance best practices.

## Configuration Philosophy

### Parametrization Approach

Docker configurations will support flexible parametrization through:

1. **Build arguments**: For build-time configuration and customization
2. **Environment variables**: For runtime configuration and secrets
3. **Configuration files**: For complex application settings
4. **Override files**: For environment-specific adjustments
5. **Multi-stage builds**: For optimization and security separation

### Environment Types

#### 1. Development Environment

**Purpose**: Local development with hot-reload and debugging capabilities

**Features**:

- Volume mounting for source code
- Development dependency inclusion
- Debug port exposure
- Hot-reload configuration
- Simplified security for local use

#### 2. Testing Environment

**Purpose**: Automated testing and CI/CD integration

**Features**:

- Test dependency inclusion
- Coverage reporting setup
- Mock service configuration
- Parallel test execution support
- Artifact collection capabilities

#### 3. Staging Environment

**Purpose**: Pre-production validation and integration testing

**Features**:

- Production-like configuration
- Performance monitoring setup
- Security scanning integration
- Load testing capabilities
- Deployment validation

#### 4. Production Environment

**Purpose**: Optimized deployment with security and performance focus

**Features**:

- Multi-stage build optimization
- Security hardening
- Resource constraint definition
- Health check implementation
- Logging and monitoring integration

## Dockerfile Requirements

### Base Image Standards

```dockerfile
# Use specific version tags for reproducibility
FROM node:18.19.0-alpine3.18 AS base

# Security: Create non-root user
RUN addgroup -g 1001 -S nodejs \
 && adduser -S nextjs -u 1001
```

### Multi-Stage Build Pattern

```dockerfile
# Build stage
FROM base AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Runtime stage
FROM base AS runner
WORKDIR /app
COPY --from=builder --chown=nextjs:nodejs /app ./
USER nextjs
```

### Security Best Practices

- Use non-root users for application execution
- Implement least-privilege access patterns
- Scan for vulnerabilities in dependencies
- Use official base images with security updates
- Minimize attack surface by excluding unnecessary components

### Performance Optimization

- Leverage Docker layer caching effectively
- Minimize image size through multi-stage builds
- Use `.dockerignore` to exclude unnecessary files
- Optimize dependency installation order
- Implement efficient health checks

## Docker Compose Requirements

### Service Definition Standards

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        - NODE_ENV=${NODE_ENV:-development}
        - BUILD_VERSION=${BUILD_VERSION:-latest}
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - API_KEY=${API_KEY}
    ports:
      - '${APP_PORT:-3000}:3000'
    volumes:
      - ./src:/app/src:ro
    depends_on:
      database:
        condition: service_healthy
    networks:
      - app-network
    restart: unless-stopped
```

### Network Configuration

- Define custom networks for service isolation
- Implement proper service discovery patterns
- Configure load balancing for scaled services
- Secure inter-service communication

### Volume Management

- Separate code, data, and configuration volumes
- Implement backup and recovery strategies
- Use named volumes for persistent data
- Configure appropriate volume permissions

### Health Check Implementation

```yaml
healthcheck:
  test: ['CMD', 'curl', '-f', 'http://localhost:3000/health']
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 60s
```

## Parametrization Implementation

### Build Arguments

```dockerfile
ARG NODE_ENV=production
ARG BUILD_VERSION=latest
ARG ENABLE_FEATURES=""

# Use arguments in build process
RUN if [ "$NODE_ENV" = "development" ]; then \
      npm install; \
    else \
      npm ci --only=production; \
    fi
```

### Environment Variables

```yaml
environment:
  # Runtime configuration
  - NODE_ENV=${NODE_ENV:-production}
  - LOG_LEVEL=${LOG_LEVEL:-info}
  - DATABASE_URL=${DATABASE_URL}

  # Feature flags
  - ENABLE_METRICS=${ENABLE_METRICS:-false}
  - ENABLE_TRACING=${ENABLE_TRACING:-false}
```

### Configuration Files

```yaml
volumes:
  # Mount configuration files
  - ./config/${ENVIRONMENT:-prod}/app.json:/app/config/app.json:ro
  - ./config/secrets/${ENVIRONMENT:-prod}:/app/secrets:ro
```

### Override Files Pattern

```bash
# Base configuration
docker-compose.yml

# Environment-specific overrides
docker-compose.dev.yml
docker-compose.staging.yml
docker-compose.prod.yml

# Usage examples
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## Implementation Process

### 1. Project Analysis

- Identify application dependencies and requirements
- Determine runtime environment needs
- Analyze security and compliance requirements
- Assess performance and scalability needs

### 2. Base Configuration

- Select appropriate base images
- Define multi-stage build strategy
- Implement security hardening measures
- Configure basic health checks

### 3. Environment Customization

- Create environment-specific override files
- Define parameter sets for each environment
- Implement configuration management strategy
- Set up secrets management

### 4. Validation and Testing

- Test configurations in all target environments
- Validate security measures and compliance
- Performance benchmark and optimization
- Document usage patterns and troubleshooting

## Usage Examples

### Development Workflow

```bash
# Build development image
docker build --target development --build-arg NODE_ENV=development -t myapp:dev .

# Run development environment
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# Enable hot-reload with volume mounting
docker run -v $(pwd)/src:/app/src myapp:dev
```

### Production Deployment

```bash
# Build optimized production image
docker build --target production --build-arg NODE_ENV=production -t myapp:prod .

# Deploy with production configuration
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Health check and monitoring
docker-compose logs -f app
curl http://localhost:3000/health
```

### CI/CD Integration

```bash
# Build with version tagging
docker build --build-arg BUILD_VERSION=${CI_COMMIT_SHA} -t myapp:${CI_COMMIT_SHA} .

# Run tests in containerized environment
docker-compose -f docker-compose.yml -f docker-compose.test.yml run --rm test

# Deploy to staging
docker-compose -f docker-compose.yml -f docker-compose.staging.yml up -d
```

## Quality Assurance

### Security Validation

- Regular base image updates and vulnerability scanning
- Secrets management audit and rotation
- Network security configuration review
- Runtime security monitoring implementation

### Performance Optimization

- Image size optimization and layer analysis
- Container resource usage monitoring
- Application performance profiling
- Scalability testing and validation

### Documentation Standards

- Document all configuration parameters
- Provide clear usage examples for each environment
- Maintain troubleshooting guides
- Include security considerations and best practices

This Docker configuration generator ensures consistent, secure, and optimized containerization across all environments in the AI agent framework project.
