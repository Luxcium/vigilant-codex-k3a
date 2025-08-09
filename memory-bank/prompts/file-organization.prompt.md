---
description: 'Comprehensive standards for file and directory organization, naming, documentation, and memory bank integration across the entire project.'
tools: ['codebase', 'editFiles', 'fetch', 'problems', 'runInTerminal', 'runTasks', 'search', 'usages']
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

- Place all prompt files in `memory-bank/prompts/` directory
- Place all instruction files in `memory-bank/instructions/` directory
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

## Script Management and Optimization Requirements

- Continuously reduce script quantity through strategic consolidation while maintaining functionality
- Apply comprehensive 10-line header documentation to all scripts with standardized format
- Update `scripts/README.md` automatically whenever scripts are added, modified, or removed
- Include inline documentation throughout scripts explaining purpose of critical sections
- Add validation status marker on final line: `#? Validation Status: Actively Validated on [DATE]`
- Conduct monthly script reviews to identify consolidation opportunities and dependency reduction
- Optimize script flow by removing redundant operations and streamlining logic
- Maintain "soul and state" of each script through comprehensive documentation that preserves intent
- Track script usage patterns to prioritize consolidation of rarely-used scripts
- Implement automated maintenance checks for header format compliance and README synchronization

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

---

0. project scripts and lifecycles for the workspace and tasks
   scripts/
1. Source Code & Application Logic
   src/
   prisma/
   .keys/
2. sub-project roots, UI & Client/server website Code
   web/
   python/
3. Data, Prototyping & Documentation
   notebooks/
   examples/
4. Build, Output & Dependencies
   dist/
   coverage/
5. Configuration, Metadata & Version Control
   .vscode/
   .github/
   memory-bank/instructions/
   memory-bank/prompts/
   memory-bank/chatmodes/
6. IMPERATIVE memory-bank/
   memory-bank/
7. Configuration, Alternative AI Assistants Metadata
   .clinerules/
   .codex/
8. Miscellaneous & Version Control
   node_modules/
   .git/
   i have no clue what is this for:
   init/
   agent-framework/
   templates/

---

## References

- [instruction-authoring-standards](../instructions/instruction-authoring-standards.instructions.md)

## Verification

- `markdownlint --strict` on updated Markdown files
- `scripts/verify-all.sh`
