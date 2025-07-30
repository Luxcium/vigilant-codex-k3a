#!/usr/bin/env bash

## =============================================================================
#? Script Name: setup_ts_sdk.sh
#? Aim: Set up comprehensive TypeScript SDK with modular architecture
#? Purpose: Consolidate setup for TypeScript SDK, Questrade integration, agent frameworks, API handlers, and utility helpers with modular configuration
#? Decision Rationale: Unifies 6 separate setup scripts to reduce redundancy and provide consistent SDK development environment
#? Usage: ./setup_ts_sdk.sh [--module questrade-core|questrade-types|agent-framework|agent-system|api-error|helpers|all]
#? Dependencies: Node.js, pnpm/npm, TypeScript, project structure
#? Last Updated: 2025-07-24 by GitHub Copilot
#? References: src/ directory, package.json, tsconfig.json, agent-framework/
## =============================================================================
set -euo pipefail

#==============================================================================
# Script Name: setup_ts_sdk.sh
# Aim: Set up TypeScript SDK and related development environments with modular configuration
# Purpose: Consolidate setup for TypeScript SDK, Questrade SDK, agent frameworks, API handlers, and helpers
# Decision Rationale: Merges 6 separate setup scripts to reduce redundancy and provide unified SDK configuration
# Usage: ./setup_ts_sdk.sh [--module questrade-core|questrade-types|agent-framework|agent-system|api-error|helpers|all]
# Dependencies: Node.js, pnpm, TypeScript
# Last Updated: 2025-07-23 by GitHub Copilot
# References: src/ directory structure, package.json, tsconfig.json
#==============================================================================

# Script directory and project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log() {
  echo -e "${BLUE}[$(date -u '+%Y-%m-%dT%H:%M:%SZ')]${NC} $1"
}

warn() {
  echo -e "${YELLOW}[WARNING]${NC} $1"
}

error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

success() {
  echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# Usage function
usage() {
  cat << EOF
Usage: $0 [OPTIONS]

TypeScript SDK Setup Script

Options:
    --module MODULE        Setup specific module: questrade-core, questrade-types, agent-framework,
                          agent-system, api-error, helpers, all
    --help                Show this help message

Examples:
    $0                                    # Basic TypeScript SDK setup
    $0 --module questrade-core           # Setup Questrade core SDK
    $0 --module agent-framework          # Setup agent framework
    $0 --module all                      # Setup all modules

Modules:
    questrade-core        Questrade SDK core functionality
    questrade-types       Questrade TypeScript type definitions
    agent-framework       Multi-agent framework architecture
    agent-system          Hierarchical agent system
    api-error             API error handling utilities
    helpers               Common helper utilities
    all                   Setup all available modules

EOF
}

# Base TypeScript SDK setup
setup_base_sdk() {
  log "Setting up base TypeScript SDK..."

  cd "$PROJECT_ROOT"

  # Create base directories
  local dirs=("src/auth" "src/rateLimit" "src/errors" "src/client" "src/http" "src/types" "src/helpers" ".keys")
  for dir in "${dirs[@]}"; do
    if [ ! -d "$dir" ]; then
      mkdir -p "$dir"
      log "Created directory $dir"
    else
      log "Directory $dir already exists"
    fi
  done

  # Update .gitignore
  if [ -f .gitignore ] && ! grep -q "^\.keys/" .gitignore; then
    echo ".keys/" >> .gitignore
    log "Added .keys/ to .gitignore"
  fi

  # Initialize package.json if it doesn't exist
  if [ ! -f package.json ]; then
    log "Initializing package.json"
    npm init -y > /dev/null
  fi

  # Install TypeScript dependencies
  log "Installing TypeScript dependencies..."
  if command -v pnpm &> /dev/null; then
    pnpm add -D typescript @types/node vitest > /dev/null
  else
    npm install --save-dev typescript @types/node vitest
  fi

  # Create tsconfig.json if it doesn't exist
  if [ ! -f tsconfig.json ]; then
    log "Creating tsconfig.json"
    npx tsc --init --strict --target es2022 --module node16 --moduleResolution node16 > /dev/null
  fi

  success "Base TypeScript SDK setup completed"
}

# Questrade core SDK setup
setup_questrade_core() {
  log "Setting up Questrade core SDK..."

  # Create Questrade-specific directories
  local questrade_dirs=("src/questrade/auth" "src/questrade/client" "src/questrade/api" "src/questrade/models")
  for dir in "${questrade_dirs[@]}"; do
    if [ ! -d "$dir" ]; then
      mkdir -p "$dir"
      log "Created Questrade directory $dir"
    fi
  done

  # Create basic Questrade client stub
  if [ ! -f "src/questrade/client/index.ts" ]; then
    cat > "src/questrade/client/index.ts" << 'EOF'
/**
 * Questrade API Client
 * Core client for Questrade API integration
 */

export class QuestradeClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl: string = 'https://api01.iq.questrade.com') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  // Core API methods will be implemented here
  async getAccount() {
    // Implementation pending
    throw new Error('Not implemented');
  }
}

export default QuestradeClient;
EOF
    success "Created Questrade client stub"
  fi

  success "Questrade core SDK setup completed"
}

# Questrade types setup
setup_questrade_types() {
  log "Setting up Questrade TypeScript types..."

  # Create types directory if it doesn't exist
  if [ ! -d "src/questrade/types" ]; then
    mkdir -p "src/questrade/types"
  fi

  # Create basic type definitions
  if [ ! -f "src/questrade/types/index.ts" ]; then
    cat > "src/questrade/types/index.ts" << 'EOF'
/**
 * Questrade API Type Definitions
 * TypeScript interfaces and types for Questrade API
 */

export interface Account {
  type: string;
  number: string;
  status: string;
  isPrimary: boolean;
  isBilling: boolean;
  clientAccountType: string;
}

export interface Position {
  symbol: string;
  symbolId: number;
  openQuantity: number;
  currentMarketValue: number;
  currentPrice: number;
  averageEntryPrice: number;
}

export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

export interface QuestradeConfig {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
  retries?: number;
}
EOF
    success "Created Questrade type definitions"
  fi

  success "Questrade types setup completed"
}

# Agent framework setup
setup_agent_framework() {
  log "Setting up agent framework..."

  # Create agent framework directories
  local agent_dirs=("agent-framework/src/core" "agent-framework/src/agents" "agent-framework/src/communication" "agent-framework/tests")
  for dir in "${agent_dirs[@]}"; do
    if [ ! -d "$dir" ]; then
      mkdir -p "$dir"
      log "Created agent framework directory $dir"
    fi
  done

  # Create agent framework package.json if it doesn't exist
  if [ ! -f "agent-framework/package.json" ]; then
    cat > "agent-framework/package.json" << 'EOF'
{
  "name": "vigilant-codex-agent-framework",
  "version": "1.0.0",
  "description": "Multi-agent framework for TypeScript 22",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "test": "vitest",
    "dev": "tsc --watch"
  },
  "keywords": ["agents", "framework", "typescript"],
  "author": "Vigilant Codex",
  "license": "MIT"
}
EOF
    success "Created agent framework package.json"
  fi

  # Create basic agent interface
  if [ ! -f "agent-framework/src/core/Agent.ts" ]; then
    cat > "agent-framework/src/core/Agent.ts" << 'EOF'
/**
 * Base Agent Interface
 * Core abstraction for all agents in the framework
 */

export interface AgentConfig {
  name: string;
  capabilities: string[];
  priority: number;
}

export abstract class BaseAgent {
  protected config: AgentConfig;

  constructor(config: AgentConfig) {
    this.config = config;
  }

  abstract execute(task: any): Promise<any>;
  abstract canHandle(task: any): boolean;

  getName(): string {
    return this.config.name;
  }

  getCapabilities(): string[] {
    return this.config.capabilities;
  }
}
EOF
    success "Created base agent interface"
  fi

  success "Agent framework setup completed"
}

# Agent system setup
setup_agent_system() {
  log "Setting up agent system..."

  # Create agent system directories
  local system_dirs=("src/agents/system" "src/agents/coordination" "src/agents/communication")
  for dir in "${system_dirs[@]}"; do
    if [ ! -d "$dir" ]; then
      mkdir -p "$dir"
      log "Created agent system directory $dir"
    fi
  done

  # Create agent coordinator
  if [ ! -f "src/agents/system/AgentCoordinator.ts" ]; then
    cat > "src/agents/system/AgentCoordinator.ts" << 'EOF'
/**
 * Agent Coordinator
 * Manages communication and task distribution between agents
 */

import { BaseAgent } from '../../../agent-framework/src/core/Agent';

export class AgentCoordinator {
  private agents: Map<string, BaseAgent> = new Map();

  registerAgent(agent: BaseAgent): void {
    this.agents.set(agent.getName(), agent);
  }

  unregisterAgent(name: string): void {
    this.agents.delete(name);
  }

  async delegateTask(task: any): Promise<any> {
    for (const agent of this.agents.values()) {
      if (agent.canHandle(task)) {
        return await agent.execute(task);
      }
    }
    throw new Error('No suitable agent found for task');
  }

  getRegisteredAgents(): string[] {
    return Array.from(this.agents.keys());
  }
}
EOF
    success "Created agent coordinator"
  fi

  success "Agent system setup completed"
}

# API error handling setup
setup_api_error() {
  log "Setting up API error handling..."

  # Enhance errors directory
  if [ ! -f "src/errors/ApiError.ts" ]; then
    cat > "src/errors/ApiError.ts" << 'EOF'
/**
 * API Error Classes
 * Comprehensive error handling for API operations
 */

export class ApiError extends Error {
  public readonly status: number;
  public readonly code: string;
  public readonly context?: any;

  constructor(message: string, status: number, code: string, context?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.context = context;
    Error.captureStackTrace(this, ApiError);
  }
}

export class RateLimitError extends ApiError {
  constructor(retryAfter?: number) {
    super('Rate limit exceeded', 429, 'RATE_LIMIT_EXCEEDED', { retryAfter });
    this.name = 'RateLimitError';
  }
}

export class AuthenticationError extends ApiError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401, 'AUTHENTICATION_FAILED');
    this.name = 'AuthenticationError';
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, validationErrors?: any) {
    super(message, 400, 'VALIDATION_ERROR', { validationErrors });
    this.name = 'ValidationError';
  }
}
EOF
    success "Created API error classes"
  fi

  success "API error handling setup completed"
}

# Helpers setup
setup_helpers() {
  log "Setting up helper utilities..."

  # Create helper utilities
  if [ ! -f "src/helpers/utils.ts" ]; then
    cat > "src/helpers/utils.ts" << 'EOF'
/**
 * Utility Helper Functions
 * Common utility functions used throughout the SDK
 */

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function retry<T>(
  fn: () => Promise<T>,
  attempts: number = 3,
  delayMs: number = 1000
): Promise<T> {
  return fn().catch(err => {
    if (attempts === 1) throw err;
    return delay(delayMs).then(() => retry(fn, attempts - 1, delayMs));
  });
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function sanitizeString(input: string): string {
  return input.replace(/[<>'"&]/g, '');
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount);
}
EOF
    success "Created utility helpers"
  fi

  success "Helper utilities setup completed"
}

# Main execution logic
main() {
  local module=""

  # Parse command line arguments
  while [[ $# -gt 0 ]]; do
    case $1 in
      --module)
        module="$2"
        shift 2
        ;;
      --help)
        usage
        exit 0
        ;;
      *)
        error "Unknown option: $1"
        usage
        exit 1
        ;;
    esac
  done

  log "Starting TypeScript SDK setup..."

  # Always run base setup
  setup_base_sdk

  # Handle module-specific setup
  case "$module" in
    ""|"basic")
      # Base setup already done
      ;;
    "questrade-core")
      setup_questrade_core
      ;;
    "questrade-types")
      setup_questrade_types
      ;;
    "agent-framework")
      setup_agent_framework
      ;;
    "agent-system")
      setup_agent_system
      ;;
    "api-error")
      setup_api_error
      ;;
    "helpers")
      setup_helpers
      ;;
    "all")
      setup_questrade_core
      setup_questrade_types
      setup_agent_framework
      setup_agent_system
      setup_api_error
      setup_helpers
      ;;
    *)
      error "Unknown module: $module"
      usage
      exit 1
      ;;
  esac

  success "TypeScript SDK setup completed successfully!"
  log "Next steps:"
  log "  1. Review generated code structure in src/"
  log "  2. Implement specific functionality as needed"
  log "  3. Run tests: npm test or pnpm test"
  log "  4. Build: npm run build or pnpm build"
}

# Run main function
main "$@"

#? Validation Status: Actively Validated on 2025-07-24
