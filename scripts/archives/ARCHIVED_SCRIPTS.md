# Archived Scripts

This directory contains scripts that have been consolidated into other scripts as part of the script consolidation effort on 2025-07-23.

## Consolidation Summary

**From 41 scripts → 22 scripts (46% reduction)**

## Archived Scripts and Their New Locations

### Python Environment Scripts (Consolidated into setup_python_env.sh)
- `setup_python_docker_isolated.sh` → `setup_python_env.sh --mode docker_isolated`
- `setup_python_docker_volume.sh` → `setup_python_env.sh --mode docker_volume`

### Web Development Scripts (Will be consolidated)
- `setup_web_env.sh` → `setup_web_dev_environment.sh`
- `launch_dev_environment.sh` → `activate_web_dev_environment.sh`

### Project Setup Scripts (Will be consolidated)
- `init-empty-copilot-project.sh` → `setup_project.sh --type copilot`
- `genesis_boot.sh` → `setup_project.sh --type genesis`

### Validation Scripts (Will be consolidated)
- `check-dependencies.sh` → `verify-all.sh --check dependencies`
- `check-markdown.sh` → `verify-all.sh --check markdown`
- `validate-instructions.sh` → `verify-all.sh --check instructions`
- `validate-prompt.sh` → `verify-all.sh --check prompts`

### Development Tools (Will be consolidated)
- `analyze-test-structure.sh` → `verify-all.sh --analyze tests`
- `update-checklist.sh` → `autonomous-state-manager.sh --update checklist`
- `vscode_auto_env.sh` → `setup_web_dev_environment.sh --vscode`

### SDK/Database Setup (Will be consolidated)
- `setup_questrade_sdk_core.sh` → `setup_ts_sdk.sh --questrade core`
- `setup_questrade_types.sh` → `setup_ts_sdk.sh --questrade types`
- `setup_agent_framework.sh` → `setup_ts_sdk.sh --agent-framework`
- `setup_agent_system.sh` → `setup_ts_sdk.sh --agent-system`
- `setup_api_error.sh` → `setup_ts_sdk.sh --api-error`
- `setup_helpers.sh` → `setup_ts_sdk.sh --helpers`

## How to Access Old Functionality

All functionality from archived scripts has been preserved in the consolidated scripts with parameter-based access. Use the new consolidated scripts with the appropriate parameters shown above.

## Restoration

If you need to restore any archived script:
1. The functionality is available in the consolidated scripts
2. Original scripts are preserved in git history
3. This archive directory serves as reference

## Last Updated
2025-07-23 - Initial script consolidation effort
