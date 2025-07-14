---
applyTo: 'web/**/*.{ts,tsx,js,jsx,json}'
---

# Start Web Dev Server

## Objective

Automate running and building the Next.js application located in `web/`.

## Usage

1. Open an integrated terminal.
2. Change directory to `web/`.
3. Start the development server with `pnpm dev`.
4. Build the production bundle with `pnpm build`.
5. Launch the built server with `pnpm start`.

Ensure the terminal displays the running port (usually `http://localhost:3000`).

## Verification

- `markdownlint --strict` on updated Markdown files
- `scripts/verify-all.sh`
