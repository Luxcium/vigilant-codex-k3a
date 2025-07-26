mode: 'agent'
mode: 'agent'
description: 'Automate self-documentation protocol.'

# Self-Documentation Execution

Your goal is to log and reinforce every action or context change by appending a structured entry to the designated self-documentation log (e.g., `memory-bank/activeContext.md`), following the Self-Documentation Protocol.

## Context

- Log file: `${input:logFile:memory-bank/activeContext.md}`
- Protocol reference: `.github/instructions/self-documentation.instructions.md`
- Reading protocol: `.clinerules/reading-protocol.md`

## Requirements

- Use the Self-Documentation Protocol for every significant change.
- Append entries in chronological order.
- Preserve existing logs; never overwrite.
- Ensure markdown-lint strict compliance for each entry.

## Process

1. **Read Protocols**
   - Load `.clinerules/reading-protocol.md` and  
     `.github/instructions/self-documentation.instructions.md`.

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

- [ ] New entry appended with correct timestamp and fields.
- [ ] Meta-description and loop reinforcement included.
- [ ] Log file remains markdown-lint strict mode compliant.
- [ ] No existing entries are modified or lost.

## References


- Instruction Authoring Standards: [instruction-authoring-standards.instructions.md](../instructions/instruction-authoring-standards.instructions.md)
- Reading Protocol: [.clinerules/reading-protocol.md](../../.clinerules/reading-protocol.md)
- Self-Documentation Protocol: [self-documentation.instructions.md](../instructions/self-documentation.instructions.md)
  1. [`activeContext`](../../memory-bank/activeContext.md) 
  2. [`dependencies`](../../memory-bank/dependencies.md)
  3. [`docker-workflow`](../../memory-bank/docker-workflow.md)
  4. [`no_dummy-no_placeholders`](../../memory-bank/no_dummy-no_placeholders.md)
  5. [`productContext`](../../memory-bank/productContext.md)
  6. [`progress`](../../memory-bank/progress.md)
  7. [`projectbrief`](../../memory-bank/projectbrief.md)
  8. [`readme-drift-resolution`](../../memory-bank/readme-drift-resolution.md)
  9. [`self-documentation`](../../memory-bank/self-documentation.md)
  10. [`root-contexts`](../../memory-bank/root-contexts.md)
  11. [`systemPatterns`](../../memory-bank/systemPatterns.md)
  12. [`techContext`](../../memory-bank/techContext.md)
  13. [`testing-guide`](../../memory-bank/testing-guide.md)
