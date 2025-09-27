# GitHub Copilot Chatmodes

This directory contains specialized chatmode files that configure VS Code Copilot with domain-specific expertise and behavioral patterns. Each chatmode provides a focused interaction model for specific development tasks and workflows.

## Complete File Index

### **Total Files: 14 total files (12 chatmodes + 1 README + 1 directory)**

**By Extension:**

- `.chatmode.md` files: 12 (specialized interaction modes)
- `.md` files: 1 (README.md)
- Directories: 1 (planification-agent/)

**File Structure:**

- 12 active chatmode files
- 1 README.md file  
- 1 planification-agent/ directory with 5 planning documents

## What are Chatmode Files?

Chatmode files (`.chatmode.md`) are specialized conversation configurations that:

- Define expert personas with domain-specific knowledge
- Configure tool access and interaction patterns
- Provide contextual prompting for focused workflows
- Enable consistent behavior across development sessions
- Support complex multi-step development processes

## Available Chatmodes (12 Files)

### Development Expertise

**[api-architect.chatmode.md](./api-architect.chatmode.md)** — API architecture and design specialist for REST, GraphQL, and microservices patterns.

**[main-expert.chatmode.md](./main-expert.chatmode.md)** — Primary development expert with comprehensive project knowledge and standards.

**[questrade-sdk-developer.chatmode.md](./questrade-sdk-developer.chatmode.md)** — Questrade SDK specialist for trading API integration and financial data processing.

**[tsdoc-typedoc.chatmode.md](./tsdoc-typedoc.chatmode.md)** — Documentation specialist for TSDoc and TypeDoc API documentation generation.

### Framework & Technology Specialists

**[iterative-nextjs.chatmode.md](./iterative-nextjs.chatmode.md)** — Next.js development specialist with Server Actions and App Router expertise.

**[vscode-helper.chatmode.md](./vscode-helper.chatmode.md)** — VS Code configuration and extension specialist for development environment optimization.

### Data Science & Notebooks

**[notebook-master.chatmode.md](./notebook-master.chatmode.md)** — Advanced Jupyter notebook development with comprehensive data science workflows.

**[notebook-specialist.chatmode.md](./notebook-specialist.chatmode.md)** — Specialized notebook development for research and experimentation.

**[proto-notebook.chatmode.md](./proto-notebook.chatmode.md)** — Prototype notebook development for rapid experimentation.

**[proto-notebook-advanced.chatmode.md](./proto-notebook-advanced.chatmode.md)** — Advanced prototype notebook with enhanced capabilities.

### Planning & Context Management

**[plan.chatmode.md](./plan.chatmode.md)** — Strategic planning and project coordination specialist.

**[setup-context.chatmode.md](./setup-context.chatmode.md)** — Environment setup and context configuration specialist.

## Planning Documentation Directory

### **planification-agent/ (5 Documents)**

**[SCRIPT_CONSOLIDATION_PLAN.md](./planification-agent/SCRIPT_CONSOLIDATION_PLAN.md)** — Comprehensive script consolidation strategy and implementation plan.

**[implementation-priority-matrix.md](./planification-agent/implementation-priority-matrix.md)** — Priority matrix for feature implementation and development tasks.

**[script-optimization-review-plan.md](./planification-agent/script-optimization-review-plan.md)** — Detailed review plan for script optimization and maintenance.

**[src-improvements-plan.md](./planification-agent/src-improvements-plan.md)** — Source code improvement strategy and roadmap.

**[tests-results.md](./planification-agent/tests-results.md)** — Test execution results and quality metrics.

## Chatmode Structure

All chatmode files follow this standard structure:

```markdown
---
description: 'Brief description of the chatmode expertise'
tools: []
---

# Chatmode Title

You are an expert in [domain] with deep knowledge of [specific technologies].

## Core Expertise

- Primary area of focus
- Key technologies and frameworks
- Specialized knowledge domains

## Interaction Patterns

- How to approach problems
- Communication style preferences
- Workflow optimization strategies

## Context Awareness

- Project-specific knowledge
- Integration with memory bank
- Cross-chatmode collaboration
```

## How to Use Chatmodes

### Selecting a Chatmode

1. Open VS Code Copilot Chat
2. Type `@chatmode-name` or use command palette
3. The chatmode configures the conversation context
4. Receive domain-specific expertise and guidance

### Chatmode Switching

- Switch between chatmodes for different tasks
- Combine expertise across multiple domains
- Maintain context continuity across sessions

## Chatmode Categories by Purpose

### Technical Implementation

- **API Development**: api-architect
- **Frontend Development**: iterative-nextjs
- **SDK Development**: questrade-sdk-developer
- **Documentation**: tsdoc-typedoc

### Environment & Tooling

- **Editor Configuration**: vscode-helper
- **Environment Setup**: setup-context
- **Project Planning**: plan

### Data Science & Research

- **Advanced Analytics**: notebook-master
- **Experimentation**: notebook-specialist, proto-notebook
- **Rapid Prototyping**: proto-notebook-advanced

### Strategic & Management

- **Project Coordination**: main-expert
- **Planning**: plan (with planification-agent/ support)

## Best Practices

### Creating New Chatmodes

1. Define clear expertise domain and scope
2. Specify tool requirements and access patterns
3. Include context integration with memory bank
4. Test interaction patterns thoroughly
5. Document cross-chatmode collaboration

### Maintaining Chatmodes

1. Keep expertise current with technology evolution
2. Update tool configurations as capabilities expand
3. Ensure consistency with project standards
4. Validate interaction patterns regularly

## Cross-References

### Related Instructions

- [Chatmode Markdown Standards](../instructions/chatmode-markdown.instructions.md)
- [AI Agent Collaboration](../instructions/ai-instruction-creation.instructions.md)
- [Memory Bank Integration](../instructions/copilot-memory-bank.instructions.md)

### Memory Bank Integration

- Update [dependencies.md](../../memory-bank/dependencies.md) when adding chatmode dependencies
- Reference [systemPatterns.md](../../memory-bank/systemPatterns.md) for architectural guidance
- Follow [activeContext.md](../../memory-bank/activeContext.md) for current project focus

## Quality Assurance

All chatmode files must:

- [ ] Include proper front matter with description and tools
- [ ] Define clear expertise domain and scope
- [ ] Use consistent interaction patterns
- [ ] Follow markdown-lint strict mode compliance
- [ ] Integrate with project memory bank and standards
- [ ] Test successfully in VS Code Copilot environment

## Canonical Workflow Integration

### Recursive Output-Verified Playground Workflow

For development chatmodes, integrate this canonical procedure:

1. Build and run the current playground (e.g., `src/example.ts`)
2. Verify output in `.keys/example-sdk-demo.json` for correctness and completeness
3. Log the demonstration and output verification in the memory bank
4. For each code iteration, repeat steps 1–3, ensuring robust, reproducible, and agentic development
5. Reference this workflow in all chatmode/instructions for future agent sessions

**Purpose:** This recursive, output-verified workflow ensures every code change is validated by real output and that the process is remembered and referenced by all agents and chatmodes.

---

This sophisticated chatmode system enables specialized, context-aware conversations across all development domains in the polyvalent workspace, supporting TypeScript, Python, Next.js, data science, and comprehensive project management workflows.
