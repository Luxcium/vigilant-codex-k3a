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
   - Load `.clinerules/reading-protocol.md`

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

- [self-documentation](../instructions/self-documentation.instructions.md)

## Verification

- `markdownlint --strict` on updated Markdown files
- `scripts/verify-all.sh`
