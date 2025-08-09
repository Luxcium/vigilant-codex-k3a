#!/usr/bin/env bash
## =============================================================================
#? Script Name: commit-guard.sh
#? Aim: Enforce repository validation before allowing commit/push
#? Purpose: Gate git operations with local validation for zero remote cost
#? Decision Rationale: Replace paid CI usage with deterministic local checks
#? Usage: bash ./scripts/commit-guard.sh [--stage <hook>] [--fast] [--no-coverage]
#? Dependencies: node >=22, pnpm >=9, bash, git
#? Last Updated: 2025-08-08 by GitHub Copilot
#? References: local-ci.sh, verify-all.sh, install-hooks.sh
## =============================================================================
set -euo pipefail

STAGE="manual"
FAST_ARG=""
COVERAGE_SKIP=false
EXPLICIT_OVERRIDE=${FORCE_COMMIT:-0}

while [[ $# -gt 0 ]]; do
  case $1 in
    --stage) STAGE=${2:-manual}; shift 2 ;;
    --fast) FAST_ARG="--fast"; shift ;;
    --no-coverage) COVERAGE_SKIP=true; shift ;;
    *) echo "[commit-guard] Unknown arg $1"; exit 1 ;;
  esac
done

if [ "$EXPLICIT_OVERRIDE" = "1" ]; then
  echo "[commit-guard] FORCE_COMMIT=1 set -> Skipping all validations (audited override)."
  exit 0
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

# Quick sanity: ensure we are not in detached HEAD erroneously causing false positives
if ! git rev-parse --git-dir >/dev/null 2>&1; then
  echo "[commit-guard] Not inside a git repository; aborting" >&2
  exit 1
fi

# Minimal staging diff check for oversized commits (advisory)
CHANGED_COUNT=$(git diff --cached --name-only | wc -l | awk '{print $1}' || echo 0)
if [ "$CHANGED_COUNT" -gt 250 ]; then
  echo "[commit-guard] WARNING: Large staged change set ($CHANGED_COUNT files)" >&2
fi

CI_SCRIPT="./scripts/local-ci.sh"
if [ ! -x "$CI_SCRIPT" ]; then
  echo "[commit-guard] Missing $CI_SCRIPT (make it executable)" >&2
  exit 1
fi

ARGS=()
[ -n "$FAST_ARG" ] && ARGS+=("$FAST_ARG")
$COVERAGE_SKIP && ARGS+=("--skip" "coverage")
# Always skip install inside hook for speed if node_modules exists
if [ -d node_modules ]; then
  ARGS+=("--skip" "install")
fi

# Always skip docs generation inside hooks for speed
ARGS+=("--skip" "docs")

# Execution
set +e
bash "$CI_SCRIPT" "${ARGS[@]}"
STATUS=$?
set -e

if [ $STATUS -ne 0 ]; then
  cat <<EOF
[commit-guard] Validation failed during stage: $STAGE
To override intentionally (audited) for this single action:
  FORCE_COMMIT=1 git commit -m "..."
  FORCE_COMMIT=1 git push
Or disable all guards temporarily (NOT RECOMMENDED):
  export DISABLE_LOCAL_GUARDS=1
EOF
  exit 1
fi

echo "[commit-guard] Validation succeeded for stage: $STAGE"
exit 0

#? Validation Status: Actively Validated on 2025-08-08
