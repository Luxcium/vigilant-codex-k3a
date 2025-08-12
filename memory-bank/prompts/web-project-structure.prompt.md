---
description: 'Canonical Next.js + Prisma folder structure and authoring standards for web/src/'
tools: []
---
# 🗂️ Next.js + Prisma Project Structure Prompt

## Overview

This prompt defines the canonical folder structure and authoring guidelines for a Next.js (v14+) project with Prisma integration. It applies to all files in `web/src/` and related root folders. Use this as a reference for scaffolding, code review, and automation.

## Folder Structure

### Root (`web/`)

- `node_modules/` — Managed dependencies
- `.next/` — Build output and cache
- `public/` — Static assets (served verbatim)
- `prisma/` — Prisma schema, migrations, generated client
- `scripts/` — Automation, seeding, codegen scripts
- `.github/` — GitHub Actions workflows (`.github/workflows/`)
- `.husky/` — Git hooks
- `.vscode/` — Workspace settings and recommended extensions

> Use `public/` for assets accessed by URL; use `web/src/assets/` for imported resources (icons, fonts, design tokens).

### Source (`web/src/`)

- `app/` — App Router (routes, layouts, pages)
- `app/providers/` — Global state/context providers
- `app/store/` — Zustand/Redux state containers
- `app/actions/` — Server Actions (trusted mutations)
- `components/atoms/` — Basic UI elements
- `components/molecules/` — Small UI compositions
- `components/organisms/` — Large UI sections
- `components/templates/` — Page-level shells
- `components/ui/` — Design tokens (typography, spacing)
- `components/layout/` — Layout wrappers
- `components/widgets/` — Encapsulated widgets
- `lib/` — Business logic, APIs, side effects
- `utils/` — Pure stateless functions
- `hooks/` — Custom React hooks
- `styles/` — Global CSS and modules
- `theme/` — Design tokens, color schemes
- `assets/` — Fonts, icons, images
- `types/` — Shared TypeScript types/enums/interfaces
- `constants/` — Centralized immutable values
- `config/` — Environment/theme configuration
- `locales/` — i18n strings (JSON)
- `data/` — Static/mocked datasets
- `tests/` — Colocated test files

## Authoring Guidelines

- Use ATX-style markdown headers and lists
- Configure `.husky/` for lint, type-check, and tests before push
- Store CI/CD workflows in `.github/workflows/` (with caching/idempotence)
- Share VS Code settings via `.vscode/settings.json`

## References

- [when-to-use-what-matrix](../instructions/when-to-use-what-matrix.instructions.md)
- [web-build](../instructions/web-build.instructions.md)
- [web-dev-server](../instructions/web-dev-server.instructions.md)

## Verification Checklist

- [ ] Root folders match the defined structure
- [ ] Source folders match the defined structure
- [ ] No rogue folders without ADR
- [ ] All server actions in `app/actions/` use the "use server" directive
- [ ] Prisma CLI points to `web/prisma/schema.prisma`

## Further Reading

- [Next.js Project Structure Guide](https://nextjs.org/docs/app/getting-started/project-structure?utm_source=chatgpt.com)
- [Static Assets with public/](https://nextjs.org/docs/pages/building-your-application/optimizing/static-assets?utm_source=chatgpt.com)
- [Server Actions API](https://nextjs.org/docs/14/app/building-your-application/data-fetching/server-actions-and-mutations?utm_source=chatgpt.com)
- [GitHub Markdown Basics](https://docs.github.com/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax?utm_source=chatgpt.com)
- [Copilot Custom Instructions Docs](https://code.visualstudio.com/docs/copilot/copilot-customization?utm_source=chatgpt.com)
- [v1.100 Release Notes](https://code.visualstudio.com/updates/v1_100?utm_source=chatgpt.com)

## Verification

- `markdownlint --strict` on updated Markdown files
- `scripts/verify-all.sh`
