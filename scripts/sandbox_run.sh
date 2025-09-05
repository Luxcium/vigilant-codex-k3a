#!/usr/bin/env bash

# Sandbox harness to run project scripts in isolation (no side effects).
# - Creates a temp workspace under .sandbox/
# - Copies the target script so its relative PROJECT_ROOT points to the sandbox
# - Optionally injects mock binaries (npx, pip, docker, etc.) to avoid network/privileged ops
# - Leaves your repo untouched; all writes happen inside .sandbox/work-*/
#
# Usage:
#   scripts/sandbox_run.sh path/to/script.sh [-- real args...]
#
# Options via env vars:
#   SANDBOX_PROFILE: auto | web | python | docker | none   (default: auto)
#   SANDBOX_MOCK:    1 to enable mocks, 0 to disable        (default: 1)
#   SANDBOX_KEEP:    1 to keep sandbox dir, 0 to clean up   (default: 0)
#   SANDBOX_VERBOSE: 1 for verbose logging                  (default: 1)
#
# Notes:
# - This harness does NOT require Docker. If you want a containerized run,
#   you can wrap this with your own docker run --network=none and mount the repo.
# - Networked operations are mocked by default to respect no-lock-files preference.
# - AI Agents: Prefer using scripts/sandbox_docker_run.sh for maximum isolation
#   and leave a short comment in your PR/patch describing what you validated.

set -euo pipefail

log() { echo "[sandbox $(date -u '+%Y-%m-%dT%H:%M:%SZ')] $*"; }
err() { echo "[sandbox ERROR] $*" >&2; }

usage() {
  cat <<EOF
Sandbox harness

Usage: $0 path/to/script.sh [-- script-args]

Env:
  SANDBOX_PROFILE: auto | web | python | docker | none (default: auto)
  SANDBOX_MOCK:    1|0 (default: 1)
  SANDBOX_KEEP:    1|0 (default: 0)
  SANDBOX_VERBOSE: 1|0 (default: 1)
EOF
}

if [[ ${1:-} == "-h" || ${1:-} == "--help" || $# -lt 1 ]]; then
  usage; exit 0
fi

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TARGET_SCRIPT_SRC="$1"; shift || true
[[ ${1:-} == "--" ]] && shift || true
TARGET_ARGS=($@)

if [[ ! -f "$TARGET_SCRIPT_SRC" ]]; then
  # Allow passing just the basename for scripts/ paths
  if [[ -f "$REPO_ROOT/scripts/$TARGET_SCRIPT_SRC" ]]; then
    TARGET_SCRIPT_SRC="$REPO_ROOT/scripts/$TARGET_SCRIPT_SRC"
  else
    err "Script not found: $TARGET_SCRIPT_SRC"; exit 1
  fi
fi

SANDBOX_DIR_BASE="${SANDBOX_DIR_BASE:-$REPO_ROOT/.sandbox}"
mkdir -p "$SANDBOX_DIR_BASE"
RUN_ID="work-$(date +%Y%m%dT%H%M%SZ)-$RANDOM"
WORK_DIR="$SANDBOX_DIR_BASE/$RUN_ID"
BIN_DIR="$WORK_DIR/mockbin"
mkdir -p "$WORK_DIR/scripts" "$BIN_DIR"

: "${SANDBOX_PROFILE:=auto}"
: "${SANDBOX_MOCK:=1}"
: "${SANDBOX_KEEP:=0}"
: "${SANDBOX_VERBOSE:=1}"

[[ "$SANDBOX_VERBOSE" == 1 ]] && set -x || true

# Copy the target script into sandbox to localize PROJECT_ROOT logic
cp "$TARGET_SCRIPT_SRC" "$WORK_DIR/scripts/"
TARGET_BASENAME="$(basename "$TARGET_SCRIPT_SRC")"
TARGET_SCRIPT="$WORK_DIR/scripts/$TARGET_BASENAME"
chmod +x "$TARGET_SCRIPT"

# Seed minimal expected structure for common scripts
touch "$WORK_DIR/.gitignore"
mkdir -p "$WORK_DIR/src" "$WORK_DIR/python" "$WORK_DIR/web"

# Detect profile if auto
if [[ "$SANDBOX_PROFILE" == "auto" ]]; then
  case "$TARGET_BASENAME" in
    *web_env*.sh|*web*.sh) SANDBOX_PROFILE="web" ;;
    *python*.sh)           SANDBOX_PROFILE="python" ;;
    *docker*.sh)           SANDBOX_PROFILE="docker" ;;
    *)                     SANDBOX_PROFILE="none" ;;
  esac
fi

if [[ "$SANDBOX_MOCK" == 1 ]]; then
  # Common stubs to avoid network/privileged actions
  cat > "$BIN_DIR/npx" <<'STUB'
#!/usr/bin/env bash
set -euo pipefail
echo "[mock npx] $@"
if [[ "$*" == *create-next-app* ]]; then
  # Simulate minimal Next.js scaffold
  target=$(printf '%s' "$@" | awk '{print $NF}')
  mkdir -p "$target"
  echo '{"name":"web","private":true}' > "$target/package.json"
  echo "[mock npx] created $target/package.json"
fi
STUB
  chmod +x "$BIN_DIR/npx"

  for name in pnpm npm yarn; do
    cat > "$BIN_DIR/$name" <<'STUB'
#!/usr/bin/env bash
set -euo pipefail
echo "[mock $0] $@"
STUB
    chmod +x "$BIN_DIR/$name"
  done

  cat > "$BIN_DIR/python3" <<'STUB'
#!/usr/bin/env bash
set -euo pipefail
if [[ "${1:-}" == "--version" ]]; then
  echo "Python 3.11.0"
  exit 0
fi
if [[ "${1:-}" == "-m" && "${2:-}" == "venv" ]]; then
  mkdir -p .venv/bin
  printf '%s\n' '#!/usr/bin/env bash' > .venv/bin/activate
  chmod +x .venv/bin/activate
  exit 0
fi
echo "[mock python3] $@"
STUB
  chmod +x "$BIN_DIR/python3"

  for name in pip docker git; do
    cat > "$BIN_DIR/$name" <<'STUB'
#!/usr/bin/env bash
set -euo pipefail
echo "[mock $0] $@"
exit 0
STUB
    chmod +x "$BIN_DIR/$name"
  done
fi

# Compose PATH with mocks first
SANDBOX_PATH="$BIN_DIR:$PATH"

log "Sandbox: $WORK_DIR"
log "Profile: $SANDBOX_PROFILE (mocks: $SANDBOX_MOCK)"

pushd "$WORK_DIR" >/dev/null

# Run the script with a minimal env and mocked PATH
env -i \
  HOME="$WORK_DIR" \
  PATH="$SANDBOX_PATH" \
  TERM=xterm-256color \
  PROJECT_ROOT="$WORK_DIR" \
  PYTHON_DIR="$WORK_DIR/python" \
  WEB_DIR="$WORK_DIR/web" \
  bash "$TARGET_SCRIPT" "${TARGET_ARGS[@]}"

EXIT_CODE=$?
popd >/dev/null

if [[ $EXIT_CODE -eq 0 ]]; then
  log "SUCCESS: $TARGET_BASENAME completed in sandbox $RUN_ID"
else
  err "FAILURE: $TARGET_BASENAME exited with code $EXIT_CODE (sandbox $RUN_ID)"
fi

if [[ "$SANDBOX_KEEP" == 1 ]]; then
  log "Keeping sandbox at: $WORK_DIR"
else
  rm -rf "$WORK_DIR"
  log "Cleaned sandbox: $RUN_ID"
fi

exit $EXIT_CODE
