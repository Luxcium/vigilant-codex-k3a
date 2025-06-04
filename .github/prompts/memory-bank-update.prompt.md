---
mode: 'agent'
tools: ['codebase', 'terminalLastCommand']
description: 'Update memory bank documentation with proper cross-references'
---
# Memory Bank Documentation Update

Your task is to help me update memory bank documentation following our established standards and protocols.

## Context

The Codex CLI project maintains a structured "Memory Bank" documentation system with strict rules for updates, cross-references, and dependency tracking. All updates must follow the reading protocol, writing protocol, and verification guidelines.

## Requirements

1. Update one or more memory bank files with new information
2. Ensure proper cross-references between memory bank files
3. Maintain consistency across all documentation
4. Follow the project's markdown-lint strict mode requirements
5. Update dependencies.md with any new relationships

## Task Workflow

### 1. Reading Protocol
- First, follow the reading protocol from `.clinerules/reading-protocol.md`
- Read all memory bank files in the correct order:
  1. AGENTS.md (repository context/instructions)
  2. projectbrief.md (foundation)
  3. productContext.md (purpose)
  4. systemPatterns.md (architecture)
  5. techContext.md (implementation)
  6. activeContext.md (current state)
  7. progress.md (status)

### 2. Documentation Updates
- Identify which memory bank files need updates
- Make changes while preserving the existing structure
- Follow the writing protocol from `.clinerules/writing-protocol.md`
- Ensure changes are properly cross-referenced across files

### 3. Dependency Management
- Update the `dependencies.md` file if relationships change
- Include "why" explanations and impact analysis
- Maintain bidirectional tracking for all dependencies

### 4. Compliance Verification
- Verify that all changes follow the markdown-lint requirements
- Check for consistency across all memory bank files
- Follow the verification protocol from `.clinerules/verification.md`
- Ensure all file structure changes are done via scripts

## Output Format
- Provide well-structured updates for the memory bank files
- Include proper cross-references between files
- Maintain consistent formatting and structure
- Follow all project-specific documentation standards

Help me maintain memory bank documentation that follows all the project's standards and enables seamless collaboration between contributors.
