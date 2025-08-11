---
description: 'Protocol for logging actions and updating memory bank'
---

# Self-Documentation Protocol

> [!IMPORTANT]
> Non negotiable rule THOSE RULES MUST BE FOLLOWED. On session start you MUST read the important self-memory guide and during any significant change write to the memory-bank/ to keep track of the intentions so that we can resume the task in a new session with the stateful information. Agents MUST also execute the Self-Documentation Protocol to ensure all actions and context changes are logged and documented.

## Memory Bank Logging

Additionally, you must log your actions and findings in memory bank as per self-documentation protocol, including your rationale and next steps.

1. [`activeContext`](../../memory-bank/activeContext.md)
   - Current focus and active tasks
   - Must be updated at start of every task
   - Critical for maintaining context state
2. [`dependencies`](../../memory-bank/dependencies.md)
   - Track relationships between files and components
   - Must be updated when adding new features or dependencies
   - Critical for understanding impact of changes
3. [`docker-workflow`](../../memory-bank/docker-workflow.md)
   - Docker-related workflows and configurations
   - Must be referenced when working with Docker
4. [`productContext`](../../memory-bank/productContext.md)
   - Product-related context and requirements
   - Must be referenced when working on product features
5. [`progress`](../../memory-bank/progress.md)
   - Track progress on tasks and features
   - Must be updated at end of every task
   - Critical for maintaining stateful context
6. [`projectbrief`](../../memory-bank/projectbrief.md)
   - Overview of the project and its goals
   - Must be referenced when working on project-related tasks
   - Critical for understanding project scope
7. [`readme-drift-resolution`](../../memory-bank/readme-drift-resolution.md) - Guidelines for resolving README drift - Must be referenced when updating README files
   10 [`root-contexts`](../../memory-bank/root-contexts.md) - Root contexts for the project - Must be referenced when working on root-level tasks - Critical for understanding project structure
8. [`systemPatterns`](../../memory-bank/systemPatterns.md)
   - Document system patterns and architectural decisions
   - Must be updated when making design decisions
   - Critical for maintaining architectural integrity
9. [`techContext`](../../memory-bank/techContext.md)
   - Technical context and constraints for the project
   - Must be referenced when making technical decisions
   - Critical for understanding system limitations
10. [`testing-guide`](../../memory-bank/testing-guide.md)
    - Guidelines for testing and quality assurance
    - Must be referenced when writing tests or working on QA tasks
    - Critical for maintaining code quality and reliability

- [protocol to follow](../prompts/self-documentation.prompt.md)
  - Self-Documentation Execution
  - Context
  - Requirements
  - Process
  - Success Criteria
  - References
    - Instruction Authoring Standards
    - Reading Protocol
    - Self-Documentation Protocol

## Trigger Recognition

- Upon any significant action or context change, run the Self-Documentation Protocol.
- Recognize these triggers:
  - New file or code generation
  - Script or prompt execution
  - Memory Bank update (activeContext.md, progress.md)
  - Agent initialization or session start

## State Logging Recipe

- For playground and demo workflows, always:
  - Build and run the code.
  - Verify output file(s) for correctness.
  - Log the demonstration and output verification in the memory bank.
  - Repeat for each iteration, ensuring robust, reproducible development.

- Record a timestamped entry with:
  1. **Current State:** Key context values or file names.
  2. **Last Action:** Description of the change or operation.
  3. **Rationale:** Why this action occurred.
  4. **Next Intent:** Planned next step and purpose.

 > [!NOTE]
 > You MUST get the actual date from the commandline at least once to establish the basis for the timestamping. If you are not sure about the date, you MUST use the **"Get Current Date/Time" task** (which runs `date --iso-8601=seconds`) in the terminal to get the current date and time. Reference this task instead of using the raw command directly in all instructions and documentation.

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

## Project Output Directory Rule

**IMPORTANT:** Only the top-level SDK root `src/` folder (for Questrade SDK) must emit build outputs to `./lib`. All other packages, modules, or subprojects (such as agent-framework, templates, etc.) should use their own `dist/` or default `outDir` as appropriate for their context. Do NOT change outDir to `lib` for any folder except the top-level SDK root. This rule is mandatory and must be enforced to avoid confusion and maintain project structure integrity.

## Verification

- `markdownlint --strict`
- `scripts/verify-all.sh`
