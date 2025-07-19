# techContext.md

## Purpose

This file documents the technologies, development setup, technical constraints, and dependencies for the Vigilant Codex K3a polyvalent AI development workspace. It provides a clear reference for all technical implementation aspects and serves as the authoritative guide for technology stack decisions.

## Structure

- **Technology Stack** - Core technologies and their rationale
- **Development Environment Setup** - Environment configuration and tooling
- **Technical Constraints** - Known limitations and requirements
- **Implementation Standards** - Code quality and technical requirements
- **Dependencies and Relationships** - File relationships and impact analysis
- **Call to Action** - Instructions for maintaining this file

---

## Technology Stack

### Core Runtime Environment

- **Node.js 22** - Latest LTS with native fetch API support and enhanced performance
- **TypeScript 5.8+** - Strict type checking with native Response types and advanced type features
- **Python 3.13** - Latest Python with improved performance and enhanced typing support
- **Docker** - Containerization with Codex Universal environment (`ghcr.io/openai/codex-universal:latest`)

### HTTP Client Architecture ✅

**Native Fetch API Implementation**

- **Primary Client** - Node.js 22 native fetch implementation
- **Zero External Dependencies** - Eliminated node-fetch package for cleaner dependency tree
- **TypeScript Integration** - Native Response types throughout codebase
- **Performance Optimized** - Native implementation provides superior performance characteristics
- **Future Compatible** - Long-term maintenance advantages with native Node.js APIs
- **Test Coverage** - 98.34% branch coverage with comprehensive vi.stubGlobal mocking

### Next.js v15+ Web Framework ✅

**Modern React Architecture**

- **App Router** - `/app` directory structure with Server Components by default
- **Server Actions** - `'use server'` directive for mutations with proper cache revalidation
- **Client Components** - `'use client'` directive for interactivity and browser APIs
- **Database Integration** - PostgreSQL backend with Prisma ORM
- **Container Integration** - Dockerized PostgreSQL development environment

### Component Architecture Standards

#### Server Component Usage (Default)

- Data fetching from databases or external APIs
- Static content generation and SEO-friendly elements
- Server-side computations and data transformations
- Environment variable access and secure operations
- Initial page rendering and layout composition

#### Client Component Usage (`'use client'`)

- Interactive UI requiring state management (`useState`, `useEffect`, `useReducer`)
- Event handlers (`onClick`, `onChange`, `onSubmit`, `onFocus`)
- Browser-only APIs (`window`, `localStorage`, `navigator`, `document`)
- Third-party client-side libraries and components
- Custom hooks and React context providers

#### Server Actions Usage (`'use server'`)

- Database mutations (CREATE, UPDATE, DELETE operations)
- Form submissions with validation and error handling
- Authentication and authorization workflows
- Cache revalidation (`revalidatePath`, `revalidateTag`)
- Redirects and navigation after successful operations

### Testing Infrastructure ✅

**Comprehensive Test Framework**

- **Vitest 3.2.4** - Primary test runner with Istanbul coverage provider
- **Native Fetch Mocking** - `vi.stubGlobal('fetch', mockFetch)` for HTTP client testing
- **Authentication Mocking** - Complete AuthManager system mocking for test isolation
- **Coverage Reporting** - Detailed branch/statement/function/line reporting with 98%+ thresholds
- **Schema Validation** - Comprehensive Zod validation testing patterns
- **CommonJS Compatibility** - Maintained throughout test infrastructure
- **Edge Case Coverage** - Error scenarios, NaN handling, timeout management

**Production Test Results**

- **259 tests passing** - Maintained after native fetch conversion with zero regression
- **98.34% branch coverage** - Exceeding 90% threshold requirement
- **Perfect Coverage** - 100% achieved for webStorage.ts, tokenBucket.ts
- **High Coverage** - 96.15% for restClient.ts, 87.5% for QuestradeClient.ts
- **Performance Improvement** - Native fetch implementation optimization

### Python Development Framework ✅

**Conditional Environment System**

- **Three Deployment Modes** - Runtime selection without hard-coded choices
  - `local` - Host-based virtual environment with direct IDE integration
  - `docker_isolated` - Fully containerized with complete isolation
  - `docker_volume` - Containerized with live host file mounting
- **Environment Management** - pip, virtualenv, and Docker orchestration
- **Jupyter Integration** - VS Code notebook API with advanced automation
- **ML Development** - Comprehensive notebook development workflows

### AI Agent Integration Technologies

**Three AI Agent Ecosystem**

- **Cline AI** - Memory bank integration with persistent context preservation
- **Codex CLI** - Terminal automation and container orchestration
- **VS Code Copilot** - Code generation with 26 instruction files + 27 prompt files
- **Cross-Agent Coordination** - Shared memory bank with stateful collaboration
- **Instruction Framework** - Automated coding standards and workflow execution

## Development Environment Setup

### Quick Start Environment

```bash
# 1. Set OpenAI API key for container integration
export OPENAI_API_KEY="your-api-key-here"

# 2. Initialize complete development environment
./scripts/setup_codex_universal.sh

# 3. Start Codex Universal environment
./scripts/codex_start.sh

# 4. Access development shell
./scripts/codex_shell.sh
```

### Project Organization Standards

**Language-Based Structure** (As defined in [systemPatterns.md](./systemPatterns.md))

```
vigilant-codex-k3a/
├── src/                    # TypeScript core library and SDK components
├── web/                    # Next.js applications (when coexisting)
├── python/                 # Python projects and conditional environments
├── scripts/                # Shell scripts for automation (bash only)
├── notebooks/              # Jupyter notebooks and ML development
├── memory-bank/            # AI agent state management
└── .github/instructions/   # 26 coding standards (auto-applied)
```

### Environment Configuration

**Codex Universal Docker Environment**

- **Base Image** - `ghcr.io/openai/codex-universal:latest`
- **Pre-configured Stack** - Node.js 22 + Python 3.13
- **Volume-Based Development** - Instant file changes without container rebuilds
- **OpenAI API Integration** - Seamless API access within containers
- **Multi-Service Support** - PostgreSQL, Redis, development servers
- **Health Monitoring** - Comprehensive service validation

**Local Development Requirements**

- **Node.js 22** - Required for native fetch API and TypeScript compilation
- **Python 3.13** - Required for conditional environment framework
- **Docker Engine** - Required for container orchestration
- **Git** - Required for version control and collaboration

### Tool Configuration

**Code Quality Tools**

- **ESLint** - JavaScript/TypeScript linting with strict rules
- **Prettier** - Code formatting with consistent style
- **Markdown-Lint** - Documentation formatting compliance
- **TypeScript Strict Mode** - Enhanced type checking and null safety
- **Husky** - Pre-commit hooks for automated quality checks

## Technical Constraints

### Mandatory Requirements

- **Script-Driven Setup** - All project operations must be performed via idempotent scripts in `scripts/` directory
- **Memory Bank Protocol** - All AI agents MUST read ALL memory bank files at session start
- **Markdown-Lint Compliance** - All documentation must follow strict GitHub markdown standards
- **Single # Header Rule** - Each file exactly one top-level heading matching filename
- **Cross-Agent Compatibility** - All configurations must work across Cline AI, Codex CLI, and VS Code Copilot

### Development Constraints

- **No Manual File Creation** - All directory and file creation via scripts only
- **Idempotent Scripts** - All setup operations must be safely repeatable
- **Conditional Decision Deferral** - Runtime parameter selection over hard-coded choices
- **Zero Information Loss** - Complete historical preservation through archival systems
- **Test Coverage Minimum** - Maintain 98%+ branch coverage for all components

### Technology Constraints

- **Node.js 22 Requirement** - Native fetch API dependency
- **TypeScript Strict Mode** - Enhanced type safety and null checking
- **Container Security** - Non-root users, minimal base images, vulnerability scanning
- **Database Schema Management** - Prisma ORM with PostgreSQL backend
- **Package Manager Policy** - No lock files until further notice (development phase)

### Integration Constraints

- **Three AI Agent Limitation** - System designed for specific agent collaboration patterns
- **Memory Bank Structure** - Must follow official Cline Memory Bank format
- **Cross-Platform Compatibility** - Must work across Windows, macOS, and Linux
- **Container Runtime Dependency** - Docker required for full development experience

## Implementation Standards

### Code Quality Requirements

- **Type Safety** - Comprehensive TypeScript implementation with strict type checking
- **Test Coverage** - Minimum 98% branch coverage with comprehensive edge case testing
- **Documentation Completeness** - Every component properly documented with cross-references
- **Security Best Practices** - Container security, authentication, data protection
- **Performance Standards** - Optimized implementations with benchmarking

### Development Process Standards

- **Memory Bank Maintenance** - Continuous documentation and context preservation
- **Cross-Agent Testing** - Validation across all three AI agent workflows
- **Progressive Enhancement** - Applications work without JavaScript, enhanced with client features
- **Graceful Degradation** - Fallbacks for disabled features or missing dependencies

### Architecture Standards

- **Component Separation** - Clear boundaries between Server and Client Components
- **Data Serialization** - Proper handling of data flow between server and client
- **Cache Management** - Appropriate use of `revalidatePath()` and `revalidateTag()`
- **Error Handling** - Comprehensive error scenarios and user feedback

## Dependencies and Relationships

- **Depends On:** [systemPatterns.md](./systemPatterns.md), [projectbrief.md](./projectbrief.md), [productContext.md](./productContext.md)
- **Required By:** [activeContext.md](./activeContext.md), [progress.md](./progress.md), [dependencies.md](./dependencies.md)
- **Why This Order:** Technical context establishes implementation details after architectural patterns are defined
- **Impact Analysis:** Changes to technology stack affect all development workflows, testing strategies, AI agent behavior, and deployment procedures

## Call to Action

> **All agents and contributors must review, update, and self-regulate this file as the technical context evolves.**  
> **Do not proceed with technical implementation until this file is aligned with the current technology stack and constraints.**  
> **Update this file immediately upon any change in technologies, setup, constraints, or dependencies.**  
> **Ensure all technical decisions can be traced back to the standards and constraints defined in this file.**

## AI Agent Instructions

This project supports three AI agents with specific technical responsibilities:

- **Cline AI** → Apply technical standards with memory bank integration and context preservation
- **Codex CLI** → Implement technical setup through script automation and container orchestration
- **VS Code Copilot** → Enforce technical standards through instruction files and real-time code assistance

**All agents must validate their technical implementations against the standards defined in this file and ensure compliance with established technical constraints.**

---

**Last Updated:** 2025-07-18 | **Status:** Technical Standards Established | **Stack:** Node.js 22 + TypeScript 5.8+ + Python 3.13 + Next.js 15+
