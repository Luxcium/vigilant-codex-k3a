---
applyTo: "python/**"
---

# Python Environment Setup Standards

## General Principles

- Support both local (host) and Docker-based Python environments for all development workflows.
- Do not assume a single environment type; document and enable both approaches.
- Ensure all environment setup is reproducible, documented, and scriptable.
- Place all environment setup scripts in the `scripts/` directory.
- Document all environment options and setup flows in `python/README.md`.

## Local (Host) Environment Setup

- Use `python -m venv .venv` in the `python/` directory to create a local virtual environment.
- Store all virtual environments in a `.venv` directory inside `python/`.
- Add `.venv/` to `.gitignore`.
- Use `requirements.txt` for dependency management; update with `pip freeze > requirements.txt`.
- Document activation and usage in `python/README.md`.
- Provide a setup script: `scripts/setup_python_local.sh` (idempotent, does not overwrite existing env).

## Docker Environment Setup

- Provide a `Dockerfile` in the `python/` directory for containerized Python environments.
- Use official Python base images with explicit version tags.
- Support both isolated (internal-only) and volume-mounted (host-attached) workflows.
- Document volume mount options in `python/README.md`.
- Provide a setup script: `scripts/setup_python_docker.sh` (idempotent, does not overwrite existing files).
- Use `docker-compose.yml` for complex multi-container or volume scenarios.

## Environment Variable Management

- Use `.env` files for environment variables; do not commit sensitive values.
- Document all required variables in `python/README.md`.
- Support loading `.env` in both local and Docker environments.

## Dependency and Version Management

- Pin all dependencies in `requirements.txt`.
- Use `pip-tools` or `poetry` for advanced dependency management if needed; document rationale in `dependencies.md`.
- Specify Python version in `pyproject.toml` or `Dockerfile`.
- Document version requirements in `python/README.md`.

## Cross-Environment Consistency

- Ensure all workflows (local and Docker) use the same dependency and version files.
- Test both environment types in CI/CD pipelines.
- Document any differences or caveats in `python/README.md`.

## Example: Local venv Setup

```bash
cd python
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Example: Docker Volume Mount

```bash
docker run --rm -it -v $(pwd)/python:/app -w /app python:3.11 bash
```

## Example: Docker Compose

```yaml
version: '3.8'
services:
  python:
    build: ./python
    volumes:
      - ./python:/app
    env_file:
      - ./python/.env
    working_dir: /app
    command: bash
```

## Documentation and Self-Documentation

- Update `python/README.md` with all environment setup options and instructions.
- Log all changes and environment decisions in `memory-bank/activeContext.md` and `memory-bank/progress.md` per the Self-Documentation Protocol.
- Update `memory-bank/dependencies.md` with rationale for any new tools or dependencies.
