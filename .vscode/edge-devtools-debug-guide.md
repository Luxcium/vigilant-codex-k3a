# Microsoft Edge DevTools - Complete Debugging Guide

## Overview

This guide provides comprehensive information for using Microsoft Edge DevTools with VS Code for web development debugging, testing, and performance analysis. This setup provides the "full spectrum of customization and instrumentation possible" for Edge DevTools integration.

## 🚀 Quick Start

### Prerequisites

1. **Microsoft Edge DevTools VS Code Extension**: `ms-edgedevtools.vscode-edge-devtools` (v2.1.9+)
2. **Microsoft Edge Browser**: Latest stable or dev channel
3. **Next.js Development Server**: Running on `http://localhost:3000`
4. **Python FastAPI Backend**: Running on `http://localhost:8000`

### Launch Configurations Available

#### Individual Debugging Configurations

1. **Launch Microsoft Edge**
   - Standard Edge debugging with security disabled
   - Remote debugging port: 9222
   - User data directory: `.vscode/edge-data`

2. **Launch Microsoft Edge in headless mode**
   - Headless debugging for automated testing
   - GPU acceleration disabled
   - User data directory: `.vscode/edge-data-headless`

3. **Attach to existing Edge instance**
   - Connect to already running Edge browser
   - Useful for debugging live sessions

4. **Launch Edge with DevTools Extensions**
   - Enhanced debugging with additional tools
   - Skip files configuration for cleaner debugging
   - Security features disabled for development

5. **Debug Mobile View (DevTools)**
   - Mobile user-agent emulation
   - iPhone Safari user-agent string
   - Mobile-specific debugging scenarios

6. **Open Edge DevTools**
   - Direct DevTools attachment
   - Advanced path mapping for Next.js
   - Source map support with custom paths

#### Compound Debugging Workflows

1. **Web Development (Complete)**
   - Full-stack Next.js debugging
   - Edge browser launch
   - DevTools integration
   - Complete development environment

2. **Frontend + Edge DevTools**
   - Frontend-focused debugging
   - Browser and DevTools sync
   - Client-side performance analysis

3. **Mobile Testing Workflow**
   - Mobile emulation debugging
   - Responsive design testing
   - Touch interaction debugging

4. **Performance Analysis Suite**
   - Enhanced debugging with extensions
   - Performance profiling tools
   - Memory and network analysis

5. **Headless Testing Environment**
   - Backend + headless browser
   - Automated testing scenarios
   - CI/CD integration ready

## ⚙️ Configuration Details

### Edge Browser Arguments

| Argument                                  | Purpose                      | Usage                   |
| ----------------------------------------- | ---------------------------- | ----------------------- |
| `--remote-debugging-port=9222`            | Enable debugging protocol    | All configurations      |
| `--disable-web-security`                  | Allow cross-origin requests  | Development only        |
| `--disable-features=VizDisplayCompositor` | Better DevTools integration  | Standard debugging      |
| `--headless`                              | Run without UI               | Automated testing       |
| `--disable-gpu`                           | Disable GPU in headless mode | Headless configurations |
| `--allow-running-insecure-content`        | Allow mixed content          | Development with HTTPS  |
| `--user-agent="..."`                      | Mobile emulation             | Mobile testing          |

### Path Mapping Configuration

```json
"pathMapping": {
  "/": "${workspaceFolder}/web/",
  "/_next": "${workspaceFolder}/web/.next/",
  "/static": "${workspaceFolder}/web/public/"
}
```

This configuration ensures proper source map resolution for:

- **Root paths**: Map to web directory
- **Next.js internal paths**: Map to build directory
- **Static assets**: Map to public directory

### Skip Files Configuration

```json
"skipFiles": [
  "node_modules/**",
  "${workspaceFolder}/web/.next/**"
]
```

Improves debugging experience by skipping:

- **Third-party libraries**: Focus on your code
- **Build artifacts**: Avoid generated code

## 🔧 Advanced Usage

### 1. Source Map Configuration

Ensure your `next.config.js` includes:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  webpack: (config, { dev }) => {
    if (dev) {
      config.devtool = 'eval-source-map';
    }
    return config;
  },
};

module.exports = nextConfig;
```

### 2. Edge DevTools Settings Integration

The following VS Code settings enhance the debugging experience:

```json
{
  "vscode-edge-devtools.webviewColumnNumber": 2,
  "vscode-edge-devtools.mirrorEdits": true,
  "vscode-edge-devtools.defaultUrl": "http://localhost:3000",
  "vscode-edge-devtools.browserArguments": [
    "--disable-web-security",
    "--disable-features=VizDisplayCompositor"
  ]
}
```

### 3. Custom DevTools Extensions

Create `.vscode/devtools-extensions` directory for custom extensions:

```bash
mkdir -p .vscode/devtools-extensions
# Place extension directories here
```

### 4. User Data Directory Management

Each configuration uses separate user data directories:

- **Standard**: `.vscode/edge-data`
- **Headless**: `.vscode/edge-data-headless`
- **Extensions**: `.vscode/edge-data-ext`
- **Mobile**: `.vscode/edge-data-mobile`

This prevents configuration conflicts between different debugging scenarios.

## 🐛 Debugging Workflows

### Frontend Development Workflow

1. **Start the debugging session**:

   ```
   F5 → "Web Development (Complete)"
   ```

2. **Set breakpoints** in:
   - React components (`.tsx` files)
   - API routes (`/pages/api` or `/app/api`)
   - Utility functions

3. **Use DevTools for**:
   - DOM inspection
   - CSS live editing
   - Network monitoring
   - Performance profiling

### Mobile Development Workflow

1. **Launch mobile debugging**:

   ```
   F5 → "Mobile Testing Workflow"
   ```

2. **Test responsive behavior**:
   - Touch interactions
   - Viewport changes
   - Mobile-specific CSS

3. **Debug mobile issues**:
   - Touch event handling
   - Mobile performance
   - Responsive design

### Performance Analysis Workflow

1. **Start performance suite**:

   ```
   F5 → "Performance Analysis Suite"
   ```

2. **Use DevTools Performance tab**:
   - Record performance profiles
   - Analyze rendering bottlenecks
   - Memory leak detection

3. **Network analysis**:
   - Monitor API calls
   - Analyze bundle sizes
   - Check caching behavior

## 🔍 Troubleshooting

### Common Issues

1. **DevTools not connecting**:
   - Ensure port 9222 is available
   - Check if Edge is already running
   - Verify browser arguments

2. **Source maps not working**:
   - Check `sourceMaps: true` in configuration
   - Verify webpack source map settings
   - Ensure file paths are correct

3. **Breakpoints not hitting**:
   - Check `webRoot` configuration
   - Verify path mapping settings
   - Ensure source maps are generated

### Port Conflicts

If port 9222 is in use:

1. **Find the process**:

   ```bash
   lsof -i :9222
   ```

2. **Kill the process**:

   ```bash
   kill -9 <PID>
   ```

3. **Or use a different port** in configurations

### Edge Browser Issues

1. **Reset user data directory**:

   ```bash
   rm -rf .vscode/edge-data*
   ```

2. **Clear browser cache** in DevTools:
   - Open DevTools
   - Right-click refresh button
   - Select "Empty Cache and Hard Reload"

## 📚 Integration with Testing

### Jest Configuration

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
};
```

### Playwright Integration

```javascript
// playwright.config.js
module.exports = {
  use: {
    browserName: 'msedge',
    headless: process.env.CI === 'true',
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
};
```

## 🎯 Best Practices

### 1. Development Workflow

- Use **"Web Development (Complete)"** for daily development
- Switch to **"Mobile Testing Workflow"** for responsive design
- Use **"Performance Analysis Suite"** for optimization
- Use **"Headless Testing Environment"** for CI/CD

### 2. Debugging Strategy

- Set breakpoints in source files, not transpiled code
- Use DevTools Console for quick JavaScript testing
- Leverage Network tab for API debugging
- Use Performance tab for optimization

### 3. Configuration Management

- Keep user data directories in `.gitignore`
- Version control the launch configuration
- Document custom browser arguments
- Test configurations across team environments

### 4. Security Considerations

- Only disable web security in development
- Use separate user data directories
- Don't commit sensitive browser data
- Re-enable security for production testing

## 📖 Additional Resources

### Official Documentation

- [Microsoft Edge DevTools VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ms-edgedevtools.vscode-edge-devtools)
- [VS Code Debugging Guide](https://code.visualstudio.com/docs/editor/debugging)
- [Edge DevTools Documentation](https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/)

### Advanced Topics

- [Source Maps Deep Dive](https://developers.google.com/web/tools/chrome-devtools/javascript/source-maps)
- [Performance Profiling](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/)
- [Mobile Debugging](https://developers.google.com/web/tools/chrome-devtools/device-mode/)

---

This setup provides comprehensive Edge DevTools integration with VS Code, enabling full-spectrum debugging, testing, and development workflows for modern web applications.
