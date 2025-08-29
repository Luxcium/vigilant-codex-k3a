#!/usr/bin/env bash
## =============================================================================
#? Script Name: init.sh
#? Aim: Idempotent project initialization and validation script
#? Purpose: Initialize git repo, validate foundation files, and set up basic project structure
#? Decision Rationale: Layer 1 foundation bootstrap - safe to run repeatedly
#? Usage: ./scripts/init.sh
#? Dependencies: bash, git, chmod
#? Last Updated: 2025-08-29 by GitHub Copilot
#? References: Layer 1 — Foundation Verification and Bootstrap
## =============================================================================

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log() {
    echo -e "${BLUE}[$(date -u '+%Y-%m-%dT%H:%M:%SZ')]${NC} $1"
}

success() {
    echo -e "${GREEN}✅${NC} $1"
}

warning() {
    echo -e "${YELLOW}⚠️${NC} $1"
}

error() {
    echo -e "${RED}❌${NC} $1"
}

print_header() {
    echo "========================================"
    echo "  Vigilant Codex K3a - Layer 1 Init"
    echo "========================================"
    echo "Execution time: $(date -u '+%Y-%m-%dT%H:%M:%SZ')"
    echo
}

validate_foundation_files() {
    log "Validating foundation files..."
    local missing=0
    
    # Layer 1 foundation files
    local foundation_files=(
        ".editorconfig"
        ".gitattributes"
        ".gitignore"
        "LICENSE"
        "README.md"
        "VERSION"
        "scripts/README.md"
    )
    
    for file in "${foundation_files[@]}"; do
        if [[ -f "$file" ]]; then
            success "$file exists"
        else
            error "$file is missing"
            ((missing++))
        fi
    done
    
    return $missing
}

setup_git_repo() {
    if [[ ! -d .git ]]; then
        log "Initializing git repository..."
        git init
        success "Git repository initialized"
    else
        success "Git repository already exists"
    fi
}

set_script_permissions() {
    log "Setting executable permissions on shell scripts..."
    local script_count=0
    
    if [[ -d scripts ]]; then
        while IFS= read -r -d '' script; do
            if [[ ! -x "$script" ]]; then
                chmod +x "$script"
                success "Made executable: $script"
                ((script_count++))
            fi
        done < <(find scripts -name "*.sh" -print0)
    fi
    
    if [[ $script_count -eq 0 ]]; then
        success "All shell scripts already have correct permissions"
    else
        success "Set permissions on $script_count scripts"
    fi
}

create_common_directories() {
    log "Creating common directories if missing..."
    local dirs=("docs" "tmp" ".vscode")
    
    for dir in "${dirs[@]}"; do
        if [[ ! -d "$dir" ]]; then
            mkdir -p "$dir"
            success "Created directory: $dir"
        else
            success "Directory already exists: $dir"
        fi
    done
}

print_project_info() {
    echo
    log "Project Information:"
    echo "----------------------------------------"
    echo "Project: Vigilant Codex K3a"
    echo "Version: $(cat VERSION 2>/dev/null || echo 'Unknown')"
    echo "Git Status: $(git status --porcelain | wc -l) modified files"
    echo "Git Branch: $(git branch --show-current 2>/dev/null || echo 'No branch')"
    echo "Location: $(pwd)"
    echo "Scripts: $(find scripts -name "*.sh" 2>/dev/null | wc -l) shell scripts"
    echo "Foundation: Layer 1 validated"
    echo "----------------------------------------"
}

main() {
    print_header
    
    # Validate foundation files
    if ! validate_foundation_files; then
        warning "Some foundation files are missing - this should be addressed"
    fi
    
    # Initialize git if needed
    setup_git_repo
    
    # Set script permissions
    set_script_permissions
    
    # Create common directories
    create_common_directories
    
    # Print project status
    print_project_info
    
    success "Layer 1 initialization complete!"
    echo
    log "This script is idempotent - safe to run multiple times"
}

# Run main function
main "$@"