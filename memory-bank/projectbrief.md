# projectbrief.md

## Purpose

This file is the foundation of the Memory Bank and defines the core requirements, goals, and scope for the Vigilant Codex K3a polyvalent AI development workspace. It serves as the primary source of truth for all subsequent documentation and must be maintained with precision to ensure effective AI agent collaboration.

## Structure

- **Project Overview** - High-level description and objectives
- **Core Requirements** - Essential features and constraints
- **Scope Definition** - What is included and excluded from the project
- **AI Agent Collaboration Framework** - Multi-agent system requirements
- **Development Standards** - Quality and process requirements
- **Dependencies and Relationships** - File relationships and impact analysis
- **Call to Action** - Instructions for maintaining this file

---

## Project Overview

**Vigilant Codex K3a** is a sophisticated, AI-agent-enabled polyvalent development workspace designed for rapid, robust application development across multiple languages, frameworks, and platforms. The project combines advanced AI collaboration patterns with comprehensive development infrastructure to create a foundation for building resilient applications.

### Primary Objectives

- **Polyvalent Architecture** - Support TypeScript, Python, Next.js, Docker, and Jupyter notebooks in a unified workspace
- **AI Agent Collaboration** - Enable sophisticated stateful collaboration between Cline AI, Codex CLI, and VS Code Copilot
- **Conditional Environment Framework** - Provide runtime decision architecture without hard-coded implementation choices
- **Production-Ready Applications** - Deliver comprehensive testing, documentation, and deployment capabilities
- **Memory Bank System** - Maintain persistent context and knowledge across development sessions

### Key Innovations

- **Revolutionary Conditional Framework** - First successful implementation of parameter-driven instruction architecture
- **Three AI Agent Ecosystem** - Sophisticated collaboration patterns with persistent context preservation
- **Official Cline Memory Bank Structure** - Optimized documentation system for AI agent efficiency
- **Native Fetch Modernization** - Complete HTTP client modernization with 98.34% test coverage
- **Stateful Documentation** - Self-documenting protocols maintaining context across sessions

## Core Requirements

### AI Agent Framework Requirements

- **Mandatory Memory Bank Protocol** - All AI agents MUST read ALL memory bank files at session start
- **Cross-Agent Compatibility** - All configurations and workflows must function across Cline AI, Codex CLI, and VS Code Copilot
- **Persistent Context Preservation** - Complete project understanding must be maintainable across memory resets
- **Self-Documentation Protocol** - All actions and context changes must be automatically documented
- **Stateful Collaboration** - AI agents must coordinate effectively through shared memory bank system

### Development Environment Requirements

- **Script-Driven Setup** - All project operations must be performed via idempotent scripts in `scripts/` directory
- **Conditional Architecture** - Runtime decisions over hard-coded implementations
- **Multi-Language Support** - Seamless development across TypeScript, Python, and web technologies
- **Container Orchestration** - Docker-based development with volume-based workflows
- **Comprehensive Testing** - Maintain 98%+ test coverage with zero regression development

### Quality Standards Requirements

- **Markdown-Lint Compliance** - All documentation must follow strict GitHub markdown standards
- **Single # Header Rule** - Each file exactly one top-level heading matching filename
- **Cross-Reference Accuracy** - Maintain proper dependency tracking and impact analysis
- **Zero Information Loss** - Complete historical preservation through archival systems
- **Production-Ready Code** - All code must meet enterprise-level quality standards

### Application Architecture Requirements

- **Next.js v15+ Implementation** - Server Actions with proper cache revalidation
- **Database Integration** - PostgreSQL with Prisma ORM and proper schema management
- **Native Fetch API** - Node.js 22 native implementation for HTTP client operations
- **Type Safety** - Comprehensive TypeScript implementation with strict type checking
- **Security Best Practices** - Container security, authentication, and data protection

## Scope Definition

### Included in Project Scope

- **Core TypeScript Library** - Comprehensive SDK with native fetch API implementation
- **Next.js v15+ Web Applications** - Server Actions, Client Components, and database integration
- **Python Development Framework** - Conditional environment system with three deployment modes
- **Docker Orchestration** - Codex Universal environment with comprehensive automation
- **AI Agent Ecosystem** - 26 instruction files + 27 prompt files for workflow automation
- **Memory Bank System** - Official Cline Memory Bank structure with historical archival
- **Testing Infrastructure** - Comprehensive test suite with 98.34% branch coverage
- **Documentation Framework** - Complete technical documentation and API references

### Excluded from Project Scope

- **Production Deployment Infrastructure** - Cloud platform-specific deployment configurations
- **Enterprise Authentication Systems** - Complex multi-tenant authentication beyond basic patterns
- **Real-time Communication Features** - WebSocket implementations or real-time synchronization
- **Mobile Native Applications** - iOS/Android native development (web-based mobile support included)
- **Third-party Service Integrations** - External APIs beyond essential development tools

### Future Scope Considerations

- **Conditional Framework Extension** - Application to Node.js, TypeScript, and other language environments
- **Advanced AI Agent Patterns** - Enhanced collaboration workflows and automation capabilities
- **Performance Optimization** - Advanced caching, optimization, and scaling strategies
- **Enterprise Features** - Advanced security, monitoring, and management capabilities

## AI Agent Collaboration Framework

### Three AI Agent System

- **Cline AI** (Primary Development Agent)
  - **Entry Point**: [`.clinerules/main-rules.md`](../.clinerules/main-rules.md)
  - **Responsibilities**: Memory bank integration, code generation, architectural decisions
  - **Unique Capabilities**: Session-sticky preferences, learning protocols, context preservation

- **Codex CLI** (Automation and Orchestration)
  - **Entry Point**: [`AGENTS.md`](../AGENTS.md)
  - **Responsibilities**: Terminal automation, container management, script execution
  - **Unique Capabilities**: Command-line workflows, Docker orchestration, system automation

- **VS Code Copilot** (Code Generation and Standards)
  - **Entry Point**: [`.github/copilot-instructions.md`](../.github/copilot-instructions.md)
  - **Responsibilities**: Real-time code assistance, instruction file application, quality assurance
  - **Unique Capabilities**: 26 instruction files, automated coding standards, IDE integration

### Collaboration Requirements

- **Shared Memory Bank** - All agents must maintain synchronized understanding through memory bank files
- **Complementary Responsibilities** - Each agent has distinct but coordinating capabilities
- **Cross-Agent Workflows** - Complex tasks require coordination between multiple agents
- **Context Preservation** - Complete project understanding must persist across agent interactions

## Development Standards

### Code Organization Standards

- **Language-Based Structure** - Organize by language and framework at project root
  - `agent-framework/` - TypeScript 22 multi-agent framework (root context)
  - `examples/` - Sample utilities and snippets
  - `init/` - Autonomous initialization templates
  - `memory-bank/` - AI memory ledger and documentation
  - `node_modules/` - Installed dependencies (generated)
  - `notebooks/` - Jupyter notebooks and ML development
  - `prisma/` - Database schema and migrations
  - `python/` - Python agent system (root context)
  - `scripts/` - Lifecycle and maintenance scripts
  - `src/` - TypeScript SDK main codebase (root context)
  - `templates/` - Scaffolding templates for new modules
  - `web/` - Next.js v15+ application (root context)

### Process Standards

- **Idempotent Scripts** - All setup operations must be safely repeatable
- **No Manual File Creation** - All directory and file creation via scripts
- **Conditional Decision Deferral** - Runtime parameter selection over hard-coded choices
- **Memory Bank Maintenance** - Continuous documentation and context preservation
- **Cross-Agent Testing** - Validation across all three AI agent workflows

### Quality Assurance Standards

- **Test Coverage Requirements** - Minimum 98% branch coverage with comprehensive edge case testing
- **Documentation Completeness** - Every component properly documented with cross-references
- **Markdown-Lint Compliance** - Strict adherence to GitHub markdown formatting standards
- **Security Best Practices** - Container security, dependency validation, secure coding patterns
- **Performance Standards** - Optimized implementations with benchmarking and monitoring

## Dependencies and Relationships

- **Depends On:** None - this file establishes the foundational requirements and goals
- **Required By:** [productContext.md](./productContext.md), [systemPatterns.md](./systemPatterns.md), [techContext.md](./techContext.md), [activeContext.md](./activeContext.md), [progress.md](./progress.md), [dependencies.md](./dependencies.md)
- **Why This Order:** `projectbrief.md` defines foundational requirements that every other Memory Bank file builds upon
- **Impact Analysis:** If this document becomes outdated, all downstream documentation and automation may diverge from the project's objectives, leading to inconsistent workflows and requiring complete project realignment

## Call to Action

> **All agents and contributors must review, update, and self-regulate this file as the project evolves.**  
> **Do not proceed with project-specific work until this file is reviewed and aligned with the current project context.**  
> **Update this file immediately upon any change in project scope, requirements, or foundational objectives.**  
> **This file serves as the source of truth for all other Memory Bank documentation.**

## AI Agent Instructions

This project supports three AI agents with specific entry points and must maintain foundational alignment:

- **Cline AI** → [`.clinerules/main-rules.md`](../.clinerules/main-rules.md) (Memory bank integration and learning protocols)
- **Codex CLI** → [`AGENTS.md`](../AGENTS.md) (Automation and container orchestration)
- **VS Code Copilot** → [`.github/copilot-instructions.md`](../.github/copilot-instructions.md) (Code generation and quality standards)

**All agents must validate their understanding against this foundational document and ensure alignment with core project requirements.**

---

**Last Updated:** 2025-07-18 | **Status:** Foundational Requirements Established | **Scope:** Polyvalent AI Development Workspace
