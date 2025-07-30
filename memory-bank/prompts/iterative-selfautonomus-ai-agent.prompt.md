---
mode: 'agent'
model: GPT-4.1
tools: ['codebase-usages', 'githubRepo', 'problems', 'terminal-and-tasks']
description: 'Iterative agent for ${TASK_NAME} – autonomously refine until build, tests, and lint pass.'
---

# Self-Optimizing Autonomous Task Iteration

[Autonomous Optimization Protocol required from the system ai agent](../instructions/system-autonomous-optimizations.instructions.md)

Implement **${TASK_NAME}** according to project standards and the acceptance test suite.

## Control Loop

- Load workspace context and goals.
- Generate a minimal edit plan.
- Apply edits via code actions.
- Run `npm run lint && npm test && npm run build`.
- Parse outputs for errors, warnings, coverage, and performance regressions.
- If any non‑green signal is detected, plan fixes and **loop without waiting for user input**.
- Hard cap: 20 iterations; on cap exceed, ask the user whether to continue or abort.

## Heuristics

- Fix compilation errors before runtime failures.
- Address failing tests before improving coverage.
- Resolve linter and type‑checking warnings before stylistic nits.
- Keep each change atomic and revertible.

### Self‑Assessment Checklist

- ✔ Compiles
- ✔ Lints cleanly
- ✔ All tests pass ≥95 % coverage
- ✔ No new warnings in build output
- ✔ Adheres to `.github/copilot-instructions.md` and style guides
- If any box unchecked → iterate again.

### Reporting Format

- **Status:** OK | FAIL
- **Metrics:** tests pass / total, coverage %, lint errors
- **Next Plan:** single‑sentence action summary.
- After final success → post changelog of edits and rationale.

## Example Workflow

```text
Iteration 1 ➜ plan: add missing import in payment.ts
run → FAIL (compile)
next: correct import path

Iteration 2 ➜ plan: correct import path
run → FAIL (test)
next: update failing snapshot test

Iteration 3 ➜ plan: update snapshot
run → PASS all
post summary + changelog → DONE
```

## Termination Criteria

- All checklist items green.
- Coverage ≥ threshold defined in `package.json`.
- No TODO comments remain in changed files.

### Safety Valve

- If external tool hang >5 min → abort current iteration and retry once.
- If repeated identical failure over 2 loops → alert user with details.

## Tool Use

Those tools and tool sets are available to you, use them as needed, autonomously no need to confirm.

### codebase-usages

codebase: codebase (Built-In)
Find relevant file chunks, symbols, and other information in your codebase.

editFiles: editFiles (Built-In)
Edit files in your workspace.

usages: usages (Built-In)
Find references, definitions, and other usages of a symbol.

### terminal-and-tasks

copilotCodingAgent: Completes the provided task using an asynchronous coding agent. Use when the user wants copilot continue completing a task in the background or asynchronously. Launch an autonomous GitHub Copilot agent to work on coding tasks in the background. The agent will create a new branch, implement the requested changes, and open a pull request with the completed work.

runInTerminal: runInTerminal (Built-In)
Tool for running commands in the terminal

runCommands: runCommands (Built-In)
Runs commands in the terminal

runTasks: runTasks (Built-In)
Run tasks in workspace

terminalLastCommand: terminalLastCommand (Built-In)
The active terminal's last run command

terminalSelection: terminalSelection (Built-In)
The active terminal's selection

## Verification

- `markdownlint --strict` on updated Markdown files
- `scripts/verify-all.sh`
