mode: 'ask'
tools: []
description: 'Test prompt to verify prompt files are working'

---

# Test Prompt

This is a test prompt to verify that prompt files are working correctly in VS Code with GitHub Copilot.

Current workspace: ${workspaceFolder}

Please confirm that you can see this prompt and that the workspace variable is resolved correctly.

## References

- [ai-prompt-creation](../instructions/ai-prompt-creation.instructions.md)

## Verification

- `markdownlint --strict` on updated Markdown files
- `scripts/verify-all.sh`
