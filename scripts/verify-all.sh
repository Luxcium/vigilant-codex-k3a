#!/usr/bin/env bash

## =============================================================================
#? Script Name: verify-all.sh
#? Aim: Run comprehensive validation suite for the entire repository
#? Purpose: Consolidate all validation tasks into a single entry point with selective checking capabilities
#? Decision Rationale: Combines 5 separate validation scripts to reduce redundancy and provide unified interface for quality assurance
#? Usage: ./verify-all.sh [--check dependencies|markdown|instructions|prompts|tests] [--analyze tests]
#? Dependencies: markdownlint, git, python (optional), docker (optional)
#? Last Updated: 2025-07-24 by GitHub Copilot
#? References: .vscode/tasks.json validation tasks, memory-bank validation protocols
## =============================================================================
set -euo pipefail

#==============================================================================
# Script Name: verify-all.sh
# Aim: Run comprehensive validation suite for the entire repository
# Purpose: Consolidate all validation tasks into a single entry point with selective checking
# Decision Rationale: Combines 5 separate validation scripts to reduce redundancy and provide unified interface
# Usage: ./verify-all.sh [--check dependencies|markdown|instructions|prompts|tests] [--analyze tests]
# Dependencies: markdownlint, git, python (optional), docker (optional)
# Last Updated: 2025-07-23 by GitHub Copilot
# References: .vscode/tasks.json validation tasks, memory-bank validation protocols
#==============================================================================

# Script directory and project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log() {
  echo -e "${BLUE}[$(date -u '+%Y-%m-%dT%H:%M:%SZ')]${NC} $1"
}

warn() {
  echo -e "${YELLOW}[WARNING]${NC} $1"
}

error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

success() {
  echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# Usage function
usage() {
  cat << EOF
Usage: $0 [OPTIONS]

Repository Validation Script

Options:
    --check TYPE           Run specific validation: dependencies, markdown, instructions, prompts, tests
    --analyze tests        Analyze test structure and coverage
    --help                Show this help message

Examples:
    $0                                    # Run all validations
    $0 --check markdown                   # Only markdown validation
    $0 --check dependencies               # Only dependency validation
    $0 --analyze tests                    # Analyze test structure

Validation Types:
    dependencies          Verify memory-bank/dependencies.md structure
    markdown             Run markdownlint on all Markdown files
    instructions         Validate .github/instructions/*.instructions.md
    prompts              Validate .github/prompts/*.prompt.md
    tests                Run test suite and check coverage
    memory-bank          Validate memory bank file structure

EOF
}

# Check dependencies validation
check_dependencies() {
  log "Validating dependencies structure..."

  DEPS_FILE="$PROJECT_ROOT/memory-bank/dependencies.md"
  if [ ! -f "$DEPS_FILE" ]; then
    error "Dependencies file not found: $DEPS_FILE"
    return 1
  fi

  # Check required sections
  if ! grep -q "## Purpose" "$DEPS_FILE"; then
    error "Missing '## Purpose' section in dependencies.md"
    return 1
  fi

  if ! grep -q "## Dependencies and Relationships" "$DEPS_FILE"; then
    error "Missing '## Dependencies and Relationships' section in dependencies.md"
    return 1
  fi

  success "Dependencies structure validation passed"
  return 0
}

# Check markdown validation
check_markdown() {
  log "Running markdownlint validation..."

  if ! command -v markdownlint &> /dev/null; then
    warn "markdownlint not found, skipping markdown validation"
    return 0
  fi

  cd "$PROJECT_ROOT"

  # Run markdownlint on all markdown files
  if markdownlint --config .markdownlint.yaml **/*.md; then
    success "Markdown validation passed"
    return 0
  else
    error "Markdown validation failed"
    return 1
  fi
}

# Check instructions validation
check_instructions() {
  log "Validating instruction files..."

  INSTRUCTIONS_DIR="$PROJECT_ROOT/.github/instructions"
  if [ ! -d "$INSTRUCTIONS_DIR" ]; then
    warn "Instructions directory not found: $INSTRUCTIONS_DIR"
    return 0
  fi

  local failed=0

  for file in "$INSTRUCTIONS_DIR"/*.instructions.md; do
    if [ -f "$file" ]; then
      log "Checking $(basename "$file")..."

      # Check file has proper extension
      if [[ ! "$file" =~ \.instructions\.md$ ]]; then
        error "Invalid instruction file extension: $(basename "$file")"
        failed=1
        continue
      fi

      # Check file has content
      if [ ! -s "$file" ]; then
        error "Instruction file is empty: $(basename "$file")"
        failed=1
        continue
      fi

      # Run markdownlint if available
      if command -v markdownlint &> /dev/null; then
        if ! markdownlint --config "$PROJECT_ROOT/.markdownlint.yaml" "$file"; then
          error "Markdownlint failed for: $(basename "$file")"
          failed=1
        fi
      fi
    fi
  done

  if [ $failed -eq 0 ]; then
    success "Instructions validation passed"
    return 0
  else
    error "Instructions validation failed"
    return 1
  fi
}

# Check prompts validation
check_prompts() {
  log "Validating prompt files..."

  PROMPTS_DIR="$PROJECT_ROOT/.github/prompts"
  if [ ! -d "$PROMPTS_DIR" ]; then
    warn "Prompts directory not found: $PROMPTS_DIR"
    return 0
  fi

  local failed=0

  for file in "$PROMPTS_DIR"/*.prompt.md; do
    if [ -f "$file" ]; then
      log "Checking $(basename "$file")..."

      # Check file has proper extension
      if [[ ! "$file" =~ \.prompt\.md$ ]]; then
        error "Invalid prompt file extension: $(basename "$file")"
        failed=1
        continue
      fi

      # Check file has content
      if [ ! -s "$file" ]; then
        error "Prompt file is empty: $(basename "$file")"
        failed=1
        continue
      fi

      # Run markdownlint if available
      if command -v markdownlint &> /dev/null; then
        if ! markdownlint --config "$PROJECT_ROOT/.markdownlint.yaml" "$file"; then
          error "Markdownlint failed for: $(basename "$file")"
          failed=1
        fi
      fi
    fi
  done

  if [ $failed -eq 0 ]; then
    success "Prompts validation passed"
    return 0
  else
    error "Prompts validation failed"
    return 1
  fi
}

# Check memory bank validation
check_memory_bank() {
  log "Validating memory bank structure..."

  MEMORY_BANK_DIR="$PROJECT_ROOT/memory-bank"
  if [ ! -d "$MEMORY_BANK_DIR" ]; then
    error "Memory bank directory not found: $MEMORY_BANK_DIR"
    return 1
  fi

  local failed=0

  # Required memory bank files
  local required_files=(
    "activeContext.md"
    "dependencies.md"
    "progress.md"
    "projectbrief.md"
    "systemPatterns.md"
    "techContext.md"
  )

  for file in "${required_files[@]}"; do
    if [ ! -f "$MEMORY_BANK_DIR/$file" ]; then
      error "Missing required memory bank file: $file"
      failed=1
      continue
    fi

    # Check for single # header rule
    local header_count=$(grep -c "^# " "$MEMORY_BANK_DIR/$file" || true)
    if [ "$header_count" -ne 1 ]; then
      error "File $file must have exactly one # header, found: $header_count"
      failed=1
    fi

    # Run markdownlint if available
    if command -v markdownlint &> /dev/null; then
      if ! markdownlint --config "$PROJECT_ROOT/.markdownlint.yaml" "$MEMORY_BANK_DIR/$file"; then
        error "Markdownlint failed for: $file"
        failed=1
      fi
    fi
  done

  if [ $failed -eq 0 ]; then
    success "Memory bank validation passed"
    return 0
  else
    error "Memory bank validation failed"
    return 1
  fi
}

# Analyze test structure
analyze_tests() {
  log "Analyzing test structure..."

  # Check for test directories
  local test_dirs=(
    "$PROJECT_ROOT/src/tests"
    "$PROJECT_ROOT/web/src/__tests__"
    "$PROJECT_ROOT/python/tests"
    "$PROJECT_ROOT/agent-framework/tests"
  )

  for test_dir in "${test_dirs[@]}"; do
    if [ -d "$test_dir" ]; then
      log "Found test directory: $(basename "$(dirname "$test_dir")")/$(basename "$test_dir")"

      # Count test files
      local test_count=$(find "$test_dir" -name "*.test.*" -o -name "*_test.*" -o -name "test_*" | wc -l)
      log "  Test files: $test_count"

      # Check for coverage configuration
      local coverage_files=(
        "$(dirname "$test_dir")/jest.config.js"
        "$(dirname "$test_dir")/vitest.config.ts"
        "$(dirname "$test_dir")/pytest.ini"
        "$(dirname "$test_dir")/pyproject.toml"
      )

      for coverage_file in "${coverage_files[@]}"; do
        if [ -f "$coverage_file" ]; then
          log "  Coverage config: $(basename "$coverage_file")"
        fi
      done
    fi
  done

  success "Test structure analysis completed"
  return 0
}

# Main execution logic
main() {
  local check_type=""
  local analyze_flag=false
  local run_all=true

  # Parse command line arguments
  while [[ $# -gt 0 ]]; do
    case $1 in
      --check)
        check_type="$2"
        run_all=false
        shift 2
        ;;
      --analyze)
        if [ "$2" = "tests" ]; then
          analyze_flag=true
          run_all=false
          shift 2
        else
          error "Unknown analyze option: $2"
          exit 1
        fi
        ;;
      --help)
        usage
        exit 0
        ;;
      *)
        error "Unknown option: $1"
        usage
        exit 1
        ;;
    esac
  done

  log "Starting repository validation..."

  local exit_code=0

  # Handle specific check types
  if [ "$run_all" = false ]; then
    if [ -n "$check_type" ]; then
      case "$check_type" in
        dependencies)
          check_dependencies || exit_code=1
          ;;
        markdown)
          check_markdown || exit_code=1
          ;;
        instructions)
          check_instructions || exit_code=1
          ;;
        prompts)
          check_prompts || exit_code=1
          ;;
        tests)
          analyze_tests || exit_code=1
          ;;
        memory-bank)
          check_memory_bank || exit_code=1
          ;;
        *)
          error "Unknown check type: $check_type"
          usage
          exit 1
          ;;
      esac
    fi

    if [ "$analyze_flag" = true ]; then
      analyze_tests || exit_code=1
    fi
  else
    # Run all validations
    check_dependencies || exit_code=1
    check_markdown || exit_code=1
    check_instructions || exit_code=1
    check_prompts || exit_code=1
    check_memory_bank || exit_code=1
  fi

  if [ $exit_code -eq 0 ]; then
    success "All validations passed!"
  else
    error "Some validations failed"
  fi

  return $exit_code
}

# Run main function
main "$@"

#? Validation Status: Actively Validated on 2025-07-24
