#!/bin/bash
# ────────────────────────────────────────────────────────────────────
# 🧠 Purpose:
#   Generate a fresh Next.js 15+ project inside an existing repo.
#   Designed for monorepos or multi-root setups (repo root + web root).
#
# 📂 Structure:
#   - repo-root/ (git version-controlled)
#     └─ web/   (Next.js project created by this script)
#
# 🔧 Features enabled:
#   • TypeScript
#   • TailwindCSS
#   • ESLint (flat config)
#   • App Router
#   • src/ directory
#   • Turbopack
#   • Import alias: @/*
#
# 🚫 Notes:
#   - Does not initialize git, assuming repo is already versioned.
#   - Uses npm explicitly; adjust flags for yarn/pnpm if needed.
# ────────────────────────────────────────────────────────────────────

# 💡 Constants (can be externalized later)
DEFAULT_PROJECT_NAME="web"
DEFAULT_ALIAS="@/*"

# 🛠️ Parameters (temporary placeholders for now)
PROJECT_NAME="${1:-$DEFAULT_PROJECT_NAME}"
PROJECT_DIR="./$PROJECT_NAME"

# 🧪 Placeholder: This section will be modularized
function run_create_next_app() {
  echo "📦 Creating Next.js project: $PROJECT_NAME in $PROJECT_DIR"

  npx create-next-app@latest "$PROJECT_DIR" \
    --ts \
    --tailwind \
    --eslint \
    --app \
    --src-dir \
    --turbopack \
    --use-npm \
    --import-alias "$DEFAULT_ALIAS" \
    --disable-git \
    --yes

  echo "✅ Project created at: $PROJECT_DIR"
}

# 🚧 Run the main command (to be moved to a main function later)
run_create_next_app
