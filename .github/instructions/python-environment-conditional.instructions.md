---
applyTo: "python/**"
---

# Python Environment Setup - Conditional Instructions

## Purpose

This instruction file defines conditional guidelines for Python environment setup across three modes without making hard implementation choices. The actual mode is determined at runtime via the `ENV_MODE` parameter.

## Prerequisites (All Modes)

- Ensure Python ≥3.11 is available (locally or in container base image)
- Create or maintain `requirements.txt` with pinned dependencies
- Use `.env` file for environment variables (never commit secrets)
- Document all required environment variables in `python/README.md`

## Mode 1: Local Virtual Environment (ENV_MODE=local)

**When to use:** Direct host development, IDE integration, debugging

**Setup Steps:**

1. Navigate to `python/` directory
2. Create virtual environment: `python3 -m venv .venv`
3. Activate environment: `source .venv/bin/activate` (Linux/Mac) or `.venv\Scripts\activate` (Windows)
4. Install dependencies: `pip install -r requirements.txt`
5. Load environment variables from `.env` file

**Advantages:**

- Direct IDE integration and debugging
- Fast iteration cycles
- Native filesystem access

**Considerations:**

- Host Python version dependency
- Potential conflicts with system packages

## Mode 2: Docker Isolated (ENV_MODE=docker_isolated)

**When to use:** Reproducible environments, CI/CD, deployment simulation

**Setup Steps:**

1. Build container image with all code copied inside
2. Run container without volume mounts
3. Execute Python code entirely within container
4. Use container-internal environment variables

**Advantages:**

- Complete environment isolation
- Reproducible across systems
- No host dependency conflicts

**Considerations:**

- Code changes require image rebuild
- Debugging requires container-aware tools
- Slower iteration cycles

## Mode 3: Docker Volume Mount (ENV_MODE=docker_volume)

**When to use:** Container benefits with live code editing

**Setup Steps:**

1. Build container image with Python environment only
2. Mount project directory as volume into container
3. Execute code from mounted volume
4. Environment variables from both `.env` and container

**Advantages:**

- Live code editing without rebuilds
- Container environment isolation
- Host filesystem synchronization

**Considerations:**

- File permission complexities
- Performance overhead on some systems
- Volume mount configuration required

## Implementation Guidelines

### Script Structure

- Main entry script: `scripts/setup_python_env.sh`
- Mode-specific scripts:
  - `scripts/setup_python_local.sh`
  - `scripts/setup_python_docker_isolated.sh`
  - `scripts/setup_python_docker_volume.sh`

### Idempotency Requirements

- All scripts must check for existing environments
- Warn and skip if environment already exists
- Never overwrite without explicit confirmation
- Log all actions with timestamps

### File Generation Rules

- Generate `Dockerfile` only when Docker modes are requested
- Generate `docker-compose.yml` only for volume mode
- Create `.env.example` with documented variables
- Update `python/README.md` with mode-specific instructions

### Cross-Mode Compatibility

- Use same `requirements.txt` across all modes
- Maintain consistent Python version across modes
- Ensure `.env` variables work in all contexts
- Document mode-switching procedures

## Quality Assurance

Before using any mode:

1. Verify Python version compatibility
2. Test dependency installation
3. Validate environment variable loading
4. Confirm file permissions (especially for volume mode)
5. Document any mode-specific quirks or limitations

## Documentation Requirements

Update these files when implementing:

- `python/README.md` - Mode descriptions and usage
- `memory-bank/docker-workflow.md` - Docker integration patterns
- `memory-bank/dependencies.md` - New tools and rationale
- `memory-bank/activeContext.md` - Current implementation state
- `memory-bank/progress.md` - Completed and remaining work

## Integration with AI Agents

This instruction file integrates with:

- **Cline AI** - Uses `.clinerules/` protocols for implementation
- **Codex CLI** - Follows `AGENTS.md` script-driven requirements
- **VS Code Copilot** - Applies to `python/**` files via `applyTo` directive

See project Memory Bank files for complete integration protocols.
