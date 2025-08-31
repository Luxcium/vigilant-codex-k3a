#!/usr/bin/env bash
set -euo pipefail

# Safeguard script: fails if README variants exist anywhere in the repo
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/.. && pwd)"

list_variants() {
  ( cd "$ROOT_DIR" && \
    find . -type f \( \
      -name 'README.sync.md' -o \
      -name 'README.synced.md' -o \
      -name 'README.rewrite.md' -o \
      -name 'README.final.md' -o \
      -name 'README.consolidated.md' \
    \) | LC_ALL=C sort )
}

variants=$(list_variants || true)
if [ -n "$variants" ]; then
  echo "[readme-guard] ERROR: README variant files found:" >&2
  echo "$variants" >&2
  echo "[readme-guard] Please run: ./scripts/cleanup_readmes.sh" >&2
  exit 1
fi

echo "[readme-guard] OK: No README variants present."
