# Vigilant Codex K3a - Polyvalent AI Development Workspace

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
- **💡 VS Code Copilot** → [`.github/copilot-instructions.md`](.github/copilot-instructions.md) - Code generation with 26 instruction files

### AI Framework Components

- **🔧 26 Instruction Files** ([`.github/instructions/`](.github/instructions/)) - Automated coding standards and guidelines
- **⚙️ 27 Prompt Files** ([`.github/prompts/`](.github/prompts/)) - Executable workflow templates
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
/validation-debugging-checklist
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

# Validate all environments
./scripts/verify-all.sh
```

## 📚 Documentation System

### Instruction Files (26 Files)

Automated coding standards that apply during AI-assisted development:

- **AI Framework**: ai-instruction-creation, ai-prompt-creation, instruction-authoring-standards
- **Environments**: docker-environment, python-environment-conditional, vscode-notebook-integration
- **Languages**: typescript-standards, python-standards, python-notebook-standards
- **Web Standards**: pwa-manifest, ios-meta-and-links, windows-tiles, theme-ui-meta
- **Quality**: validation-debugging-checklist, self-documentation

### Prompt Files (27 Files)

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
3. **Explore Instructions** - Review [`.github/instructions/README.md`](.github/instructions/README.md)
4. **Try Prompts** - Execute workflows via [`.github/prompts/README.md`](.github/prompts/README.md)

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

**[when-to-use-what-matrix.instructions.md](.github/instructions/when-to-use-what-matrix.instructions.md)** - One-page matrix mapping all integration goals to their primary configuration files and authoritative sources.

## 🤝 Contributing

### Adding New Components

1. **Follow Standards** - Use existing instruction files for coding standards
2. **Update Memory Bank** - Document architectural decisions and dependencies
3. **Create Tests** - Maintain 98%+ coverage with proper isolation
4. **Script-Driven Setup** - Create idempotent scripts for new functionality

### Expanding AI Framework

1. **Instruction Files** - Use [instruction-generator.prompt.md](.github/prompts/instruction-generator.prompt.md)
2. **Prompt Files** - Use [template-manager.prompt.md](.github/prompts/template-manager.prompt.md)
3. **Cross-References** - Update all relevant README files
4. **Memory Bank Integration** - Maintain dependency tracking

## 📋 Validation & Testing

```bash
# Environment validation
./scripts/verify-all.sh

# Test coverage analysis
npm run test:coverage

# Markdown lint compliance
./scripts/check-markdown.sh

# Memory bank consistency
./scripts/check-memory-bank.sh

# Dependency validation
./scripts/check-dependencies.sh
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

**Last Updated**: 2025-01-13 | **Status**: Production-Ready | **Coverage**: 98.34%

## Web Development Workflow with AI Agents

Leverage AI-assisted VS Code tasks and npm script aliases to co-develop the Next.js application in real time:

### Root-level npm script aliases
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

Custom prompts and instructions are located in `.github/prompts/` and `.github/instructions/`.
