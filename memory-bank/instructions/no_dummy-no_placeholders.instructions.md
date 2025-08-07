---
applyTo: '**'
description: 'Mandates real, executable code generation—no placeholders or dummy segments.'
---

# Instruction: Code Generation – Real Values over Placeholders

It is essential that all code generated in this repository adheres to the principle of using real, concrete values instead of placeholders or dummy segments. This guideline ensures that all code is immediately executable and functional, enhancing the reliability and quality of our codebase.

## Context

This guideline applies to all code generation workflows in this repository (GitHub Copilot, VSCode AI tools, CLI assistants, automation scripts, etc.) and targets every programming language and script (Bash, Python, TypeScript, etc.).

## Objective

Ensure that all generated code is immediately executable and free from non-functional placeholders or dummy segments.

---

## Instructions

1. **Executable Code Only**  
   All generated code must be valid and directly runnable—no placeholder values or “dummy” code that would break logic or execution.

2. **Use Real, Concrete Values**  
   When a value or parameter is known (hard-coded, discovered, or contextually defined), insert it directly into the code.

3. **Use Parametric Syntax Only When Necessary**  
   Only use parameters (for example, `${VARIABLE}` in Bash, named arguments in Python, function parameters in TypeScript) when the code legitimately requires dynamic input.

4. **Never Output Unusable or Dummy Blocks**  
   Avoid segments such as `# your_value_here`, `<TO_BE_FILLED>`, or commented-out “placeholder” lines. Every line must serve a clear, functional purpose.

5. **Enforce Cross-Language Compliance**  
   Apply these instructions for every language—adopt the idiomatic way to represent parameters when required (e.g., environment variables in Bash, function arguments in Python/TypeScript, etc.).

6. **Self-Check**  
   Systematically review all generated code for hidden placeholders or nonfunctional artifacts before committing, pushing, or creating a pull request.

---

## Expected Result

- No output contains non-functional placeholders or “dummy” variables.
- All generated code is ready-to-run or usable as a real function/module/script.
- Refactoring, automation, and team workflows become more reliable and less error-prone.
- Consistent, high-quality code generation across all developer tools and workflows.

## Additional Considerations

When the user signals a focus on codebase structure, you must immediately and proactively begin a systematic exploration and documentation of the actual folder and file organization within the relevant directory (e.g., src). Do not wait for explicit file-by-file prompts. Instead, infer the user’s intent to analyze, map, and understand the architecture, and take initiative to read, summarize, and explain the purpose of each subfolder and key file. For each module or directory, provide a concise summary of its role, main exports, and how it fits into the overall SDK design. Cross-reference with any available documentation, README files, and code comments to ensure accuracy.

## Expected Behavior

When the user asks about the codebase structure or architecture, you must, without any further prompting:

- Log your actions and findings in the memory bank as per the self-documentation protocol.
- Include your rationale and next steps. This agentic, self-starting behavior is mandatory.
- Act as an autonomous analyst—exploring, inferring, and documenting the architecture .
- Act without further prompting whenever user’s questions or context shift toward codebase structure, you are expected to take initiative to discover and provide insights.
- Ensure rapid, stateful, and context-aware support for all structural and architectural inquiries.

---

## Applicability

>  [!IMPORTANT]
> This rule is mandatory for all contributors and for all automated code suggestions (e.g., Copilot, VSCode AI, CI codegen steps).

> [!NOTE]
> If a value is not known at generation time but is required, use the idiomatic parametric form for the target language—never a fake placeholder.

## Verification

- `markdownlint --strict`
- `scripts/verify-all.sh`
