#!/bin/bash

# Carrier-grade test suite for upgraded scripts
# Version: 2.0 - Comprehensive validation

set -euo pipefail

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"
}

test_script() {
    local script="$1"
    local test_result=0

    log "Testing $script..."

    # Check if script exists and is executable
    if [[ ! -f "$script" ]]; then
        log "ERROR: $script not found"
        return 1
    fi

    if [[ ! -x "$script" ]]; then
        log "ERROR: $script is not executable"
        return 1
    fi

    # Check for carrier-grade features
    if ! grep -q "set -euo pipefail" "$script"; then
        log "WARNING: $script missing carrier-grade error handling"
        ((test_result++))
    fi

    if ! grep -q "log()" "$script"; then
        log "WARNING: $script missing logging function"
        ((test_result++))
    fi

    if ! grep -q "error_exit()" "$script"; then
        log "WARNING: $script missing error handling function"
        ((test_result++))
    fi

    # Syntax check
    if bash -n "$script" 2>/dev/null; then
        log "✓ $script syntax is valid"
    else
        log "ERROR: $script has syntax errors"
        ((test_result++))
    fi

    return $test_result
}

main() {
    local total_failures=0
    local scripts_to_test=(
        "scripts/cleanup_readmes_carrier.sh"
        "scripts/check_readme_compliance.sh"
        "scripts/upgrade_scripts_carrier.sh"
    )

    log "Starting carrier-grade test suite..."

    for script in "${scripts_to_test[@]}"; do
        if test_script "$script"; then
            log "✓ $script passed all tests"
        else
            log "✗ $script failed tests"
            ((total_failures++))
        fi
    done

    if [[ $total_failures -eq 0 ]]; then
        log "All scripts passed carrier-grade testing!"
        return 0
    else
        log "$total_failures scripts failed testing"
        return 1
    fi
}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
