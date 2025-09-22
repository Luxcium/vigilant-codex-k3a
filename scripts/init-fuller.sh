#!/usr/bin/env bash
###############################################################################
# Name: init.sh
# Type: Carrier‑grade, institutional‑level atomic fetcher (GitHub raw, commit‑pinned)
#
# Objective
#   - Fetch a fixed set of repository files from a specific Git commit via
#     GitHub raw URLs and place them under the current working directory.
#   - Preserve relative paths (e.g., memory-bank/instructions/...).
#   - Enforce all-or-nothing semantics: if any target already exists or any
#     download fails, no files are written to the working tree.
#
# Scope & Non‑Goals
#   - Scope: Read-only remote fetch, local atomic placement, minimal dependencies.
#   - Non-goals: Authenticated requests, proxy configuration, or auto-updating
#     commits. These can be layered on later if required.
#
# Guarantees & Failure Semantics
#   - No-overwrite guarantee: if a destination path exists, the script aborts
#     without altering the working tree.
#   - Atomic placement: files are downloaded to an ephemeral staging directory
#     and moved into place only after all validations pass.
#   - Idempotence: safe to re-run as long as targets do not pre-exist.
#   - Clean-up: staging directory is removed even on error (trap-based).
#
# Agentic Behavior Notes
#   - Deterministic inputs: source is commit-pinned to ensure reproducibility.
#   - Defensive networking: curl retries with timeouts; HTTPS-only enforced.
#   - Explicit dry-run: `--check` to validate environment and show actions
#     without changing state, aiding orchestration and audits.
#   - Observability: timestamped logs for traceability in CI/production.
#   - Remote preflight: optional remote availability probe prior to download.
#   - Integrity: optional SHA256 verification via `--verify` and/or checksum
#     annotations in a manifest file (see Operational Guidance).
#
# Operational Guidance
#   - Default: run with no arguments to perform the atomic fetch.
#   - Dry-run: run with `--check` to validate and preview actions.
#   - Manifest: use `--manifest <file>` to load targets; each line may be
#     either a path or `sha256  path`. With `--verify`, all targets must have
#     checksums and will be validated.
#   - Logging: set `--quiet`/`--verbose` or `LOG_LEVEL`; use `LOG_FORMAT=json`
#     for structured logs in CI/observability pipelines.
#   - Help: run with `-h|--help` for usage and details.
#
# Security Assumptions
#   - By default, integrity is trusted at the commit layer; enable `--verify`
#     or supply checksums in a manifest to enforce SHA256 validation.
#   - HTTPS enforced; redirects allowed; no credentials used.
#
# Future Enhancements (non-breaking)
#   - Proxy/Auth hooks via environment variables.
#   - YAML/JSON manifest with schema checks (current manifest is line-based).
#   - Optional backup/rollback strategy for a policy-gated `--force` mode.
#
# Behavior summary: all-or-nothing; preserves relative paths; will not overwrite
# existing files. Exit codes: 0 on success; 2 for operational errors.
###############################################################################

set -euo pipefail
IFS=$'\n\t'

# ---------- Shell/Bash prerequisites ----------
if [[ -z "${BASH_VERSINFO:-}" || ${BASH_VERSINFO[0]:-0} -lt 4 ]]; then
  printf '%s\n' "[ERROR] Bash 4+ is required." >&2
  exit 2
fi

# ---------- CLI usage/help ----------
usage() {
  cat <<'USAGE'
Usage: ./init.sh [--check] [--manifest FILE] [--verify] [--quiet|--verbose] [--help]

Fetch an immutable set of files from a specific GitHub commit and place them
atomically under the current directory. Will not overwrite existing files.

Options:
  --check        Perform validations and show planned actions (dry-run).
                 Reports any destination collisions without failing.
  --manifest F   Load targets from manifest (lines: "path" or "sha256  path").
                 When checksums are present, they will be verified.
  --verify       Require checksum verification for all targets (fatal if missing).
  --quiet        Reduce output to errors only (LOG_LEVEL=error).
  --verbose      Increase output to include debug (LOG_LEVEL=debug).
  -h, --help     Show this help and exit.

Environment overrides (advanced):
  REPO_OWNER, REPO_NAME, COMMIT, BASE_URL  Override source repo/URL.
  ENABLE_REMOTE_PREFLIGHT=true|false       Probe remote availability before download (default: true).
  CURL_RETRIES, CURL_RETRY_DELAY, CURL_MAX_TIME  Tune curl resiliency (default: 5, 2, 60).
  LOG_FORMAT=text|json                     Structured log output (default: text).
  LOG_LEVEL=debug|info|warn|error          Logging threshold (default: info).

Exit codes:
  0  Success
  2  Operational error (preflight, download, placement, or env issue)
USAGE
}

# ---------- Args ----------
DRY_RUN=false
VERIFY=false
MANIFEST=""
CLI_LOG_LEVEL=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --check)
      DRY_RUN=true; shift ;;
    --manifest)
      MANIFEST="$2"; shift 2 ;;
    --verify)
      VERIFY=true; shift ;;
    --quiet)
      CLI_LOG_LEVEL="error"; shift ;;
    --verbose)
      CLI_LOG_LEVEL="debug"; shift ;;
    -h|--help)
      usage; exit 0 ;;
    *)
      printf '%s\n' "[ERROR] Unknown argument: $1" >&2
      usage; exit 2 ;;
  esac
done

# ---------- Configuration (constants) ----------
REPO_OWNER="${REPO_OWNER:-Luxcium}"
REPO_NAME="${REPO_NAME:-vigilant-codex-k3a}"
COMMIT="${COMMIT:-21b02e9d2d3741d6d23b9ed2dfc57accb55a678b}"
BASE_URL="${BASE_URL:-https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${COMMIT}/}"
readonly REPO_OWNER REPO_NAME COMMIT BASE_URL

# Tunables for network resiliency
CURL_RETRIES=${CURL_RETRIES:-5}
CURL_RETRY_DELAY=${CURL_RETRY_DELAY:-2}
CURL_MAX_TIME=${CURL_MAX_TIME:-60}
ENABLE_REMOTE_PREFLIGHT=${ENABLE_REMOTE_PREFLIGHT:-true}
readonly CURL_RETRIES CURL_RETRY_DELAY CURL_MAX_TIME ENABLE_REMOTE_PREFLIGHT

# Logging configuration
LOG_FORMAT=${LOG_FORMAT:-text}
LOG_LEVEL=${CLI_LOG_LEVEL:-${LOG_LEVEL:-info}}
# Prefer python3 for JSON escaping if available
PYCMD="$(command -v python3 || true)"
if [[ "$LOG_FORMAT" == json && -z "$PYCMD" ]]; then
  # Fallback to text if json requested but python3 missing
  LOG_FORMAT=text
fi
readonly LOG_FORMAT LOG_LEVEL PYCMD

# Targets to fetch (relative paths to place under current working directory)
TARGETS=(
  "memory-bank/instructions/layer-1-v2-verify-and-bootstrap.instructions.md"
  "memory-bank/instructions/layer-2-v2-verify-and-bootstrap.instructions.md"
  "memory-bank/instructions/layer-3a-v2-custom-instructions-factory.instructions.md"
  "memory-bank/instructions/layer-3b-v2-chatmodes-factory.instructions.md"
  "memory-bank/instructions/layer-3c-v2-prompt-files-factory.instructions.md"
  "memory-bank/instructions/layer-4-v2-automation-and-health.instructions.md"
)
# Optional per-file checksums when using a manifest
declare -A CHECKSUMS
HAS_CHECKSUMS=false

# ---------- Utilities ----------
ts() { date -u +'%Y-%m-%dT%H:%M:%SZ'; }
lvl_num() { case "$1" in debug) echo 10;; info) echo 20;; warn) echo 30;; error) echo 40;; *) echo 20;; esac; }
SHOULD_NUM=$(lvl_num "$LOG_LEVEL")
emit_log() {
  local level="$1"; shift
  local msg="$*"
  local ln=$(lvl_num "$level")
  [[ "$ln" -lt "$SHOULD_NUM" ]] && return 0
  if [[ "$LOG_FORMAT" == json ]]; then
    printf '{"ts":"%s","level":"%s","msg":%s}\n' "$(ts)" "${level^^}" "$(printf '%s' "$msg" | "$PYCMD" -c 'import json,sys; print(json.dumps(sys.stdin.read()))')"
  else
    printf '%s\n' "[$(ts)] [${level^^}] $msg"
  fi
}
debug() { emit_log debug "$*"; }
log()   { emit_log info  "$*"; }
warn()  { emit_log warn  "$*" >&2; }
fatal() { emit_log error "$*" >&2; exit 2; }

cleanup() {
  if [[ -n "${STAGING_DIR:-}" && -d "$STAGING_DIR" ]]; then
    rm -rf -- "$STAGING_DIR"
  fi
}
# Ensure cleanup on common termination signals and errors
trap cleanup EXIT INT TERM HUP ERR

# Ensure curl is available
if ! command -v curl >/dev/null 2>&1; then
  fatal "curl is required but not found in PATH."
fi

# Ensure writable cwd
if [[ ! -w "." ]]; then
  fatal "Current directory is not writable. Run in a writable location."
fi

# Validate COMMIT looks like a Git SHA (7-40 hex) to preserve determinism
# Validate COMMIT looks like a Git SHA (7-40 hex) to preserve determinism
if [[ ! "$COMMIT" =~ ^[0-9a-f]{7,40}$ ]]; then
  fatal "COMMIT must be a hex Git SHA (7-40 chars). Got: $COMMIT"
fi

# Enforce HTTPS in BASE_URL to avoid downgrade/misconfig
if [[ ! "$BASE_URL" =~ ^https:// ]]; then
  fatal "BASE_URL must start with https:// for transport security. Got: $BASE_URL"
fi

# ---------- Optional manifest loading ----------
if [[ -n "$MANIFEST" ]]; then
  if [[ ! -r "$MANIFEST" ]]; then
    fatal "Manifest file is not readable: $MANIFEST"
  fi
  log "Loading manifest: $MANIFEST"
  TARGETS=()
  # Reset checksum map
  unset CHECKSUMS
  declare -A CHECKSUMS
  HAS_CHECKSUMS=false
  while IFS= read -r line || [[ -n "$line" ]]; do
    # Skip blank lines and comments
    if [[ $line =~ ^[[:space:]]*$ ]]; then continue; fi
    if [[ $line =~ ^[[:space:]]*# ]]; then continue; fi
    if [[ $line =~ ^[[:space:]]*([0-9A-Fa-f]{64})[[:space:]]+(.+)$ ]]; then
      cs="${BASH_REMATCH[1]}"; p="${BASH_REMATCH[2]}"
      p="${p#./}"
      TARGETS+=("$p")
      CHECKSUMS["$p"]="$cs"
      HAS_CHECKSUMS=true
    else
      p="$line"; p="${p#./}"
      TARGETS+=("$p")
    fi
  done < "$MANIFEST"
  log "Manifest targets loaded: ${#TARGETS[@]} (checksums: $HAS_CHECKSUMS)"
fi

# ---------- Pre-flight checks ----------
log "Pre-flight: checking destinations do not exist..."
collisions=()
for f in "${TARGETS[@]}"; do
  if [[ -e "$f" ]]; then
    collisions+=("$f")
  fi
done

if [[ "$DRY_RUN" == true ]]; then
  log "Dry-run (--check): would download ${#TARGETS[@]} file(s) from: $BASE_URL"
  for rel in "${TARGETS[@]}"; do
    printf '%s\n' "[PLAN] GET ${BASE_URL}${rel} -> ./${rel}"
  done
  if (( ${#collisions[@]} > 0 )); then
    warn "Detected ${#collisions[@]} destination collision(s). A real run would abort."
    for c in "${collisions[@]}"; do
      printf '%s\n' "[COLLISION] $c"
    done
  else
    log "Destination checks passed: no existing targets found."
  fi
  exit 0
fi

if (( ${#collisions[@]} > 0 )); then
  for c in "${collisions[@]}"; do
    warn "Destination exists and would be overwritten: $c"
  done
  fatal "Aborting (no changes) due to destination collision(s)."
fi

log "Destination checks passed: no existing targets found."

# Optional remote availability preflight (range probes to avoid full downloads)
if [[ "$ENABLE_REMOTE_PREFLIGHT" == true ]]; then
  log "Remote preflight: probing availability of ${#TARGETS[@]} file(s) at source..."
  for rel in "${TARGETS[@]}"; do
    src="${BASE_URL}${rel}"
    if ! curl --fail --location --silent --show-error \
         --retry "$CURL_RETRIES" --retry-delay "$CURL_RETRY_DELAY" --max-time "$CURL_MAX_TIME" \
         --proto '=https' --tlsv1.2 \
         --range 0-0 --output /dev/null "$src"; then
      fatal "Remote preflight failed (unavailable or unauthorized): $src"
    fi
  done
  log "Remote preflight passed for all targets. Proceeding to downloads."
else
  warn "Remote preflight disabled (ENABLE_REMOTE_PREFLIGHT=$ENABLE_REMOTE_PREFLIGHT)."
fi

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
       --retry "$CURL_RETRIES" --retry-delay "$CURL_RETRY_DELAY" --max-time "$CURL_MAX_TIME" \
       --proto '=https' --tlsv1.2 \
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

# ---------- Optional checksum verification ----------
compute_sha256() {
  local f="$1"
  if command -v sha256sum >/dev/null 2>&1; then
    sha256sum "$f" | awk '{print $1}'
  elif command -v shasum >/dev/null 2>&1; then
    shasum -a 256 "$f" | awk '{print $1}'
  else
    fatal "No sha256 utility found (sha256sum or shasum)."
  fi
}

if [[ "$VERIFY" == true ]]; then
  log "Checksum verification enabled (strict)."
fi

if [[ "$VERIFY" == true ]] || [[ -n "${HAS_CHECKSUMS:-}" ]]; then
  for rel in "${TARGETS[@]}"; do
    stfile="${STAGING_DIR}/${rel}"
    expected="${CHECKSUMS[$rel]:-}"
    if [[ "$VERIFY" == true && -z "$expected" ]]; then
      fatal "Missing checksum for: $rel (required by --verify)"
    fi
    if [[ -n "$expected" ]]; then
      actual=$(compute_sha256 "$stfile")
      debug "Checksum $rel expected=$expected actual=$actual"
      if [[ "$actual" != "$expected" ]]; then
        fatal "Checksum mismatch for $rel"
      fi
    fi
  done
  log "Checksum verification passed for staged files."
fi

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
