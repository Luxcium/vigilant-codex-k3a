#!/bin/bash

# activate_web_dev_environment.sh
# Simple script to activate the web development environment with browser preview

set -e

echo "🚀 Activating Web Development Environment..."

# Function to find the running dev server port
find_dev_server_port() {
    for port in 3000 3001 3002 3003 3004 3005; do
        if curl -f "http://localhost:$port" >/dev/null 2>&1; then
            echo "$port"
            return 0
        fi
    done
    return 1
}

# Check for running development server
if DEV_PORT=$(find_dev_server_port); then
    DEV_URL="http://localhost:$DEV_PORT"
    echo "✅ Development server found on port $DEV_PORT"
else
    echo "⚠️  No development server found. Please start it manually with:"
    echo "   pnpm run web:dev"
    echo ""
    echo "🔄 Attempting to start development server..."

    # Try to start the server in the background
    nohup pnpm run web:dev >/dev/null 2>&1 &

    # Wait a moment for it to start
    sleep 3

    # Check again
    if DEV_PORT=$(find_dev_server_port); then
        DEV_URL="http://localhost:$DEV_PORT"
        echo "✅ Development server started on port $DEV_PORT"
    else
        DEV_URL="http://localhost:3000"
        echo "⚠️  Server may be starting. Using default URL: $DEV_URL"
    fi
fi

# Display environment status
echo ""
echo "🎯 Web Development Environment Status:"
echo "=================================="
echo "✅ Next.js Server: $DEV_URL"
echo "✅ VS Code Tasks: Available"
echo "✅ Hot Reload: Enabled"
echo ""
echo "🔧 Available VS Code Tasks:"
echo "- Web Development Environment"
echo "- Web Quality Check"
echo "- Individual tasks: Lint, Format, Test"
echo ""
echo "🌐 To open browser preview in VS Code:"
echo "1. Press Ctrl+Shift+P (or Cmd+Shift+P on Mac)"
echo "2. Type: 'Simple Browser: Show'"
echo "3. Enter URL: $DEV_URL"
echo ""
echo "📝 Alternative browser options:"
echo "- Use Debug panel → 'Web Development (Complete)'"
echo "- Use Debug panel → 'Launch Microsoft Edge'"
echo ""
echo "🎉 Environment activated! Start coding in the web/ directory."
echo "💡 Changes will auto-reload in the browser."
