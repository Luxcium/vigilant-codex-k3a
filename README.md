# Vigilant Codex K3a - Polyvalent AI Development Workspace

<!--[![CI](https://github.com/Luxcium/vigilant-codex-k3a/actions/workflows/ci.yml/badge.svg)](https://github.com/Luxcium/vigilant-codex-k3a/actions/workflows/ci.yml)-->

## Canonical Playground: `src/example.ts`

The file `src/example.ts` serves as the canonical playground for agent and user feature prototyping. It is the reference implementation for Questrade SDK authentication, outputting all results to `.keys/example-sdk-demo.json` with human-readable metadata. All agent-facing documentation and memory bank files reference this playground as the standard example for SDK usage, modularization, and agent workflows.

**Key Features:**

- Modular, pure functions for each step
- All parameters as top-level constants
- Single output file for all results
- Human-readable date and account number included
- Canonical reference for agent workflows and documentation

A sophisticated, AI-agent-enabled development workspace designed for rapid, robust application development across multiple languages, frameworks, and platforms. This workspace provides a comprehensive foundation for building resilient applications with advanced AI collaboration patterns.

## 🚀 Workspace Overview

**Vigilant Codex K3a** is a polyvalent development environment that combines:

- **Multi-language architecture** supporting TypeScript, Python, Next.js, and Jupyter notebooks
- **Advanced AI agent collaboration** with stateful memory management
- **Conditional environment frameworks** with runtime decision deferral
- **Native fetch modernization** with comprehensive test coverage (98.34%)
- **Docker orchestration** using Codex Universal environments
- **Sophisticated instruction/prompt system** for automated workflow execution

## 🤖 AI Agent Ecosystem

This workspace supports three AI agents with sophisticated collaboration patterns:

### Primary AI Agents

- **🧠 Cline AI** → [`.clinerules/main-rules.md`](.clinerules/main-rules.md) - Advanced development agent with memory bank integration
- **⚡ Codex CLI** → [`AGENTS.md`](AGENTS.md) - Terminal-based automation and container orchestration
- **💡 VS Code Copilot** → [`.github/copilot-instructions.md`](.github/copilot-instructions.md) - Code generation with 31 instruction files

### AI Framework Components

- **🔧 69 Instruction Files** ([`memory-bank/instructions/`](memory-bank/instructions/)) - Automated coding standards and guidelines
- **⚙️ 40 Prompt Files** ([`memory-bank/prompts/`](memory-bank/prompts/)) - Executable workflow templates
- **📚 Memory Bank System** ([`memory-bank/`](memory-bank/)) - Stateful documentation for AI collaboration
- **🎯 Self-Documentation Protocol** - Maintains context across development sessions

## 🏗️ Architecture Overview

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

| Folder             | Purpose                               | Root Context |
| ------------------ | ------------------------------------- | ------------ |
| `src/`             | TypeScript SDK main codebase          | Yes          |
| `web/`             | Next.js v15+ application              | Yes          |
| `python/`          | Python agent system                   | Yes          |
| `agent-framework/` | TypeScript 22 multi-agent framework   | Yes          |
| `scripts/`         | Lifecycle and maintenance scripts     | No           |
| `memory-bank/`     | AI memory ledger and documentation    | No           |
| `notebooks/`       | Jupyter notebooks and experiments     | No           |
| `prisma/`          | Database schema and migrations        | No           |
| `examples/`        | Sample utilities and snippets         | No           |
| `init/`            | Initialization templates              | No           |
| `templates/`       | Scaffolding templates for new modules | No           |
| `node_modules/`    | Installed dependencies (generated)    | No           |

> **This table must be kept up to date by all AI agents whenever folders are added or removed.**

Only `src/`, `web/`, `python/`, and `agent-framework/` are independent root
contexts. AI agents must automatically document new root contexts here when
detected and keep this list in sync with actual folders.

### Technology Stack

- **🟦 TypeScript 5.8+** with strict type checking and native Response types
- **🐍 Python 3.13** with conditional environment framework (local/docker_isolated/docker_volume)
- **⚛️ Next.js 15+** for web applications with Prisma database integration
- **🐳 Docker** with Codex Universal environments and volume-based development
- **🔬 Vitest 3.2.4** with 98.34% branch coverage and comprehensive test isolation
- **📓 Jupyter Notebooks** with VS Code API integration and ML workflow automation

## 🛠️ Quick Start

### Environment Setup

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

### Conditional Python Environment

```bash
# Runtime environment selection
./scripts/setup_python_env.sh local           # Local virtual environment
./scripts/setup_python_env.sh docker_isolated # Fully containerized
./scripts/setup_python_env.sh docker_volume   # Container + live editing
```

### Web Application Setup

```bash
# Next.js application with database
./scripts/setup_web_env.sh
./scripts/setup_db_prisma.sh
```

## 🎯 Key Features & Achievements

### Advanced HTTP Client Architecture

- **✅ Native Fetch API Migration** - Complete conversion from node-fetch to Node.js 22 native fetch
- **✅ Zero Regression** - All 259 tests passing with improved performance
- **✅ Type System Modernization** - Native Response types throughout codebase
- **✅ Test Infrastructure** - vi.stubGlobal mocking strategy for HTTP client isolation

### Comprehensive Test Coverage

- **✅ 98.34% Branch Coverage** - Exceeding project requirements (90% threshold)
- **✅ 259 Tests Passing** - Complete test suite with proper isolation
- **✅ Edge Case Coverage** - NaN handling, timeout management, error scenarios
- **✅ CommonJS Compatibility** - Maintained throughout modernization

### Revolutionary Conditional Framework

- **✅ Parameter-Driven Architecture** - Runtime environment selection without hard-coding
- **✅ Three Environment Modes** - Local, Docker isolated, Docker volume-mounted
- **✅ Decision Deferral** - Implementation choices made at execution time
- **✅ AI Agent Compatible** - Works across all three AI agents

### Memory Bank System

- **✅ Stateful AI Collaboration** - Persistent context across development sessions
- **✅ Cross-File Dependencies** - Comprehensive dependency tracking and impact analysis
- **✅ Self-Documentation Protocol** - Automatic context preservation
- **✅ Memory Reset Resilience** - Complete project understanding from documentation

## 📋 Development Workflows

### AI-Assisted Development

```bash
# Generate TypeScript components with standards
/typescript-component name:MyComponent

# Setup conditional Python environment
/python-environment-setup mode:docker_volume

# Generate comprehensive documentation
/tsdoc-typedoc target:src/

# Validate web app configuration
# (Deprecated example removed)
```

### Container Development

```bash
# Start development environment
./scripts/codex_start.sh

# Rebuild with latest image
./scripts/codex_rebuild.sh

# Stop environment cleanly
./scripts/codex_stop.sh

# Validate setup
./scripts/codex_test.sh
```

### Testing & Quality Assurance

```bash
# Run focused test files (strict policy)
npx vitest run src/tests/restClient.test.ts

# Generate coverage reports
npm run test:coverage
```

## 📚 Documentation System

### Instruction Files (40 Files)

Automated coding standards that apply during AI-assisted development:

- **AI Framework**: ai-instruction-creation, ai-prompt-creation, instruction-authoring-standards
- **Environments**: docker-environment, python-environment-conditional, vscode-notebook-integration
- **Languages**:
  - [typescript-style.instructions.md](memory-bank/instructions/typescript-style.instructions.md) - formatting and naming conventions
  - [typescript-typing.instructions.md](memory-bank/instructions/typescript-typing.instructions.md) - type system usage
  - [typescript-code-organization.instructions.md](memory-bank/instructions/typescript-code-organization.instructions.md) - module structure
  - [typescript-imports.instructions.md](memory-bank/instructions/typescript-imports.instructions.md) - import management
  - [typescript-error-handling.instructions.md](memory-bank/instructions/typescript-error-handling.instructions.md) - error handling rules
  - [typescript-testing.instructions.md](memory-bank/instructions/typescript-testing.instructions.md) - testing requirements
  - [typescript-documentation.instructions.md](memory-bank/instructions/typescript-documentation.instructions.md) - documentation standards
  - [typescript-memory-bank.instructions.md](memory-bank/instructions/typescript-memory-bank.instructions.md) - memory bank integration
  - [typescript-tooling.instructions.md](memory-bank/instructions/typescript-tooling.instructions.md) - tooling configuration
  - [typescript-output-directory.instructions.md](memory-bank/instructions/typescript-output-directory.instructions.md) - output directory rule
  - [python-standards.instructions.md](memory-bank/instructions/python-standards.instructions.md)
  - [python-notebook-standards.instructions.md](memory-bank/instructions/python-notebook-standards.instructions.md)
- **Web Standards**: pwa-manifest, ios-meta-and-links, windows-tiles, theme-ui-meta
- **Quality**: self-documentation

### Prompt Files (35 Files)

Executable workflow templates for automated development:

- **Template Management**: template-manager, ai-template-manager, instruction-generator
- **Environment Setup**: codex-universal-environment, python-environment-setup, docker-generator
- **Development**: typescript-component, notebook-development-workflow, web-project-structure
- **Documentation**: memory-bank-update, dependency-management, tsdoc-typedoc
- **Web Standards**: theme-ui-meta, seo-meta-tags, x-cards, general-icon-link-tags

### Memory Bank Files

Stateful documentation for AI agent collaboration:

- **[projectbrief.md](memory-bank/projectbrief.md)** - Foundation and core requirements
- **[systemPatterns.md](memory-bank/systemPatterns.md)** - Architecture and design patterns
- **[activeContext.md](memory-bank/activeContext.md)** - Current work focus and decisions
- **[progress.md](memory-bank/progress.md)** - Achievements and remaining tasks
- **[dependencies.md](memory-bank/dependencies.md)** - Comprehensive dependency tracking

## 🔧 Project Standards

### Development Rules

1. **Script-Driven Setup** - All project operations via idempotent scripts in `scripts/`
2. **Memory Bank Protocol** - All AI agents must read memory bank at session start
3. **Conditional Architecture** - Runtime decisions over hard-coded implementations
4. **Cross-Agent Compatibility** - All configurations work across Cline AI, VS Code Copilot, and Codex CLI
5. **Markdown-Lint Compliance** - All documentation follows strict markdown standards

### Code Organization

- **TypeScript** → `src/` directory with strict type checking
- **Python** → `python/` directory with conditional environments
- **Web Apps** → `web/` directory for Next.js applications
- **Scripts** → `scripts/` directory for automation (bash only)
- **Notebooks** → `notebooks/` directory for Jupyter development

### Quality Requirements

- **98%+ Test Coverage** - Comprehensive test suite with proper isolation
- **Idempotent Scripts** - Safe to run multiple times without side effects
- **Cross-Environment Testing** - Validation across local, Docker, and cloud environments
- **Documentation Completeness** - Every component properly documented with cross-references

## 🌟 Advanced Capabilities

### VS Code Integration

- **Custom Tasks** - 13 compound tasks for parallel/sequential execution
- **Launch Configurations** - 9 debugging setups with compound debugging
- **Edge DevTools Integration** - Microsoft Edge DevTools support with CSS variables solution
- **Code Snippets** - Python and TypeScript templates
- **Extension Recommendations** - 25+ curated extensions
- **Notebook API** - Advanced Jupyter integration with custom commands

### Docker Orchestration

- **Codex Universal Environment** - Pre-configured Node.js 22 + Python 3.13
- **Volume-Based Development** - Instant file changes without container rebuilds
- **OpenAI API Integration** - Seamless API access within containers
- **Multi-Service Support** - PostgreSQL, Redis, development servers
- **Health Monitoring** - Comprehensive service validation

### Machine Learning Workflows

- **Notebook Specialist Integration** - Advanced Jupyter development with VS Code API
- **Vision Transformer Implementation** - Complete ViT model development workflow
- **Reproducible Research** - Systematic experiment tracking and documentation
- **Performance Profiling** - Memory usage analysis and optimization

## 📖 Usage Patterns

### For New Developers

1. **Read Memory Bank** - Start with [`memory-bank/projectbrief.md`](memory-bank/projectbrief.md)
2. **Setup Environment** - Use `./scripts/setup_codex_universal.sh`
3. **Explore Instructions** - Review [`memory-bank/instructions/README.md`](memory-bank/instructions/README.md)
4. **Try Prompts** - Execute workflows via [`memory-bank/prompts/README.md`](memory-bank/prompts/README.md)

### For AI Agents

1. **Memory Bank Protocol** - Read ALL memory bank files at session start
2. **Apply Instructions** - Use instruction files for consistent code generation
3. **Execute Prompts** - Leverage prompt files for workflow automation
4. **Update Documentation** - Maintain memory bank synchronization

### For Advanced Development

1. **Conditional Environments** - Use runtime parameter selection
2. **Cross-Agent Workflows** - Leverage multiple AI agents for complex tasks
3. **Custom Instructions** - Create domain-specific coding standards
4. **Memory Bank Expansion** - Add specialized documentation for new domains

## 🔍 Meta-Configuration Reference

For comprehensive platform integration (PWA, iOS, Windows, Chrome Extension), see:

**[when-to-use-what-matrix.instructions.md](memory-bank/instructions/when-to-use-what-matrix.instructions.md)** - One-page matrix mapping all integration goals to their primary configuration files and authoritative sources.

## 🤝 Contributing

### Adding New Components

1. **Follow Standards** - Use existing instruction files for coding standards
2. **Update Memory Bank** - Document architectural decisions and dependencies
3. **Create Tests** - Maintain 98%+ coverage with proper isolation
4. **Script-Driven Setup** - Create idempotent scripts for new functionality

### Expanding AI Framework

1. **Instruction Files** - Use [instruction-generator.prompt.md](memory-bank/prompts/instruction-generator.prompt.md)
2. **Prompt Files** - Use [template-manager.prompt.md](memory-bank/prompts/template-manager.prompt.md)
3. **Cross-References** - Update all relevant README files
4. **Memory Bank Integration** - Maintain dependency tracking

## 📋 Validation & Testing

```bash
# Test coverage analysis
npm run test:coverage

# Markdown lint compliance
./scripts/check-markdown.sh

# Memory bank consistency
./scripts/check-memory-bank.sh

# Dependency validation
./scripts/check-dependencies.sh
# Optional consolidated validation script is available at
# ./scripts/verify-all.sh for manual use.
```

## 🎯 Success Metrics

- **✅ 98.34% Branch Coverage** - Comprehensive test suite
- **✅ 259 Tests Passing** - Zero regression development
- **✅ Native Fetch Migration** - Modern HTTP client architecture
- **✅ 53+ Documentation Files** - Complete AI agent ecosystem
- **✅ 3 AI Agents** - Sophisticated collaboration patterns
- **✅ Conditional Frameworks** - Runtime decision architecture
- **✅ Memory Bank System** - Stateful AI development

---

> **Built for AI-Human Collaboration** - This workspace represents a sophisticated foundation for polyvalent application development with advanced AI agent integration, comprehensive testing, and stateful documentation systems.

**Last Updated**: 2025-07-30 | **Status**: Production-Ready | **Coverage**: 98.34%

## Development Essentials

### Folder Layout

Refer to the architecture overview above for the complete directory map. Key paths include `src/` for the TypeScript SDK, `web/` for the Next.js app, `python/` for agent utilities, and `memory-bank/` for persistent AI context.

### Token Persistence

Tokens are saved in the `.keys` directory via the `KeyManager`, which stores OAuth credentials in `.keys/oauth.json` and supports clearing or refreshing them safely.

### Environment Switching

Configure Python modes at runtime:

```bash
./scripts/setup_python_env.sh --mode local
./scripts/setup_python_env.sh --mode docker_isolated
./scripts/setup_python_env.sh --mode docker_volume
```

Set `ENV_MODE` to persist a default selection.

### CLI Usage

Launch a Codex Universal container with:

```bash
./scripts/run_codex_cli.sh
```

Run project scripts inside the container using `pnpm <script>` only. This workspace is pnpm-only by policy.

### Pre-Commit Checklist

- `pnpm run check:readme-counts` – confirm the AI Framework Components bullet counts match the memory-bank inventories
- `./scripts/verify-all.sh` – run the consolidated validation suite before invoking `commit-guard.sh`

### Mock Recording

Tests rely on `vi.stubGlobal('fetch', mockFetch)` to capture API interactions. Update mock responses in the corresponding test files when recording new scenarios.

### Testing Commands

- `./scripts/verify-all.sh` – markdown, instruction, prompt, and memory-bank checks
- `pnpm test` – run the vitest suite
- `pnpm run test:coverage` – generate coverage reports

## Web Development Workflow with AI Agents

Leverage AI-assisted VS Code tasks and pnpm script aliases to co-develop the Next.js application in real time:

### Root-level pnpm script aliases

## pnpm-Only, No-Lockfile Policy

This workspace is intentionally configured to use **pnpm only** as the package manager. All references to npm or yarn have been removed. Lockfiles (pnpm-lock.yaml, package-lock.json, yarn.lock) are intentionally ignored and not used in CI or local development. See `.gitignore` and CI workflow for enforcement details.

**Key points:**

- Use `pnpm` for all dependency management and scripts.
- Do not use npm or yarn in this workspace.
- No lockfiles are generated or required; this is enforced in CI and `.gitignore`.

- **pnpm run web:dev**: Start Next.js in development mode (HMR, error overlays)
- **pnpm run web:lint**: Run ESLint for the web folder
- **pnpm run web:format**: Auto-format web code with Prettier
- **pnpm run web:test**: Run web tests
- **pnpm run web:build**: Build optimized production bundle
- **pnpm run web:preview**: Build and start production server

### VS Code Tasks

Use **Run Task** (Ctrl+Shift+B) or the Command Palette to run:

- **Web: Dev Server** (web:dev)
- **Web: Lint** (web:lint)
- **Web: Format** (web:format)
- **Web: Test** (web:test)
- **Web: Preview** (web:preview)

Errors and warnings from linting or build tasks appear in the Problems pane.

### AI Agent Integration

In **Agent Mode**, use Copilot Chat prompts to automate workflows:

- `/launch-browser-monitor`: Launch Simple Browser, enable instrumentation, and monitor errors
- `/analyze-issue`: Review runtime overlays and log console errors; suggest fixes

Custom prompts and instructions are located in `memory-bank/prompts/` and `memory-bank/instructions/`.

## Recent Updates

### Improvements to `src/` Folder

1. **Centralized Configuration**
   - Added `src/config/index.ts` to manage environment variables.

2. **Safe Key Storage**
   - Implemented `KeyManager` in `src/security/KeyManager.ts` for secure token storage.

3. **OAuth Token Refresh**
   - Added Axios interceptors in `src/http/client.ts` to handle token refresh automatically.

4. **REST Gateway Layer**
   - Created `src/http/QuestradeApi.ts` to wrap all API calls.

5. **Bootstrap Example**
   - Added `src/main.ts` to demonstrate a working request round-trip.

### How to Run the Example

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Create a `.env` file with the following content:

   ```env
   API_SERVER=https://api01.iq.questrade.com/v1
   CLIENT_ID=YOUR_CLIENT_ID
   REFRESH_TOKEN=YOUR_REFRESH_TOKEN
   LOG_LEVEL=info
   ```

3. Run the example:

   ```bash
   pnpm tsx src/main.ts
   ```

4. Expected Output:
   - A table of candle data printed to the console.

## 🧪 Questrade Example Functional Playground

- The `src/example.ts` file is the canonical playground for AI agent and user collaboration on authentication and account-fetching features.
- All configuration and output are centralized as constants at the top of the file.
- All logic is split into pure, composable functions.
- Only `.keys/example-sdk-demo.json` is written for output; no split or duplicate files.
- This file is labeled as an intermediate refactor phase, preparing for future dependency injection and SDK integration.
- When creating or updating agent workflows, reference this playground as the standard for isolated feature prototyping.

## Verification

- `markdownlint --strict README.md CONTRIBUTING.md`
- `./scripts/verify-all.sh`
