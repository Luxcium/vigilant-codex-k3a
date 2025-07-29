# Questrade Example Functional Playground Context

## Purpose

This file documents the current state and intent of the `src/example.ts` file as a functional playground for AI agent and user collaboration. It is used to develop, test, and modularize authentication and account-fetching features in isolation before integrating them into the SDK or production codebase.

## Current State

- All configuration and output are centralized at the top of the file as constants.
- All logic is split into pure, composable functions.
- Only `.keys/example-sdk-demo.json` is written for output; no split or duplicate files.
- The file is labeled as an intermediate refactor phase, preparing for future dependency injection and SDK integration.

## AI Agent Guidance

- Use this file as a safe playground for iterative feature development and refactoring.
- Do not explain standard TypeScript, Node.js, or Questrade API details in memory bank documentation—focus on project-specific context and agent behaviors.
- When updating related `.prompt.md` or `.instructions.md` files, reference this playground as the canonical example for isolated feature prototyping.
- Document all changes and rationale in memory-bank/ as you proceed.

## Next Steps

- Review and update all related `.prompt.md` and `.instructions.md` files to reference this playground context.
- Update relevant README files to reflect the new modular, functional approach.
- Continue to log all context and changes in memory-bank/ for agent autonomy and future reference.

---

This file is for AI agent and user collaboration only. It is not intended for production use or detailed human documentation outside the agent context.
