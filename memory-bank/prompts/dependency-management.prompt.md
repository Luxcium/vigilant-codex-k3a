---
mode: 'agent'
tools: ['codebase', 'terminalLastCommand', 'githubRepo']
description: 'Track and update project dependencies with proper documentation'
---

# Dependency Management and Documentation

Your task is to help me manage and document dependencies in the Codex CLI project following our established standards and protocols.

## Context

The Codex CLI project maintains strict rules for dependency tracking in the `memory-bank/dependencies.md` file. Every dependency must be documented with rationale and impact analysis, and bidirectional tracking is required.

## Requirements

1. Help identify and document all dependencies for a given change or feature
2. Update the `dependencies.md` file with proper formatting and cross-references
3. Analyze potential impacts of dependency changes throughout the system
4. Ensure all memory bank files are updated with relevant dependency information

## Task Workflow

### 1. Dependency Identification

- Analyze the current codebase structure using the `codebase` tool
- Identify direct and indirect dependencies for the component in question
- Map out all relationships between files, components, and processes

### 2. Documentation Updates

- Update `memory-bank/dependencies.md` with new entries following the established format:
  - **Source:** The dependent file/component/process
  - **Target:** The dependency
  - **Why:** Rationale for the dependency
  - **Impact:** What happens if the dependency is changed or reversed

### 3. Reverse Dependency Tracking

- Document what depends on each component
- Ensure bidirectional tracking is maintained
- Justify any circular dependencies if they exist

### 4. Impact Analysis

- Analyze how changes to dependencies might affect other parts of the system
- Document potential risks and mitigation strategies
- Update relevant memory bank files with new dependency information

### 5. Verification

- Verify that all dependencies are properly documented
- Check for consistency across all memory bank files
- Ensure markdown-lint compliance for all documentation changes

## Output Format

- Provide clear, well-formatted updates for the dependencies.md file
- Include detailed rationales for each dependency relationship
- Conduct thorough impact analysis for all dependency changes
- Follow strict markdown-lint formatting requirements

Help me maintain proper dependency documentation that follows all the project's standards and enables seamless collaboration between contributors.

## References

- [system-autonomous-optimizations](../instructions/system-autonomous-optimizations.instructions.md)

## Verification

- `markdownlint --strict` on updated Markdown files
- `scripts/verify-all.sh`
