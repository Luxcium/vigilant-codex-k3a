---
applyTo: '**'
---

# Self-Documentation Protocol

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

## Meta-Description

- In each log entry, include a note that you are executing the Self-Documentation Protocol.
- Example phrasing:  
  “I am updating my self-documentation after completing [X]. I include this log following the Self-Documentation Protocol.”

## Loop Reinforcement

- End every entry by restating the Self-Documentation requirement:
  - “This entry reaffirms that all actions and context changes must be documented and that this rule itself is part of the ongoing protocol.”

## Examples

```markdown
- [2025-05-26T16:59:00Z] Current State: generated prompt-manager;
  Last Action: created ai-template-manager.prompt.md;
  Rationale: scaffold prompt template;
  Next Intent: update instruction patterns.
  Note: Executing Self-Documentation Protocol.
  This log reaffirms that self-documentation and meta-description are ongoing requirements.
```

## Cross-References

- [Reading Protocol](../../.clinerules/reading-protocol.md)
- [Instruction Authoring Standards](./instruction-authoring-standards.instructions.md)
- [Prompt Authoring Best Practices](../prompts/ai-template-manager.prompt.md)

## Validation Checklist

- [ ] Entries include timestamp, state, action, rationale, next intent.
- [ ] Meta-description phrase appears in every entry.
- [ ] Loop reinforcement statement is present.
- [ ] Log entries appended to `memory-bank/activeContext.md` or designated log.
- [ ] Protocol is re-affirmed at session start.
