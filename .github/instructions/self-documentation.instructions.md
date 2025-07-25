---
applyTo: '**/memory-bank/**'
---

# Self-Documentation Protocol

> [!IMPORTANT]
> Non negotiable rule THOSE RULES MUST BE FOLLOWED. On session start you MUST read the important self-memory guide and during any significant change write to the memory-bank/ to keep track of the intentions so that we can resume the task in a new session with the stateful information. Agents MUST also execute the Self-Documentation Protocol to ensure all actions and context changes are logged and documented.

## Trigger Recognition

- Upon any significant action or context change, run the Self-Documentation Protocol.
- Recognize these triggers:
  - New file or code generation
  - Script or prompt execution
  - Memory Bank update (activeContext.md, progress.md)
  - Agent initialization or session start

## State Logging Recipe

- Record a timestamped entry with:
  1. **Current State:** Key context values or file names.
  2. **Last Action:** Description of the change or operation.
  3. **Rationale:** Why this action occurred.
  4. **Next Intent:** Planned next step and purpose.

> [!WARNING]
> You MUST get the actual date from the commandline at least once to establish the basis for the timestamping. If you are not sure about the date, you MUST use the command `date` in the terminal to get the current date and time. 
## Meta-Description

- In each log entry, include a note that you are executing the Self-Documentation Protocol.
- Example phrasing:  
  “I am updating my self-documentation after completing [X]. I include this log following the Self-Documentation Protocol.”

## Loop Reinforcement

- End every entry by restating the Self-Documentation requirement:
  - “This entry reaffirms that all actions and context changes MUST be documented and that this rule itself is part of the ongoing protocol.”

## Examples

```markdown
- [2025-08-26T16:59:00Z] Current State: generated prompt-manager;
  Last Action: created ai-template-manager.prompt.md;
  Rationale: scaffold prompt template;
  Next Intent: update instruction patterns.
  Note: Executing Self-Documentation Protocol.
  This log reaffirms that self-documentation and meta-description are ongoing requirements.
```

## Validation Checklist

- [ ] Entries include valid current timestamp, state, action, rationale, next intent.
- [ ] Meta-description phrase appears in every entry.
- [ ] Loop reinforcement statement is present.
- [ ] Log entries appended to `memory-bank/activeContext.md` or designated log.
- [ ] Protocol is re-affirmed at session start.
