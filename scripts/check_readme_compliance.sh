#!/bin/bash

# Carrier-grade README compliance checker
# Version: 2.0 - Enhanced validation and reporting

set -euo pipefail

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"
}

check_markdown_compliance() {
    local file="$1"
    local issues=0

    log "Checking $file for compliance..."

    # Check for H1 heading (should not exist per standards)
    if grep -q '^# ' "$file"; then
        log "WARNING: H1 heading found in $file (should use H2+ per standards)"
        ((issues++))
    fi

    # Check line length (should be <= 400 chars)
    local long_lines
    long_lines=$(awk 'length > 400 {print NR ": " $0}' "$file" | wc -l)
    if [[ $long_lines -gt 0 ]]; then
        log "WARNING: $long_lines lines exceed 400 characters in $file"
        ((issues++))
    fi

    # Check for proper list formatting
    if grep -q '^[[:space:]]*-[[:space:]]*$' "$file"; then
        log "WARNING: Empty bullet points found in $file"
        ((issues++))
    fi

    # Check for proper code block formatting
    if grep -q '^```[[:space:]]*$' "$file"; then
        log "WARNING: Code blocks without language specification in $file"
        ((issues++))
    fi

    return $issues
}

main() {
    local total_issues=0

    # Find all README files
    local readme_files
    mapfile -t readme_files < <(find . -name "README.md" -type f)

    log "Found ${#readme_files[@]} README files to check"

    for file in "${readme_files[@]}"; do
        if check_markdown_compliance "$file"; then
            ((total_issues++))
        fi
    done

    if [[ $total_issues -eq 0 ]]; then
        log "All README files are compliant!"
        return 0
    else
        log "Found $total_issues compliance issues across README files"
        return 1
    fi
}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
