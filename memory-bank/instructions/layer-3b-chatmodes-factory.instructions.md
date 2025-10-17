---
description: Layer 3B — Chat Modes Factory. Rules for *.chatmode.md files. Minimal modes that bind model + tools + behavior. Store modes under memory-bank/chatmodes/.
---

<!-- memory-bank/instructions/layer-3b-chatmodes-factory.instructions.md -->

# Layer 3B — Chat Modes Factory

Purpose. Modes are switches. They set model and tools, then defer to instructions. Keep mode text thin. Point to rules in `[Layer 3A](./layer-3a-custom-instructions-factory.instructions.md)` and reference prompts in `[Layer 3C](./layer-3c-prompt-files-factory.instructions.md)`.

Storage. Place actual mode files in `memory-bank/chatmodes/`. The present document stays in `memory-bank/instructions/`.

## Process Summary

This factory follows five aligned stages that keep custom chat modes lean and compliant.

### Stage A: Constraint Definition
- **Purpose:** Lock core metadata so chat modes stay interoperable.
- **Actions:** Require front-matter description, sanctioned tool list, and approved models only.
- **Outcome:** Predictable headers that downstream agents can parse safely.

### Stage B: Authoring Blueprint
- **Purpose:** Describe the minimal body structure each mode must follow.
- **Actions:** Limit content to ≤200 words covering purpose, inputs, outputs, and boundaries; link supporting instructions.
- **Outcome:** Focused mode files that defer policy to shared instructions.

### Stage C: Bootstrap & Stewardship
- **Purpose:** Ensure directory presence and guardrail enforcement during creation.
- **Actions:** Create `memory-bank/chatmodes/` if absent, flag any attempt to alter existing model or tool clauses, factor repeats into instruction files.
- **Outcome:** Idempotent setup with shared text centralized.

### Stage D: Review Gate
- **Purpose:** Validate completeness and link integrity before adoption.
- **Actions:** Confirm compliant front-matter, explicit inputs/outputs/boundaries, and working relative links without duplication.
- **Outcome:** Audit-ready modes that pass memory bank lint expectations.

### Stage E: Runtime Adoption Guidance
- **Purpose:** Document formatting exclusions and VS Code operational usage.
- **Actions:** Keep `.chatmode.md` files out of Prettier, explain built-in vs custom modes, and outline editor workflows.
- **Outcome:** Smooth day-to-day usage with preserved structure and discoverability.

## Constraints
- Front-matter must include:
  - `description: <short>`
  - `tools: ['codebase', 'editFiles', 'fetch']`  ← exact
  - `model: GPT-5 (Preview)` **or** `model: GPT-5 mini (Preview)`  ← only these
- One top-level H1 in the mode file body. Prefer relative links for internal references; external links allowed when authoritative.

## Mode Authoring Procedure
- Path for mode file: `memory-bank/chatmodes/<name>.chatmode.md`
- Body ≤ 200 words. State:
  - Purpose.
  - Inputs expected.
  - Outputs format.
  - Hard boundaries (what the mode must not do).
- Link to instruction files in `memory-bank/instructions/` for detailed policy.

## Verify & Bootstrap
- Create `memory-bank/chatmodes/` if missing.
- Never change an existing mode's `tools` or `model` lines without explicit approval. Flag instead.
- Factor common text into an instructions file and link to it.

## Review Gate
- Front-matter present and compliant.
- Body minimal. Inputs/outputs/boundaries explicit.
- Links resolve. Prefer relative links internally; allow authoritative external links. Avoid duplicating instruction text.

## Exclusions

Even if we do not plan to use prettier for the time being, we exclude the chatmode files from formatting to avoid any accidental reformatting that could alter the intended structure or readability of these files.

```ignore
# Keep prompt and chatmode cards out of Prettier to preserve strict spacing/heading contracts, generate a .prettierignore file with the 2 files types below:
*.prompt.md
*.chatmode.md
```

## Use chat modes in VS Code

Chat modes are predefined configurations that enable you to tailor the chat behavior in Visual Studio Code for specific workflows or have chat assume a specific persona. VS Code comes with three built-in chat modes: **Ask**, **Edit**, and **Agent**. You can create custom chat modes for specialized workflows like planning features, conducting code reviews, or researching implementation options.

### Switch between chat modes

To switch between chat modes, open the Chat view (`kb(workbench.action.chat.open)`), and then select the desired mode from the chat mode dropdown list.

Screenshot: Chat view with the chat mode dropdown list highlighted.

### Built-in chat modes

Chat in VS Code can operate in different modes, each optimized for a specific use case. You can change between the different chat modes at any time in the Chat view.

| Chat mode | Description |
|-----------|-------------|
| Ask mode | Optimised for answering questions about the codebase, coding topics, and broader technology concepts. Use it to understand code, brainstorm designs, or explore new tools. |
| Edit mode | Optimised for making targeted code edits across multiple files with direct in-editor application once the desired changes are known. |
| Agent mode | Optimised for autonomous edits that may span multiple files and require tooling or command execution when task boundaries are less defined. |

### Custom chat modes

> [!NOTE]
> Custom chat modes are available as of VS Code release 1.101 and are currently in preview.

The built-in chat modes provide general-purpose configurations for chat in VS Code. For a more tailored chat experience, you can create your own chat modes.

Custom chat modes consist of a set of instructions and tools that are applied when you switch to that mode. For example, a "Plan" chat mode could include instructions for generating an implementation plan and only use read-only tools. By creating a custom chat mode, you can quickly switch to that specific configuration without having to manually select relevant tools and instructions each time.

Custom chat modes are defined in a `.chatmode.md` Markdown file, and can be stored in your workspace for others to use, or in your user profile, where you can reuse them across different workspaces.

You can reference instructions files and tools (sets) in your custom chat mode file.

#### Chat mode file structure

Chat mode files are Markdown files and use the `.chatmode.md` extension and have this structure:

* **Header** (mandatory in our projects): YAML frontmatter

- Nothing above frontmatter. First line is `---`.
- Allowed keys only:  
  - `description` — required. Explains what does the chatmode do and why/when to use it. Aids automated selection.  
  - `tools`, `model` — optional. Do not add unless explicitly requested. Preserve if present.
- Remove any other keys.
- Close with `---`, then exactly one blank line before the path/suggested path.

    * `description`: A brief description of the chat mode. This description is displayed as placeholder text in the chat input field and when you hover the mode in the chat mode dropdown list.
    * `tools`(do not alter, do not remove, do not add only the user can ask for changes in this section): A list of tool or tool set names that are available for this chat mode. This can include built-in tools, tool sets, MCP tools, or tools contributed by extensions. Use the **Configure Tools** action to select the tools from the list of available tools in your workspace.
    * `model`(optional - never add this field if missing, never remove if present): The AI model to use when running the prompt. If not specified, the currently selected model in model picker is used.

* **Body**: Chat mode details and instructions following our strict Markdown protocol

    This is where you provide specific prompts, guidelines, or any other relevant information that you want the AI to follow when in this chat mode. 

    Reference instructions files by using relative Markdown links. The chat mode instructions will complement whatever is specified in the chat prompt.

### Path marker
- After the blank just above the body, insert the canonical path comment:
  `<!-- memory-bank/chatmodes/<filename>.chatmode.md -->`
- Then exactly one blank line under.

### Body structure (strict)
1) Exactly one H1 title.  
2) Exactly one or maximum two paragraphs under the H1 (no lists, no headings).  
3) First H2 and then describe modality that ai agent must be opperating in while under this chatmode.

#### Chat mode file example

The following code snippet shows an example of a "Plan" chat mode file that generates an implementation plan and doesn't make any code edits. For more community-contributed examples, or to see the fullest example by fetching it from the [Awesome Copilot repository](https://raw.githubusercontent.com/github/awesome-copilot/32589ba72c2f094bce7ee3a6bddff93250d6c3a6/chatmodes/plan.chatmode.md).

```markdown
---
description: Generate an implementation plan for new features or refactoring existing code.
tools: ['codebase', 'fetch', 'findTestFiles', 'githubRepo', 'search', 'usages']
---
# Planning mode instructions
You are in planning mode. Your task is to generate an implementation plan for a new feature or for refactoring existing code.
Don't make any code edits, just generate a plan.

The plan consists of a Markdown document that describes the implementation plan, including the following sections:

* Overview: A brief description of the feature or refactoring task.
* Requirements: A list of requirements for the feature or refactoring task.
* Implementation Steps: A detailed list of steps to implement the feature or refactoring task.
* Testing: A list of tests that need to be implemented to verify the feature or refactoring task.
```

#### Create a chat mode

You can create a chat mode file in your workspace or user profile.

1. In the Chat view, select **Configure Chat** > **Modes**, and then select **Create new custom chat mode file**.

    Screenshot: Configure Chat menu showing the option to create a new custom chat mode file.

    Alternatively, use the **Chat: New Mode File** command in the Command Palette (`kb(workbench.action.showCommands)`).

1. Choose the location where the chat mode file should be created.

    * **Workspace**: By default, workspace chat mode files are stored in the `.github/chatmodes` folder of your workspace. Add more prompt folders for your workspace with the `setting(chat.modeFilesLocations)` setting.

    * **User profile**: User chat mode files are stored in the [current profile folder](https://raw.githubusercontent.com/microsoft/vscode-docs/refs/heads/main/docs/configure/profiles.md). You can sync your user chat mode files across multiple devices by using [Settings Sync](https://raw.githubusercontent.com/microsoft/vscode-docs/refs/heads/main/docs/configure/settings-sync.md).

1. Enter a name for the chat mode. This name is used in the chat mode dropdown list in the Chat view.

1. Provide the details for the chat mode in the newly created `.chatmode.md` file.

    * Provide the description and configure the list of available tools or tool sets in the Front Matter metadata.
    * Add instructions for the chat mode in the body of the file.

To edit and manage existing chat modes, in the Chat view, select **Configure Chat** > **Modes**, and then select select an existing chat mode from the list to modify it. Alternatively, you can use the **Chat: Configure Chat Modes** command from the Command Palette (`kb(workbench.action.showCommands)`).

### Related resources - Fetch and Seek

* [Get an overview of chat in VS Code](https://raw.githubusercontent.com/microsoft/vscode-docs/refs/heads/main/docs/copilot/chat/copilot-chat.md)
* [Customize AI with custom instructions](https://raw.githubusercontent.com/microsoft/vscode-docs/refs/heads/main/docs/copilot/customization/custom-instructions.md)
* [Create reusable prompt files](https://raw.githubusercontent.com/microsoft/vscode-docs/refs/heads/main/docs/copilot/customization/prompt-files.md)
* [Configure tools in chat](https://raw.githubusercontent.com/microsoft/vscode-docs/refs/heads/main/docs/copilot/chat/chat-agent-mode.md#agent-mode-tools)
