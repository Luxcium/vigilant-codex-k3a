---
description: Layer 3a — Custom Instructions Factory. Canonical authoring rules for *.instructions.md. Single source of truth, short atomic rules, no external links.
---

<!-- memory-bank/instructions/layer-3a-custom-instructions-factory.instructions.md -->

# Layer 3a — Custom Instructions Factory

Purpose. Define durable guardrails for all AI runs. Store every instructions file in `memory-bank/instructions/`. Keep rules atomic and reusable. Do not duplicate text; link relatively.

Scope. Creation, verification, and evolution of `*.instructions.md`. Front-matter `description` is mandatory. `applyTo` is optional and **immutable** once present. Do not add `applyTo` without explicit glob requests from your human user.

The layer 2 gave you a place to move the instructions files used to generate this project so far. The layer 3a gives you the rules to author these files, for the time being just include the 2 files if they are missing and if you can locate them in the context where you got this files from then also gather the [first layer instructions](../../memory-bank/instructions/layer-1-verify-and-bootstrap.instructions.md) and the [second layer instructions](../../memory-bank/instructions/layer-2-verify-and-bootstrap.instructions.md) so we can refer to them later, you will have to commit all changes including the 2 additions in the `memory-bank/instructions/` folder and any other previous changes not commited until this point in time, an the commit must include any changes made before enacting duties included here in layer 3a.

## Operating Principles

- One idea per bullet. Keep language testable.
- Prefer linking to existing rules over repeating.
- Idempotent changes. No overwrites. Merge-append only.
- Relative links only. No external URLs. No placeholders.

## Authoring Procedure
- Path: `memory-bank/instructions/<topic>.instructions.md`
- Front-matter:
  - `description: <concrete what/why>`
  - `applyTo:` omit unless provided; if present, never change.
- Body:
  - Bulleted rules. Avoid long narratives.
  - "If X → Do Y" format for conditions.
  - Link to sibling rules like `[Layer 3B](./layer-3b-chatmodes-factory.instructions.md)` and `[Layer 3C](./layer-3c-prompt-files-factory.instructions.md)`.
- Size target: 200–400 words. Split large topics.

## Verify & Bootstrap
- Create missing file under `memory-bank/instructions/` only.
- If overlap exists, replace duplication with a relative link.
- Do not change existing `applyTo`.
- Log brief changes in `memory-bank/progress.md`.

## Review Gate
- `description` present and concrete.
- No new or modified `applyTo` without explicit approval.
- All links are relative and resolve.
- No external links. No duplication. Within size target.

## Use custom instructions in VS Code

Custom instructions enable you to define common guidelines and rules that automatically influence how AI generates code and handles other development tasks. Instead of manually including context in every chat prompt, specify custom instructions in a Markdown file to ensure consistent AI responses that align with your coding practices and project requirements.

You can configure custom instructions to apply automatically to all chat requests or to specific files only. Alternatively, you can manually attach custom instructions to a specific chat prompt.

> [!NOTE]
> Custom instructions are not taken into account for [code completions](https://raw.githubusercontent.com/microsoft/vscode-docs/refs/heads/main/docs/copilot/ai-powered-suggestions.md) as you type in the editor.

### Type of instructions files

Only for your information and as a reminder, VS Code supports two types of Markdown-based instructions files, we use both in our projects:

* A single `.github/copilot-instructions.md` file
  * Automatically applies to all chat requests in the workspace
  * Stored within the workspace

* One or more [`.instructions.md`](#use-instructions-files) files
  * Created for specific tasks or files
  * Use `applyTo` frontmatter to define what files the instructions should be applied to
  * Stored in the workspace or user profile

Whitespace between instructions is ignored, so the instructions can be written as a single paragraph, each on a new line, or separated by blank lines for legibility.

Reference specific context, such as files or URLs, in your instructions by using Markdown links.

### Custom instructions examples

The following examples demonstrate how to use custom instructions. For more community-contributed examples, see the [Awesome Copilot repository](https://github.com/github/awesome-copilot/tree/main).

Example: General coding guidelines

```markdown
---
applyTo: "**"
---
# Project general coding standards

## Naming Conventions
- Use PascalCase for component names, interfaces, and type aliases
- Use camelCase for variables, functions, and methods
- Prefix private class members with underscore (_)
- Use ALL_CAPS for constants

## Error Handling
- Use try/catch blocks for async operations
- Implement proper error boundaries in React components
- Always log errors with contextual information
```

Example: Language-specific coding guidelines

Notice how these instructions reference the general coding guidelines file. You can separate the instructions into multiple files to keep them organized and focused on specific topics.

```markdown
---
applyTo: "**/*.ts,**/*.tsx"
---
# Project coding standards for TypeScript and React

Apply the [general coding guidelines](./general-coding.instructions.md) to all code.

## TypeScript Guidelines
- Use TypeScript for all new code
- Follow functional programming principles where possible
- Use interfaces for data structures and type definitions
- Prefer immutable data (const, readonly)
- Use optional chaining (?.) and nullish coalescing (??) operators

## React Guidelines
- Use functional components with hooks
- Follow the React hooks rules (no conditional hooks)
- Use React.FC type for components with children
- Keep components small and focused
- Use CSS modules for component styling
```

Example: Documentation writing guidelines

You can create instructions files for different types of tasks, including non-development activities like writing documentation.

```markdown
---
applyTo: "docs/**/*.md"
---
# Project documentation writing guidelines

## General Guidelines
- Write clear and concise documentation.
- Use consistent terminology and style.
- Include code examples where applicable.

## Grammar
* Use present tense verbs (is, open) instead of past tense (was, opened).
* Write factual statements and direct commands. Avoid hypotheticals like "could" or "would".
* Use active voice where the subject performs the action.
* Write in second person (you) to speak directly to readers.

## Markdown Guidelines
- Use headings to organize content.
- Use bullet points for lists.
- Include links to related resources.
- Use code blocks for code snippets.
```

### Use a copilot-instructions file

Define your custom instructions in a single `.github/copilot-instructions.md` Markdown file in the root of your workspace. VS Code applies the instructions in this file automatically to all chat requests within this workspace.

To use a `.github/copilot-instructions.md` file:

1. Enable the `setting(github.copilot.chat.codeGeneration.useInstructionFiles)` setting.

1. Create a `.github/copilot-instructions.md` file at the root of your workspace. If needed, create a `.github` directory first.

1. Describe your instructions by using natural language and in Markdown format.

> [!NOTE]
> GitHub Copilot in Visual Studio and GitHub.com also detect the `.github/copilot-instructions.md` file. If you have a workspace that you use in both VS Code and Visual Studio, you can use the same file to define custom instructions for both editors.

### Use `.instructions.md` files

Instead of using a single instructions file that applies to all chat requests, you can create multiple `.instructions.md` files that apply to specific file types or tasks. For example, you can create instructions files for different programming languages, frameworks, or project types.

By using the `applyTo` frontmatter property in the instructions file header, you can specify a glob pattern to define which files the instructions should be applied to automatically. Instructions files are used when creating or modifying files and are typically not applied for read operations.

Alternatively, you can manually attach an instructions file to a specific chat prompt by using the **Add Context** > **Instructions** option in the Chat view.

* **Workspace instructions files**: are only available within the workspace and are stored in the `.github/instructions` folder of the workspace.
* **User instructions files**: are available across multiple workspaces and are stored in the current [VS Code profile](https://raw.githubusercontent.com/microsoft/vscode-docs/refs/heads/main/docs/configure/profiles.md).

#### Instructions file format

* **Header** (mandatory in our projects): YAML frontmatter

- Nothing above frontmatter. First line is `---`.
- Allowed keys only:  
  - `description` — required. Explains what does the instruction do and why/when to use it. Aids automated selection.  
  - `applyTo` — optional. Do not add unless explicitly requested. Preserve if present.
- Remove any other keys.
- Close with `---`, then exactly one blank line before the path/suggested path.

### Path marker
- After the blank line, insert the canonical path comment:
  `<!-- memory-bank/instructions/<filename>.instructions.md -->`
- Then exactly one blank line.

### Body structure (strict)
1) Exactly one H1 title.  
2) Exactly one or maximum two paragraphs under the H1 (no lists, no headings).  
3) First H2 is the Slash Command block:
Instructions files use the `.instructions.md` extension and have this structure:

Example:

```markdown
---
applyTo: "**/*.py"
---
# Project coding standards for Python
- Follow the PEP 8 style guide for Python.
- Always prioritize readability and clarity.
- Write clear and concise comments for each function.
- Ensure functions have descriptive names and include type hints.
- Maintain proper indentation (use 4 spaces for each level of indentation).
```

#### Create an 'instructions' file

When you create an `.instructions.md` file, in our projects remember, you will store them in the `memory-bank/instructions/` folder of our workspace. Workspace instructions files apply only to that workspace, and must be commited along with the rest of the project.

To create an 'instructions' file:

1. Enter a meaningful name for your instructions file.

2. Author the custom instructions by using our strict Markdown formatting rules.
    > [!IMPORTANT]
    > In our projects the instructions files should always have a description in the header.

    Only the human user can specify the `applyTo` metadata property in the header to configure when the instructions should be applied automatically. As the ai agent you should never modify this property, neither remove it when there or removing it if present. For example, the user can specify `applyTo: "**/*.ts,**/*.tsx"` to apply the instructions only to TypeScript files, or ask you explicitly to do something.

    To reference additional workspace files, use Markdown links (`[index]\(../index.ts)`). (without the escaping \\)

## Specify custom instructions in settings

When the user asks it clearly and explicitly, you can configure custom instructions for specialized scenarios by using VS Code workspace settings in `.vscode/settings.json`.

| Type of instruction | Setting name |
|---------------------|--------------|
| Code review | `setting(github.copilot.chat.reviewSelection.instructions)` |
| Commit message generation | `setting(github.copilot.chat.commitMessageGeneration.instructions)` |
| Pull request title and description generation | `setting(github.copilot.chat.pullRequestDescriptionGeneration.instructions)` |
| Code generation (deprecated)* | `setting(github.copilot.chat.codeGeneration.instructions)` |
| Test generation (deprecated)* | `setting(github.copilot.chat.testGeneration.instructions)` |

_\* The `codeGeneration` and `testGeneration` settings are deprecated as of VS Code 1.102. We recommend that you use instructions files instead (`.github/copilot-instructions.md` or `*.instructions.md`)._

You can define the custom instructions as text in the settings value (`text` property) or reference an external file (`file` property) in your workspace.

The following code snippet shows how to define a set of instructions in the `settings.json` file.

```json
{
    "github.copilot.chat.pullRequestDescriptionGeneration.instructions": [
        { "text": "Always include a list of key changes." }
    ],
    "github.copilot.chat.reviewSelection.instructions": [
        { "file": "memory-bank/instructions/backend-review-guidelines.instructions.md" },
        { "file": "memory-bank/instructions/frontend-review-guidelines.instructions.md" }
    ]
}
```

### Tips for defining custom instructions

* Keep your instructions short and self-contained. Each instruction should be a single, simple statement. If you need to provide multiple pieces of information, use multiple instructions.

* For task or language-specific instructions, use multiple `*.instructions.md` files per topic and apply them selectively by using the `applyTo` property.

* Store project-specific instructions in your workspace to share them with other team members and include them in your version control.

* Reuse and reference instructions files in your [prompt files, as described in our layer 3c](./layer-3c-prompt-files-factory.instructions.md) and [chat modes, as described in our layer 3b](./layer-3b-chatmodes-factory.instructions.md) to keep them clean and focused, remember to avoid duplicating instructions.

### Related content - Fetch and Seek More

* [Customize AI responses overview](https://raw.githubusercontent.com/microsoft/vscode-docs/refs/heads/main/docs/copilot/customization/overview.md)
* [Create reusable prompt files](https://raw.githubusercontent.com/microsoft/vscode-docs/refs/heads/main/docs/copilot/customization/prompt-files.md)
* [Create custom chat modes](https://raw.githubusercontent.com/microsoft/vscode-docs/refs/heads/main/docs/copilot/customization/custom-chat-modes.md)
* [Get started with chat in VS Code](https://raw.githubusercontent.com/microsoft/vscode-docs/refs/heads/main/docs/copilot/chat/copilot-chat.md)
* [Configure tools in chat](https://raw.githubusercontent.com/microsoft/vscode-docs/refs/heads/main/docs/copilot/chat/chat-agent-mode.md#agent-mode-tools)
* [Community contributed instructions, prompts, and chat modes](https://github.com/github/awesome-copilot)
