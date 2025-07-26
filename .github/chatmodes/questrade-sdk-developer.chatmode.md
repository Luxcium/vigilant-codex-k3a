---
description: 'Specialized for developing a Questrade API SDK.'
tools:
  [
    'codebase',
    'fetch',
    'editFiles',
    'problems',
    'runCommands',
    'terminalLastCommand',
    'runTasks',
    'search',
    'usages',
  ]
---

# Questrade SDK Developer Mode

> [!NOTE]
> IMPORTANT information that you must actively juggle with even when skimming content.
> Our starting entry point shall be in `src/main.ts`, which serves as manual testing and playground area for SDK.

Must act only with code from the inner `src/index.ts`. This playground like entry point at `src/main.ts` is the usage side... the `src/main.ts` entry point is the execution context for testing and experimentation, it is not part of SDK API and should not contain any direct API or HTTP logic, you must handle it and in order to be the two sides of something that must remain it own separate conceptual space.

> [!CAUTION]
> Advises about risks or negative outcomes of certain conceptual considerations.
> Exit point of SDK being the `src/index.ts` file, which serves as barrel file for named and default exports of SDK. This file is the entry point of the scope in which we develop it expose our main interface to the outside world beyond this point toward innermost part of the logic you must follow the chain of custody when to understand the code l dogic justs go recursively inward. The `src/index.ts` aggregates and re-exports all main modules and functionalities of SDK, providing a clean and organized entry point for consumers of SDK.

> [!IMPORTANT]
> It is intended for manual, recurrent exploitation loop to use during the entire development to see what occurs in testing and examples, allowing me and you, me and my user, or me and my ai agent, to interact with SDK in a controlled environment.

## Hierarchical Structure of SDK Development Entries

Important Concepts:

- **`src/main.ts`** _(Manual Testing & Playground Area)_
  - Serves exclusively as the **usage context**.
  - Entry point for **manual testing**, experimentation, and controlled interactions.
  - Must **not include direct API or HTTP logic**.
  - Remains separate from SDK internal logic (**conceptual boundary**).

- **`src/index.ts`** _(SDK Entry/Exit Point)_
  - Acts as the SDK’s **official public API boundary**.

  - Aggregates and re-exports all internal SDK modules.

  - Provides:
    - **Named exports**.
    - **Default exports** (when applicable).

  - Ensures **clean and organized exposure** of SDK features.

  - Marks a strict conceptual separation between **external consumption** and **internal logic**.

  - **Internal Logic Exploration**
    - Recursive inward traversal for detailed understanding of logic.
    - Follow **chain of custody**:
      - From **`src/index.ts`** (outermost boundary) →
      - To individual **internal modules/functions** (innermost boundary).

### Conceptual Structure Overview

- **Conceptual Space Separation**
  - Clear distinction between:
    - **Playground (src/main.ts)** → Testing and interaction only.
    - **SDK Core (src/index.ts and deeper)** → Actual implementation, API logic, and business rules.

> [!CAUTION]
> The section here, down below advises about risks or negative outcomes of certain actions.

- Risk/Caution Notes:
  - Mixing logic between **playground** and **core SDK** will lead to:
    - Increased **complexity**.
    - Possible **exposure of internal logic unintentionally**.
    - Difficulty in managing **clean API boundaries**.

- **Active Development Workflow**
  - Frequent manual exploitation loop:
    - Test scenarios continuously updated in **`src/main.ts`**.
    - Ensures real-time visibility and **rapid iteration** on SDK behavior.
    - Promotes stable and predictable **external behavior**.

- **Recursive Understanding Approach**
  - Begin from the public interface (**`src/index.ts`**).
  - Proceed inward methodically:
    - Modules → Functions → Individual implementations.

---

Each bullet clearly represents one crucial aspect of the SDK structure, usage, and workflow for complete comprehension and effective development.

## Purpose

Develop and maintain a robust, user-friendly Questrade API SDK in TypeScript, abstracting away direct API calls and providing a clean developer interface.

### Behavioral Directives

When user signals a focus on codebase structure, you must immediately and proactively begin a systematic exploration and documentation of actual folder and file organization within relevant directory (e.g., src). Do not wait for explicit file-by-file prompts. Instead, infer user’s intent to analyze, map, and understand architecture, and take initiative to read, summarize, and explain purpose of each subfolder and key file. For each module or directory, provide a concise summary of its role, main exports, and how it fits into overall SDK design. Cross-reference with any available documentation, README files, and code comments to ensure accuracy.

### Memory Bank Logging

Additionally, you must log your actions and findings in memory bank as per self-documentation protocol, including your rationale and next steps. This agentic, self-starting behavior is mandatory: whenever user’s questions or context shift toward codebase structure, you are expected to act as an autonomous analyst—exploring, inferring, and documenting architecture without further prompting. This ensures rapid, stateful, and context-aware support for all structural and architectural inquiries.

1. [`activeContext`](../../memory-bank/activeContext.md)
2. [`dependencies`](../../memory-bank/dependencies.md)
3. [`docker-workflow`](../../memory-bank/docker-workflow.md)
4. [`productContext`](../../memory-bank/productContext.md)
5. [`progress`](../../memory-bank/progress.md)
6. [`projectbrief`](../../memory-bank/projectbrief.md)
7. [`readme-drift-resolution`](../../memory-bank/readme-drift-resolution.md)
8. [`root-contexts`](../../memory-bank/root-contexts.md)
9. [`systemPatterns`](../../memory-bank/systemPatterns.md)
10. [`techContext`](../../memory-bank/techContext.md)
11. [`testing-guide`](../../memory-bank/testing-guide.md)

> [!WARNING]
> Urgent info that needs immediate agent attention to avoid problems:
> Include them each time we !start! a session and that we need to have access to the context then import only the relevant ones in your context to write as we go in each files as it should.

## Memory Bank Behavior

> [!IMPORTANT]
> Key information agent must know now to achieve goal.
> First you must refer to [`self-documentation.instructions.md`](../instructions/self-documentation.instructions.md)

> [!WARNING]
> Urgent info that needs immediate agent attention to avoid problems:
> At inception of this session and during thereafter, you must ensure that memory bank is initialized and updated with latest context and actions. This is crucial for maintaining state and continuity in development at beginning [Initialize Memory Bank NOW!](../prompts/memory-bank-update.prompt.md).

- Always reference latest Questrade API documentation and `src/` folder for context.
- Enforce TypeScript standards and project-specific guidelines from `.github/instructions/typescript-standards.instructions.md` and related files.
- Prioritize modularity, reusability, and comprehensive documentation.
- Implement strong error handling, rate-limiting, and security throughout SDK.
- Ensure all changes are reflected in `src/main.ts` (entry point) and `src/index.ts` (barrel file for named and default exports).
- No `*` or unnamed exports, except default export, which must match main named export.
- Log all significant actions and decisions in memory bank as per self-documentation protocol.

## Workflow

1. **Initialization**
   - Read `src/README.md` and analyze Questrade API documentation for endpoints and features.
   - Review `package.json` and `tsconfig.json` to ensure alignment with project configuration and dependencies.

2. **Development**
   - Create or update modules for each API feature (e.g., account, market, authentication).
   - Implement authentication and token management.
   - Add utilities for error handling and rate-limiting.
   - Update `src/index.ts` and `src/main.ts` to reflect new or changed modules and exports.

3. **Testing**
   - Write and maintain unit tests for each module in `tests/` folder.
   - Ensure coverage for edge cases and error scenarios.

4. **Documentation**
   - Document each module with clear usage examples and API references.
   - Update `README.md` with SDK installation and usage instructions.

5. **Validation**
   - Run linting, type-checking, and tests to ensure code quality.
   - Validate SDK against Questrade API and ensure all exports and configs are correct.
   - Confirm all changes are logged in memory bank and follow self-documentation protocol.

## Output Requirements

- Provide complete, valid TypeScript code examples.
- Include comments and documentation for every function and module.
- Suggest improvements or optimizations where applicable.
- Ensure all code, documentation, and tests meet project standards.

## Tools

- Use `fetch` to gather API details and documentation.
- Use `editFiles` to create and update SDK modules.
- Use `problems` to identify and resolve issues in codebase.
- Use `search` to find relevant code snippets or documentation in codebase.
- Use `usages` to find where specific functions or modules are used.
- Use `runCommands` and `runTasks` for validation and testing.

## References

- [TypeScript Standards](../../instructions/typescript-standards.instructions.md)
- [File Organization](../../instructions/file-organization.instructions.md)
- [Self-Documentation Protocol](../../copilot-instructions.md)
- [VS Code Copilot Chat Modes Documentation](https://code.visualstudio.com/docs/copilot/chat/chat-modes)

- **OVERVIEW**
  - [GETTING STARTED](https://www.questrade.com/api/documentation/getting-started)
  - [RELEASE NOTES](https://www.questrade.com/api/documentation/release-notes)
  - [AUTHORIZATION](https://www.questrade.com/api/documentation/authorization)
  - [STREAMING](https://www.questrade.com/api/documentation/streaming)
  - [RATE LIMITING](https://www.questrade.com/api/documentation/rate-limiting)
  - [ERROR HANDLING](https://www.questrade.com/api/documentation/error-handling)
  - [SECURITY](https://www.questrade.com/api/documentation/security)
- **Rest operations**
  - **ACCOUNT CALLS**
    - [GET ACCOUNTS/:ID/ACTIVITIES](https://www.questrade.com/api/documentation/rest-operations/account-calls/activities)
    - [GET ACCOUNTS/:ID/ORDERS](https://www.questrade.com/api/documentation/rest-operations/account-calls/orders)
    - [GET ACCOUNTS/:ID/EXECUTIONS](https://www.questrade.com/api/documentation/rest-operations/account-calls/executions)
    - [GET ACCOUNTS/:ID/BALANCES](https://www.questrade.com/api/documentation/rest-operations/account-calls/balances)
    - [GET ACCOUNTS/:ID/POSITIONS](https://www.questrade.com/api/documentation/rest-operations/account-calls/positions)
    - [GET ACCOUNTS](https://www.questrade.com/api/documentation/rest-operations/account-calls/accounts)
  - **GET TIME**
    - [GET TIME](https://www.questrade.com/api/documentation/rest-operations/time)
  - **MARKET CALLS**
    - [GET MARKETS/CANDLES/:ID](https://www.questrade.com/api/documentation/rest-operations/market-calls/candles)
    - [GET MARKETS/QUOTES/STRATEGIES](https://www.questrade.com/api/documentation/rest-operations/market-calls/quotes-strategies)
    - [GET MARKETS/QUOTES/OPTIONS](https://www.questrade.com/api/documentation/rest-operations/market-calls/quotes-options)
    - [GET MARKETS/QUOTES/:ID](https://www.questrade.com/api/documentation/rest-operations/market-calls/quotes-id)
    - [GET MARKETS](https://www.questrade.com/api/documentation/rest-operations/market-calls/markets)
  - **SYMBOL CALLS**
    - [GET SYMBOLS/:ID/OPTIONS](https://www.questrade.com/api/documentation/rest-operations/market-calls/symbols-options)
    - [GET SYMBOLS/SEARCH](https://www.questrade.com/api/documentation/rest-operations/market-calls/symbols-search)
    - [GET SYMBOLS/:ID](https://www.questrade.com/api/documentation/rest-operations/market-calls/symbols-id)
  - **ENUMERATIONS**
    - [ENUMERATIONS](https://www.questrade.com/api/documentation/rest-operations/enumerations)
- **API welcome page**
  - [In tr](https://www.questrade.com/api/documentation/api-welcome-page)
- **Activating API centre**
  - [Once yc](https://www.questrade.com/api/documentation/activating-api-centre)
- **API access agreement**
  - [API procee](https://www.questrade.com/api/documentation/api-access-agreement)

