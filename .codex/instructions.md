# ~/.codex/instructions.md

- Only use git commands if I explicitly mention you should
- Look in the project root for your instruction files, and read instruction files of other ai agents if short enough to read it all then read them, if not look for readmefiles in their folders if any, or if no AGENTS.md file exists, offer to create one for the user, it must be the files for codex cli in priority, mentioning it is imperative as other ai agent would read that file too.

## Docker Environment

This project uses the codex-universal Docker image for development with:

- Node.js 22
- Python 3.13
- All necessary tools pre-installed

### Quick Start Commands:

- `scripts/codex_start.sh` - Start the development environment
- `scripts/codex_shell.sh` - Enter the container shell
- `scripts/codex_stop.sh` - Stop the environment
- `scripts/codex_rebuild.sh` - Rebuild and restart

### Environment Variables:

- CODEX_ENV_PYTHON_VERSION=3.13
- CODEX_ENV_NODE_VERSION=22

### Mounted Volumes:

- Project root mounted to /workspace/$PWD
- Separate volumes for node_modules and Python virtual environments
- Direct access to all source code without COPY operations

### Available Ports:

- 3000: Next.js development server
- 8000: Python development server
- 8888: Jupyter Lab
- 5173: Vite development server
- 5432: PostgreSQL database
