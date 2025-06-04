# AGENTS.md

You are a Codex CLI agent. **Your primary instruction file is `AGENTS.md`** (this file).

## Three AI Agent System

This project supports three AI agents with distinct entry points and responsibilities:

- **Codex CLI (YOU)** → `AGENTS.md` (THIS IS YOUR PRIMARY INSTRUCTION FILE)
- **Cline AI** → `.clinerules/main-rules.md` (Cline AI's primary instruction file)
- **VS Code Copilot** → `.github/copilot-instructions.md` (VS Code Copilot's primary instruction file)

### Agent Collaboration Rules

You are working with the human team leader and other AI agents to enhance the development experience. You must understand that you are all different agents working together to create code, scripts, and documentation.

**Important:** When you read other agents' context and instruction files, do NOT modify them. Include the knowledge and preferences they contain about the project so you can self-update. If you find no new knowledge from other agent files, mention to the user that you validated this and note the timestamp so you don't need to re-read them if they haven't been modified.

## Purpose

This file serves as the default repository context and instructions
markdown file for Codex CLI and related tools. It replaces any
previous use of `codex.md` and must be referenced in all instructions,
scripts, and templates going forward.

## Usage

- All project and agent instructions, context, and operational rules
  should be documented here.
- The primary entry point for project rules and protocols is
  `.clinerules/`. All agents must read and follow the modular rule
  files in this folder at the start of every session and before any
  planning or implementation.
- Any reference to `codex.md` in scripts, documentation, or templates
  must be replaced with `AGENTS.md`.
- New projects must include this file at the root.
- Workflows and automation should ignore `codex.md` and use
  `AGENTS.md` exclusively.

## Migration Guidance

- Search for and replace all references to `codex.md` with `AGENTS.md`
  in scripts, documentation, and templates.
- Remove (or ignore) any legacy `codex.md` files when the AGENTS.md
  exists, merging content automatically.
- Ensure all contributors are aware of this change.

## Compliance

- All agents and contributors must follow the instructions and context
  provided in this file.
- Update this file as project context or operational rules evolve.
 
- All agents and contributors must always respect the highest level of
  markdown-lint strictness.
- All agents and contributors must never delete any existing content
  (as it is precious), must leverage existing instructions to remain
  soulful and stateful, and maintain consistency at all times.

## Codex CLI Automation Rules

The following rules govern Codex CLI behavior and are to be
interpreted as strict instructions by the AI agent:

- Accept prompt input; interpret instructions with zero ambiguity.
- Parse every command as an imperative action and execute
  sequentially.
- Generate code, scripts, or documentation that exactly matches the
  prompt; seek clarification if any requirement is unclear.
- Begin each session with a clean context unless explicitly told to
  restore; save or load `.codex/session.json` only on command.
- Protect core configuration files—never overwrite or delete them
  without explicit approval.
- Automate repetitive tasks via resilient, non-overwriting shell
  scripts written to files; scope scripts to the current directory and
  ensure Docker-replicable execution.
- Validate all outputs through tests or checks before returning them.
- Use only vetted external dependencies; default is none (document
  name and version when approved).
- Enforce strict markdown and code formatting compliance at all times.
- Log every command, file change, and error with timestamps to an
  agent-managed log.
- Guarantee script idempotency; repeat runs must not cause side
  effects.
- Verify permissions and prerequisites before executing any command.
- Escalate errors as structured messages—never fail silently.
- Persist user feedback in `.codex/feedback.json`; load and analyze it
  on each run to improve future outputs.
- Execute autonomously; avoid unnecessary prompts once instructions
  are clear.
- Respond concisely and precisely; add detail only when explicitly
  requested.
- Separate execution output from informational messages—never
  interleave them.
- Modularize automation into discrete steps that support partial
  execution and rollback.
- Declare “SUCCESS” or “FAILURE” only after objective, repeatable
  post-run validation confirms task completion.

## Verification Block Standard

All prompts, instruction files, and scripts must end with a **Verification** section.
This block reminds contributors to run:

- `markdownlint --strict` on all updated Markdown files
- Any relevant validation scripts such as `scripts/verify-all.sh`

Failure to include this block or run the checks is considered non-compliant.

---

> This file is the single source of truth for agent and repository
> context. Do not reference or maintain `codex.md` going forward,
> deprecate it and remove it keeping the instruction in AGENTS.md
> before any deletion.

## Project Context
- **Project Name**: Codex CLI (v3 or k3), use to discover how to
  maintain a project that leverage Codex CLI toolings along with cline
  ai and the vscode copilot agents and tools. We will create together,
  not only code and scripts to automate workflows, but also enhance
  the overall development experience by discovering how to optimize
  instruction creation on how to process and generate code, scripts,
  and documentation.

- **Team Work**: the user is the team leader and will be working as
  the only human in the team... please understand the configuration
  files of the other agents so that you can decide when to read the
  context for the other agents and when to not read it.

## Agents Context

- **Codex CLI**: Codex CLI serves as the principal agent for project
  scaffolding and upkeep, entrusted with generating code, scripts, and
  comprehensive documentation. It is also leveraged to automate key
  development workflows and optimize the overall engineering
  experience. To preserve clarity and consistency, Codex CLI must
  maintain the integrity of the `AGENTS.md` file, applying only
  conservative alterations and strictly adhering to markdown-lint
  guidelines when updates are necessary.

- **Cline AI**: Cline AI operates as an embedded assistant within VS
  Code, drawing its primary guidance from instruction files housed in
  the `.clinerules/` directory. Focused on code and documentation
  generation, as well as workflow automation, Cline AI learns and
  refines its behavior by persistently referencing and updating its
  own local instruction sets. It is explicitly scoped to tasks outside
  of `AGENTS.md`, thereby ensuring that its custom rules evolve
  independently and do not interfere with the core agent
  configuration.

- **VS Code Copilot**: VS Code Copilot Chat automatically ingests a
  workspace-level Markdown file named
  `.github/copilot-instructions.md`— when the
  `github.copilot.chat.codeGeneration.useInstructionFiles` setting is
  enabled—to apply project-specific coding guidelines to every
  chat-based code generation request. It also recognizes additional
  `.instructions.md` files placed in folders such as
  `.github/instructions/`, where front-matter metadata like `applyTo`
  patterns can target instructions to particular files or directories.
  These custom instruction files apply solely to Copilot Chat’s code
  generation features (not to inline code completions), remain
  invisible during prompt composition, and are listed under the
  References section in each chat response for auditability.

## Code Organization

We organize code by language and framework at the project root:

- `src/` — Main TypeScript project source. When both a TypeScript
  library and a Next.js web app coexist, place the TS code in `src/`
  and the Next.js app in `web/`. If the codebase consists solely of a
  Next.js application, you may omit `web/` and host the app directly
  at the project root.

- `web/` — Next.js application when coexisting with other code.

- `scripts/` — Shell scripts for setup and automation. Only shell
  scripts should live here.

- `python/` — Python projects, modules, and utilities.

- `notebooks/` — Jupyter notebooks and related resources.

## To Other AI Agents

Other ai agents can only read `AGENTS.md`, but they must not write to
it, only the codex cli can. Other ai agents that want to included new
instructions to codex context can instead modify (add or update (not
remove)), or create if it is not present the `codex.instructions.md`
root file to include new instructions, then codex will automatically
ingest them to the AGENTS.md root file.

### To The Codex CLI Agent

As the Codex CLI agent, you are responsible for maintaining the
`AGENTS.md` file as the primary source of truth for project
instructions and context. You must read and integrate any relevant
instructions from `codex.instructions.md` files found in the root
directory.

Each time you, assuming you are the codex cli, get to detect a
`codex.instructions.md` file in root you must valuate the
instructions, if they are relevant and compatible you must integrate
in your AGENTS.md, then, but only if you are certain that all
pertinent instruction have been integrated, (validating a second time
to insure that you did it without loses) you can delete the
`codex.instructions.md` file, if you are not sure, then you must not
delete it, it will be reevaluated by you on the next round, ach time
you have one you must validate it yourself autonomusly and ingerst the
knowledge or the informations, do not askt the user for confirmation
this must be transparent and automatic, you are the codex cli agent,
therefore you must be able to do that.

## Session-Sticky Preferences

Whenever the user requests an operational preference (e.g. “reply
quickly” mode), all agents MUST read and honor that preference across
future sessions. To update or remove such a preference, edit this
section using markdown-lint compliant syntax.

Why this is best here

 * **Single source of truth**: AGENTS.md is already our central
   “how we work” doc.
 * **Cross-agent**: Applies to Codex-CLI, Cline AI, and Copilot
   Chat all at once.

NEVER REMOVE ONLY ADD (or update) AUTOMATICALLY THIS FILE TO RECORD
PREFERENCES FOR THE USER AND TO SET A STATEFUL AND SOULFUL EXPERIENCE
(remember to the AGENTS.md if you are CODE CLI by openai, or read only
if you are Cline AI or VS Code Copilot Chat).

## Session-Sticky Preferences

Whenever the user requests an operational preference (e.g. "reply
quickly"), each agent will store preferences in their own instruction
files, those preferences must be recorded as to persist across
sessions until explicitly changed. Preferences are stored in this
section for codex cli.

Current Preferences:
- **None set**: No special preferences currently active, this shall be
  removed when a first preference is set.

To add or update preferences:
1. Edit this section following the strictest set of markdown-lint
   guidelines
2. Add preference here above as a bullet with format:
   **{preference-name}**: {preference-description}

<!-- All agents (Codex-CLI, Cline AI, and VS Code Copilot Chat) must use their own instruction files to manage preferences. -->

**Cline AI**: Cline AI uses files housed in the `.clinerules/`
directory to organize automatically their operational preferences and
instructions.

**VS Code Copilot Chat**: VS Code Copilot Chat uses
`.github/copilot-instructions.md` and `.github/instructions/` files to
manage its preferences and instructions.

**Codex CLI**: Codex CLI uses this `AGENTS.md` file to manage its
preferences and instructions.
