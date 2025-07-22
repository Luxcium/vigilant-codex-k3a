# Web Development Environment

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

## 🛠️ Web Development Environment: Live Development, Scripts, and VS Code Integration

### Overview

This project is part of a multi-agent, multi-language workspace. The `web/` directory contains the Next.js application, which is developed using a robust, script-driven workflow with deep VS Code integration and live browser preview.

### 🚦 How to Start the Live Dev Server (Port 3000)

**Recommended (from project root):**

```bash
pnpm run web:dev
# or use VS Code Task: "Web Development Environment"
# or run: ./scripts/activate_web_dev_environment.sh
```

**What happens:**
- Starts Next.js in development mode (with hot reload and error overlays) on port 3000 (or next available 3001–3005).
- If not running, scripts will auto-start it and print the correct port.
- You can preview the app in your browser or in the VS Code Simple Browser (`Simple Browser: Show` → `http://localhost:3000`).

### 🧩 Scripts and Automation

- `scripts/activate_web_dev_environment.sh`: Checks for a running dev server, starts it if needed, prints status and browser preview instructions.
- `scripts/setup_web_dev_environment.sh`: Ensures dev server is running, creates VS Code settings/workspace files, opens browser preview.
- `scripts/setup_web_env.sh`: Bootstraps a Next.js app in `web/` if missing, updates `.gitignore`, runs repo verification.
- `scripts/browser-error-monitor.sh`: Monitors the running app for browser/runtime errors and reports to the VS Code Problems panel.

### 🧑‍💻 VS Code Tasks & Debugging

- **Tasks**: See `.vscode/tasks.json` for tasks like `Web Development Environment`, `Web: Lint`, `Web: Format`, `Web: Test`, and quality check suites.
- **Debugging**: `.vscode/launch.json` provides full-stack debugging, Edge DevTools, mobile emulation, and browser preview integration.

### 🗂️ NPM/PNPM Scripts

- **Root `package.json`**: Aliases like `web:dev`, `web:lint`, `web:format`, `web:test` all use `pnpm --filter ./web ...` for monorepo consistency.
- **`web/package.json`**: Standard Next.js scripts (`dev`, `build`, `start`, `preview`, `lint`, `format`).

### 🧭 Chain of Custody for Live Development

1. **Start Dev Server**: Use VS Code Task, terminal command, or script. Next.js runs on port 3000 (or next available).
2. **Preview**: Use browser or VS Code Simple Browser for live preview and error overlays.
3. **Error Monitoring**: Automated with `browser-error-monitor.sh` and Problems panel integration.
4. **Quality Checks**: Lint, format, and test via tasks or scripts.
5. **Containerized Option**: Use Codex Universal scripts for Docker-based dev (`scripts/codex_start.sh`).

### 📝 Comments and Documentation

- All scripts are commented for clarity (see `scripts/` directory and [scripts/README.md](../scripts/README.md)).
- This section documents the live dev workflow and chain of custody for web development.
- For full project context, see [../README.md](../README.md) and [memory-bank/](../memory-bank/).

---

## Getting Started


## Quick Start (Next.js)

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
