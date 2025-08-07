# CONTRIBUTING

Thank you for helping improve Vigilant Codex K3a. This guide covers the
core workflows and expectations for contributors.

## Folder Layout

The project uses a polyglot structure. Root contexts like `src/`,
`web/`, `python/`, and `agent-framework/` each contain their own
configuration. See
[`memory-bank/root-contexts.md`](memory-bank/root-contexts.md) for the
canonical directory map.

## Token Persistence

OAuth credentials are persisted via the `KeyManager` class, which writes
`oauth.json` to the `.keys` directory. Examples and the CLI both reuse
this file so tokens survive between runs.

## Environment Switching

Python tooling supports three modes. Select one during setup:

```bash
ENV_MODE=local            scripts/setup_python_env.sh
ENV_MODE=docker_isolated  scripts/setup_python_env.sh
ENV_MODE=docker_volume    scripts/setup_python_env.sh
```

## CLI Usage

Build and run the demo CLI to fetch candle data:

```bash
npm run build
node ./lib/src/cli.js
# or run directly
pnpm tsx src/cli.ts
```

## Mock Recording

Run the playground to capture HTTP interactions and verify output:

```bash
pnpm tsx src/example.ts
cat .keys/example-sdk-demo.json
```

Tests stub `fetch` via `vi.stubGlobal('fetch', mockFetch)`; update
fixtures when behaviour changes.

## Testing Commands

```bash
scripts/verify-all.sh
npm run test:coverage
markdownlint --strict README.md CONTRIBUTING.md
```

## Memory Bank Protocol

After major changes, update `memory-bank/activeContext.md` and
`memory-bank/progress.md` to keep shared context current.

## Verification

- `markdownlint --strict README.md CONTRIBUTING.md`
- `scripts/verify-all.sh`
