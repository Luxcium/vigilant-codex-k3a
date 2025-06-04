# Multipurpose Initialization Folder

This folder contains **autonomous initialization templates** for the Codex CLI project. AI agents use these templates to bootstrap new features, modules, or entire project segments from scratch.

## Purpose

- **Autonomous AI Development**: AI agents can reference these templates to create new components
- **Self-Managing System**: Templates automatically configure themselves based on project context
- **Replicable Segments**: Standard patterns for creating everything from simple scripts to complex monolithic modules

## Templates Available

### Core Templates
- `project-template/` - Full project initialization template
- `feature-template/` - New feature development template  
- `script-template/` - Automation script creation template
- `ai-agent-template/` - New AI agent workflow template

### Configuration Templates
- `typescript-module-template/` - TypeScript module with standards
- `python-module-template/` - Python module with standards
- `notebook-template/` - Jupyter notebook with ML standards
- `documentation-template/` - Standard documentation structure

## Usage by AI Agents

When an AI agent needs to create new components:

1. **Scan** this folder for appropriate templates
2. **Select** template based on requirements
3. **Configure** template with project-specific parameters
4. **Generate** new components using template structure
5. **Update** project state automatically via `autonomous-state-manager.sh`

## State Management Integration

All templates integrate with our autonomous state management:
- Auto-update `memory-bank/progress.md`
- Auto-update `memory-bank/dependencies.md` 
- Auto-update `memory-bank/activeContext.md`
- Cross-reference with existing `.prompt.md` and `.instructions.md` files

## Configuration-Driven Approach

Templates use variables that are automatically populated:
- `{{PROJECT_NAME}}` - Current project name
- `{{TIMESTAMP}}` - Current timestamp
- `{{COMPONENT_TYPE}}` - Type of component being created
- `{{DEPENDENCIES}}` - Required dependencies
- `{{STANDARDS}}` - Applicable coding standards

This enables the autonomous, self-managing system you described in your requirements.
