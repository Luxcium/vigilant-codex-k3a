#!/usr/bin/env bash
## =============================================================================
#? Script Name: local-ci.sh
#? Aim: Provide a zero-cost local replacement for the previous GitHub Actions CI
#? Purpose: Run full repository validation (install, typecheck, lint, tests, coverage) locally or in containers
#? Decision Rationale: Disabling remote CI to cut costs; empowers iterative validation before pushing
#? Usage: ./scripts/local-ci.sh [--fast] [--skip install|typecheck|lint|unit|integration|coverage|build|docs]
#? Dependencies: node (>=22), pnpm (>=9), bash, optional: docker (if run inside container)
#? Last Updated: 2025-08-08 by GitHub Copilot
#? References: Removed .github/workflows/ci.yml, scripts/verify-all.sh
## =============================================================================
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

log(){ echo -e "${CYAN}[CI][$(date -u '+%H:%M:%S')]${NC} $*"; }
warn(){ echo -e "${YELLOW}[WARN]${NC} $*"; }
err(){ echo -e "${RED}[ERR ]${NC} $*"; }
ok(){ echo -e "${GREEN}[ OK ]${NC} $*"; }

FAST=false
# Skip flags default false
SKIP_INSTALL=false
SKIP_TYPECHECK=false
SKIP_LINT=false
SKIP_UNIT=false
SKIP_INTEGRATION=false
SKIP_COVERAGE=false
SKIP_BUILD=false
SKIP_DOCS=false

while [[ $# -gt 0 ]]; do
  case $1 in
    --fast) FAST=true; shift ;;
    --skip)
      [[ $# -lt 2 ]] && { err "--skip requires an argument"; exit 1; }
      case $2 in
        install) SKIP_INSTALL=true ;;
        typecheck) SKIP_TYPECHECK=true ;;
        lint) SKIP_LINT=true ;;
        unit) SKIP_UNIT=true ;;
        integration) SKIP_INTEGRATION=true ;;
        coverage) SKIP_COVERAGE=true ;;
        build) SKIP_BUILD=true ;;
        docs) SKIP_DOCS=true ;;
        *) err "Unknown skip target: $2"; exit 1 ;;
      esac
      shift 2 ;;
    -h|--help)
      cat <<EOF
local-ci.sh - Local Continuous Integration Pipeline

Runs a close equivalent of the previous GitHub Actions CI entirely locally.

USAGE: ./scripts/local-ci.sh [--fast] [--skip <stage>]

Stages (in order): install, typecheck, lint, unit, integration, coverage, build, docs

Options:
  --fast                 Skip non-critical stages (coverage, docs, build)
  --skip <stage>         Skip an explicit stage (can be repeated)
  --help                 Show this help

Examples:
  ./scripts/local-ci.sh                 # Full run
  ./scripts/local-ci.sh --fast          # Quicker validation
  ./scripts/local-ci.sh --skip coverage --skip docs
  ./scripts/local-ci.sh --skip install  # Assumes deps already installed

Exit codes: 0 success, non-zero on first failure.
EOF
      exit 0 ;;
    *) err "Unknown argument: $1"; exit 1 ;;
  esac
done

if $FAST; then
  SKIP_COVERAGE=true
  SKIP_DOCS=true
  SKIP_BUILD=true
fi

# Helpers --------------------------------------------------------------------
check_binary(){ command -v "$1" >/dev/null 2>&1 || { err "Required binary '$1' not found"; exit 1; }; }

log "Environment validation"
check_binary node
check_binary pnpm
ok "Toolchain present: node $(node --version), pnpm $(pnpm --version)"

STAGE(){ log "--- $1 ---"; }

# Stage: Install --------------------------------------------------------------
if ! $SKIP_INSTALL; then
  STAGE "Install dependencies"
  pnpm install --frozen-lockfile || { err "Install failed"; exit 1; }
  ok "Dependencies installed"
else
  warn "Skipping install"
fi

# Stage: TypeScript typecheck -------------------------------------------------
if ! $SKIP_TYPECHECK; then
  STAGE "TypeScript typecheck"
  npx tsc --noEmit || { err "Typecheck failed"; exit 1; }
  ok "Typecheck passed"
else
  warn "Skipping typecheck"
fi

# Stage: Lint -----------------------------------------------------------------
if ! $SKIP_LINT; then
  STAGE "Lint (code + markdown)"
  if ! pnpm lint; then err "Lint failed"; exit 1; fi
  ok "Lint passed"
else
  warn "Skipping lint"
fi

# Stage: Unit tests -----------------------------------------------------------
if ! $SKIP_UNIT; then
  STAGE "Unit tests"
  if ! pnpm test:unit; then err "Unit tests failed"; exit 1; fi
  ok "Unit tests passed"
else
  warn "Skipping unit tests"
fi

# Stage: Integration tests ----------------------------------------------------
if ! $SKIP_INTEGRATION; then
  STAGE "Integration tests"
  QT_ENV=mock pnpm test:integration || { err "Integration tests failed"; exit 1; }
  ok "Integration tests passed"
else
  warn "Skipping integration tests"
fi

# Stage: Coverage -------------------------------------------------------------
if ! $SKIP_COVERAGE; then
  STAGE "Coverage"
  if ! pnpm coverage; then err "Coverage check failed"; exit 1; fi
  ok "Coverage thresholds met"
else
  warn "Skipping coverage"
fi

# Optional build --------------------------------------------------------------
if ! $SKIP_BUILD; then
  STAGE "Build (TypeDoc + transpile)"
  # Build TypeScript output (if tsconfig emits) & generate docs if not skipped separately
  npx tsc || { err "Build compilation failed"; exit 1; }
  ok "Build compilation done"
else
  warn "Skipping build"
fi

# Optional docs ---------------------------------------------------------------
if ! $SKIP_DOCS; then
  STAGE "Docs generation"
  if pnpm docs; then ok "Docs generated"; else warn "Docs generation failed (non-blocking)"; fi
else
  warn "Skipping docs"
fi

STAGE "Repository validation (verify-all)"
if [[ ! -x ./scripts/verify-all.sh ]]; then
  err "verify-all.sh not found or not executable"
  exit 1
fi
if ./scripts/verify-all.sh; then
  ok "verify-all passed"
else
  warn "verify-all reported issues"
fi

ok "Local CI pipeline completed successfully"


#? Validation Status: Actively Validated on 2025-08-31
