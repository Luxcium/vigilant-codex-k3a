---
description: Layer 4 — Automation, Validation, and Triad Health. Codifies supporting scripts, VS Code tasks, index wiring, commit-policy instructions, additional prompt cards, and workspace chat settings beyond Layers 1–3.
---

<!-- memory-bank/instructions/layer-4-automation-and-health.instructions.md -->

# Layer 4 — Automation, Validation, and Triad Health

Purpose

- Establish resilient automation around the triad (instructions, chat modes, prompts), wire editor tasks, and encode commit policy guidance so the system remains verifiable and predictable. Apply only additive, idempotent changes beyond Layers 1–3.

Scope

- Include: validator scripts, triad health script, VS Code tasks, memory-bank index, commit policy instructions, additional prompt cards, slash-command utilities, and workspace chat settings.

Operating Principles

- Idempotent and additive: create what is missing; never overwrite existing content.
- Keep logic close to the repository: use shell scripts and VS Code tasks.
- Use only relative links; no external URLs.
- Update `memory-bank/activeContext.md` and `memory-bank/progress.md` with concise notes.
- Always-on Memory Bank discipline: Executors and AI agents MUST honor the
  [Copilot Memory Bank protocol](./copilot-memory-bank.instructions.md) for every action —
  read the Memory Bank before acting and write back outcomes immediately after.
  Treat this as an internal TODO on every task.

## Process Summary

This automation layer progresses through five stages that harden validation, visibility, and tooling around the triad.

### Stage A: Validator Tooling Setup
- **Purpose:** Guarantee every triad file type has an executable validator.
- **Actions:** Ensure memory-bank, chatmode, and prompt validation scripts exist, enforce permissions, and codify constraints from Layers 3A–3C.
- **Outcome:** Repeatable checks that keep authored artifacts compliant.

### Stage B: Triad Health Automation
- **Purpose:** Provide a single command that reports overall triad status.
- **Actions:** Maintain `scripts/triad-health.sh` to run validators, inspect VS Code settings, and emit OK or FAIL summaries.
- **Outcome:** Fast confidence that the workspace remains aligned and idempotent.

### Stage C: Workspace Task Integration
- **Purpose:** Surface automation through VS Code without manual command recall.
- **Actions:** Merge-append tasks mapping to each validator, triad health, and slash-command utility while preserving existing task definitions.
- **Outcome:** Preferred task launcher workflow that reinforces one-click compliance checks.

### Stage D: Memory Bank Reinforcement
- **Purpose:** Keep supporting documentation and prompt assets synchronized.
- **Actions:** Maintain memory-bank index entries, commit policy instruction files, Copilot protocol coverage, prompt contracts, and `.prettierignore` safeguards.
- **Outcome:** Durable triad ecosystem where agents locate rules, prompts, and instructions without drift.

### Stage E: Acquisition and Verification
- **Purpose:** Standardize how canonical artifacts are copied and validated in new environments.
- **Actions:** Follow acquisition guidelines, preserve original front-matter, set executable bits, run validators, and log provenance in Memory Bank files.
- **Outcome:** Consistent bootstrap flow with traceable provenance and exit criteria.

Artifacts to Ensure

1. Validator Scripts (executable)

- `scripts/validate-memory-bank.sh`
  - Validates front-matter (`description`) and forbids external links for `memory-bank/instructions/*.instructions.md`.
  - Do not add or modify `applyTo` unless explicitly approved.
- `scripts/validate-chatmodes.sh`
  - Enforces front-matter and constraints per [Layer 3B](./layer-3b-chatmodes-factory.instructions.md):
    `tools: ['codebase', 'editFiles', 'fetch']` and `model: GPT-5 (Preview)` or `GPT-5 mini (Preview)` only.
  - Exactly one H1 in body; relative links only; no external URLs.
- `scripts/validate-prompts.sh`
  - Enforces [Layer 3C](./layer-3c-prompt-files-factory.instructions.md) heading contract:
    path marker comment matching filename, exactly one blank line, then H1; first H2 is the Slash Command.
  - Requires `description` in front-matter; forbids external links.

2. Triad Health Script

- `scripts/triad-health.sh`
  - Runs all three validators and summarizes inventory of instructions, chat modes, and prompts.
  - Verifies `.vscode/settings.json` references triad locations.
  - Exits non-zero on failures; prints a concise OK/FAIL summary.

3. VS Code Tasks (merge-append)

- Ensure `.vscode/tasks.json` contains tasks to run each scripts tha you have created and that they are referenced in a way that make it obvious we prefer to use via the tasks created look if any of the tasks already exist do not modify them but if they are missing append them to the existing tasks do not remove or modify any unrelated tasks:
  - `Validate 3A Instructions` → `scripts/validate-memory-bank.sh`
  - `Validate 3B Chatmodes` → `scripts/validate-chatmodes.sh`
  - `Validate 3C Prompts` → `scripts/validate-prompts.sh`
  - `Triad Health Check` → `scripts/triad-health.sh`
  - `List Slash Commands` → `scripts/list-slash-commands.sh`
- Append missing tasks without removing or altering unrelated tasks.

4. Slash Commands Utility

- `scripts/list-slash-commands.sh` lists all prompt Slash Command headers for quick discovery.
- Keep it simple: grep prompt files for lines beginning with `## Slash Command:` and print them.

5. Memory-Bank Index

- Ensure `memory-bank/index.md` exists and lists:
  - Core factories: [Layer 3A](./layer-3a-custom-instructions-factory.instructions.md),
    [Layer 3B](./layer-3b-chatmodes-factory.instructions.md),
    [Layer 3C](./layer-3c-prompt-files-factory.instructions.md), and this Layer 4.
  - Current chat modes and prompt cards.
- Keep links relative; update additively.

6. Commit Policy Instructions

- Ensure the following instruction files exist under `memory-bank/instructions/` (create if missing by copying from source context; see Acquisition below):
  - `conventional-commits-must-be-used.instructions.md`
  - `commit-examples.instructions.md`
  - `breaking-changes-commits.instructions.md`
  - `gitmoji-complete-list.instructions.md`
- Ensure `.vscode/settings.json` references `conventional-commits-must-be-used.instructions.md` in
  `github.copilot.chat.commitMessageGeneration.instructions` without removing existing entries.

7. Copilot Memory-Bank Protocol

- Ensure `memory-bank/instructions/copilot-memory-bank.instructions.md` exists. If missing, copy it from the source context (see Acquisition below). Treat any existing `applyTo` field as immutable.
- Use and reference it as the authoritative workflow for reading/writing the Memory Bank in every session.

8. Additional Prompt Cards

- Ensure these repository-specific prompt cards exist (copy if missing; see Acquisition below):
  - `memory-bank/prompts/bootstrap-genesis.prompt.md`
  - `memory-bank/prompts/prompt-files.prompt.md`
- Validate them with `scripts/validate-prompts.sh`.

9. Prompt Contract Resilience

- Keep prompt heading rules synchronized with [Layer 3C](./layer-3c-prompt-files-factory.instructions.md):
  - Path marker comment → one blank line → H1 → first H2 is Slash Command.
- Maintain validator checks so regressions surface in CI/local runs.

10. Workspace Chat Settings (merge-append)

- In `.vscode/settings.json`, append these preferences if they are absent (do not remove or modify unrelated keys):
  - `"chat.agent.enabled": true`
  - `"chat.agent.thinkingStyle": "expanded"`
  - `"chat.math.enabled": true`
  - `"chatgpt.openOnStartup": true`

11. Prettier Ignore for Editor Stability

- Even if we do not use prettier for the time being and even if we must remain agnostic about whether or not we will be using it later, it is required to disable certain files from being formatted by it already. Ensure a root `.prettierignore` exists to prevent auto-formatting from altering
  files with strict spacing/heading contracts. Include at least these two patterns:
  - `*.prompt.md`
  - `*.chatmode.md`
- Rationale: Prettier may collapse blank lines or rewrap headings that our prompt/chatmode
  validators require to remain exact. Keeping these files out of Prettier preserves contract.
- Merge-append additional project-specific ignores if needed; do not remove existing lines.

Acquisition (Copy From Source Context)

- Goal: When bootstrapping a new project to match this repository’s Layer-4 posture, copy canonical artifacts from the source context into the new project.
- Source reference in this repository:
  - `memory-bank/instructions/copilot-memory-bank.instructions.md`
  - `memory-bank/instructions/conventional-commits-must-be-used.instructions.md`
  - `memory-bank/instructions/commit-examples.instructions.md`
  - `memory-bank/instructions/breaking-changes-commits.instructions.md`
  - `memory-bank/instructions/gitmoji-complete-list.instructions.md`
<!-- excluded rules for the time being they should have been covered by the agentic workflow you enacted and should not be overidded anyway this is excluded for the time being into a comment out ppath of actions:
  - `scripts/validate-memory-bank.sh`, `scripts/validate-chatmodes.sh`, `scripts/validate-prompts.sh`, `scripts/triad-health.sh`, `scripts/list-slash-commands.sh`
  - `memory-bank/prompts/bootstrap-genesis.prompt.md`, `memory-bank/prompts/prompt-files.prompt.md`
  - `.prettierignore`-->
- Execution options:
  1. If operating inside this repository, copy from the relative paths above.
  2. If operating from a different workspace on the same machine, copy from the absolute local path of this repo if available (e.g., `/projects/incubator/turbo-system-k21a/...`).
  3. If network access and policy permit, fetch the same files from the canonical remote. Do not embed external URLs in the copied content; record provenance in `memory-bank/progress.md`.
- Rules:
  - Preserve file contents exactly, including YAML front-matter. Do not alter `applyTo` fields.
  - Ensure scripts are executable (`chmod +x`).
  - After copying, run validators and triad health; update `activeContext.md` and `progress.md` with a brief note and provenance.

Verify & Exit

- All scripts above are executable; validators pass; triad health returns OK.
- `.vscode/tasks.json` includes the listed tasks.
- `memory-bank/index.md` includes Layer 4.
- Memory updated: brief notes added to `activeContext.md` and `progress.md` with provenance when files are copied from a source context.
