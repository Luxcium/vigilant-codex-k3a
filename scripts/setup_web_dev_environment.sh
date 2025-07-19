#!/bin/bash

# setup_web_dev_environment.sh
# Comprehensive script to set up the complete web development environment in VS Code

set -e

echo "🚀 Setting up Web Development Environment..."

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
  echo "❌ Error: package.json not found. Please run this script from the project root."
  exit 1
fi

# Check if the web dev server is running
if ! curl -f http://localhost:3000 >/dev/null 2>&1; then
  echo "⚠️  Web development server is not running. Starting it now..."

  # Start the web development server in the background
  pnpm run web:dev &

  # Wait for the server to start
  echo "⏳ Waiting for development server to start..."
  timeout=30
  elapsed=0

  while [ $elapsed -lt $timeout ]; do
    if curl -f http://localhost:3000 >/dev/null 2>&1; then
      echo "✅ Development server is running!"
      break
    fi
    sleep 1
    elapsed=$((elapsed + 1))
  done

  if [ $elapsed -ge $timeout ]; then
    echo "❌ Timeout waiting for development server to start."
    exit 1
  fi
else
  echo "✅ Web development server is already running!"
fi

# Create a VS Code settings file to enable simple browser if not exists
VSCODE_SETTINGS_FILE=".vscode/settings.json"
if [ ! -f "$VSCODE_SETTINGS_FILE" ]; then
  echo "📝 Creating VS Code settings file..."
  cat >"$VSCODE_SETTINGS_FILE" <<EOF
{
    "simpleBrowser.focusLockIndicator.enabled": true,
    "workbench.editorAssociations": {
        "*.md": "vscode.markdown.preview.editor"
    }
}
EOF
fi

# Function to open VS Code with the Simple Browser
open_simple_browser() {
  echo "🌐 Opening Simple Browser in VS Code..."

  # Use VS Code command to open Simple Browser
  code --command "simpleBrowser.show" --args "http://localhost:3000" || {
    echo "📝 Manual step required: Open Command Palette (Ctrl+Shift+P) and run:"
    echo "   'Simple Browser: Show' then enter: http://localhost:3000"
  }
}

# Function to create a workspace file for better organization
create_workspace_file() {
  if [ ! -f "vigilant-codex-k3a.code-workspace" ]; then
    echo "📁 Creating VS Code workspace file..."
    cat >"vigilant-codex-k3a.code-workspace" <<EOF
{
    "folders": [
        {
            "name": "Root",
            "path": "."
        },
        {
            "name": "Web App",
            "path": "./web"
        },
        {
            "name": "Python Backend",
            "path": "./python"
        },
        {
            "name": "Scripts",
            "path": "./scripts"
        }
    ],
    "settings": {
        "simpleBrowser.focusLockIndicator.enabled": true,
        "typescript.preferences.importModuleSpecifier": "relative",
        "editor.formatOnSave": true,
        "editor.codeActionsOnSave": {
            "source.fixAll.eslint": true
        }
    },
    "extensions": {
        "recommendations": [
            "ms-vscode.vscode-typescript-next",
            "bradlc.vscode-tailwindcss",
            "ms-vscode.live-server",
            "ms-edgedevtools.vscode-edge-devtools"
        ]
    }
}
EOF
  fi
}

# Function to display environment status
display_status() {
  echo ""
  echo "🎯 Web Development Environment Status:"
  echo "=================================="
  echo "✅ Next.js Server: http://localhost:3000"
  echo "✅ VS Code Task Runner: Available"
  echo "✅ Browser Preview: Simple Browser"
  echo "✅ Hot Reload: Enabled"
  echo ""
  echo "🔧 Available VS Code Tasks:"
  echo "- Web Development Environment (Ctrl+Shift+P → Tasks: Run Task)"
  echo "- Web Quality Check (Lint, Format, Test)"
  echo "- Individual tasks: Web: Lint, Web: Format, Web: Test"
  echo ""
  echo "🌐 Browser Options:"
  echo "- Simple Browser: Ctrl+Shift+P → 'Simple Browser: Show'"
  echo "- External Browser: Launch configurations in Debug panel"
  echo ""
  echo "📝 Next Steps:"
  echo "1. Open Simple Browser with: http://localhost:3000"
  echo "2. Start making changes to files in web/ directory"
  echo "3. Watch for live reload in browser"
  echo "4. Use tasks for quality checks and formatting"
}

# Main execution
main() {
  create_workspace_file
  open_simple_browser
  display_status

  echo ""
  echo "🎉 Web Development Environment is ready!"
  echo "💡 Tip: Use Ctrl+Shift+P → 'Simple Browser: Show' to open browser preview"
  echo "🚀 Happy coding!"
}

# Run the main function
main
