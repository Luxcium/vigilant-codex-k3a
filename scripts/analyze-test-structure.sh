## =============================================================================
#? Script Name: analyze-test-structure.sh
#? Aim: Analyse and organise test structure for 1:1 mapping with source code
#? Purpose: Ensure comprehensive test coverage and create missing test directories
#? Decision Rationale: Provides a structured approach to test creation and validation
#? Usage: ./analyze-test-structure.sh
#? Dependencies: Node.js, pnpm, eslint, TypeScript
#? Last Updated: 2025-07-23 by GitHub Copilot
#? References: src/, src/tests/, package.json
## =============================================================================

#? Validation Status: Actively Validated on 2025-07-23

#!/bin/bash

# Test Structure Analysis and Organization Script
# This script analyzes the current test structure and creates missing test directories

set -e

PROJECT_ROOT="/projects/annexes/vigilant-codex-k3a.2/vigilant-codex-k3a"
SRC_DIR="$PROJECT_ROOT/src"
TEST_DIR="$PROJECT_ROOT/src/tests"

echo "🔍 Analyzing test structure for 1:1 mapping with source code..."

# Create arrays to track source files and their corresponding test files
declare -a SOURCE_FILES
declare -a EXISTING_TESTS
declare -a MISSING_TESTS

# Function to create test directories if they don't exist
create_test_directories() {
  echo "📁 Creating test directory structure..."

  # Create main test directories to mirror src structure
  mkdir -p "$TEST_DIR/auth/providers"
  mkdir -p "$TEST_DIR/auth/tokenStore"
  mkdir -p "$TEST_DIR/client"
  mkdir -p "$TEST_DIR/errors"
  mkdir -p "$TEST_DIR/http"
  mkdir -p "$TEST_DIR/rateLimit"
  # Note: types directory excluded as per user request

  echo "✅ Test directories created successfully"
}

# Function to analyze coverage gaps
analyze_coverage() {
  echo "🧪 Analyzing test coverage gaps..."

  # Find all TypeScript files in src (excluding tests and types)
  while IFS= read -r -d '' file; do
    # Get relative path from src directory
    rel_path="${file#$SRC_DIR/}"

    # Skip files in tests and types directories
    if [[ "$rel_path" == tests/* ]] || [[ "$rel_path" == types/* ]]; then
      continue
    fi

    SOURCE_FILES+=("$rel_path")

    # Determine expected test file path
    test_file="${rel_path%.ts}.test.ts"
    test_path="$TEST_DIR/$test_file"

    if [[ -f "$test_path" ]]; then
      EXISTING_TESTS+=("$test_file")
      echo "✅ Test exists: $test_file"
    else
      MISSING_TESTS+=("$test_file")
      echo "❌ Missing test: $test_file"
    fi
  done < <(find "$SRC_DIR" -name "*.ts" -not -path "*/node_modules/*" -print0)
}

# Function to report findings
report_findings() {
  echo ""
  echo "📊 TEST COVERAGE ANALYSIS REPORT"
  echo "================================="
  echo "Total source files: ${#SOURCE_FILES[@]}"
  echo "Existing tests: ${#EXISTING_TESTS[@]}"
  echo "Missing tests: ${#MISSING_TESTS[@]}"

  if [[ ${#MISSING_TESTS[@]} -gt 0 ]]; then
    echo ""
    echo "🚨 MISSING TEST FILES:"
    printf '%s\n' "${MISSING_TESTS[@]}"
  fi

  # Calculate coverage percentage
  if [[ ${#SOURCE_FILES[@]} -gt 0 ]]; then
    coverage_percentage=$((${#EXISTING_TESTS[@]} * 100 / ${#SOURCE_FILES[@]}))
    echo ""
    echo "📈 Current test coverage: $coverage_percentage%"
  fi
}

# Function to create prioritized test creation plan
create_test_plan() {
  echo ""
  echo "📋 INCREMENTAL TEST CREATION PLAN"
  echo "================================="
  echo "Priority 1: Core Authentication (auth/)"
  echo "Priority 2: Error Handling (errors/)"
  echo "Priority 3: HTTP Client (http/)"
  echo "Priority 4: Rate Limiting (rateLimit/)"
  echo "Priority 5: Client Implementation (client/)"
  echo "Priority 6: Provider Implementations (auth/providers/)"
  echo "Priority 7: Token Storage (auth/tokenStore/)"
}

# Function to validate existing tests
validate_tests() {
  echo ""
  echo "🔧 Validating existing test files..."

  cd "$PROJECT_ROOT"

  # Run linting on test files
  if npx eslint "src/tests/**/*.ts" --quiet; then
    echo "✅ All test files pass linting"
  else
    echo "⚠️  Some test files have linting issues"
  fi

  # Run type checking
  if npx tsc --noEmit; then
    echo "✅ All test files pass type checking"
  else
    echo "⚠️  Some test files have type errors"
  fi
}

# Main execution
main() {
  echo "🚀 Starting test structure analysis..."

  create_test_directories
  analyze_coverage
  report_findings
  create_test_plan
  validate_tests

  echo ""
  echo "🎯 Next steps:"
  echo "1. Run 'npm run test:coverage' to see detailed coverage"
  echo "2. Create missing test files incrementally by priority"
  echo "3. Use 'npm run test:auth' to test authentication module"
  echo "4. Use 'npm run test:errors' to test error handling"
  echo ""
  echo "✨ Test structure analysis complete!"
}

# Execute main function
main
