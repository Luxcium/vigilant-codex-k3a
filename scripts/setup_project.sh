#!/usr/bin/env bash
# setup_project.sh: Idempotent project setup script
# Creates required directories and files without overwriting existing content

set -euo pipefail

log() {
  echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] $1"
}

# Directories to create
DIRS=(".github" ".vscode" "memory-bank" "scripts")

# Files to create (with placeholders if empty)
FILES=(".gitignore" ".clinerules" "README.md" "AGENTS.md")

# Create directories
for dir in "${DIRS[@]}"; do
  if [ ! -d "$dir" ]; then
    mkdir -p "$dir"
    log "Created directory: $dir"
  else
    log "Directory already exists: $dir"
  fi
done

# Create files and add placeholder if empty, with size and content validation
for file in "${FILES[@]}"; do
  # Check if file exists
  if [ ! -f "$file" ]; then
    touch "$file"
    log "Created file: $file"
  else
    # File exists, check size and log details
    size=$(stat -c%s "$file")
    if [ "$size" -eq 0 ]; then
      log "File $file exists but is empty (size=0)."
    else
      log "File $file already exists (size=$size bytes)."
    fi
  fi

  # Only add placeholder if file is empty
  if [ ! -s "$file" ]; then
    echo "# Placeholder for $file" > "$file"
    log "Added placeholder to $file"
    if [[ "$file" == *.md ]]; then
      log "Verifying Markdown compliance…"
      markdownlint --config .markdownlint.yaml "$file" || {
        echo "[ERROR] $file failed markdownlint."
        exit 1
      }
    fi
  else
    log "File $file is not empty, skipping placeholder."
  fi
done

# Make script itself executable
chmod +x "$0"

log "Project structure setup complete."
