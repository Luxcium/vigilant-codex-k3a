## =============================================================================
#? Script Name: browser-error-monitor.sh
#? Aim: Monitor Next.js app for runtime errors and report them to VS Code Problems panel
#? Purpose: Extract JavaScript errors, network issues, and build errors for debugging
#? Decision Rationale: Provides continuous monitoring and error reporting for web development
#? Usage: ./browser-error-monitor.sh [OPTIONS]
#? Dependencies: curl, Next.js, VS Code
#? Last Updated: 2025-07-23 by GitHub Copilot
#? References: VS Code tasks.json, Next.js runtime
## =============================================================================

#? Validation Status: Actively Validated on 2025-07-23

#!/bin/bash

# Browser Error Monitor Script
# Monitors Next.js app for runtime errors and reports them to VS Code Problems panel

set -euo pipefail

# Configuration
NEXT_URL="http://localhost:3000"
LOG_FILE="/tmp/browser-errors.log"
VS_CODE_PROBLEMS_FILE="/tmp/vscode-problems.json"
MONITOR_INTERVAL=5

# Colors for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# Function to check if Next.js server is running
check_server() {
    if ! curl -s "${NEXT_URL}" > /dev/null 2>&1; then
        error "Next.js server not responding at ${NEXT_URL}"
        return 1
    fi
    return 0
}

# Function to extract JavaScript errors from browser
extract_js_errors() {
    local content
    content=$(curl -s "${NEXT_URL}" 2>/dev/null || echo "")

    # Look for various error patterns and format for VS Code Problem Matcher

    # Check for Next.js error overlay patterns
    if echo "$content" | grep -q "_next.*error" 2>/dev/null; then
        echo "ERROR Next.js error overlay detected at browser:1:1"
    fi

    # Check for console.error patterns
    local console_errors
    console_errors=$(echo "$content" | grep -o 'console\.error[^;]*' 2>/dev/null || echo "")
    if [[ -n "$console_errors" ]]; then
        while IFS= read -r line; do
            if [[ -n "$line" ]]; then
                local clean_error
                clean_error=$(echo "$line" | sed 's/console\.error[^"]*["'"'"']\([^"'"'"']*\)["'"'"'].*/\1/')
                echo "CONSOLE ERROR $clean_error at browser-console:1:1"
            fi
        done <<< "$console_errors"
    fi

    # Check for uncaught exception patterns
    local uncaught_errors
    uncaught_errors=$(echo "$content" | grep -o 'Uncaught[^<]*' 2>/dev/null || echo "")
    if [[ -n "$uncaught_errors" ]]; then
        while IFS= read -r line; do
            if [[ -n "$line" ]]; then
                echo "ERROR $line at browser-runtime:1:1"
            fi
        done <<< "$uncaught_errors"
    fi

    # Check for TypeScript/build errors
    if echo "$content" | grep -qE "(Failed to compile|Module not found|Syntax error)"; then
        local build_error
        build_error=$(echo "$content" | grep -oE "(Failed to compile|Module not found|Syntax error)[^<]*" | head -1)
        echo "ERROR $build_error at next-build:1:1"
    fi
}

# Function to check network requests for errors
check_network_errors() {
    local response_code
    response_code=$(curl -s -o /dev/null -w "%{http_code}" "${NEXT_URL}" 2>/dev/null || echo "000")

    case "$response_code" in
        000)
            echo "ERROR Server unreachable at network:1:1"
            ;;
        4[0-9][0-9])
            echo "ERROR HTTP $response_code client error at network:1:1"
            ;;
        5[0-9][0-9])
            echo "ERROR HTTP $response_code server error at network:1:1"
            ;;
        *)
            # Success codes (2xx, 3xx) - no error
            ;;
    esac
}

# Function to create VS Code problems format
create_vscode_problems() {
    local errors=("$@")
    local problems_json='{"problems": ['
    local first=true

    for error in "${errors[@]}"; do
        if [[ "$first" == true ]]; then
            first=false
        else
            problems_json+=','
        fi

        problems_json+='{
            "severity": "error",
            "message": "'"${error//\"/\\\"}"'",
            "source": "browser-monitor",
            "startLineNumber": 1,
            "startColumn": 1,
            "endLineNumber": 1,
            "endColumn": 1
        }'
    done

    problems_json+=']}'
    echo "$problems_json" > "$VS_CODE_PROBLEMS_FILE"
}

# Function to extract only console errors
extract_console_only() {
    local content
    content=$(curl -s "${NEXT_URL}" 2>/dev/null || echo "")

    # Check for console.error patterns only
    local console_errors
    console_errors=$(echo "$content" | grep -o 'console\.error[^;]*' 2>/dev/null || echo "")
    if [[ -n "$console_errors" ]]; then
        while IFS= read -r line; do
            if [[ -n "$line" ]]; then
                local clean_error
                clean_error=$(echo "$line" | sed 's/console\.error[^"]*["'"'"']\([^"'"'"']*\)["'"'"'].*/\1/')
                echo "CONSOLE ERROR $clean_error at browser-console:1:1"
            fi
        done <<< "$console_errors"
    fi
}

# Function to run a single error check
run_error_check() {
    local timestamp
    timestamp=$(date '+%Y-%m-%d %H:%M:%S')

    log "Running browser error check..."

    # Check server availability
    if ! check_server; then
        echo "ERROR Next.js server not responding at server:1:1"
        return 1
    fi

    # Extract and output errors in VS Code Problem Matcher format
    extract_js_errors
    check_network_errors

    log "Error check completed"
}

# Function to start continuous monitoring
start_monitoring() {
    log "Starting continuous browser error monitoring (interval: ${MONITOR_INTERVAL}s)"
    log "Monitoring URL: ${NEXT_URL}"
    log "Log file: ${LOG_FILE}"
    log "Press Ctrl+C to stop"

    # Initialize log file
    echo "# Browser Error Monitor Log - Started $(date)" > "$LOG_FILE"

    while true; do
        run_error_check
        sleep "$MONITOR_INTERVAL"
    done
}

# Function to run a single check and exit
run_single_check() {
    log "Running single browser error check..."
    run_error_check

    if [[ -f "$VS_CODE_PROBLEMS_FILE" ]]; then
        log "VS Code problems file created: $VS_CODE_PROBLEMS_FILE"
    fi
}

# Function to show help
show_help() {
    cat << EOF
Browser Error Monitor Script

USAGE:
    $0 [OPTIONS]

OPTIONS:
    --monitor, -m       Start continuous monitoring (default)
    --check, -c         Run single error check and exit
    --console-only      Extract only console errors (for VS Code task)
    --interval, -i N    Set monitoring interval in seconds (default: $MONITOR_INTERVAL)
    --url, -u URL       Set Next.js URL to monitor (default: $NEXT_URL)
    --help, -h          Show this help message

EXAMPLES:
    $0                  # Start continuous monitoring
    $0 --check          # Run single check
    $0 --console-only   # Extract console errors only
    $0 -i 10            # Monitor with 10-second interval
    $0 -u http://localhost:4000  # Monitor different port

OUTPUT FORMAT:
    When used with VS Code tasks, errors are formatted as:
    ERROR message at file:line:column
    CONSOLE ERROR message at browser-console:line:column

EOF
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --monitor|-m)
            MODE="monitor"
            shift
            ;;
        --check|-c)
            MODE="check"
            shift
            ;;
        --console-only)
            MODE="console-only"
            shift
            ;;
        --interval|-i)
            MONITOR_INTERVAL="$2"
            shift 2
            ;;
        --url|-u)
            NEXT_URL="$2"
            shift 2
            ;;
        --help|-h)
            show_help
            exit 0
            ;;
        *)
            error "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# Set default mode if not specified
MODE="${MODE:-monitor}"

# Main execution
case "$MODE" in
    monitor)
        start_monitoring
        ;;
    check)
        run_error_check
        ;;
    console-only)
        if check_server; then
            extract_console_only
        else
            echo "ERROR Next.js server not responding at server:1:1"
            exit 1
        fi
        ;;
    *)
        error "Invalid mode: $MODE"
        exit 1
        ;;
esac
