#!/usr/bin/env bash
set -euo pipefail

# Cleanup and consolidation of README variants across the repo
# - Backs up everything to a timestamped dir under ./backup-readmes/
# - Keeps only one authoritative README.md per directory
# - Removes variants like README.sync.md, README.synced.md, README.rewrite.md, README.final.md, README.consolidated.md
# - Prints an audit trail before/after
# - Optionally runs markdownlint if present

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/.. && pwd)"
TS="$(date -u +%Y%m%dT%H%M%SZ)"
BACKUP_DIR="$ROOT_DIR/backup-readmes/$TS"

log() { printf "[cleanup] %s\n" "$*"; }

authoritative_readme() {
  # Minimal lint-clean README content used if a folder has no README.md
  local title=$1
  cat <<EOF
# $title

This is the authoritative README for \
	the $title folder. Duplicate variants were removed on $TS.
EOF
}

list_variants() {
  # Find all README variants we consider duplicates
  ( cd "$ROOT_DIR" && \
    find . -type f \( \
      -name 'README.sync.md' -o \
      -name 'README.synced.md' -o \
      -name 'README.rewrite.md' -o \
      -name 'README.final.md' -o \
      -name 'README.consolidated.md' \
    \) | LC_ALL=C sort )
}

ensure_readme_exists() {
  # Ensure each directory with variants has a README.md
  # If missing, create a minimal authoritative one
  local dir=$1
  if [ ! -f "$dir/README.md" ]; then
    local name
    name=$(basename "$dir")
    log "No README.md in $dir — creating minimal authoritative one"
    authoritative_readme "$name" > "$dir/README.md"
  fi
}

backup_files() {
  mkdir -p "$BACKUP_DIR"
  log "Backing up to $BACKUP_DIR"

  # Backup existing README.md files in dirs that have variants
  while IFS= read -r f; do
    local d
    d=$(dirname "$f")
    mkdir -p "$BACKUP_DIR/$d"
    if [ -f "$d/README.md" ]; then
      cp -a "$d/README.md" "$BACKUP_DIR/$d/README.md"
    fi
    # Backup the variant itself
    mkdir -p "$BACKUP_DIR/$(dirname "$f")"
    cp -a "$f" "$BACKUP_DIR/$f"
  done < <(list_variants)
}

remove_variants() {
  log "Removing README variants..."
  while IFS= read -r f; do
    local d
    d=$(dirname "$f")
    ensure_readme_exists "$d"
    rm -f "$f"
  done < <(list_variants)
}

pre_audit() {
  log "Pre-cleanup variant list:"
  list_variants || true
}

post_audit() {
  log "Post-cleanup variant list (should be empty):"
  list_variants || true

  log "Current README files (authoritative):"
  ( cd "$ROOT_DIR" && find . -type f -name 'README.md' | LC_ALL=C sort )
}

maybe_markdownlint() {
  if command -v markdownlint >/dev/null 2>&1; then
    log "Running markdownlint on READMEs..."
    ( cd "$ROOT_DIR" && markdownlint "**/README.md" || true )
  else
    log "markdownlint not found; skipping lint check"
  fi
}

main() {
  log "Starting README cleanup at $TS"
  pre_audit
  backup_files
  remove_variants
  post_audit
  maybe_markdownlint
  log "Cleanup completed successfully. Backups in $BACKUP_DIR"
}

main "$@"
