---
mode: 'agent'
tools: ['codebase', 'openSimpleBrowser', 'terminalLastCommand']
description: 'Launch browser and enable instrumentation for live error monitoring during development'
---

# Launch Browser and Instrumentation for Development Error Monitoring

## Context

To ensure the AI agent and VS Code editor are aware of runtime errors, overlays, and hot-reload feedback, launch the development browser connected to the local dev server. Enable browser instrumentation and console log monitoring for real-time visibility of error messages, React/Next.js overlays, and runtime diagnostics.

## Requirements

- Start the local development server (e.g., `pnpm dev` in `web/`).
- Launch the browser (Simple Browser in VS Code or external browser) to `http://localhost:3000`.
- Enable browser instrumentation and console log monitoring.
- Monitor for error overlays, console errors, and runtime feedback.
- Report any errors or overlays detected in the browser to the editor and agent context.

## Process

1. Start the dev server using the appropriate VS Code task or terminal command.
2. Open the Simple Browser in VS Code (`Simple Browser: Show` → open in simple browser #openSimpleBrowser).
3. Enable browser instrumentation and console log monitoring tools.
4. Observe the browser for error overlays, redboxes, or console errors.
5. Document any errors or overlays in the editor and agent context.
6. Suggest fixes or next steps based on observed errors.

## Expected Output

- Browser window/tab showing the development site.
- Immediate visibility of runtime errors and overlays.
- Instrumentation and console log details reported in the editor and agent context for rapid resolution.

## Validation Steps

- Confirm the browser launches and connects to the dev server.
- Verify error overlays and console messages are visible and instrumented.
- Ensure error details are documented and actionable in the editor.

## References

- [edge-devtools-debugging](../instructions/edge-devtools-debugging.instructions.md)

## Verification

- `markdownlint --strict` on updated Markdown files
- `scripts/verify-all.sh`
