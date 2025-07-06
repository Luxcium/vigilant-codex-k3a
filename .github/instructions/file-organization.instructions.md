---
applyTo: '**'
---

# File Organization Standards

## Project Root Structure

- Use standardized directory organization by language and framework
- Place TypeScript source code in `src/` directory
- Use `web/` for Next.js applications when coexisting with other code
- Place shell scripts exclusively in `scripts/` directory
- Use `python/` directory for Python projects and modules
- Place Jupyter notebooks in `notebooks/` directory
- Create language-specific subdirectories for complex multi-language projects

## Prompt and Instruction File Organization

- Place all prompt files in `.github/prompts/` directory
- Place all instruction files in `.github/instructions/` directory
- Use kebab-case naming convention for all files
- Follow pattern: `{domain}-{purpose}.{type}.md`
- Type is one of `prompt` or `instruction`
- Group related files by domain or feature area
- Maintain alphabetical ordering within directories

## File Naming Conventions

- Use descriptive, semantic names for all files
- Employ kebab-case for multi-word filenames
- Include file type indicators in names when helpful
- Keep filenames under 50 characters when possible
- Use consistent naming patterns within each directory
- Avoid abbreviations unless they are widely understood

## Directory Creation Rules

- Create all directories and files via scripts in `scripts/` directory
- Implement idempotent directory creation scripts
- Never overwrite existing files without explicit user consent
- Use existence checks before creating new directories
- Document directory purposes in README files
- Maintain consistent permission settings for created directories

## Memory Bank File Management

- Keep all memory bank files in `memory-bank/` directory
- Use camelCase naming for memory bank files
- Maintain cross-references between related memory bank files
- Update dependency relationships when creating new files
- Document file purposes and relationships in README files
- Follow the reading protocol from .clinerules/reading-protocol.md

## Configuration File Organization

- Place VS Code settings in `.vscode/` directory
- Use `.github/` for GitHub-specific configurations
- Place environment-specific configs in appropriate subdirectories
- Keep sensitive configuration out of version control
- Document configuration file purposes and relationships
- Use consistent formatting for all configuration files

## Documentation Standards

- Include README.md files in all major directories
- Maintain up-to-date documentation for file organization
- Document file relationships and dependencies
- Use consistent markdown formatting across all documentation
- Follow markdown-lint strict mode requirements
- Cross-reference related files using relative links

## Version Control Integration

- Follow gitignore best practices for each language
- Include only necessary files in version control
- Document version control patterns in project README
- Use consistent commit message formats
- Tag important milestones and releases
- Maintain clean repository history

## Dependency Tracking

- Update dependencies.md when creating new file relationships
- Document why each file dependency exists
- Analyze impact of file organization changes
- Avoid circular file dependencies when possible
- Implement bidirectional tracking for all file relationships
- Document file organization changes in appropriate memory bank files

## Quality Assurance

- Validate file organization follows project standards
- Check for broken links in documentation
- Ensure consistent naming conventions across project
- Verify all scripts are idempotent and safe to run
- Test file organization changes in development environment
- Maintain markdown-lint compliance for all documentation files

## Self-Referential State Documentation

- Agents MUST update `memory-bank/progress.md` when this file is modified, adding timestamped entries for tasks created or completed.
- Agents MUST record updates in `memory-bank/activeContext.md` to reflect current work focus and next steps.
- Agents MUST document all dependency additions or changes in `memory-bank/dependencies.md` with explicit rationale ("why") and impact analysis.

## Call to Action

> **AI Agents and Contributors Leadership:**
>
> - Autonomously update stateful Memory Bank files upon any change to this instruction file.
> - Use leadership language to drive accountability and project consistency.
> - Ensure this instruction file remains up-to-date before executing any tasks governed by file organization standards.
