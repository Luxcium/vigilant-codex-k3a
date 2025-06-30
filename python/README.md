# Python Directory

This directory contains all Python source code, modules, and environment configuration for the project.

## Purpose
- Store all Python application and library code.
- Maintain environment setup files (requirements.txt, .env, Dockerfile).
- Support both local and Docker-based development workflows.

## Structure
- `requirements.txt` — Python dependencies
- `.env` — Environment variables (do not commit secrets)
- `Dockerfile` — Container build for Python environment
- `README.md` — Setup and usage instructions
- `retrieval_agents/` — Hierarchical multi-agent retrieval system

Run `bash scripts/setup_retrieval_agents.sh` to generate the directory if it does not exist.


## Using Jupyter Notebooks

All Jupyter notebooks in the `notebooks/` directory use this Python environment.

### Setup and Launch

1. Install dependencies:
   ```bash
   python -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```
2. (Optional) Register the kernel for Jupyter:
   ```bash
   python -m ipykernel install --user --name=project-env
   ```
3. Launch Jupyter from the project root or `notebooks/`:
   ```bash
   jupyter notebook notebooks/
   # or
   jupyter lab notebooks/
   ```

All dependencies for notebooks and code are managed in `requirements.txt`.


## VS Code Integration

VS Code is automatically configured to:
- **Auto-activate** the Python virtual environment in terminals
- **Load environment variables** from `.env` file
- **Set correct Python interpreter** for coding and debugging
- **Configure linting and formatting** with pylint, mypy, and black
- **Enable Jupyter notebook support** with proper kernel selection

### Quick Start in VS Code

1. **Open workspace** in VS Code
2. **Terminal auto-setup**: New terminals automatically activate the Python environment
3. **Python interpreter**: Automatically set to `./python/.venv/bin/python`
4. **Environment variables**: Loaded from `./python/.env`
5. **Jupyter notebooks**: Use the workspace Python kernel

### VS Code Tasks Available

- `Python: Setup Environment` - Run environment setup script
- `Python: Install Dependencies` - Install from requirements.txt
- `Python: Run Tests` - Execute pytest with coverage
- `Python: Start Jupyter Lab` - Launch Jupyter for notebooks
- `Python: Format Code` - Format with black
- `Python: Lint with Pylint` - Check code quality
- `Python: Type Check with MyPy` - Verify type annotations

Access via: `Ctrl+Shift+P` → "Tasks: Run Task"

## Environment Details

- **Python Version**: Configured for Python ≥3.11
- **Virtual Environment**: `.venv/` (auto-created and activated)
- **Dependencies**: Managed via `requirements.txt`
- **Environment Variables**: `.env` file (copy from `.env.example`)

## Quick Commands

```bash
# In any VS Code terminal (auto-activated environment):
pytest                    # Run tests
start-jupyter            # Launch Jupyter Lab
run-tests                # Run tests with coverage
lint-code                # Run pylint
format-code              # Format with black
type-check               # Run mypy type checking
```

## Structure

```
python/
├── .venv/               # Virtual environment (auto-created)
├── src/                 # Source code
│   └── vigilant_codex/  # Main package
├── tests/               # Test files
├── requirements.txt     # Dependencies
├── .env.example        # Environment template
├── .env                # Your environment variables
├── pyproject.toml      # Project configuration
├── Dockerfile          # Container setup
└── README.md           # This file
```

## For Jupyter Notebooks

Notebooks in the [`notebooks/`](../notebooks/) directory automatically use this Python environment:

1. **Kernel selection**: Choose "Python 3 (ipykernel)" 
2. **Auto-imports**: Source code from `src/` is available
3. **Environment variables**: Loaded from `.env`
4. **Dependencies**: Same as main Python environment

## Environment Setup

The environment is automatically configured, but you can manually run:

```bash
# Setup local virtual environment
./scripts/setup_python_env.sh --mode local

# Or use Docker modes
./scripts/setup_python_env.sh --mode docker_volume
./scripts/setup_python_env.sh --mode docker_isolated
```

See [python-environment.instructions.md](../.github/instructions/python-environment.instructions.md) for full documentation.
