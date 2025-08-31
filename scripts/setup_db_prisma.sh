## =============================================================================
#? Script Name: setup_db_prisma.sh
#? Aim: Setup PostgreSQL service and Prisma schema
#? Purpose: Configure database service and initialize Prisma for web directory
#? Decision Rationale: Ensures database and ORM readiness for development
#? Usage: ./setup_db_prisma.sh
#? Dependencies: Docker, Prisma, Node.js
#? Last Updated: 2025-07-23 by GitHub Copilot
#? References: docker-compose.yml, web/prisma/schema.prisma
## =============================================================================


#!/usr/bin/env bash
# setup_db_prisma.sh: Setup PostgreSQL service and Prisma schema
set -euo pipefail

log() {
  echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] $1"
}

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WEB_DIR="$PROJECT_ROOT/web"

# Ensure postgres service exists in docker-compose.yml
COMPOSE_FILE="$PROJECT_ROOT/docker-compose.yml"
if ! grep -q "service:\s*db" "$COMPOSE_FILE" && ! grep -q "db:" "$COMPOSE_FILE"; then
  log "Adding postgres service to docker-compose.yml"
  cat >> "$COMPOSE_FILE" << 'YML'
  db:
    image: postgres:14-alpine
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: codexapp
    ports:
      - "5432:5432"
    volumes:
      - db-data:/var/lib/postgresql/data
volumes:
  db-data:
YML
fi

log "Starting postgres container"
docker compose up -d db

# Initialize Prisma in web directory
if [ ! -d "$WEB_DIR/prisma" ]; then
  log "Initializing Prisma"
  npx prisma init --schema="$WEB_DIR/prisma/schema.prisma"
fi

# Create Prisma schema if not present
SCHEMA="$WEB_DIR/prisma/schema.prisma"
if [ ! -f "$SCHEMA" ]; then
  cat > "$SCHEMA" << 'PRS'
Datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id       Int      @id @default(autoincrement())
  email    String   @unique
  password String
  createdAt DateTime @default(now())
}
PRS
fi

# Ensure .env file with DATABASE_URL
ENV_FILE="$WEB_DIR/.env"
if [ ! -f "$ENV_FILE" ]; then
  echo "DATABASE_URL=postgresql://postgres:postgres@localhost:5432/codexapp" > "$ENV_FILE"
fi

log "Running prisma migrate"
cd "$WEB_DIR" && npx prisma migrate dev --name init

log "Database and Prisma setup complete"

#? Validation Status: Actively Validated on 2025-08-31
