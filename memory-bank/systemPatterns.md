# The `systemPatterns.md` Memory Bank File

Your AI Agent will actively strive to keep this file up to date with the latest system patterns, including architectural patterns, design patterns, and component relationships. This file MUST be updated by any AI Agent eagerly each time it will make changes on each chat completion and each task or subtask as the authoritative guide for all system architecture aspects of the Vigilant Codex K3a polyvalent AI development workspace.

## Purpose

This file documents the system architecture, key technical decisions, design patterns, and component relationships for the Vigilant Codex K3a polyvalent AI development workspace. It serves as a living reference for how the system is structured and how its parts interact, providing the architectural foundation for all development decisions.

## Structure

- **Architecture Overview** - Project organization and structural principles
- **Key Technical Decisions** - Rationale for major architectural choices
- **Design Patterns** - Established patterns and conventions
- **Component Relationships** - How system parts interact and depend on each other
- **Dependencies and Relationships** - File relationships and impact analysis
- **Call to Action** - Instructions for maintaining this file

---

## Architecture Overview

### Project Root Code Organization Standard

The Vigilant Codex K3a follows a polyvalent architecture organized by language and framework at the project root to ensure clarity, modularity, and scalability across multiple technologies:

### Polyvalent Directory Structure

```text
vigilant-codex-k3a/
├── src/               # TypeScript SDK (core library)
├── web/               # Next.js v15+ application
├── python/            # Python agent system
├── agent-framework/   # TypeScript 22 multi-agent framework
├── scripts/           # Lifecycle and maintenance scripts
├── notebooks/         # Jupyter notebooks and ML resources
├── memory-bank/       # AI agent state and documentation
├── examples/          # Example configurations and usage
├── templates/         # Boilerplate and code templates
├── prisma/            # Prisma schema and migrations
├── init/              # Environment initialization assets
├── .clinerules/       # Cline AI personal instructions
└── .github/           # Shared instructions and prompts
```

### Root Context Classification

The following directories act as independent application roots:

- `src/` – TypeScript SDK
- `web/` – Next.js v15+ application
- `python/` – Python agent system
- `agent-framework/` – TypeScript 22 multi-agent framework
- `notebooks/` – Jupyter notebooks and ML resources


The following table clarifies which folders represent standalone **root contexts**.
Directories marked with **Yes** contain their own project configuration and operate as
independent roots. Hidden directories like `.git/` and `.vscode/` are intentionally excluded.

| Folder | Purpose | Root Context |
| ------ | ------- | ------------ |
| `src/` | TypeScript SDK main codebase | Yes |
| `web/` | Next.js v15+ application | Yes |
| `python/` | Python agent system | Yes |
| `agent-framework/` | TypeScript 22 multi-agent framework | Yes |
| `scripts/` | Lifecycle and maintenance scripts | No |
| `memory-bank/` | AI memory ledger and documentation | No |
| `notebooks/` | Jupyter notebooks and experiments | No |
| `prisma/` | Database schema and migrations | No |
| `examples/` | Sample utilities and snippets | No |
| `init/` | Initialization templates | No |
| `templates/` | Scaffolding templates for new modules | No |
| `node_modules/` | Installed dependencies (generated) | No |

> **This table must be kept up to date by all AI agents whenever folders are added or removed.**

Only `src/`, `web/`, `python/`, and `agent-framework/` are independent root
contexts. AI agents must automatically document new root contexts here when
detected and keep this list in sync with actual folders.

### Architectural Principles

- **Language Separation** - Clear boundaries between TypeScript, Python, and web development
- **Framework Coexistence** - Multiple frameworks can coexist without conflicts
- **Script-Driven Setup** - All operations via idempotent scripts in `scripts/` directory
- **AI Agent Integration** - Architecture designed for three-agent collaboration
- **Conditional Environments** - Runtime decision deferral over hard-coded choices

### Multi-Language Support Strategy

- **TypeScript** (`src/`) - Core library with native fetch API and comprehensive testing
- **Next.js** (`web/`) - Server Actions, Client Components, and database integration
- **Python** (`python/`) - Conditional environment framework with three deployment modes
- **Jupyter** (`notebooks/`) - ML development with VS Code integration
- **Docker** - Codex Universal environment with volume-based development

## Key Technical Decisions

### Native Fetch API Modernization ✅

**Decision**: Convert entire HTTP client implementation from node-fetch to Node.js 22 native fetch API
**Rationale**: Improved performance, reduced dependencies, future compatibility, and better TypeScript integration
**Implementation**: Complete codebase conversion with vi.stubGlobal mocking strategy for tests
**Impact**: 259 tests passing with 98.34% coverage, zero regression development

### Three AI Agent Ecosystem Architecture ✅

**Decision**: Implement sophisticated collaboration between Cline AI, Codex CLI, and VS Code Copilot
**Rationale**: Complementary capabilities, shared memory bank, cross-agent workflows for complex tasks
**Implementation**: 31 instruction files + 35 prompt files with stateful collaboration patterns
**Impact**: Revolutionary AI-human collaboration with persistent context preservation

### Conditional Environment Framework ✅

**Decision**: Parameter-driven architecture with runtime environment selection (local, docker_isolated, docker_volume)
**Rationale**: Avoid hard-coded implementation choices, maximum flexibility, easy mode switching
**Implementation**: ENV_MODE parameter system with comprehensive script automation
**Impact**: First successful implementation of truly conditional instruction framework

### Codex Universal Docker Environment ✅

**Decision**: Standardize on `ghcr.io/openai/codex-universal:latest` for all development environments
**Rationale**: Consistent development across platforms, OpenAI API integration, volume-based workflows
**Implementation**: Docker Compose orchestration with health monitoring and security best practices
**Impact**: Eliminates environment-specific issues, enables instant file changes without rebuilds

### Memory Bank System Optimization ✅

**Decision**: Implement official Cline Memory Bank structure with historical archival
**Rationale**: AI agent efficiency, faster session startup, zero information loss, professional documentation
**Implementation**: Systematic transformation with proper formatting and cross-references
**Impact**: Optimized AI agent reading efficiency with complete historical preservation

### Next.js v15+ Server Actions Implementation ✅

**Decision**: Build production-ready web applications using Server Actions with proper cache revalidation
**Rationale**: Modern React patterns, improved performance, simplified state management
**Implementation**: Complete Server/Client Component architecture with PostgreSQL integration
**Impact**: Fully operational application with enhanced user experience patterns

## Design Patterns

### AI Agent Collaboration Patterns

- **Memory Bank Integration Pattern** - All agents read memory bank files at session start
- **Cross-Agent Workflow Pattern** - Complex tasks coordinate between multiple agents
- **Instruction File Pattern** - Domain-specific coding standards automatically applied
- **Prompt File Pattern** - Executable workflow templates for automated development
- **Self-Documentation Pattern** - Automatic context preservation and state updates

### Container Orchestration Patterns

- **Volume-Based Development Pattern** - Bind mounts for source code, named volumes for dependencies
- **Environment Variable Injection Pattern** - Secure configuration passing using `${VARIABLE}` syntax
- **Health Check Pattern** - Comprehensive service validation with proper timeouts and retries
- **Service Discovery Pattern** - Custom networks with descriptive service names

### Script Architecture and Maintenance Principles

#### Script Consolidation and Optimization Strategy ✅ **ONGOING EFFORT**

**Decision**: Continuously reduce script quantity through consolidation while maintaining functionality and improving maintainability
**Rationale**: Fewer scripts = less maintenance overhead, clearer dependencies, better documentation, easier troubleshooting
**Implementation**: Systematic script analysis with consolidation opportunities identification and execution
**Current Status**: Recently consolidated 41 scripts into 22 scripts (46% reduction) with standardized documentation

#### Script Documentation and Maintenance Standards ✅ **MANDATORY**

**Decision**: All scripts must have comprehensive header documentation and stateful README maintenance
**Rationale**: Self-documenting code improves maintainability, reduces onboarding time, enables better automation
**Implementation**: 
- **Header Requirements**: 10-line standardized header with script name, aim, purpose, decision rationale, usage, dependencies, last updated, references
- **Validation Status**: Every script ends with `#? Validation Status: Actively Validated on [DATE]`
- **README Synchronization**: `scripts/README.md` must be updated whenever scripts are added, modified, or removed
- **Inline Documentation**: Critical sections documented with purpose-driven comments throughout

#### Ongoing Script Optimization Protocol ✅ **CONTINUOUS**

**Decision**: Establish maintenance tasks to continuously optimize script flow and reduce dependencies
**Rationale**: Scripts accumulate over time; regular optimization prevents bloat and improves efficiency
**Implementation**:
- **Monthly Reviews**: Analyze script usage patterns and identify consolidation opportunities
- **Dependency Reduction**: Minimize external dependencies and cross-script dependencies
- **Flow Optimization**: Streamline script logic and remove redundant operations
- **Auto-Documentation**: Maintain soul and state of each script through comprehensive documentation

#### Script Consolidation History and Future Plans

**Previous Consolidation Achievements**:
- ✅ **setup_python_env.sh** - Consolidated 3 Python environment scripts (local, docker_isolated, docker_volume)
- ✅ **verify-all.sh** - Consolidated 5 validation scripts into unified interface
- ✅ **setup_ts_sdk.sh** - Consolidated 6 TypeScript/SDK setup scripts with modular selection
- ✅ **Docker lifecycle scripts** - Enhanced with comprehensive documentation headers
- ✅ **Total Reduction**: From 41 scripts to 22 scripts (46% reduction)

**Future Consolidation Targets**:
- **Web Environment Scripts** - Consider consolidating `setup_web_env.sh` and `setup_web_dev_environment.sh`
- **Validation Scripts** - Potential merge of `validate-instructions.sh` and `validate-prompt.sh`
- **Agent Setup Scripts** - Evaluate consolidation of `setup_agent_framework.sh` and `setup_agent_system.sh`
- **Questrade Scripts** - Merge `setup_questrade_sdk_core.sh` and `setup_questrade_types.sh` if functionality overlaps

#### Script Maintenance Automation

**Decision**: Implement automated maintenance checks and documentation updates
**Implementation**:
- **Header Validation**: Automated checks for proper header format and validation status
- **README Synchronization**: Automatic detection of script changes and README update requirements  
- **Dependency Analysis**: Regular analysis of script interdependencies and optimization opportunities
- **Usage Tracking**: Monitor which scripts are frequently used vs. rarely accessed for consolidation priorities

### Script Automation Patterns

- **Idempotent Operation Pattern** - Scripts safely re-runnable without side effects
- **Validation-First Pattern** - Prerequisites checked before operations with helpful error messages
- **Colored Logging Pattern** - Consistent color coding for different log levels
- **Graceful Degradation Pattern** - Continue operation when possible, warn about optional components
- **Documentation Synchronization Pattern** - Each shell script begins with a comment header describing its aim, purpose, and decision rationale. Whenever a script is added or modified, `scripts/README.md` must be updated with a matching description and duplicate functionality consolidated.

### Next.js Component Architecture Patterns

#### Client-Server Boundary Rules

- **`'use client'` Directive** - Place at top of file, before imports, only at component entry points
- **Serializable Props** - Props between Server/Client Components must be serializable
- **Minimize Client Bundle** - Use Server Components by default, Client Components when necessary
- **Server Actions** - Use `'use server'` for mutations with proper cache revalidation

#### Component Decision Matrix

| Context                 | Component Type         | Use `'use client'` | Use Server Component | Use Server Actions |
| ----------------------- | ---------------------- | ------------------ | -------------------- | ------------------ |
| Data fetching (initial) | Data loading           | ❌                 | ✅                   | ❌                 |
| User interaction        | Button clicks, forms   | ✅                 | ❌                   | ❌                 |
| State management        | useState, useEffect    | ✅                 | ❌                   | ❌                 |
| Database mutations      | Create, update, delete | ❌                 | ❌                   | ✅                 |
| Browser APIs            | localStorage, window   | ✅                 | ❌                   | ❌                 |
| SEO content             | Static text, meta      | ❌                 | ✅                   | ❌                 |
| Authentication          | Login forms, logout    | ✅ (UI)            | ✅ (validation)      | ✅ (actions)       |

#### Implementation Patterns

- **Composition Pattern** - Nest Client Components inside Server Components for clear separation
- **Progressive Enhancement** - Forms work without JavaScript, enhanced with client-side validation
- **Revalidation Pattern** - Server Actions use `revalidatePath()` and `revalidateTag()` for cache updates

### Testing Architecture Patterns

#### Native Fetch Testing Pattern

- **Global Stubbing** - Use `vi.stubGlobal('fetch', mockFetch)` for HTTP client testing
- **Realistic Mocking** - Provide Response object mocks matching native fetch API contracts
- **Comprehensive Scenarios** - Test both successful responses and error conditions
- **Async/Await Patterns** - Proper handling of all HTTP operations

#### Coverage Achievement Pattern

- **High Coverage Target** - Maintain 98%+ branch coverage as minimum threshold
- **Edge Case Focus** - Test error scenarios, boundary conditions, and validation logic
- **Test Isolation** - Each test file completely independent with proper mocking
- **Cross-Agent Compatibility** - Ensure configurations work across all AI agents

### Microsoft Edge DevTools Integration Pattern

- **Comprehensive Debugging Configuration** - Complete VS Code integration with individual and compound workflows
- **CSS Variables Solution** - Resolve no-inline-styles warnings using `style={{ '--dynamic-color': value }}`
- **Protocol Compliance Framework** - Strict adherence to instruction file organization standards
- **Security Best Practices** - Development-only security configurations with proper isolation

### Conditional Framework Pattern

- **Parameter-Driven Architecture** - Runtime decisions through ENV_MODE parameter selection
- **Decision Deferral** - Avoid hard-coded choices in instruction files
- **Mode-Specific Generation** - Create appropriate configurations and documentation per mode
- **AI Agent Compatibility** - Works seamlessly across all three AI agents

## Component Relationships

### Memory Bank File Hierarchy

```
projectbrief.md (foundation)
├── productContext.md (purpose & goals)
├── systemPatterns.md (architecture & decisions) ← THIS FILE
├── techContext.md (technologies & constraints)
└── activeContext.md (current state)
    └── progress.md (achievements & status)
        └── dependencies.md (dependency tracking)
```

### AI Agent Coordination Flow

```
User Request → AI Agent (Cline/Codex/Copilot)
├── Reads: Memory Bank files (mandatory at session start)
├── Applies: System patterns and architectural decisions
├── Implements: Design patterns and technical standards
├── Updates: Memory Bank with new architectural decisions
└── Maintains: Cross-session architectural consistency
```

### Technology Integration Relationships

```
TypeScript SDK (src/)
├── Integrates: Native fetch API with comprehensive testing
├── Connects: Next.js applications via shared types and utilities
└── Supports: Python integration through API contracts

Next.js Applications (web/)
├── Uses: Server Actions for database mutations
├── Implements: Client/Server Component architecture
├── Integrates: PostgreSQL via Prisma ORM
└── Connects: TypeScript SDK for business logic

Python Environment (python/)
├── Provides: Three deployment modes (local, docker_isolated, docker_volume)
├── Integrates: Jupyter notebooks for ML development
├── Connects: TypeScript SDK via API interfaces
└── Supports: Container orchestration workflows

Docker Environment
├── Standardizes: Development across all platforms
├── Provides: Codex Universal base with Node.js 22 + Python 3.13
├── Enables: Volume-based development with instant file changes
└── Integrates: OpenAI API access for all container workflows
```

## Dependencies and Relationships

- **Depends On:** [projectbrief.md](./projectbrief.md), [productContext.md](./productContext.md)
- **Required By:** [techContext.md](./techContext.md), [activeContext.md](./activeContext.md), [progress.md](./progress.md), [dependencies.md](./dependencies.md)
- **Why This Order:** System patterns must be established after foundational requirements and user goals but before technical implementation details
- **Impact Analysis:** Changes to system architecture affect all implementation decisions, AI agent behavior, testing strategies, and development workflows

## Call to Action

> **All agents and contributors must review, update, and self-regulate this file as the system architecture and patterns evolve.**  
> **Do not proceed with system-level changes until this file is aligned with the current architecture.**  
> **Update this file immediately upon any change in system structure, patterns, or technical decisions.**  
> **Ensure all architectural decisions are documented with clear rationale and impact analysis.**

## AI Agent Instructions

This project supports three AI agents with specific architectural responsibilities:

- **Cline AI** → Apply architectural patterns with memory bank integration and learning protocols
- **Codex CLI** → Implement system patterns through script automation and container orchestration
- **VS Code Copilot** → Enforce architectural standards through instruction files and code generation

**All agents must validate their implementations against the system patterns defined in this file and ensure consistency with established architectural decisions.**

---

[2025-07-27] Radical Documentation Refactor: Memory Bank Migration

All instructions, prompts, and chatmodes have been migrated from `.github/` to the `memory-bank/` folders. The Copilot entry point remains `.github/copilot-instructions.md` for compatibility with official VS Code tooling. This change was motivated by the need for a more organized, stateful, and agent-friendly documentation system. Centralizing instructions, prompts, and chatmodes in the memory bank enables better context preservation, easier maintenance, and improved collaboration between AI agents and human contributors.

**Last Updated:** 2025-07-18 | **Status:** Architectural Patterns Established | **Coverage:** Polyvalent AI Development Architecture
