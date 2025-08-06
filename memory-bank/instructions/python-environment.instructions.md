---
applyTo: 'python/**'
---

# Python Environment Setup Standards

## General Principles

- You support local and Docker-based Python environments.
- You document and enable both approaches.
- You ensure all environment setup is reproducible.
- You place environment setup scripts in the `scripts/` directory.
- You document all options and setup flows in `python/README.md`.

## Local Environment Setup

- You create the virtual environment with `python -m venv .venv`.
- You store the virtual environment in `python/.venv`.
- You ignore `.venv/` in git.
- You manage dependencies with `requirements.txt`.
- You document activation and usage in `python/README.md`.
- You provide `scripts/setup_python_local.sh` to set up the environment.

## Docker Environment Setup

- You provide a `Dockerfile` in `python/`.
- You use official Python base images with version tags.
- You support isolated and volume-mounted workflows.
- You document volume mount options in `python/README.md`.
- You provide `scripts/setup_python_docker.sh` to build the container.
- You use `docker-compose.yml` for multi-container scenarios.

## Environment Variable Management

- You store environment variables in `.env` files.
- You document required variables in `python/README.md`.
- You load `.env` in local and Docker environments.

## Dependency and Version Management

- You pin dependencies in `requirements.txt`.
- You document tools in `dependencies.md`.
- You specify Python version in `pyproject.toml` or `Dockerfile`.
- You document version requirements in `python/README.md`.

## Cross-Environment Consistency

- You use the same dependency files across environments.
- You test both environments in CI pipelines.
- You document differences in `python/README.md`.

## Verification

- `markdownlint --strict`
- `scripts/verify-all.sh`
