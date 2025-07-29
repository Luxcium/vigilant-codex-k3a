---
applyTo: '**/*.instructions.md'
description: 'Standards for creating AI agent instruction files; covers triggers, scope, naming, and validation.'
---

# AI Agent Instructions: Creating \*.instructions.md Files On-Demand

## 1. TRIGGER RECOGNITION

**Create an instruction file ONLY when the user explicitly requests to define standards, rules, or guidelines:**

- "Create instructions for [coding standard/project practice]"
- "Make an instruction file for [guidelines for X language/framework]"
- "Generate .instructions.md for [rules about Y]"
- "Setup coding instructions for [TypeScript/Python/NextJS/Shell]"
- "Define project-wide instructions for [file organization/security/testing]"

**DO NOT create instruction files when user asks for:**

- Task automation or specific actions (use `.prompt.md` files instead)
- One-time solutions or direct code generation
- Process workflows or step-by-step task execution

## 2. FUNDAMENTAL DISTINCTION: INSTRUCTIONS VS. PROMPTS

**Instructions (`*.instructions.md`) = Persistent, Passive Rules**

- **Purpose**: Define _HOW_ code should be written, _HOW_ projects should be structured, or _WHAT_ standards to follow.
- **Behavior**: Applied automatically in the background by AI agents (like VS Code Copilot) based on the `applyTo` pattern.
- **Effect**: Modify AI behavior for all relevant requests, ensuring consistency and adherence to standards.
- **Nature**: Declarative, establishing a baseline for AI-assisted development.
- **Key Recognition**: User wants to establish **STANDARDS**, not perform **TASKS**.

**Prompts (`*.prompt.md`) = Active, Executable Tasks**

- **Purpose**: Define _WHAT_ specific task to perform.
- **Behavior**: Manually invoked by the user or other scripts.
- **Effect**: Execute a defined workflow, generate code, or perform an action.
- **Nature**: Imperative, for on-demand task execution.

## 3. INTENT ANALYSIS PROTOCOL (FOR INSTRUCTION FILES)

When a user requests an instruction file, analyze the following:

### 3.1. SCOPE IDENTIFICATION

**What aspect needs standardization?**

- **Coding Style**: Naming conventions, formatting, language features (e.g., TypeScript strict mode, Python type hints).
- **Architectural Patterns**: Directory structure, component design, state management (e.g., NextJS page structure, Python module organization).
- **Security Practices**: Input validation, authentication, data handling.
- **Testing Approach**: Test structure, coverage requirements, mocking strategies.
- **Documentation Format**: JSDoc/Docstring conventions, README structure.
- **File Organization**: Rules for placing specific file types (scripts, notebooks, source code).
- **Dependency Management**: Rules for adding/updating dependencies.

### 3.2. APPLICATION RANGE (DETERMINING `applyTo`)

**Where should these rules apply?**

- **Entire Project**: `applyTo: "**"` (e.g., general security rules).
- **Specific Language(s)**: `applyTo: "**/*.{ts,tsx}"`, `applyTo: "**/*.py"`.
- **Specific Directories**: `applyTo: "scripts/**"`, `applyTo: "src/components/**"`.
- **Framework-Specific Files**: `applyTo: "**/pages/**/*.tsx"` (for NextJS pages).
- **Combination**: `applyTo: ["src/**/*.ts", "!src/**/*.test.ts"]` (all TS source files, excluding tests).

### 3.3. RULE PERMANENCE & GRANULARITY

**How enduring and detailed should these rules be?**

- **Core Instructions**: Fundamental rules applying to most/all code generation (e.g., `typescript-standards.instructions.md`).
- **Targeted Rules**: Specific to certain file types or project areas (e.g., `python-notebook-standards.instructions.md`).
- **Project Phase**: Potentially, though less common for our CLI (e.g., rules for initial setup vs. maintenance).

## 4. DECISION TREE: INSTRUCTION FILE CONSTRUCTION

### Step 1: Determine Primary Scope & Filename

- **Global Project Standards**: `file-organization.instructions.md`, `security-global.instructions.md`.
- **Language-Specific**: `typescript-standards.instructions.md`, `python-standards.instructions.md`, `shell-scripting.instructions.md`.
- **Framework-Specific**: `nextjs-best-practices.instructions.md`, `jupyter-notebook-guidelines.instructions.md`.
- **Domain/Concern-Specific**: `api-design.instructions.md`, `testing-guidelines.instructions.md`, `documentation-standards.instructions.md`.
- **File Naming Convention**: `{domain-or-language}-{purpose}.instructions.md` (e.g., `typescript-testing.instructions.md`).

### Step 2: Define `applyTo` Pattern(s)

- Based on **Section 3.2 Application Range**.
- Be as specific as necessary. Multiple patterns can be used in an array if needed.
- Example for TypeScript source files in `src` and `web`:
  ```yaml
  ---
  applyTo: ['src/**/*.ts', 'web/**/*.ts', '!**/*.test.ts', '!**/*.spec.ts']
  ---
  ```

### Step 3: Structure Content by Instruction Type

- Use clear headings (Markdown `#`, `##`, `###`).
- Use bullet points for individual rules.
- Provide examples where ambiguity might arise.
- Refer to existing project files or `init/` templates as good examples if applicable.

Use alerts to indicate critical sections or important notes.

```markdown
> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.
```

**Example: Coding Style Standards (e.g., for Python)**

```markdown
---
applyTo: '**/*.py'
---

# Python Coding Standards (PEP 8 Focus)

## Naming Conventions

- Use `snake_case` for functions, methods, variables, and module names.
- Use `PascalCase` for class names.
- Use `UPPER_SNAKE_CASE` for constants.

## Type Hinting

- All function parameters and return types MUST be type-hinted.
- Use `from typing import ...` for complex types.

## Docstrings

- All public modules, classes, functions, and methods MUST have docstrings (Google style preferred).
```

**Example: Architectural Patterns (e.g., for NextJS)**

```markdown
---
applyTo: 'web/**'
---

# Next.js Architectural Guidelines

## Page Structure

- Place pages in `web/pages/`.
- Use dynamic routes for variable paths (e.g., `web/pages/posts/[id].tsx`).

## Component Organization

- Store reusable components in `web/components/`.
- Group components by feature or domain in subdirectories.
```

## 5. CONTENT GENERATION RULES

### Rule Formulation Logic

- **Be Prescriptive**: Use imperative mood (e.g., "Use snake_case", "Must include type hints").
- **Be Specific**: Avoid vague terms. Instead of "Write good comments," say "All public functions must have JSDoc comments explaining parameters, return value, and purpose."
- **Provide Rationale (Optional but helpful)**: Briefly explain _why_ a rule exists if it's not obvious.
- **Cite Sources**: If adhering to external standards (e.g., PEP 8, Airbnb Style Guide), mention it.

### Specificity & Clarity

- **WHEN**: Clearly define the conditions under which a rule applies (often handled by `applyTo` and section context).
- **WHAT**: State exactly what to do or not to do.
- **EXCEPTIONS**: If there are known exceptions, document them clearly.

## 6. INSTRUCTION PATTERNS FOR CODEX CLI

### Language/Framework Standards (Primary Use Case)

- `typescript-standards.instructions.md`
- `python-standards.instructions.md`
- `nextjs-development.instructions.md`
- `shell-scripting-rules.instructions.md`
- `python-notebook-standards.instructions.md`

### Cross-Cutting Concerns

- `file-organization.instructions.md` (already exists, ensure it's comprehensive)
- `security-guidelines.instructions.md`
- `testing-standards.instructions.md`
- `documentation-conventions.instructions.md`

### Domain-Specific (If project evolves to have clear domains)

- E.g., `cli-command-design.instructions.md`

## 7. HIERARCHY AND REFERENCES

- **Linking**: Instruction files can reference others. This is useful for building upon base standards.

  ```markdown
  # TypeScript API Development Standards

  ## applyTo: "src/api/\*_/_.ts"

  Follow all rules in [typescript-standards.instructions.md](./typescript-standards.instructions.md).

  ## Additional API-Specific Rules

  - All API responses must be typed using interfaces in `src/types/api/`.
  ```

- **Precedence**: More specific `applyTo` patterns generally override broader ones. Within a file, later rules might refine or override earlier ones if they target the same aspect (though this should be minimized for clarity).

## 8. VALIDATION CHECKLIST (Before Finalizing)

- [ ] **`applyTo` Correctness**: Does the glob pattern accurately target the intended files/folders?
- [ ] **Clarity & Actionability**: Are rules unambiguous and easy for an AI (and human) to follow?
- [ ] **No Conflicts**: Do any rules contradict each other or established project practices?
- [ ] **Completeness (for scope)**: Does it cover the key aspects the user wanted to standardize?
- [ ] **Imperative Language**: Are rules stated as directives?
- [ ] **Alignment with Codex CLI**: Do rules fit TypeScript, Python, NextJS, Shell, Notebook focus?
- [ ] **Maintainability**: Are rules stable and not overly prescriptive to hinder development?

## 9. OUTPUT FORMAT REQUIREMENTS

- **File Naming**: `{domain-or-language}-{purpose}.instructions.md` (e.g., `python-formatting.instructions.md`).
- **Front Matter (YAML)**:
  ```yaml
  ---
  applyTo: 'glob-pattern' # MANDATORY. Can be a string or an array of strings.
  # Optional: title: "Descriptive Title for VS Code UI"
  # Optional: description: "More details about what these instructions cover."
  ---
  ```
- **Content Structure**: Markdown.
  1.  Main Title (`# Page Title`).
  2.  Major Sections (`## Category`).
  3.  Specific Rules (bullet points).
  4.  Code examples (` `) where beneficial.

## 10. CRITICAL DECISION POINTS (Recap)

- **Instructions vs. Prompts**: Is the user defining a **standard/rule** (→ instructions) or a **task/action** (→ prompt)?
- **Scope (`applyTo`)**: Critical for ensuring rules apply correctly. Test glob patterns if unsure.
- **Content Depth**: Detailed enough to be clear, concise enough to be usable.

## 11. ERROR PREVENTION

- **Avoid Task Lists**: Instructions are not for sequences of actions.
- **Avoid Vagueness**: Rules must be concrete.
- **Check for Conflicts**: Especially with language defaults or other instruction files.
- **Mandatory `applyTo`**: An instruction file without `applyTo` is ineffective.

## 12. FINAL REMINDERS FOR AI AGENT

1.  **Instructions are PASSIVE**: They modify your background behavior for relevant tasks.
2.  **Be PRESCRIPTIVE and CLEAR**: Use directive language.
3.  **SCOPE is KEY**: The `applyTo` pattern is crucial.
4.  **MENTALLY TEST**: If you (as an AI) were to follow these rules, what code/structure would result? Does it match the user's intent?
5.  **MAINTAINABILITY**: Rules should be foundational and relatively stable.
6.  **Update `autonomous-state-manager.sh`**: After creating/updating an instruction file, ensure the project state reflects this change, potentially by calling the state manager script. (This part is for the script that _calls_ you, or for you if you have terminal access to update project state).

Define common guidelines or rules for tasks like generating code, performing code reviews, or generating commit messages. Custom instructions describe the conditions in which the AI should perform operate (how a task should be done).
Specify coding practices, preferred technologies, or project requirements, so generated code follows your standards.
Set rules for code reviews, such as checking for security vulnerabilities or performance issues.
Provide instructions for generating commit messages or pull request titles and descriptions.

## Questrade Example Playground Context (2025-07-29)

- The `src/example.ts` file is the canonical playground for AI agent and user collaboration on authentication and account-fetching features.
- All configuration and output are centralized as constants at the top of the file.
- All logic is split into pure, composable functions.
- Only `.keys/example-sdk-demo.json` is written for output; no split or duplicate files.
- This file is labeled as an intermediate refactor phase, preparing for future dependency injection and SDK integration.
- When creating or updating instructions for agent workflows, reference this playground as the standard for isolated feature prototyping.
- Do not explain standard TypeScript, Node.js, or Questrade API details in instructions—focus on project-specific context and agent behaviors.
