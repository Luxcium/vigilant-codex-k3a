# `scripts/` Directory

This folder contains utility scripts for setting up, validating, and maintaining the repository.  
**All scripts must pass strict markdown-lint on any Markdown they generate or update.**

## Codex Universal Docker Environment

Scripts for managing the Docker development environment with Node.js 22 and Python 3.13:

### Setup and Management Scripts
- `setup_codex_universal.sh` - Complete setup and configuration
- `codex_start.sh` - Start the Docker Compose environment  
- `codex_stop.sh` - Stop the environment
- `codex_shell.sh` - Enter the container shell
- `codex_rebuild.sh` - Rebuild and restart with latest image
- `codex_run.sh` - Quick single-container run for testing
- `codex_test.sh` - Test environment and verify API key availability

### Quick Start Guide

```bash
# Set your OpenAI API key (required for API access)
export OPENAI_API_KEY="your-api-key-here"

# First time setup (creates docker-compose.codex.yml and convenience scripts)
./scripts/setup_codex_universal.sh

# Start development environment
./scripts/codex_start.sh

# Test the environment and verify API key
./scripts/codex_test.sh

# Enter container for development
./scripts/codex_shell.sh

# Inside container - verify environment
node --version   # v22.x.x
python --version # Python 3.13.x

# Install dependencies inside container
npm install
pip install -r python/requirements.txt

# Stop environment when done
./scripts/codex_stop.sh
```

### Volume-Based Development

These scripts use **volume mounting instead of COPY operations** for:
- Instant file changes without rebuilds
- Preserved dependencies between restarts  
- Better development performance
- Direct file editing on host machine

### Configuration

The setup is configured in:
- `docker-compose.codex.yml` - Main Docker Compose configuration
- `.codex/config.json` - Codex-specific settings
- `.codex/docker.md` - Comprehensive documentation

## Codex Universal Docker Environment

Scripts for managing the Docker development environment with Node.js 22 and Python 3.13:

### Prerequisites
- Docker Engine installed and running
- OpenAI API key (optional but recommended): `export OPENAI_API_KEY="your-key"`
- Sufficient disk space for images and volumes
- Available ports: 3000, 8000, 8888, 5173, 5432

### Setup and Management Scripts
- `setup_codex_universal.sh` - Complete setup and configuration
- `codex_start.sh` - Start the Docker Compose environment  
- `codex_stop.sh` - Stop the environment
- `codex_shell.sh` - Enter the container shell
- `codex_rebuild.sh` - Rebuild and restart with latest image
- `codex_run.sh` - Quick single-container run for testing
- `codex_test.sh` - Test environment and verify API key availability

### Features
- **Volume-Based Development**: Instant file changes without rebuilds
- **Multi-Runtime Support**: Pre-configured Node.js 22 and Python 3.13
- **API Integration**: OpenAI API key passed from host environment
- **Service Orchestration**: Complete development stack with databases
- **Health Monitoring**: Container health checks and validation
- **Cross-Platform**: Works on Linux, macOS, and Windows with Docker

### Quick Start Guide

```bash
# Set your OpenAI API key (required for API access)
export OPENAI_API_KEY="your-api-key-here"

# First time setup (creates docker-compose.codex.yml and convenience scripts)
./scripts/setup_codex_universal.sh

# Start development environment
./scripts/codex_start.sh

# Test the environment and verify API key
./scripts/codex_test.sh

# Enter container for development
./scripts/codex_shell.sh

# Inside container - verify environment
node --version   # v22.x.x
python --version # Python 3.13.x

# Install dependencies inside container
npm install
pip install -r python/requirements.txt

# Stop environment when done
./scripts/codex_stop.sh
```

### Volume-Based Development

These scripts use **volume mounting instead of COPY operations** for:
- Instant file changes without rebuilds
- Preserved dependencies between restarts  
- Better development performance
- Direct file editing on host machine

### Configuration

The setup is configured in:
- `docker-compose.codex.yml` - Main Docker Compose configuration
- `.codex/config.json` - Codex-specific settings
- `.codex/docker.md` - Comprehensive documentation

### Environment Variables
- `CODEX_ENV_PYTHON_VERSION=3.13` - Python runtime version
- `CODEX_ENV_NODE_VERSION=22` - Node.js runtime version  
- `OPENAI_API_KEY` - API access (passed from host)
- `PYTHONPATH` - Python module path configuration

### Available Ports
- `3000` - Next.js development server
- `8000` - Python development server
- `8888` - Jupyter Lab
- `5173` - Vite development server
- `5432` - PostgreSQL database

### Troubleshooting

#### Common Issues
- **Docker not running**: Ensure Docker daemon is started
- **Port conflicts**: Check if ports are already in use with `lsof -i :3000`
- **API key warnings**: Set `OPENAI_API_KEY` environment variable
- **Permission issues**: Ensure proper Docker permissions for your user

#### Getting Help
- Run `./scripts/codex_test.sh` to verify environment setup
- Check container logs: `docker-compose -f docker-compose.codex.yml logs`
- Review documentation in `.codex/docker.md`

### Integration with Other Tools
- **VS Code**: Use "Remote - Containers" extension to develop inside container
- **Git**: Git configuration from host is available in container
- **IDE Integration**: All language servers and tools pre-installed in container

## Conventions
1. **Shebang & Strict Mode**  
   ```bash
   #!/usr/bin/env bash
   set -euo pipefail
   ```
2. **Idempotent Operations**
   Before creating a directory or file, check if it already exists:

   ```bash
   if [ ! -d "some_dir" ]; then
     mkdir -p "some_dir"
     echo "[`date '+%Y-%m-%dT%H:%M:%S%z'`] Created some_dir"
   else
     echo "[`date '+%Y-%m-%dT%H:%M:%S%z'`] some_dir already exists"
   fi
   ```
3. **Timestamped Logging**
   Every major step must echo a log line in [YYYY-MM-DDThh:mm:ssZ] format.
4. **Markdown-lint Verification**
   If a script modifies any *.md, it must run:

   ```bash
   markdownlint --config .markdownlint.yaml <path/to/file>.md
   ```

   and exit non-zero if lint errors occur.

## Script Index
- `setup_project.sh` — Base scaffolding (no overwrites)
- `setup_python_local.sh` — Sets up Python venv + dependencies
- `setup_python_docker.sh` — Builds Python Docker image
- `run_codex_cli.sh` — Spins up a Codex CLI container using `ghcr.io/openai/codex-universal:latest` with Node.js 22 and Python 3.13, mounting the specified project directory
- `setup_agent_system.sh` — Creates the hierarchical agent system skeleton
- `check-dependencies.sh` — Verifies memory-bank/dependencies.md structure
- `check-memory-bank.sh` — Runs markdownlint on memory-bank/*.md
- `validate-instructions.sh` — Lints .github/instructions/*.instructions.md
- `validate-prompt.sh` — Lints .github/prompts/*.prompt.md
- `check-markdown.sh` — Runs markdownlint on all Markdown files in repo
- `verify-all.sh` — Runs full verification suite

## Verification
- Run `markdownlint --config .markdownlint.yaml scripts/README.md`
- Execute `scripts/verify-all.sh` before committing
