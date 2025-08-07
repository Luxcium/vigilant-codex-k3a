# Contributing

## Folder Layout

The repository is organized by language and framework. Key directories include:

| Folder             | Purpose                               |
| ------------------ | ------------------------------------- |
| `src/`             | TypeScript SDK main codebase          |
| `web/`             | Next.js v15+ application              |
| `python/`          | Python agent system                   |
| `agent-framework/` | TypeScript 22 multi-agent framework   |
| `scripts/`         | Lifecycle and maintenance scripts     |
| `memory-bank/`     | AI memory ledger and documentation    |

## Token Persistence

Tokens are stored under the `.keys/` directory and managed through `KeyManager`. This allows credentials to persist between runs. Remove `.keys/` to reset authentication state.

## Environment Switching

Select Python environment modes with:

```bash
scripts/setup_python_env.sh local           # Host-based virtual environment
scripts/setup_python_env.sh docker_isolated # Fully containerized
scripts/setup_python_env.sh docker_volume   # Container with host volume
```

## CLI Usage

Run the sample CLI after setting required `.env` variables:

```bash
pnpm tsx src/cli.ts
```

It prints a candle table and persists tokens through `KeyManager`.

## Mock Recording

Tests stub network calls with `vi.stubGlobal('fetch', mockFetch)`. Update recorded responses by editing the mocked `Response` objects in the relevant test files and rerunning the suite.

## Testing

Always validate changes:

```bash
npm test                      # Run unit tests
npm run test:coverage         # Coverage report
./scripts/verify-all.sh       # Repository-wide checks
npx markdownlint --strict README.md CONTRIBUTING.md memory-bank/activeContext.md memory-bank/progress.md
```

## Memory Bank Protocol

After substantial changes, update `memory-bank/activeContext.md` and `memory-bank/progress.md` so all agents share the latest context.

## Verification

- `npx markdownlint --strict README.md CONTRIBUTING.md memory-bank/activeContext.md memory-bank/progress.md`
- `./scripts/verify-all.sh`
- `npm test`
