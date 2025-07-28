---
mode: 'agent'
tools: ['codebase', 'runCommands', 'search', 'searchResults', 'usages']
description: 'Guide the user through Python environment setup with conditional workflows'
---

# Python Environment Setup Prompt

## Context

This prompt helps users set up Python development environments following the conditional guidelines defined in `memory-bank/instructions/python-environment-conditional.instructions.md`.

## User Decision Required

Before proceeding, please choose your Python environment setup mode:

### Option 1: Local Virtual Environment (ENV_MODE=local)

- **Best for:** Active development, debugging, IDE integration
- **Requirements:** Python 3.11+ installed on host system
- **Trade-offs:** Fast iteration, but depends on host Python version

### Option 2: Docker Isolated (ENV_MODE=docker_isolated)

- **Best for:** Reproducible builds, CI/CD, deployment testing
- **Requirements:** Docker installed
- **Trade-offs:** Complete isolation, but slower code iteration (requires rebuilds)

### Option 3: Docker Volume Mount (ENV_MODE=docker_volume)

- **Best for:** Container benefits with live code editing
- **Requirements:** Docker installed
- **Trade-offs:** Live editing + isolation, but file permission complexity

## Implementation Instructions

Once you've chosen your mode:

1. **Set the ENV_MODE parameter** in your development environment
2. **Run the setup script:** `./scripts/setup_python_env.sh`
3. **Follow mode-specific instructions** in the generated `python/README.md`

## Parameters Available

- `ENV_MODE`: Required - one of `local`, `docker_isolated`, `docker_volume`
- `PYTHON_VERSION`: Optional - Python version (default: 3.11)
- `PROJECT_NAME`: Optional - Container/image name (default: my-python-app)

## Script Generation

The setup process will create these files based on your chosen mode:

**Always created:**

- `python/requirements.txt` (if not exists)
- `python/.env.example`
- Updated `python/README.md`

**Mode-specific:**

- Local: Virtual environment in `python/.venv/`
- Docker Isolated: `python/Dockerfile` with code copy
- Docker Volume: `python/Dockerfile` + `docker-compose.yml` with volume mounts

## Quality Checklist

Before considering setup complete:

- [ ] Environment activates successfully
- [ ] Dependencies install without errors
- [ ] Environment variables load correctly
- [ ] Code execution works in chosen mode
- [ ] Documentation reflects actual setup

## Cross-References

- **Instruction File:** `memory-bank/instructions/python-environment-conditional.instructions.md`
- **Memory Bank:** `memory-bank/docker-workflow.md` for Docker integration patterns
- **Dependencies:** `memory-bank/dependencies.md` for rationale tracking
- **AI Agents:** See `AGENTS.md`, `.clinerules/main-rules.md`, `.github/copilot-instructions.md`

  > [!IMPORTANT]
  > **Radical Change Notice:** Instructions, prompts, and chatmodes are now located in `memory-bank/instructions/`, `memory-bank/prompts/`, and `memory-bank/chatmodes/`. The Copilot entry point remains `.github/copilot-instructions.md` for compatibility with official VS Code Copilot tooling.

## Next Steps

After setup completion:

1. Update Memory Bank files per Self-Documentation Protocol
2. Test the environment with a simple Python script
3. Document any mode-specific discoveries or issues
4. Consider creating additional prompt files for common Python workflows
