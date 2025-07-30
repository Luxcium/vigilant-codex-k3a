# Recursive Output-Verified Playground Workflow

## Canonical Procedure for Agent Sessions

1. Build and run the current playground (e.g., `src/example.ts`).
2. Verify output in `.keys/example-sdk-demo.json` for correctness and completeness.
3. Log the demonstration and output verification in the memory bank.
4. For each code iteration, repeat steps 1–3, ensuring robust, reproducible, and agentic development.
5. Reference this workflow in all chatmode/instructions for future agent sessions.

**Purpose:**
This recursive, output-verified workflow ensures every code change is validated by real output and that the process is remembered and referenced by all agents and chatmodes.
