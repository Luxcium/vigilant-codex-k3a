---
applyTo: '**/*.prompt.md'
description: 'Standards for creating AI agent prompt files; covers triggers, task analysis, mode selection, and validation.'
---

# AI Agent Instructions: Creating \*.prompt.md Files On-Demand

## TRIGGER RECOGNITION

**You create a prompt file ONLY when the user explicitly requests:**

- "Create a prompt file for [task]"
- "Make a prompt for [workflow]"
- "Generate a .prompt.md that [does X]"
- "I need a reusable prompt to [accomplish Y]"
- "Setup a prompt file for [process]"

**DO NOT create prompt files when user asks for:**

- Direct code generation
- Immediate task execution
- One-time solutions
- Simple explanations

## INTENT ANALYSIS PROTOCOL

When user requests a prompt file, analyze:

### 1. TASK PATTERN IDENTIFICATION

```
Is this task:
├─ Repeatable? → Include ${input:variableName} variables
├─ Multi-step? → Use agent mode with process steps
├─ Transformative? → Use edit mode for code changes
└─ Informational? → Use ask mode for analysis
```

### 2. SCOPE DETERMINATION FOR CODEX CLI PROJECT

```
What does user want to automate:
├─ TypeScript development? → Focus on ts/tsx file generation
├─ Python development? → Include python module templates
├─ Notebook workflows? → Use notebook-specific variables
├─ NextJS components? → Web app structure templates
├─ Shell scripting? → Automation and build processes
└─ Project setup? → Init folder templates
```

### 3. CONTEXT REQUIREMENTS

```
What context will the prompt need:
├─ File references? → Use ${file}, ${workspaceFolder}
├─ User inputs? → Add ${input:name:description}
├─ Project type? → Reference .instructions.md files
├─ Dependencies? → Link memory-bank/dependencies.md
└─ Standards? → Reference coding standards files
```

## DECISION TREE: PROMPT CONSTRUCTION

### Step 1: Determine Mode

```yaml
IF task requires:
  - Multiple file operations (TypeScript modules, Python packages)
  - Running commands (npm install, pip install, shell scripts)
  - Complex workflows (project initialization, testing setup)
  → mode: 'agent'

ELSE IF task requires:
  - Modifying existing code (refactoring, adding features)
  - Direct file edits (configuration updates)
  - Code transformations (TypeScript to Python, etc.)
  → mode: 'edit'

ELSE:
  - Questions/planning (architecture decisions)
  - Analysis/review (code quality, performance)
  - Documentation (README updates, API docs)
  → mode: 'ask'
```

### Step 2: Select Tools for Codex CLI Context

Notebook workflows → ['codebase', 'filesystem']
NextJS projects → ['codebase', 'filesystem', 'terminal']
Shell scripting → ['filesystem', 'terminal']
Project analysis → ['codebase']
Dependency management → ['terminal', 'filesystem']
```

### Step 3: Structure Content Based on Task Type

#### Code Generation Prompts


## Requirements

- Use TypeScript with strict type checking
- Follow Airbnb style guide
- Include JSDoc comments for public APIs
- Reference [typescript-standards.instructions.md](../instructions/typescript-standards.instructions.md)

## Process
4. Add error handling and validation
5. Update dependencies.md if new dependencies added

## References

- Standards: [typescript-standards.instructions.md](../instructions/typescript-standards.instructions.md)
- Project structure: [file-organization.instructions.md](../prompts/file-organization.prompt.md)
```

#### Workflow Automation Prompts

```markdown
Your goal is to automate ${input:workflowName} for the Codex CLI project.

## Requirements

- Create idempotent scripts in scripts/ directory
- Use bash with proper error handling (set -euo pipefail)
- Update autonomous-state-manager.sh when completed
- Follow shell scripting best practices

## Process

1. Analyze current workflow requirements
2. Create automation script with validation
3. Test script for idempotency
4. Update project state automatically
5. Document usage in README.md
```

## CONTENT GENERATION RULES

### Variable Usage Decision Logic

```yaml
Use Variables When:
  componentName: User will specify different names → ${input:componentName}
  projectType: Multiple project types → ${input:projectType:typescript|python|nextjs}
  outputPath: User chooses location → ${input:outputPath:Enter target directory}

Don't Use Variables For:
  Fixed standards: Always reference typescript-standards.instructions.md
  Project structure: Always use established directory patterns
  Quality requirements: Always enforce strict typing, testing
  - memory-bank/dependencies.md for dependency tracking
  - init/ templates for project bootstrapping

Conditionally Reference:
  - External APIs only if task requires integration
  - Third-party libraries only if task needs specific packages
  - Documentation only if task involves docs generation
```

- [ ] Task is truly repeatable (not one-time)
- [ ] Mode selection aligns with task complexity
- [ ] Tool permissions match requirements
- [ ] Variables cover all changeable elements
- [ ] Success criteria are measurable
- [ ] Follows Codex CLI project standards


### File Naming

```
Format: {domain}-{purpose}.prompt.md
- nextjs-setup.prompt.md
- shell-automation.prompt.md
```

### Required Sections

```markdown
tools: ['relevant', 'tools']
description: 'Brief task description'
---
Your goal is to [specific outcome].

## Requirements

- [Specific technical requirements]
- [Quality standards]

## References


- [ ] [Measurable outcomes]
```

## CODEX CLI PROJECT CONTEXT

### Supported Technology Stack

- **TypeScript**: Strict typing, Airbnb style guide
- **Python**: PEP 8, type hints, virtual environments
- **NextJS**: Web applications when UI needed
- **Shell Scripting**: Bash automation in scripts/
- **Jupyter Notebooks**: ML/data science workflows

### Project-Specific Patterns

- All files created via scripts (idempotent)
- Memory bank integration required
- Autonomous state management via autonomous-state-manager.sh
- Cross-referencing between prompt and instruction files

## EXAMPLE RECOGNITION PATTERNS

**User Request**: "Create a prompt for generating TypeScript interfaces"
→ **Analysis**: Repeatable code generation task
→ **Mode**: agent
→ **Tools**: ['codebase', 'filesystem']
→ **File**: typescript-interface.prompt.md

**User Request**: "I need a prompt to refactor existing Python code"
→ **Analysis**: Code transformation task
→ **Mode**: edit
→ **Tools**: ['codebase']
→ **File**: python-refactor.prompt.md

**User Request**: "Make a prompt for project setup"
→ **Analysis**: Complex multi-step workflow
→ **Mode**: agent
→ **Tools**: ['codebase', 'filesystem', 'terminal']
→ **File**: project-setup.prompt.md

## CRITICAL REMINDERS

1. **Never assume** – If unclear about scope, ask clarifying questions
2. **Always consider reusability** – Add variables for all changeable values
3. **Test mentally** – Ensure another AI could execute it autonomously
4. **Keep focused** – One prompt = one clear, specific purpose
5. **Update state** – Prompt creation should trigger autonomous-state-manager.sh
6. **Follow standards** – All generated content must follow Codex CLI coding standards

## Questrade Example Playground Context (2025-07-29)

- The `src/example.ts` file is now the canonical playground for AI agent and user collaboration on authentication and account-fetching features.
- All configuration and output are centralized as constants at the top of the file.
- All logic is split into pure, composable functions.
- Only `.keys/example-sdk-demo.json` is written for output; no split or duplicate files.
- This file is labeled as an intermediate refactor phase, preparing for future dependency injection and SDK integration.
- When creating or updating prompts for agent workflows, reference this playground as the standard for isolated feature prototyping.
- Do not explain standard TypeScript, Node.js, or Questrade API details in prompts—focus on project-specific context and agent behaviors.


## Verification

- `markdownlint --strict`
- `scripts/verify-all.sh`
