# CONTRIBUTING

## Folder Layout

Refer to the architecture section in `README.md` for a full directory map. Core paths include `src/` for the TypeScript SDK, `web/` for the Next.js app, `python/` for agent utilities, and `memory-bank/` for stateful documentation.

## Token Persistence

OAuth credentials are managed by the `KeyManager` and stored locally in `.keys/oauth.json`. Never commit real tokens. Use `KeyManager.clear()` to remove stored tokens when needed.

## Environment Switching

Choose a Python environment mode at runtime:

```bash
./scripts/setup_python_env.sh --mode local
./scripts/setup_python_env.sh --mode docker_isolated
./scripts/setup_python_env.sh --mode docker_volume
```

Set `ENV_MODE` to persist a default selection.

## CLI Usage

Start a Codex Universal container and enter a development shell:

```bash
./scripts/run_codex_cli.sh
```

Run project commands with `pnpm <script>` inside the container. This workspace uses pnpm exclusively as the package manager.

## Mock Recording

Tests capture network activity through `vi.stubGlobal('fetch', mockFetch)`. Update the mock responses in test files when recording new scenarios so that tests remain offline and deterministic.

## Testing

- `./scripts/verify-all.sh` – markdown, instruction, prompt, and memory-bank checks
- `pnpm test` – run the vitest suite
- `pnpm run test:coverage` – generate coverage reports

## Verification

- `markdownlint --strict README.md CONTRIBUTING.md`
- `./scripts/verify-all.sh`
