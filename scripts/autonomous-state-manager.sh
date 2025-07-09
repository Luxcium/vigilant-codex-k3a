#!/bin/bash

# Autonomous State Manager for Codex CLI
# Updates project state automatically after AI agent actions
# Called by other scripts to maintain current project status

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MEMORY_BANK="$PROJECT_ROOT/memory-bank"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Function to update progress tracking
update_progress() {
  local action="$1"
  local component="$2"
  local status="$3"

  # Append to progress.md with timestamp
  echo "- **$TIMESTAMP**: $action - $component ($status)" >> "$MEMORY_BANK/progress.md"

  # Update activeContext.md
  update_active_context "$component" "$status"
}

# Function to update active context
update_active_context() {
  local component="$1"
  local status="$2"

  # Create or update activeContext entry
  if ! grep -q "## Current Active Components" "$MEMORY_BANK/activeContext.md" 2> /dev/null; then
    echo -e "\n## Current Active Components\n" >> "$MEMORY_BANK/activeContext.md"
  fi

  # Remove old entry for this component if exists
  sed -i "/- $component:/d" "$MEMORY_BANK/activeContext.md"

  # Add new entry
  echo "- $component: $status" >> "$MEMORY_BANK/activeContext.md"
}

# Function to update dependencies when new components are added
update_dependencies() {
  local new_component="$1"
  local dependency_type="$2"
  local related_components="$3"

  echo "### $new_component" >> "$MEMORY_BANK/dependencies.md"
  echo "- **Type**: $dependency_type" >> "$MEMORY_BANK/dependencies.md"
  echo "- **Dependencies**: $related_components" >> "$MEMORY_BANK/dependencies.md"
  echo "- **Added**: $TIMESTAMP" >> "$MEMORY_BANK/dependencies.md"
  echo "" >> "$MEMORY_BANK/dependencies.md"
}

# Function to scan and auto-detect project changes
scan_project_changes() {
  local changes_detected=false

  # Check for new .prompt.md files
  if find "$PROJECT_ROOT/.github/prompts" -name "*.prompt.md" -newer "$MEMORY_BANK/progress.md" 2> /dev/null | grep -q .; then
    update_progress "CREATED" "New Prompt Files" "ACTIVE"
    changes_detected=true
  fi

  # Check for new .instructions.md files
  if find "$PROJECT_ROOT/.github/instructions" -name "*.instructions.md" -newer "$MEMORY_BANK/progress.md" 2> /dev/null | grep -q .; then
    update_progress "CREATED" "New Instruction Files" "ACTIVE"
    changes_detected=true
  fi

  # Check for new scripts
  if find "$PROJECT_ROOT/scripts" -name "*.sh" -newer "$MEMORY_BANK/progress.md" 2> /dev/null | grep -q .; then
    update_progress "CREATED" "New Automation Scripts" "ACTIVE"
    changes_detected=true
  fi

  if [ "$changes_detected" = true ]; then
    echo "✅ Project state updated automatically"
  else
    echo "ℹ️ No changes detected since last update"
  fi
}

# Main execution
case "${1:-scan}" in
  "progress")
    update_progress "$2" "$3" "$4"
    ;;
  "dependencies")
    update_dependencies "$2" "$3" "$4"
    ;;
  "scan")
    scan_project_changes
    ;;
  "context")
    update_active_context "$2" "$3"
    ;;
  *)
    echo "Usage: $0 {progress|dependencies|scan|context} [args...]"
    echo "  progress <action> <component> <status>"
    echo "  dependencies <component> <type> <related>"
    echo "  scan (auto-detect changes)"
    echo "  context <component> <status>"
    ;;
esac
