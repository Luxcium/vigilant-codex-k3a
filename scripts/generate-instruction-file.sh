#!/bin/bash

## =============================================================================
#? Script Name: generate-instruction-file.sh
#? Aim: Generate structured templates for .instructions.md files
#? Purpose: Automate creation of instruction files for AI agent framework
#? Decision Rationale: Provides consistent templates for coding standards, architecture, security, etc.
#? Usage: ./generate-instruction-file.sh -n <filename> -a <apply_to_glob> -d <description> [-t <type>]
#? Dependencies: bash, .github/instructions/, .github/prompts/
#? Last Updated: 2025-07-23 by GitHub Copilot
#? References: ai-instruction-creation.instructions.md, instruction-generator.prompt.md
## =============================================================================

#? Validation Status: Actively Validated on 2025-07-23

# AI Agent Framework - Instruction File Generator
# This script creates new .instructions.md files, providing structured templates
# to be populated based on .github/instructions/ai-instruction-creation.instructions.md

set -euo pipefail

# Configuration
INSTRUCTIONS_DIR=".github/instructions"
PROMPTS_DIR=".github/prompts"
# Reference to the prompt that would be used by an AI to fill the generated template
GENERATOR_PROMPT_FOR_AI_FILLING="$PROMPTS_DIR/instruction-generator.prompt.md"

# Colors for output
RED=\'\\033[0
31m\'
GREEN=\'\\033[0
32m\'
YELLOW=\'\\033[1
33m\'
BLUE=\'\\033[0
34m\'
NC=\'\\033[0m\' # No Color

# Helper functions
log_info() {
  echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
  echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
  echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

# Check if the conceptual generator prompt (for AI content filling) exists
check_conceptual_generator_prompt() {
  if [[ ! -f "$GENERATOR_PROMPT_FOR_AI_FILLING" ]]; then
    log_warning "Conceptual AI content generation prompt not found: $GENERATOR_PROMPT_FOR_AI_FILLING"
    log_info "This prompt would typically be used by an AI to populate the generated instruction file."
    log_info "You can proceed to create the template, but ensure such a prompt exists or is created for AI-assisted content filling."
  fi
}

# Create instructions directory if it doesn't exist
ensure_instructions_dir() {
  if [[ ! -d "$INSTRUCTIONS_DIR" ]]; then
    log_info "Creating instructions directory: $INSTRUCTIONS_DIR"
    mkdir -p "$INSTRUCTIONS_DIR"
  fi
}

# Validate instruction file name
validate_filename() {
  local filename="$1"

  if [[ ! "$filename" =~ ^[a-z][a-z0-9-]*\\.instructions\\.md$ ]]; then
    log_error "Invalid filename format: $filename"
    log_info "Expected format: [lowercase-with-dashes].instructions.md"
    log_info "Example: vue-component-standards.instructions.md"
    return 1
  fi

  return 0
}

# Check if file already exists
check_file_exists() {
  local filepath="$1"

  if [[ -f "$filepath" ]]; then
    log_warning "File already exists: $filepath"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
      log_info "Operation cancelled."
      exit 0
    fi
  fi
}

# Generate instruction file content based on type
generate_instruction_file_content() {
  local filename="$1"
  local apply_to="$2"
  local description="$3"
  local instruction_type="$4"
  local filepath="$INSTRUCTIONS_DIR/$filename"

  # Common header
  cat > "$filepath" << EOF
---
applyTo: "$apply_to"
# title: "$description" # Optional: For VS Code UI, as per ai-instruction-creation.instructions.md
# description: "Detailed explanation of these instructions." # Optional
---

# $description
EOF

  # Type-specific content
  case "$instruction_type" in
    "language")
      cat >> "$filepath" << EOF

## Naming Conventions
- <!-- Rule for classes and interfaces (e.g., PascalCase) -->
- <!-- Rule for functions, methods, variables (e.g., camelCase or snake_case) -->
- <!-- Rule for constants (e.g., UPPER_SNAKE_CASE) -->

## Formatting
- <!-- Rule for indentation, line length, braces, etc. -->

## Type System (if applicable, e.g., TypeScript, Python type hints)
- <!-- Rules for type definitions, usage of interfaces/aliases -->
- <!-- Rules for type safety, strict modes -->

## Language Features
- <!-- Rules for using specific language constructs -->
- <!-- Rules for avoiding deprecated features -->

## Error Handling
- <!-- Standard practices for error handling in this language -->

## Comments & Documentation (Style)
- <!-- Rule for comment style (e.g., JSDoc, Docstrings) -->
- <!-- Rule for when comments are required -->

## Imports/Modules
- <!-- Rule for import organization and module structure -->
EOF
      ;;
    "architecture")
      cat >> "$filepath" << EOF

## Directory Structure
- <!-- Rules for organizing files and folders -->
- <!-- Naming conventions for directories -->

## Component Design (if applicable)
- <!-- Rules for component granularity and responsibility -->
- <!-- State management patterns -->
- <!-- Communication between components -->

## Module Boundaries
- <!-- Rules for defining modules and their interfaces -->
- <!-- Dependency rules between modules -->

## Data Flow
- <!-- Patterns for data flow within the application/system -->

## API Design (if applicable)
- <!-- Standards for API endpoint naming, request/response formats -->
- <!-- Versioning strategy -->
EOF
      ;;
    "security")
      cat >> "$filepath" << EOF

## Input Validation
- <!-- Rules for validating all external inputs -->
- <!-- Preferred libraries/methods for validation -->

## Authentication
- <!-- Standards for user authentication mechanisms -->
- <!-- Token management, session handling -->

## Authorization
- <!-- Rules for access control and permissions -->

## Data Protection
- <!-- Requirements for encrypting sensitive data (at rest, in transit) -->
- <!-- Secure handling of credentials and secrets -->

## Error Handling & Logging (Security aspects)
- <!-- Avoid leaking sensitive information in errors/logs -->

## Dependency Security
- <!-- Rules for vetting and updating dependencies -->
EOF
      ;;
    "testing")
      cat >> "$filepath" << EOF

## Test Structure & Organization
- <!-- Where to place test files -->
- <!-- Naming conventions for test files and test cases -->

## Types of Tests
- <!-- Requirements for unit, integration, e2e tests -->
- <!-- Code coverage targets -->

## Test Writing Standards
- <!-- Principles like AAA (Arrange, Act, Assert) -->
- <!-- Mocking and stubbing strategies -->
- <!-- Use of testing frameworks/libraries -->

## Test Data Management
- <!-- How to manage and generate test data -->
EOF
      ;;
    "documentation")
      cat >> "$filepath" << EOF

## Code Comments
- <!-- Standards for inline comments, JSDoc, Python docstrings, etc. -->
- <!-- What to document (public APIs, complex logic) -->

## READMEs
- <!-- Structure and content requirements for README files (project, module level) -->

## External Documentation (e.g., Wikis, Design Docs)
- <!-- Standards for creating and maintaining external docs -->
- <!-- Linking between code and external docs -->

## Markdown Style
- <!-- Adherence to markdown-lint or other style guides -->
EOF
      ;;
    "file-org")
      cat >> "$filepath" << EOF

## Top-Level Directory Structure
- <!-- Purpose of each main directory (e.g., src, tests, docs, scripts) -->

## Source Code Organization
- <!-- How to structure code within src/ (e.g., by feature, by layer) -->

## Naming Conventions (Files & Directories)
- <!-- Consistent naming patterns -->

## Asset Management
- <!-- Where to store images, fonts, and other assets -->

## Configuration Files
- <!-- Location and management of config files -->
EOF
      ;;
    *) # Default or "general"
      cat >> "$filepath" << EOF

## Overview
<!-- Brief description of the purpose and scope of these instructions. -->
<!-- This is a general instruction file. For a more structured template, specify a type using -t option. -->
<!-- Valid types: language, architecture, security, testing, documentation, file-org -->

## General Standards
- <!-- Rule 1: Be specific and actionable. -->
- <!-- Rule 2: Use imperative mood (e.g., "Use snake_case..."). -->

## Specific Guidelines
- <!-- Guideline A: Define WHEN this applies and WHAT to do. -->
- <!-- Guideline B: Provide examples for complex rules. -->

<!-- Add more sections as needed based on the specific standards being defined. -->
<!-- Refer to .github/instructions/ai-instruction-creation.instructions.md for comprehensive guidance on how an AI should populate this file. -->
EOF
      ;;
  esac

  # Common footer (Cross-Reference, Quality Checklist)
  cat >> "$filepath" << EOF

## Cross-Reference Integration

### Memory Bank Connections
- Reference relevant files in \`memory-bank/\` directory.
- Update \`memory-bank/dependencies.md\` when creating new interdependencies.
- Follow reading protocol from \`.clinerules/reading-protocol.md\` (if it exists).

### Related Files
- <!-- List related instruction files (e.g., [base-standards.instructions.md](./base-standards.instructions.md)) -->
- <!-- List relevant prompt files or project documentation -->

## Quality Checklist (For AI/User filling this file)
- [ ] **\`applyTo\` Correctness**: Does the glob pattern accurately target the intended files/folders?
- [ ] **Clarity & Actionability**: Are rules unambiguous and easy for an AI (and human) to follow?
- [ ] **No Conflicts**: Do any rules contradict each other or established project practices?
- [ ] **Completeness (for scope)**: Does it cover the key aspects the user wanted to standardize for \`$description\`?
- [ ] **Imperative Language**: Are rules stated as directives?
- [ ] **Alignment with Codex CLI**: Do rules fit TypeScript, Python, NextJS, Shell, Notebook focus?
- [ ] **Maintainability**: Are rules stable and not overly prescriptive to hinder development?
- [ ] **Markdown Linting**: Ensure content is markdown-lint compliant.
EOF

  log_success "Generated instruction file template: $filepath"
  log_info "Please populate this file with specific rules."
  log_info "An AI can assist with this, guided by .github/instructions/ai-instruction-creation.instructions.md and potentially using $GENERATOR_PROMPT_FOR_AI_FILLING."
}

# Update dependencies.md with new instruction file
update_dependencies_reminder() {
  local filename="$1"
  local dependencies_file="memory-bank/dependencies.md"

  if [[ -f "$dependencies_file" ]]; then
    log_info "Don't forget to update $dependencies_file with the new instruction file dependencies."
    log_info "Add entry for: $INSTRUCTIONS_DIR/$filename"
  else
    log_warning "Dependencies file not found: $dependencies_file. Cannot provide reminder to update it."
  fi
}

# Display usage information
show_usage() {
  cat << EOF
AI Agent Framework - Instruction File Generator

Usage: $0 -n <filename> -a <apply_to_glob> -d <description> [-t <type>]

This script generates new .instructions.md files with structured templates
that align with the AI agent framework and ai-instruction-creation.instructions.md.

REQUIRED ARGUMENTS:
    -n, --name FILE     Name of the instruction file (e.g., "vue-standards.instructions.md")
    -a, --apply-to GLOB ApplyTo glob pattern (e.g., "**/*.vue" or "[\\"**/*.ts\\", \\"!**/*.test.ts\\"]")
    -d, --desc TEXT     Description for the instruction file (e.g., "Vue.js Component Standards")

OPTIONAL ARGUMENTS:
    -t, --type TYPE     Type of instruction to generate a specific template for.
                        Valid types:
                          language       - For language/framework specific coding standards
                          architecture   - For architectural patterns, component organization
                          security       - For security guidelines
                          testing        - For testing standards and practices
                          documentation  - For documentation conventions
                          file-org       - For file and directory organization rules
                          general        - (Default) A general-purpose template
    -h, --help          Show this help message

EXAMPLES:
    $0 -n "python-coding-style.instructions.md" -a "**/*.py" -d "Python Coding Style Standards" -t language
    $0 -n "nextjs-architecture.instructions.md" -a "app/**" -d "Next.js Project Architecture" -t architecture
    $0 -n "global-security.instructions.md" -a "**" -d "Global Security Guidelines" -t security
    $0 -n "api-testing.instructions.md" -a "**/tests/api/**/*.test.ts" -d "API Testing Standards" -t testing

The generated file will be placed in $INSTRUCTIONS_DIR/. It provides a skeleton
to be filled with specific rules, ideally with AI assistance guided by
.github/instructions/ai-instruction-creation.instructions.md.
EOF
}

# Main function
main() {
  local filename=""
  local apply_to=""
  local description=""
  local instruction_type="general" # Default type

  # Parse command line arguments
  while [[ $# -gt 0 ]]; do
    case $1 in
      -h | --help)
        show_usage
        exit 0
        ;;
      -n | --name)
        filename="$2"
        shift # past argument
        shift # past value
        ;;
      -a | --apply-to)
        apply_to="$2"
        shift # past argument
        shift # past value
        ;;
      -d | --desc)
        description="$2"
        shift # past argument
        shift # past value
        ;;
      -t | --type)
        instruction_type="$2"
        shift # past argument
        shift # past value
        ;;
      *) # unknown option
        log_error "Unknown option: $1"
        show_usage
        exit 1
        ;;
    esac
  done

  # Validate required arguments
  if [[ -z "$filename" || -z "$apply_to" || -z "$description" ]]; then
    log_error "Missing required arguments."
    show_usage
    exit 1
  fi

  # Validate filename format
  if ! validate_filename "$filename"; then
    exit 1
  fi

  # Validate instruction type
  case "$instruction_type" in
    "language" | "architecture" | "security" | "testing" | "documentation" | "file-org" | "general")
      # Valid type
      ;;
    *)
      log_error "Invalid instruction type: $instruction_type"
      log_info "Valid types are: language, architecture, security, testing, documentation, file-org, general"
      exit 1
      ;;
  esac

  ensure_instructions_dir
  check_conceptual_generator_prompt # Check for the AI filling prompt

  local full_filepath="$INSTRUCTIONS_DIR/$filename"
  check_file_exists "$full_filepath" # Handles overwrite confirmation

  generate_instruction_file_content "$filename" "$apply_to" "$description" "$instruction_type"
  update_dependencies_reminder "$filename"
}

# Entry point
main "$@"
