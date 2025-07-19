# systemPatterns.md

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

```
vigilant-codex-k3a/
├── src/                    # TypeScript core library and SDK components
├── web/                    # Next.js applications (when coexisting with other code)
├── python/                 # Python projects, modules, and conditional environments
├── scripts/                # Shell scripts for automation (bash only)
├── notebooks/              # Jupyter notebooks and ML development
├── memory-bank/            # AI agent state management and documentation
├── .github/
│   ├── instructions/       # 26 coding standards (auto-applied)
│   └── prompts/           # 27 workflow automations
├── .clinerules/           # Cline AI personal instructions
└── .vscode/               # VS Code optimization and tasks
```

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
**Implementation**: 26 instruction files + 27 prompt files with stateful collaboration patterns
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

### Script Automation Patterns

- **Idempotent Operation Pattern** - Scripts safely re-runnable without side effects
- **Validation-First Pattern** - Prerequisites checked before operations with helpful error messages
- **Colored Logging Pattern** - Consistent color coding for different log levels
- **Graceful Degradation Pattern** - Continue operation when possible, warn about optional components

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

**Last Updated:** 2025-07-18 | **Status:** Architectural Patterns Established | **Coverage:** Polyvalent AI Development Architecture
