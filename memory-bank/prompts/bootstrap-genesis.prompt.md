---
description: Idempotent bootstrap/repair for Genesis Layers 1–3 (3A/3B/3C) using local instructions and validators.
tools: ['codebase', 'fetch', 'getTerminalOutput', 'terminalSelection', 'terminalLastCommand', 'edit', 'runTasks', 'think', 'todos']
---

## Slash Command: /bootstrap-genesis - Initialize or Repair Layers 1–3

Operational State

- Bring the current folder into compliance with Genesis Layer 1 (foundation), Layer 2 (workspace ergonomics), and Layer 3 (3A instructions, 3B chatmodes, 3C prompts). Behave idempotently: add only what is missing; never overwrite existing files unless explicitly instructed. If the folder is empty, perform a clean bootstrap. If partially configured, repair gaps and ensure coherence.

### Inputs

- ${workspaceFolder}
- ${input:scope:full|repair|verify}
- ${input:licenseOwner:Copyright holder for LICENSE}
- ${selection}

### Steps

1. Layer 1 — Foundation Verification and Bootstrap
   - Verify repo state and inventory foundation files.
   - Create missing: `.editorconfig`, `.gitattributes`, `.gitignore`, `LICENSE` (owner = ${input:licenseOwner}), `README.md`, `VERSION`, `scripts/README.md`, `scripts/init.sh`.
   - Ensure `scripts/init.sh` is executable and safe to rerun; initialize git only if `.git/` is absent.
   - Source of truth: [Layer 1](../instructions/layer-1-verify-and-bootstrap.instructions.md).
2. Layer 2 — Development Environment Verification and Bootstrap
   - Ensure `.vscode/settings.json` contains triad wiring keys; merge-append without overwriting unrelated settings.
   - Ensure `.github/copilot-instructions.md` exists with guardrails.
   - Ensure triad directories + READMEs and six memory files exist under `memory-bank/`.
   - Source of truth: [Layer 2](../instructions/layer-2-verify-and-bootstrap.instructions.md).
3. Layer 3A — Custom Instructions Factory
   - Ensure factory doc and `_TEMPLATE.instructions.md` exist; no external links; keep rules atomic.
   - Run instructions validator and resolve any issues additively.
   - Source: [3A](../instructions/layer-3a-custom-instructions-factory.instructions.md).
4. Layer 3B — Chat Modes Factory
   - Ensure factory doc, `_TEMPLATE.chatmode.md`, and at least one minimal mode (e.g., Baseline Dev) are present.
   - Front-matter must include `description`, `tools: ['codebase', 'editFiles', 'fetch']`, and `model: GPT-5 (Preview)` or `GPT-5 mini (Preview)`;
     never modify an existing mode’s tools/model without explicit approval.
   - Run chatmodes validator and resolve any issues additively.
   - Source: [3B](../instructions/layer-3b-chatmodes-factory.instructions.md).
5. Layer 3C — Prompt Files Factory
   - Ensure factory doc, `_TEMPLATE.prompt.md`, and at least one prompt (e.g., Quick Edit) exist.
   - Enforce heading contract: no H1; first header is `## Slash Command: /<stem> - <label>`; body includes Operational State, Inputs, Steps, Outputs; relative links only.
   - Run prompts validator and resolve any issues additively.
   - Source: [3C](../instructions/layer-3c-prompt-files-factory.instructions.md).
6. Coherence and Health
   - Ensure `memory-bank/index.md` lists instructions, modes, and prompts.
   - Ensure `.vscode/tasks.json` includes tasks for 3A/3B/3C validators and triad health.
   - Run triad health; if tools allow executing scripts, run `scripts/triad-health.sh`. Otherwise, simulate checks by reading files and validators.
   - Update `memory-bank/progress.md` and `memory-bank/activeContext.md` with changes.

### Outputs

- Prefer a concise Markdown summary with:
  - Created/updated files (additive only)
  - Validation results for 3A/3B/3C and triad health
  - Any follow-up actions required
  - Optional JSON block:
    {
    "layer1": {"created": [], "skipped": [], "notes": ""},
    "layer2": {"created": [], "skipped": [], "notes": ""},
    "layer3": {"instructions": {}, "chatmodes": {}, "prompts": {}},
    "health": {"status": "OK|FAIL", "issues": []}
    }

### References

- [Layer 1 — Foundation](../instructions/layer-1-verify-and-bootstrap.instructions.md)
- [Layer 2 — Dev Environment](../instructions/layer-2-verify-and-bootstrap.instructions.md)
- [Layer 3A — Instructions Factory](../instructions/layer-3a-custom-instructions-factory.instructions.md)
- [Layer 3B — Chat Modes Factory](../instructions/layer-3b-chatmodes-factory.instructions.md)
- [Layer 3C — Prompt Files Factory](../instructions/layer-3c-prompt-files-factory.instructions.md)
