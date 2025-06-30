.PHONY: help install install-dev clean format lint test test-cov docker-build docker-dev docker-prod jupyter notebook setup-env

# Default target
help:
	@echo "Available commands:"
	@echo "  install       Install production dependencies"
	@echo "  install-dev   Install development dependencies"
	@echo "  clean         Clean cache and build artifacts"
	@echo "  format        Format code with black and isort"
	@echo "  lint          Run linting checks"
	@echo "  test          Run tests"
	@echo "  test-cov      Run tests with coverage"
	@echo "  docker-build  Build Docker images"
	@echo "  docker-dev    Run development environment with Docker Compose"
	@echo "  docker-prod   Run production environment with Docker Compose"
	@echo "  jupyter       Start Jupyter Lab"
	@echo "  notebook      Alias for jupyter"
	@echo "  setup-env     Setup development environment"

# Environment setup
setup-env:
	@echo "Setting up Python environment..."
	@if [ ! -d ".venv" ]; then python3 -m venv .venv; fi
	@./.venv/bin/pip install --upgrade pip
	@./.venv/bin/pip install -e ".[dev,ml,viz]"
	@echo "Environment setup complete. Activate with: source .venv/bin/activate"

# Installation
install:
	pip install -e .

install-dev:
	pip install -e ".[dev,ml,viz]"

# Cleaning
clean:
	find . -type f -name "*.pyc" -delete
	find . -type d -name "__pycache__" -delete
	find . -type d -name "*.egg-info" -exec rm -rf {} +
	rm -rf build/
	rm -rf dist/
	rm -rf .pytest_cache/
	rm -rf .coverage
	rm -rf htmlcov/
	rm -rf .mypy_cache/

# Code formatting
format:
	black .
	isort .

# Linting
lint:
	flake8 .
	black --check .
	isort --check-only .
	mypy src/
	bandit -r src/

# Testing
test:
	pytest

test-cov:
	pytest --cov=src --cov-report=html --cov-report=term

# Security checks
security:
	bandit -r src/
	safety check

# Docker commands
docker-build:
	docker build -t vigilant-codex-python .

docker-dev:
	docker-compose up -d python-dev postgres redis
	@echo "Development environment started. Access Jupyter at http://localhost:8888"
	@echo "Jupyter token: vigilant-codex-dev"

docker-prod:
	docker-compose --profile production up -d python-prod postgres redis

docker-stop:
	docker-compose down

docker-logs:
	docker-compose logs -f

# Jupyter
jupyter:
	@if [ -d ".venv" ]; then \
		./.venv/bin/jupyter lab --ip=0.0.0.0 --port=8888 --no-browser; \
	else \
		jupyter lab --ip=0.0.0.0 --port=8888 --no-browser; \
	fi

notebook: jupyter

# Database migrations (if using Alembic)
db-init:
	alembic init alembic

db-migrate:
	alembic revision --autogenerate -m "$(MSG)"

db-upgrade:
	alembic upgrade head

db-downgrade:
	alembic downgrade -1

# Development workflow
dev: format lint test

# CI workflow
ci: lint test security

# Full reset
reset: clean
	rm -rf .venv/
	$(MAKE) setup-env
