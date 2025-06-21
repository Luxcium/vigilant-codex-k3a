# testing-guide.md
<!-- markdownlint-disable MD013 MD022 MD032 MD041 -->

## Purpose
This guide explains how to validate the rate limiter, start the Next.js app, and verify Python environment modes.

## Running Unit Tests
1. Install dependencies with `pnpm install` if not already done.
2. Run `pnpm test` from the project root.
3. Ensure all Jest tests, including `tests/tokenBucket.test.ts`, pass.

## Starting the Next.js App
1. Navigate to the `web` directory.
2. Install dependencies using `pnpm install`.
3. Start the development server with `pnpm dev`.
4. Use `docker-compose up -d` to start PostgreSQL and confirm the app connects successfully.

## Validating Python Environment Modes
1. Choose a mode: `local`, `docker_isolated`, or `docker_volume`.
2. Execute `ENV_MODE=<mode> scripts/setup_python_env.sh` from the project root.
3. Review the generated `python/README.md` to confirm the correct instructions for the chosen mode.

---
