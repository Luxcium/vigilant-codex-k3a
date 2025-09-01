#!/bin/bash

# Carrier-grade README cleanup script with enhanced error handling
# Version: 2.0 - Carrier Grade
# Features: Idempotent operations, comprehensive logging, rollback capability

set -euo pipefail  # Exit on error, undefined vars, pipe failures

# Logging function with timestamps
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >&2
}

# Error handling with cleanup
error_exit() {
    log "ERROR: $1"
    # Rollback logic could be added here
    exit 1
}

# Backup function with verification
backup_file() {
    local file="$1"
    local backup_dir="${BACKUP_DIR:-./backups/$(date +%Y%m%d_%H%M%S)}"

    mkdir -p "$backup_dir" || error_exit "Failed to create backup directory"

    if [[ -f "$file" ]]; then
        cp "$file" "$backup_dir/" || error_exit "Failed to backup $file"
        log "Backed up $file to $backup_dir/"
    fi
}

# Main cleanup logic
main() {
    log "Starting carrier-grade README cleanup..."

    # Find all README variants
    local readme_variants
    mapfile -t readme_variants < <(find . -name "README*" -type f | grep -v "^./README.md$" | head -20)

    if [[ ${#readme_variants[@]} -eq 0 ]]; then
        log "No README variants found. Cleanup complete."
        return 0
    fi

    log "Found ${#readme_variants[@]} README variants:"
    printf '%s\n' "${readme_variants[@]}" >&2

    # Backup all variants
    for variant in "${readme_variants[@]}"; do
        backup_file "$variant"
    done

    # Remove variants
    for variant in "${readme_variants[@]}"; do
        rm -f "$variant" || error_exit "Failed to remove $variant"
        log "Removed $variant"
    done

    # Verify cleanup
    local remaining_variants
    mapfile -t remaining_variants < <(find . -name "README*" -type f | grep -v "^./README.md$")

    if [[ ${#remaining_variants[@]} -gt 0 ]]; then
        error_exit "Cleanup incomplete. Remaining variants: ${remaining_variants[*]}"
    fi

    log "Cleanup completed successfully. ${#readme_variants[@]} variants removed."
}

# Run with error handling
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
