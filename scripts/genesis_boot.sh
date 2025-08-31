## =============================================================================
#? Script Name: genesis_boot.sh
#? Aim: Perform minimal genesis boot-phase checks
#? Purpose: Validate dependencies, detect workspace type, and check Git status
#? Decision Rationale: Ensures initial setup readiness for development or CI/CD
#? Usage: ./genesis_boot.sh
#? Dependencies: Node.js, npm/pnpm/yarn, Git
#? Last Updated: 2025-07-23 by GitHub Copilot
#? References: package.json, pnpm-workspace.yaml, Git repository
## =============================================================================


#!/usr/bin/env bash
# genesis_boot.sh: Minimal genesis boot-phase checks
set -euo pipefail

log() {
  echo "[$(date -u '+%Y-%m-%dT%H:%M:%SZ')] $1"
}

install_deps() {
  local dir="$1"
  local pm=""
  if [ -f "$dir/pnpm-lock.yaml" ]; then
    pm="pnpm"
  elif [ -f "$dir/package-lock.json" ] || [ -f "$dir/npm-shrinkwrap.json" ]; then
    pm="npm"
  elif [ -f "$dir/yarn.lock" ]; then
    pm="yarn"
  else
    pm="npm"
  fi

  if [ "$pm" = "pnpm" ] && [ -f "$dir/pnpm-workspace.yaml" ]; then
    log "pnpm workspace detected in $dir"
  fi

  log "Installing dependencies in $dir with $pm"
  (cd "$dir" && "$pm" install)
}

check_node_dir() {
  local pkg_file="$1"
  local dir
  dir="$(dirname "$pkg_file")"
  if [ ! -d "$dir/node_modules" ]; then
    log "node_modules missing in $dir"
    install_deps "$dir"
  else
    log "node_modules already present in $dir"
  fi

  if [ -d "$dir/node_modules" ]; then
    log "Dependencies installed for $dir"
  else
    log "[ERROR] Dependency installation failed in $dir"
  fi
}

main() {
  local pkg_files
  pkg_files=$(find . -maxdepth 2 -name package.json -not -path '*/node_modules/*')
  if [ -z "$pkg_files" ]; then
    log "No package.json found"
  else
    while IFS= read -r pkg; do
      check_node_dir "$pkg"
    done <<< "$pkg_files"
  fi

  if [ -f /.dockerenv ] || [ "${CI:-}" = "true" ]; then
    log "Running inside container"
  else
    log "Running on host"
  fi

  if git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    local branch
    branch=$(git rev-parse --abbrev-ref HEAD)
    log "Git branch: $branch"
    git status --short
  else
    log "Not a git repository"
  fi
}

main "$@"

#? Validation Status: Actively Validated on 2025-08-31
