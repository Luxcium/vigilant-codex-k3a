#!/usr/bin/env bash

# Run a project script inside a Docker sandbox with no side effects.
# - Mounts repo read-only at /repo
# - Uses a writable /work for all outputs
# - Disables network ( --network=none )
# - Invokes scripts/sandbox_run.sh inside the container to add mocks and isolate
#
# Usage:
#   scripts/sandbox_docker_run.sh scripts/<script>.sh [-- script-args]
#
# Env options:
#   DOCKER_IMAGE: base image to use (default: bash:5.2)
#   SANDBOX_MOCK: 1|0 (default: 1)
#   SANDBOX_KEEP: 1|0 (default: 1 to let you inspect /work)
#   DOCKER_USER:  user to run as (default: current UID:GID)

# AI Agents: Use this wrapper by default to test scripts. It prevents network
# access and repo writes. Keep SANDBOX_MOCK=1 for dry runs; set to 0 only when
# the image contains all required tools and a real run is intended.

set -euo pipefail

usage() {
  cat <<EOF
Docker sandbox wrapper

Usage: $0 scripts/<script>.sh [-- script-args]

Env:
  DOCKER_IMAGE   base image (default: bash:5.2)
  SANDBOX_MOCK   1|0 mocks for networked tools (default: 1)
  SANDBOX_KEEP   1|0 keep /work after run (default: 1)
  DOCKER_USER    UID:GID or name (default: host uid:gid)
EOF
}

if [[ ${1:-} == "-h" || ${1:-} == "--help" || $# -lt 1 ]]; then
  usage; exit 0
fi

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TARGET_SCRIPT="$1"; shift || true
[[ ${1:-} == "--" ]] && shift || true
SCRIPT_ARGS=("$@")

if [[ ! -f "$REPO_ROOT/$TARGET_SCRIPT" ]]; then
  echo "[docker-sandbox] Script not found relative to repo: $TARGET_SCRIPT" >&2
  exit 1
fi

: "${DOCKER_IMAGE:=bash:5.2}"
: "${SANDBOX_MOCK:=1}"
: "${SANDBOX_KEEP:=1}"

# Prefer matching host uid/gid to avoid root-owned files in /work
HOST_UID=$(id -u)
HOST_GID=$(id -g)
: "${DOCKER_USER:=$HOST_UID:$HOST_GID}"

WORK_BASE="$REPO_ROOT/.sandbox_docker"
mkdir -p "$WORK_BASE"

RUN_ID="work-$(date +%Y%m%dT%H%M%SZ)-$RANDOM"
WORK_DIR_HOST="$WORK_BASE/$RUN_ID"
mkdir -p "$WORK_DIR_HOST"

echo "[docker-sandbox] Image: $DOCKER_IMAGE" >&2
echo "[docker-sandbox] Work dir: $WORK_DIR_HOST" >&2
echo "[docker-sandbox] Script: $TARGET_SCRIPT" >&2

# Compose the inner command. We reuse sandbox_run.sh inside container.
INNER_CMD=$(cat <<'SH'
set -euo pipefail
export SANDBOX_DIR_BASE=/work
export SANDBOX_KEEP=1
export SANDBOX_MOCK=${SANDBOX_MOCK}
bash /repo/scripts/sandbox_run.sh "/repo/${TARGET_SCRIPT}" -- ${SCRIPT_ARGS}
SH
)

# Run container with no network, repo mounted read-only, and /work writable
docker run --rm \
  --network=none \
  --user "$DOCKER_USER" \
  -v "$REPO_ROOT":/repo:ro \
  -v "$WORK_DIR_HOST":/work \
  -w /work \
  -e SANDBOX_MOCK="$SANDBOX_MOCK" \
  -e TARGET_SCRIPT="$TARGET_SCRIPT" \
  -e SCRIPT_ARGS="${SCRIPT_ARGS[*]}" \
  "$DOCKER_IMAGE" \
  bash -lc "$INNER_CMD"

STATUS=$?

if [[ $STATUS -ne 0 ]]; then
  echo "[docker-sandbox] Script exited with code $STATUS" >&2
fi

if [[ "${SANDBOX_KEEP}" == 1 ]]; then
  echo "[docker-sandbox] Kept sandbox at $WORK_DIR_HOST" >&2
else
  rm -rf "$WORK_DIR_HOST"
  echo "[docker-sandbox] Cleaned sandbox $RUN_ID" >&2
fi

exit $STATUS
