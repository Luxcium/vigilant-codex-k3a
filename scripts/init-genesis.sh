#!/usr/bin/env bash
# Atomic, no-overwrite downloader for a set of raw GitHub files.
# Behavior: all-or-nothing; preserves relative paths; will not overwrite existing files.

set -euo pipefail
IFS=$'\n\t'
# https://raw.githubusercontent.com/
# Luxcium/
# vigilant-codex-k3a/
# cbe0104de4c5b99b44abf9fd28889c17b455a53f
# ---------- Configuration (constants) ----------
REPO_OWNER="Luxcium"
REPO_NAME="vigilant-codex-k3a"
COMMIT="cbe0104de4c5b99b44abf9fd28889c17b455a53f"
BASE_URL="https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${COMMIT}/"

# Targets to fetch (relative paths to place under current working directory)
TARGETS=(
  "memory-bank/instructions/layer-1-verify-and-bootstrap.instructions.md"
  "memory-bank/instructions/layer-2-verify-and-bootstrap.instructions.md"
  "memory-bank/instructions/layer-3a-custom-instructions-factory.instructions.md"
  "memory-bank/instructions/layer-3b-chatmodes-factory.instructions.md"
  "memory-bank/instructions/layer-3c-prompt-files-factory.instructions.md"
  "memory-bank/instructions/layer-4-automation-and-health.instructions.md"
)

# ---------- Utilities ----------
log()   { printf '%s\n' "[INFO] $*"; }
warn()  { printf '%s\n' "[WARN] $*" >&2; }
fatal() { printf '%s\n' "[ERROR] $*" >&2; exit 2; }

cleanup() {
  if [[ -n "${STAGING_DIR:-}" && -d "$STAGING_DIR" ]]; then
    rm -rf -- "$STAGING_DIR"
  fi
}
trap cleanup EXIT

# Ensure curl is available
if ! command -v curl >/dev/null 2>&1; then
  fatal "curl is required but not found in PATH."
fi

# Ensure writable cwd
if [[ ! -w "." ]]; then
  fatal "Current directory is not writable. Run in a writable location."
fi

# ---------- Pre-flight checks ----------
log "Pre-flight: checking destinations do not exist..."
for f in "${TARGETS[@]}"; do
  if [[ -e "$f" ]]; then
    fatal "Destination exists and would be overwritten: $f. Aborting (no changes)."
  fi
done
log "Destination checks passed: no existing targets found."

# Create ephemeral staging directory
STAGING_DIR="$(mktemp -d --tmpdir atomic-download.XXXXXXXX)" || fatal "Failed to create staging dir"
log "Created staging directory: $STAGING_DIR"

# ---------- Download all files to staging (validate HTTP) ----------
log "Attempting to download ${#TARGETS[@]} file(s) from ${BASE_URL}"
for rel in "${TARGETS[@]}"; do
  src="${BASE_URL}${rel}"
  dest="${STAGING_DIR}/${rel}"
  dest_dir="$(dirname -- "$dest")"
  mkdir -p -- "$dest_dir"
  log "Downloading: $src"
  # curl flags:
  #   --fail: exit non-zero on HTTP errors (no body saved)
  #   --location: follow redirects
  #   --silent --show-error: quiet progress but show errors
  #   --retry with backoff for transient network issues
  if ! curl --fail --location --silent --show-error \
       --retry 5 --retry-delay 2 --max-time 60 \
       --output "$dest" "$src"; then
    fatal "Download failed for $src. Aborting and cleaning up."
  fi
done
log "All files downloaded into staging."

# ---------- Verify downloads non-empty (optional sanity) ----------
for rel in "${TARGETS[@]}"; do
  stfile="${STAGING_DIR}/${rel}"
  if [[ ! -s "$stfile" ]]; then
    fatal "Downloaded file is empty or missing: $stfile. Aborting."
  fi
done
log "Sanity check: downloaded files appear non-empty."

# ---------- Final atomic placement ----------
# Re-check destinations to avoid race conditions between earlier check and now
log "Final check: ensure no destination collisions before moving files..."
for rel in "${TARGETS[@]}"; do
  if [[ -e "$rel" ]]; then
    fatal "Race detected: destination now exists: $rel. Aborting (no changes)."
  fi
done

# Move staged files into place. Do so directory-first to minimize partial states.
# We build the set of directories to create, create them, then move files.
dirs_to_create=()
while IFS= read -r -d '' d; do
  dirs_to_create+=("$d")
done < <(find "$STAGING_DIR" -type d -print0)

# Create directories in destination (preserve mode default)
for d in "${dirs_to_create[@]}"; do
  # Map staging dir to current working dir
  rel_path="${d#$STAGING_DIR/}"
  if [[ -n "$rel_path" ]]; then
    mkdir -p -- "$rel_path"
  fi
done

# Move files
while IFS= read -r -d '' f; do
  rel_path="${f#$STAGING_DIR/}"
  # Double-check target does not exist before move (last safety)
  if [[ -e "$rel_path" ]]; then
    fatal "Collision before move: $rel_path exists. Aborting."
  fi
  mv -- "$f" "$rel_path"
done < <(find "$STAGING_DIR" -type f -print0)

# If we reached here, moves succeeded. Cleanup will remove empty staging via trap.
log "SUCCESS: All files placed atomically under current directory."
exit 0
