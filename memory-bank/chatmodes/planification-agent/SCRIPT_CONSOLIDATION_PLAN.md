# Script Consolidation & Documentation Implementation Plan

## Executive Summary

This plan consolidates 41 shell scripts into 15 purpose-driven, well-documented scripts. It eliminates redundancy, enforces documentation standards, and creates clear functional contexts. Each consolidated script will have detailed header comments and unified parameter interfaces.

## Current State Analysis

### Script Inventory (41 Scripts)

- **Environment Setup**: 15 scripts (high redundancy)
- **Docker Lifecycle**: 6 scripts (well-organized)
- **Validation/Linting**: 6 scripts (some overlap)
- **Code Generation**: 2 scripts (minimal)
- **Project Automation**: 6 scripts (some redundancy)
- **Development Tools**: 6 scripts (mixed purposes)

### Problem Areas Identified

1. **High Redundancy**: Multiple Python setup scripts with overlapping functionality
2. **Missing Documentation**: Some scripts lack proper header comments
3. **Inconsistent Interfaces**: Different parameter styles across similar scripts
4. **Reference Drift**: `.vscode/tasks.json` references may be outdated
5. **Purpose Confusion**: Unclear distinctions between similar scripts

## Consolidation Strategy

### 1. Group by Functional Context

- One primary script per functional area
- Secondary scripts only for genuinely different use cases
- Consistent parameter interfaces within each group

### 2. Documentation Protocol

Every script must include:

```bash
#!/usr/bin/env bash
set -euo pipefail

#==============================================================================
# Script Name: [script-name.sh]
# Aim: [Single sentence describing what this script does]
# Purpose: [Why this script exists and when to use it]
# Decision Rationale: [Why this approach was chosen over alternatives]
# Usage: [Command syntax with examples]
# Dependencies: [Required tools, files, or environment]
# Last Updated: [YYYY-MM-DD] by [Author]
# References: [Related scripts, tasks, or documentation]
#==============================================================================
```

### 3. Reference Synchronization

- Update `.vscode/tasks.json` to use consolidated scripts only
- Update `scripts/README.md` to reflect new structure
- Remove dead references from `package.json`

## Implementation Plan

### Phase 1: Environment Setup Consolidation

#### Consolidate Python Environment Scripts (15 → 3)

**Keep and Enhance:**

- `setup_python_env.sh` - Master script with mode selection
- `setup_python_docker.sh` - Docker-specific advanced features
- `setup_python_local.sh` - Local-specific optimizations

**Archive/Remove:**

- `setup_python_docker_isolated.sh` → merge into `setup_python_env.sh --mode docker_isolated`
- `setup_python_docker_volume.sh` → merge into `setup_python_env.sh --mode docker_volume`

**Enhanced `setup_python_env.sh`:**

```bash
#!/usr/bin/env bash
set -euo pipefail

#==============================================================================
# Script Name: setup_python_env.sh
# Aim: Set up Python development environment with configurable deployment modes
# Purpose: Provide unified Python environment setup supporting local venv, Docker isolated, and Docker volume modes
# Decision Rationale: Consolidates 5 separate scripts to reduce redundancy and provide consistent interface
# Usage: ./setup_python_env.sh --mode [local|docker_isolated|docker_volume|venv_only]
# Dependencies: Python 3.13+, Docker (for Docker modes), python/.venv directory
# Last Updated: 2025-07-23 by GitHub Copilot
# References: .vscode/tasks.json (Python: Setup Environment), python/README.md
#==============================================================================

MODE="${1:-local}"
PYTHON_DIR="$(dirname "$0")/../python"

case "$MODE" in
  local)
    echo "[$(date '+%Y-%m-%dT%H:%M:%S%z')] Setting up local Python environment..."
    # Local venv setup logic
    ;;
  docker_isolated)
    echo "[$(date '+%Y-%m-%dT%H:%M:%S%z')] Setting up isolated Docker Python environment..."
    # Docker isolated setup logic
    ;;
  docker_volume)
    echo "[$(date '+%Y-%m-%dT%H:%M:%S%z')] Setting up Docker Python environment with volume mounting..."
    # Docker volume setup logic
    ;;
  venv_only)
    echo "[$(date '+%Y-%m-%dT%H:%M:%S%z')] Creating Python virtual environment only..."
    # Virtual environment creation only
    ;;
  *)
    echo "Usage: $0 --mode [local|docker_isolated|docker_volume|venv_only]"
    exit 1
    ;;
esac
```

#### Consolidate Web Development Scripts (4 → 2)

**Keep and Enhance:**

- `setup_web_dev_environment.sh` - Complete web dev setup
- `activate_web_dev_environment.sh` - Quick activation/launching

**Archive/Remove:**

- `setup_web_env.sh` → merge into `setup_web_dev_environment.sh`
- `launch_dev_environment.sh` → merge into `activate_web_dev_environment.sh`

#### Consolidate Project Setup Scripts (3 → 1)

**Keep and Enhance:**

- `setup_project.sh` - Master project initialization

**Archive/Remove:**

- `init-empty-copilot-project.sh` → merge into `setup_project.sh --type copilot`
- `genesis_boot.sh` → merge into `setup_project.sh --type genesis`

### Phase 2: Functional Group Consolidation

#### Docker Lifecycle (6 scripts - Keep All, Enhance Documentation)

- `setup_codex_universal.sh` ✅ (already well-documented)
- `codex_start.sh` ✅ (enhance header)
- `codex_stop.sh` ✅ (enhance header)
- `codex_shell.sh` ✅ (enhance header)
- `codex_rebuild.sh` ✅ (enhance header)
- `codex_test.sh` ✅ (enhance header)
- `run_codex_cli.sh` ✅ (enhance header)

#### Validation & Quality (6 → 2)

**Keep and Enhance:**

- `verify-all.sh` - Master validation script
- `check-memory-bank.sh` - Memory bank specific validation

**Archive/Remove:**

- `check-dependencies.sh` → merge into `verify-all.sh --check dependencies`
- `check-markdown.sh` → merge into `verify-all.sh --check markdown`
- `validate-instructions.sh` → merge into `verify-all.sh --check instructions`
- `validate-prompt.sh` → merge into `verify-all.sh --check prompts`

#### Code Generation (2 scripts - Keep All, Enhance)

- `generate-instruction-file.sh` ✅ (enhance header)
- `generate-prompt-file.sh` ✅ (enhance header)

#### Development Tools (6 → 3)

**Keep and Enhance:**

- `browser-error-monitor.sh` ✅ (enhance header)
- `make-scripts-executable.sh` ✅ (enhance header)
- `autonomous-state-manager.sh` ✅ (enhance header)

**Archive/Remove:**

- `analyze-test-structure.sh` → merge into `verify-all.sh --analyze tests`
- `update-checklist.sh` → merge into `autonomous-state-manager.sh --update checklist`
- `vscode_auto_env.sh` → merge into `setup_web_dev_environment.sh --vscode`

#### SDK/Database Setup (6 → 2)

**Keep and Enhance:**

- `setup_ts_sdk.sh` ✅ (enhance header)
- `setup_db_prisma.sh` ✅ (enhance header)

**Archive/Remove:**

- `setup_questrade_sdk_core.sh` → merge into `setup_ts_sdk.sh --questrade core`
- `setup_questrade_types.sh` → merge into `setup_ts_sdk.sh --questrade types`
- `setup_agent_framework.sh` → merge into `setup_ts_sdk.sh --agent-framework`
- `setup_agent_system.sh` → merge into `setup_ts_sdk.sh --agent-system`
- `setup_api_error.sh` → merge into `setup_ts_sdk.sh --api-error`
- `setup_helpers.sh` → merge into `setup_ts_sdk.sh --helpers`

### Final Consolidated Structure (15 Scripts)

```
scripts/
├── README.md                           # Updated index
├── setup_python_env.sh                # Python environments (5-in-1)
├── setup_python_docker.sh             # Advanced Docker Python
├── setup_python_local.sh              # Advanced local Python
├── setup_web_dev_environment.sh       # Web development (3-in-1)
├── activate_web_dev_environment.sh    # Web activation/launch
├── setup_project.sh                   # Project initialization (3-in-1)
├── setup_ts_sdk.sh                    # TypeScript/SDK setup (6-in-1)
├── setup_db_prisma.sh                 # Database setup
├── setup_codex_universal.sh           # Docker universal setup
├── codex_start.sh                     # Docker lifecycle
├── codex_stop.sh                      # Docker lifecycle
├── codex_shell.sh                     # Docker lifecycle
├── codex_rebuild.sh                   # Docker lifecycle
├── codex_test.sh                      # Docker lifecycle
├── run_codex_cli.sh                   # Docker execution
├── verify-all.sh                      # Validation master (5-in-1)
├── check-memory-bank.sh               # Memory bank validation
├── generate-instruction-file.sh       # Code generation
├── generate-prompt-file.sh            # Code generation
├── browser-error-monitor.sh           # Development tools
├── make-scripts-executable.sh         # Development tools
└── autonomous-state-manager.sh        # Development tools (2-in-1)
```

### Phase 3: Documentation & Reference Updates

#### Update `.vscode/tasks.json`

- Remove references to archived scripts
- Update task commands to use consolidated scripts with parameters
- Add new tasks for consolidated functionality

#### Update `scripts/README.md`

- Rewrite script index to reflect new structure
- Add usage examples for each consolidated script
- Document parameter interfaces and decision rationale

#### Update Memory Bank Files

- Update `systemPatterns.md` with new script architecture
- Update `activeContext.md` with consolidation completion
- Update `progress.md` with consolidation achievement

### Phase 4: Testing & Validation

#### Comprehensive Testing

1. Test each consolidated script with all parameter combinations
2. Verify all `.vscode/tasks.json` tasks work with new scripts
3. Run `verify-all.sh` to ensure no broken references
4. Test Docker lifecycle with consolidated scripts

#### Documentation Validation

1. Run `markdownlint` on updated `scripts/README.md`
2. Verify all header comments follow standard format
3. Check cross-references between scripts and documentation
4. Validate memory bank file updates

## Implementation Timeline

### Day 1: Environment Setup Consolidation

- Consolidate Python environment scripts (15 → 3)
- Consolidate web development scripts (4 → 2)
- Consolidate project setup scripts (3 → 1)
- Test consolidated environment scripts

### Day 2: Functional Group Consolidation

- Enhance Docker lifecycle script documentation
- Consolidate validation scripts (6 → 2)
- Consolidate development tools (6 → 3)
- Consolidate SDK/database setup (6 → 2)

### Day 3: Documentation & Reference Updates

- Update `.vscode/tasks.json` with new script references
- Rewrite `scripts/README.md` with consolidated structure
- Update memory bank files with new architecture
- Create archives for removed scripts

### Day 4: Testing & Validation

- Comprehensive testing of all consolidated scripts
- Validation of all documentation updates
- Final verification that no references are broken
- Memory bank synchronization completion

## Success Criteria

✅ **Script Count**: Reduced from 41 to 15 scripts (63% reduction)
✅ **Documentation**: All scripts have comprehensive header comments
✅ **Consistency**: Unified parameter interfaces within functional groups
✅ **References**: All `.vscode/tasks.json` and documentation updated
✅ **Functionality**: No loss of functionality, improved usability
✅ **Memory Bank**: All changes documented and synchronized

## Risk Mitigation

### Backup Strategy

- Archive removed scripts in `scripts/archives/` before deletion
- Maintain full commit history for rollback capability
- Test consolidated scripts before removing originals

### Validation Strategy

- Run comprehensive test suite after each consolidation phase
- Validate all task references before archiving scripts
- Ensure Docker environments work with consolidated scripts

### Documentation Strategy

- Update documentation incrementally with each consolidation
- Maintain cross-references between related files
- Follow memory bank self-documentation protocol

---

**Ready for Implementation**: This plan is complete and ready for execution. Each phase has clear deliverables, success criteria, and validation steps. The consolidation will reduce script count by 63% while improving documentation, consistency, and maintainability.
