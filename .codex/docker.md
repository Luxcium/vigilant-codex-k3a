# Codex Universal Docker Environment

This document provides comprehensive information about using the codex-universal Docker image for development with Node.js 22 and Python 3.13.

## Quick Start

### Option 1: Simple Run (Recommended for quick testing)
```bash
./scripts/codex_run.sh
```

### Option 2: Full Environment Setup (Recommended for development)
```bash
# Setup the environment
./scripts/setup_codex_universal.sh

# Start the environment
./scripts/codex_start.sh

# Enter the container
./scripts/codex_shell.sh
```

## Environment Details

### Pre-installed Tools
The codex-universal image includes:
- **Python 3.13** with pyenv, poetry, ruff, black, mypy, pyright, isort
- **Node.js 22** with npm, yarn, pnpm (via corepack)
- Git, curl, wget, and other common development tools

### Environment Variables
- `CODEX_ENV_PYTHON_VERSION=3.13` - Installs Python 3.13
- `CODEX_ENV_NODE_VERSION=22` - Installs Node.js 22
- `OPENAI_API_KEY` - Passed from host environment for API access
- `PYTHONPATH` - Set to include project Python paths

### Volume Strategy
This setup uses **volumes instead of COPY operations** for:
- Better development experience with instant file changes
- Preserved dependencies between container restarts
- Faster startup times
- No need to rebuild images for code changes

## Volume Mounts

### Project Files (Read/Write)
- `.:/workspace/vigilant-codex-k3a` - Entire project root
- `./python:/workspace/vigilant-codex-k3a/python` - Python source code
- `./src:/workspace/vigilant-codex-k3a/src` - TypeScript source code
- `./web:/workspace/vigilant-codex-k3a/web` - Next.js application
- `./scripts:/workspace/vigilant-codex-k3a/scripts` - Project scripts
- `./notebooks:/workspace/vigilant-codex-k3a/notebooks` - Jupyter notebooks
- `./.codex:/workspace/vigilant-codex-k3a/.codex` - Codex configuration

### Named Volumes (Performance)
- `node_modules_cache` - Node.js dependencies (project root)
- `web_node_modules` - Node.js dependencies (web directory)
- `python_cache` - Python virtual environment
- `db_data` - PostgreSQL data (persistent)

## Available Scripts

### Environment Management
- `scripts/setup_codex_universal.sh` - Initial setup and configuration
- `scripts/codex_start.sh` - Start the Docker Compose environment
- `scripts/codex_stop.sh` - Stop the environment
- `scripts/codex_shell.sh` - Enter the container shell
- `scripts/codex_rebuild.sh` - Rebuild and restart with latest image
- `scripts/codex_run.sh` - Quick single-container run

### Usage Examples
```bash
# Set OpenAI API key (required for API access)
export OPENAI_API_KEY="your-api-key-here"

# Start development environment
./scripts/codex_start.sh

# Open shell in container
./scripts/codex_shell.sh

# Inside container - verify versions
node --version   # v22.x.x
python --version # Python 3.13.x

# Install dependencies
npm install
pip install -r python/requirements.txt

# Run development servers
npm run dev                    # Next.js (port 3000)
cd python && python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
jupyter lab --ip=0.0.0.0 --port=8888 --no-browser --allow-root
```

## Port Mapping

| Service | Internal Port | External Port | Description |
|---------|---------------|---------------|-------------|
| Next.js | 3000 | 3000 | Web application development server |
| Python API | 8000 | 8000 | FastAPI/Django development server |
| Jupyter Lab | 8888 | 8888 | Jupyter notebook interface |
| Vite | 5173 | 5173 | Vite development server |
| PostgreSQL | 5432 | 5432 | Database server |

## Best Practices

### Development Workflow
1. Start the environment: `./scripts/codex_start.sh`
2. Enter the container: `./scripts/codex_shell.sh`
3. Install dependencies within the container
4. Run your development servers
5. Edit files on your host machine - changes are instantly reflected

### Performance Optimization
- Named volumes are used for `node_modules` and Python virtual environments
- This prevents re-downloading dependencies on container restart
- File changes are instant without rebuild steps

### Container Persistence
- Use `docker-compose.codex.yml` for persistent development sessions
- Named volumes preserve dependencies between restarts
- Database data persists in the `db_data` volume

## Troubleshooting

### Common Issues

#### OpenAI API Key Not Available
If you see warnings about missing OPENAI_API_KEY:
```bash
# Set the API key in your shell
export OPENAI_API_KEY="your-api-key-here"

# Add to your shell profile for persistence
echo 'export OPENAI_API_KEY="your-api-key-here"' >> ~/.bashrc
# or for zsh
echo 'export OPENAI_API_KEY="your-api-key-here"' >> ~/.zshrc

# Restart containers to pick up the new environment variable
./scripts/codex_rebuild.sh
```

#### Port Conflicts
If ports are already in use:
```bash
# Check what's using a port
lsof -i :3000

# Modify docker-compose.codex.yml to use different ports
```

#### Permission Issues
If you encounter permission issues with mounted volumes:
```bash
# Fix ownership (run on host)
sudo chown -R $USER:$USER .
```

#### Slow Performance
If file watching is slow:
```bash
# Increase inotify limits (Linux hosts)
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### Container Management
```bash
# View running containers
docker ps

# View logs
docker-compose -f docker-compose.codex.yml logs

# Remove all containers and volumes (DANGER: loses data)
docker-compose -f docker-compose.codex.yml down -v

# Update to latest image
docker pull ghcr.io/openai/codex-universal:latest
```

## Integration with Other Tools

### VS Code
- Install the "Remote - Containers" extension
- Use "Attach to Running Container" to develop inside the container
- The container includes all necessary language servers

### Git
- Git configuration from your host is available in the container
- SSH keys are not mounted by default (add volume mount if needed)

### Environment Files
- Create `.env` files as needed in the container
- They're preserved through the volume mounts
- Consider using `.env.example` templates

## Future Sessions

For future AI agents generating code:
- Reference this `.codex/docker.md` file for environment setup
- Use the volume-mounted development approach
- Leverage the pre-configured tools in the codex-universal image
- Follow the established script patterns in the `scripts/` directory

## Code Generation Guidelines

When generating code for this environment:
1. Assume Node.js 22 and Python 3.13 are available
2. Use modern syntax and features available in these versions
3. Generate scripts that work within the volume-mounted structure
4. Reference tools pre-installed in the codex-universal image
5. Create configuration that leverages the established port mapping
