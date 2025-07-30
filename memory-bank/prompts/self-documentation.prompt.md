---
mode: 'agent'
description: 'Automate self-documentation protocol.'
---

# Self-Documentation Execution

Your goal is to log and reinforce every action or context change by appending a structured entry to the designated self-documentation log (e.g., `memory-bank/activeContext.md`), following the Self-Documentation Protocol.

## Context

## Requirements

## Process

1. **Read Protocols**
   - Load `.clinerules/reading-protocol.md` and
     `memory-bank/instructions/self-documentation.instructions.md`.

2. **Detect Trigger**
   - Identify the action or context change event (e.g., file creation, prompt execution).

3. **Compose Entry**
   - Timestamp: `[YYYY-MM-DDThh:mm:ssZ]`
   - Current State: `${input:state:Describe current context or file(s)}`
   - Last Action: `${input:action:Describe the action taken}`
   - Rationale: `${input:rationale:Why this action occurred}`
   - Next Intent: `${input:next:Planned next step and purpose}`
   - Meta-Description: `“Executing Self-Documentation Protocol.”`
   - Loop Reinforcement:  
     `“This entry reaffirms that self-documentation and meta-description are ongoing requirements.”`

4. **Append to Log**
   - Open `${logFile}`, append the entry as a Markdown list item.

5. **Validation**
   - Verify that the entry follows the protocol checklist.
   - Ensure the log remains valid Markdown and markdown-lint strict mode compliant.

## Success Criteria

## References

1. [`activeContext`](../../memory-bank/activeContext.md)
2. [`dependencies`](../../memory-bank/dependencies.md)
3. [`docker-workflow`](../../memory-bank/docker-workflow.md)
4. [`productContext`](../../memory-bank/productContext.md)
5. [`progress`](../../memory-bank/progress.md)
6. [`projectbrief`](../../memory-bank/projectbrief.md)
7. [`readme-drift-resolution`](../../memory-bank/readme-drift-resolution.md)
8. [`root-contexts`](../../memory-bank/root-contexts.md)
9. [`systemPatterns`](../../memory-bank/systemPatterns.md)
10. [`techContext`](../../memory-bank/techContext.md)
11. [`testing-guide`](../../memory-bank/testing-guide.md)

## Verification

- `markdownlint --strict` on updated Markdown files
- `scripts/verify-all.sh`
