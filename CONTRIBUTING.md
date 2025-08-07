# Contributing

Thank you for helping improve Vigilant Codex K3a. This guide summarizes core workflows and expectations for contributors.

## Folder Layout

The project is organized by root contexts: `src/` for the TypeScript SDK, `web/` for the Next.js app, `python/` for the agent system, and `agent-framework/` for the multi-agent framework. Additional folders like `scripts/`, `memory-bank/`, and `notebooks/` support automation and documentation.

## Token Persistence

Authentication tokens and example outputs live in the `.keys/` directory. The `KeyManager` handles saving and loading tokens so sessions can resume without re-authentication.

## Environment Switching

Python tooling supports three runtime modes. Choose one at setup time:

```bash
ENV_MODE=<local|docker_isolated|docker_volume> ./scripts/setup_python_env.sh
```

## CLI Usage

Run common tasks through `pnpm` scripts or helper utilities in `scripts/`:

```bash
pnpm test:coverage
pnpm run web:dev
./scripts/verify-all.sh
```

## Mock Recording

Use `src/example.ts` to capture deterministic API responses. Running the playground writes structured data to `.keys/example-sdk-demo.json`, which can serve as recorded mocks for tests and demos.

## Testing Commands

Validate changes before committing:

```bash
./scripts/verify-all.sh
npm run test:coverage
markdownlint --strict README.md CONTRIBUTING.md memory-bank/activeContext.md memory-bank/progress.md
```

## Memory Bank Updates

After significant changes, update `memory-bank/activeContext.md` and `memory-bank/progress.md` so the AI agents remain synchronized.
