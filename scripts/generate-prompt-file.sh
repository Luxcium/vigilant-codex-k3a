## =============================================================================
#? Script Name: generate-prompt-file.sh
#? Aim: Generate structured templates for .prompt.md files
#? Purpose: Automate creation of prompt files for AI-assisted development workflows
#? Decision Rationale: Provides consistent templates for reusable prompts
#? Usage: ./generate-prompt-file.sh -n <filename> -t <title> -d <description>
#? Dependencies: bash, memory-bank/prompts/, memory-bank/dependencies.md
#? Last Updated: 2025-07-23 by GitHub Copilot
#? References: ai-prompt-creation.instructions.md, instruction-generator.prompt.md
## =============================================================================

#? Validation Status: Actively Validated on 2025-07-23

#!/bin/bash

# AI Agent Framework - Prompt File Generator
# This script creates new .prompt.md files for AI-assisted development workflows

set -euo pipefail

# Configuration
PROMPTS_DIR="memory-bank/prompts"
INSTRUCTIONS_DIR="memory-bank/instructions"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# AI Decision Matrix - When to create prompts (from Pair 05 guidelines)
should_create_prompt() {
  local task_type="$1"
  local frequency="$2"
  local complexity="$3"

  # Decision logic based on comprehensive guidelines
  case "$task_type" in
    "code-generation" | "debugging" | "refactoring" | "testing")
      if [[ "$frequency" == "high" || "$complexity" == "complex" ]]; then
        return 0 # Should create prompt
      fi
      ;;
    "documentation" | "deployment" | "architecture")
      return 0 # Always create for these types
      ;;
    "simple-task" | "one-off")
      if [[ "$complexity" == "complex" ]]; then
        return 0 # Create only if complex
      else
        return 1 # Skip simple one-offs
      fi
      ;;
  esac
  return 1 # Default: don't create
}

# AI Decision Logic for Prompt Creation (from Pair 06)
trigger_recognition() {
  local user_request="$1"

  # Check for explicit prompt creation triggers
  if [[ "$user_request" =~ (create|make|generate).*prompt.*file|need.*reusable.*prompt|setup.*prompt.*file ]]; then
    return 0 # Should create prompt
  fi

  # Check for exclusion patterns
  if [[ "$user_request" =~ direct.*code|immediate.*task|one-time|simple.*explanation ]]; then
    return 1 # Should NOT create prompt
  fi

  return 0 # Default to creating prompt if unclear
}

# Intent analysis for determining prompt characteristics
analyze_intent() {
  local task_description="$1"
  local intent_analysis=""

  # Task pattern identification
  if [[ "$task_description" =~ repeatable|multiple|reusable ]]; then
    intent_analysis="$intent_analysis repeatable"
  fi

  if [[ "$task_description" =~ multi-step|workflow|process ]]; then
    intent_analysis="$intent_analysis multi-step"
  fi

  if [[ "$task_description" =~ transform|refactor|modify ]]; then
    intent_analysis="$intent_analysis transformative"
  fi

  if [[ "$task_description" =~ analysis|review|explain ]]; then
    intent_analysis="$intent_analysis informational"
  fi

  echo "$intent_analysis"
}

# Determine appropriate mode based on task requirements
determine_mode() {
  local task_type="$1"

  case "$task_type" in
    *multi-step* | *workflow* | *generation*)
      echo "agent"
      ;;
    *transform* | *refactor* | *modify*)
      echo "edit"
      ;;
    *analysis* | *review* | *informational*)
      echo "ask"
      ;;
    *)
      echo "agent" # Default to agent mode
      ;;
  esac
}

# Select tools based on Codex CLI project context
select_tools() {
  local technology="$1"
  local task_type="$2"
  local tools=""

  # Base tools for different technologies
  case "$technology" in
    *typescript*)
      tools="codebase filesystem"
      ;;
    *python*)
      tools="codebase filesystem terminal"
      ;;
    *nextjs*)
      tools="codebase filesystem terminal"
      ;;
    *shell* | *script*)
      tools="filesystem terminal"
      ;;
    *notebook*)
      tools="codebase filesystem"
      ;;
    *)
      tools="codebase filesystem" # Default
      ;;
  esac

  # Add additional tools based on task type
  if [[ "$task_type" =~ terminal|command|install ]]; then
    if [[ ! "$tools" =~ terminal ]]; then
      tools="$tools terminal"
    fi
  fi

  echo "$tools"
}

# Auto-detect prompt requirements based on project context
analyze_project_context() {
  local context_info=""

  # Check for TypeScript files
  if find . -name "*.ts" -type f | head -1 | grep -q .; then
    context_info="$context_info typescript"
  fi

  # Check for Python files
  if find . -name "*.py" -type f | head -1 | grep -q .; then
    context_info="$context_info python"
  fi

  # Check for React/Vue components
  if find . -name "*.vue" -o -name "*.jsx" -o -name "*.tsx" -type f | head -1 | grep -q .; then
    context_info="$context_info frontend"
  fi

  # Check for Docker files
  if [[ -f "Dockerfile" || -f "docker-compose.yml" ]]; then
    context_info="$context_info docker"
  fi

  echo "$context_info"
}

# Create prompts directory if it doesn't exist
ensure_prompts_dir() {
  if [[ ! -d "$PROMPTS_DIR" ]]; then
    log_info "Creating prompts directory: $PROMPTS_DIR"
    mkdir -p "$PROMPTS_DIR"
  fi
}

# Validate prompt file name
validate_filename() {
  local filename="$1"

  if [[ ! "$filename" =~ ^[a-z][a-z0-9-]*\.prompt\.md$ ]]; then
    log_error "Invalid filename format: $filename"
    log_info "Expected format: [lowercase-with-dashes].prompt.md"
    log_info "Example: vue-component-generator.prompt.md"
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

# Generate prompt file template
generate_prompt_template() {
  local filename="$1"
  local title="$2"
  local description="$3"
  local filepath="$PROMPTS_DIR/$filename"

  cat > "$filepath" << EOF
# $title

## Description

$description

## Context Requirements

You are working in a VS Code workspace with the following project structure:
- \`src/\` — TypeScript source code
- \`python/\` — Python modules and utilities
- \`notebooks/\` — Jupyter notebooks
- \`scripts/\` — Shell scripts for automation
- \`memory-bank/\` — Project context and dependencies

## Instructions Integration

Apply the following instruction files during code generation:
- \`memory-bank/instructions/typescript-standards.instructions.md\` for TypeScript code
- \`memory-bank/instructions/python-standards.instructions.md\` for Python code
- \`memory-bank/instructions/python-notebook-standards.instructions.md\` for Jupyter notebooks
- \`memory-bank/instructions/file-organization.instructions.md\` for project structure

## Parametric Inputs

Define your inputs using the format: \`\${input:variableName:defaultValue}\`

### Required Parameters
- **\${input:componentName:ExampleComponent}** — Name of the component to generate
- **\${input:targetDirectory:src}** — Target directory for generated files
- **\${input:language:typescript}** — Programming language (typescript, python, etc.)

### Optional Parameters
- **\${input:includeTests:true}** — Whether to generate test files
- **\${input:styleFramework:none}** — Styling framework if applicable
- **\${input:additionalFeatures:none}** — Additional features to include

## Task Definition

<!-- Define the specific task this prompt accomplishes -->

### Primary Objectives
1. <!-- Objective 1 -->
2. <!-- Objective 2 -->
3. <!-- Objective 3 -->

### Success Criteria
- [ ] Generated code follows project standards
- [ ] All dependencies are properly tracked
- [ ] Tests are included if requested
- [ ] Documentation is complete and accurate
- [ ] Code integrates properly with existing project structure

## Implementation Steps

### 1. Analysis Phase
- Review existing project structure and patterns
- Identify dependencies and integration points
- Validate parametric inputs and requirements
- Check for conflicts with existing code

### 2. Generation Phase
- Create main implementation files in \`\${input:targetDirectory}\`
- Generate supporting files (tests, documentation, configs)
- Apply appropriate coding standards based on language
- Ensure proper error handling and validation

### 3. Integration Phase
- Update relevant documentation files
- Add dependencies to \`memory-bank/dependencies.md\`
- Create or update README sections as needed
- Verify integration with existing project components

### 4. Validation Phase
- Check generated code for syntax and style compliance
- Validate that all requirements are met
- Ensure proper cross-referencing and documentation
- Test integration with existing codebase

## Memory Bank Integration

### Required Updates
- **\`memory-bank/dependencies.md\`** — Add new component dependencies
- **\`memory-bank/activeContext.md\`** — Update current work context
- **\`memory-bank/progress.md\`** — Log completion of generated components

### Cross-References
Reference these files for context:
- \`memory-bank/projectbrief.md\` — Project requirements and goals
- \`memory-bank/techContext.md\` — Technical architecture decisions
- \`memory-bank/systemPatterns.md\` — Established patterns and conventions

## Quality Assurance

### Code Quality Checks
- [ ] Follows established coding standards for \`\${input:language}\`
- [ ] Includes appropriate error handling
- [ ] Has sufficient test coverage
- [ ] Uses semantic naming conventions
- [ ] Follows project's architectural patterns

### Documentation Checks
- [ ] All public APIs are documented
- [ ] README files are updated where relevant
- [ ] Dependencies are tracked in memory-bank
- [ ] Cross-references are accurate and bidirectional
- [ ] Markdown follows strict lint requirements

### Integration Checks
- [ ] No naming conflicts with existing components
- [ ] Proper integration with build systems
- [ ] Compatible with existing dependencies
- [ ] Follows project directory structure
- [ ] Updates all relevant configuration files

## Output Requirements

Provide the following deliverables:

1. **Generated Code Files**
   - Main implementation in \`\${input:targetDirectory}\`
   - Test files if \`\${input:includeTests}\` is true
   - Configuration files as needed

2. **Documentation Updates**
   - Updated README sections
   - API documentation for public interfaces
   - Usage examples and integration guides

3. **Project Integration**
   - Updated \`memory-bank/dependencies.md\`
   - Modified configuration files as needed
   - Added or updated scripts in \`scripts/\` directory

4. **Validation Report**
   - Confirmation of standards compliance
   - Integration test results
   - Dependency analysis summary

## Related Files

### Prompt Files
<!-- List related prompt files in memory-bank/prompts/ -->

### Instruction Files
<!-- List applicable instruction files in memory-bank/instructions/ -->

### Memory Bank Files
<!-- List relevant files in memory-bank/ -->

## Usage Examples

### VS Code Copilot
\`\`\`
@workspace Use the $filename prompt to generate a \${input:componentName}
component in \${input:targetDirectory} using \${input:language}
\`\`\`

### Cline AI
Reference this prompt file and provide values for the parametric inputs
to generate components following project standards.

### Codex CLI
\`\`\`bash
codex generate --prompt=$filename --params="componentName=MyComponent,targetDirectory=src,language=typescript"
\`\`\`
EOF

  log_success "Generated prompt file: $filepath"
}

# Update dependencies.md with new prompt file
update_dependencies() {
  local filename="$1"
  local dependencies_file="memory-bank/dependencies.md"

  if [[ -f "$dependencies_file" ]]; then
    log_info "Don't forget to update $dependencies_file with the new prompt file dependencies"
    log_info "Add entry for: memory-bank/prompts/$filename"
  else
    log_warning "Dependencies file not found: $dependencies_file"
  fi
}

# Display usage information
show_usage() {
  cat << EOF
AI Agent Framework - Prompt File Generator

Usage: $0 [OPTIONS]

This script generates new .prompt.md files for AI-assisted development workflows
that integrate with the existing instruction files and memory bank system.

OPTIONS:
    -h, --help          Show this help message
    -n, --name FILE     Name of the prompt file (required)
    -t, --title TEXT    Title for the prompt (required)
    -d, --desc TEXT     Description of the prompt's purpose (required)

EXAMPLES:
    $0 -n "vue-generator.prompt.md" -t "Vue Component Generator" -d "Generate Vue.js components with TypeScript and testing"
    $0 -n "api-endpoint.prompt.md" -t "API Endpoint Generator" -d "Create REST API endpoints with validation and documentation"
    $0 -n "notebook-creator.prompt.md" -t "ML Notebook Creator" -d "Generate Jupyter notebooks for machine learning workflows"

The generated file will be placed in $PROMPTS_DIR/ and will include:
- Parametric input system with \${input:name:default} syntax
- Integration with existing instruction files
- Memory bank cross-referencing
- Quality assurance checklists
- Usage examples for different AI tools

EOF
}

# Main function
main() {
  local filename=""
  local title=""
  local description=""

  # Parse command line arguments
  while [[ $# -gt 0 ]]; do
    case $1 in
      -h | --help)
        show_usage
        exit 0
        ;;
      -n | --name)
        filename="$2"
        shift 2
        ;;
      -t | --title)
        title="$2"
        shift 2
        ;;
      -d | --desc)
        description="$2"
        shift 2
        ;;
      *)
        log_error "Unknown option: $1"
        show_usage
        exit 1
        ;;
    esac
  done

  # Validate required arguments
  if [[ -z "$filename" || -z "$title" || -z "$description" ]]; then
    log_error "Missing required arguments"
    show_usage
    exit 1
  fi

  # Validate and process
  log_info "Generating prompt file: $filename"

  ensure_prompts_dir
  validate_filename "$filename" || exit 1

  local filepath="$PROMPTS_DIR/$filename"
  check_file_exists "$filepath"

  generate_prompt_template "$filename" "$title" "$description"
  update_dependencies "$filename"

  log_success "Prompt file generation completed!"
  log_info "Next steps:"
  log_info "1. Edit the generated file to customize the specific workflow"
  log_info "2. Update memory-bank/dependencies.md with new relationships"
  log_info "3. Test the prompt file with VS Code Copilot, Cline AI, or Codex CLI"
}

# Run main function if script is executed directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  main "$@"
fi
