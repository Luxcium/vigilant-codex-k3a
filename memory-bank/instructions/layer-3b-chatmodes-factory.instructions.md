---
description: Layer 3B — Chat Modes Factory. Rules for *.chatmode.md files. Minimal modes that bind model + tools + behavior. Store modes under memory-bank/chatmodes/.
---

<!-- memory-bank/instructions/layer-3b-chatmodes-factory.instructions.md -->

# Layer 3B — Chat Modes Factory

Purpose. Modes are switches. They set model and tools, then defer to instructions. Keep mode text thin. Point to rules in `[Layer 3A](./layer-3a-custom-instructions-factory.instructions.md)` and reference prompts in `[Layer 3C](./layer-3c-prompt-files-factory.instructions.md)`.

Storage. Place actual mode files in `memory-bank/chatmodes/`. The present document stays in `memory-bank/instructions/`.

## Constraints
- Front-matter must include:
  - `description: <short>`
  - `tools: ['codebase', 'editFiles', 'fetch']`  ← exact
  - `model: GPT-5 (Preview)` **or** `model: GPT-5 mini (Preview)`  ← only these
- One `#` H1 in the mode file body. Prefer relative links for internal references; external links allowed when authoritative.

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

![Screenshot showing the Chat view, highlighting the chat mode dropdown list.](../chat/images/chat-modes/chat-mode-dropdown.png)

### Built-in chat modes

Chat in VS Code can operate in different modes, each optimized for a specific use case. You can change between the different chat modes at any time in the Chat view.

| Chat mode | Description |
|-----------|-------------|
| [Ask mode](https://raw.githubusercontent.com/microsoft/vscode-docs/refs/heads/main/docs/copilot/chat/chat-ask-mode.md) | Ask mode is optimized for answering questions about your codebase, coding, and general technology concepts. Use ask mode to understand how a piece of code works, brainstorm software design ideas, or explore new technologies. Open ask mode in [Stable](vscode://GitHub.Copilot-Chat/chat?mode=ask) \| [Insiders](vscode-insiders://GitHub.Copilot-Chat/chat?mode=ask). |
| [Edit mode](https://raw.githubusercontent.com/microsoft/vscode-docs/refs/heads/main/docs/copilot/chat/copilot-edits.md) | Edit mode is optimized for making code edits across multiple files in your project. VS Code directly applies the code changes in the editor, where you can review them in-place. Use edit mode for coding tasks when you have a good understanding of the changes that you want to make, and which files you want to edit. Open edit mode in [Stable](vscode://GitHub.Copilot-Chat/chat?mode=edit) \| [Insiders](vscode-insiders://GitHub.Copilot-Chat/chat?mode=edit). |
| [Agent mode](https://raw.githubusercontent.com/microsoft/vscode-docs/refs/heads/main/docs/copilot/chat/chat-agent-mode.md) | Agent mode is optimized for making autonomous edits across multiple files in your project. Use agent mode for coding tasks when you have a less well-defined task that might also require running terminal commands and tools. Open agent mode in [Stable](vscode://GitHub.Copilot-Chat/chat?mode=agent) \| [Insiders](vscode-insiders://GitHub.Copilot-Chat/chat?mode=agent). |

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

    ![Screenshot showing the Chat view, and Configure Chat menu, highlighting the Configure Chat button.](../images/customization/configure-chat-instructions.png)

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
