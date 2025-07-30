---
applyTo: '.vscode/settings.json,.vscode/launch.json'
description: 'Microsoft Edge DevTools integration and debugging configuration standards for VS Code'
---

# Microsoft Edge DevTools Debugging Standards

## 🎯 Purpose

This instruction file provides comprehensive Microsoft Edge DevTools integration standards for VS Code, including configuration, debugging workflows, and troubleshooting protocols. It addresses the resolution of CSS inline styles warnings and establishes a complete debugging environment.

## 📋 Prerequisites

- Microsoft Edge DevTools VS Code Extension (`ms-edgedevtools.vscode-edge-devtools`)
- Microsoft Edge browser (stable or dev channel)
- Next.js development environment
- TypeScript project with source maps enabled

## 🔧 VS Code Settings Configuration

### Microsoft Edge DevTools Extension Settings

Configure the following settings in `.vscode/settings.json`:

```json
{
  "vscode-edge-devtools.webviewColumnNumber": 2,
  "vscode-edge-devtools.mirrorEdits": true,
  "vscode-edge-devtools.defaultUrl": "http://localhost:3000",
  "vscode-edge-devtools.browserArguments": [
    "--disable-web-security",
    "--disable-features=VizDisplayCompositor"
  ],
  "vscode-edge-devtools.enableDiagnostics": true,
  "vscode-edge-devtools.useHttps": false,
  "vscode-edge-devtools.userAgent": "",
  "vscode-edge-devtools.headless": false,
  "vscode-edge-devtools.timeout": 10000,
  "vscode-edge-devtools.port": 9222,
  "vscode-edge-devtools.hostname": "localhost"
}
```

### Warning and Issue Control

Disable specific warnings that are resolved through alternative methods:

```json
{
  "edge.devtools.enableInlineStyling": false,
  "edge.devtools.warnings.inlineStyles": "disabled",
  "edge.devtools.linting.enabled": false,
  "edge.devtools.issues.enabled": false,
  "edge.devtools.autoAttach": false
}
```

### Tool Panel Configuration

Enable/disable specific DevTools panels:

```json
{
  "edge.devtools.network.enabled": true,
  "edge.devtools.console.enabled": true,
  "edge.devtools.elements.enabled": true,
  "edge.devtools.application.enabled": true,
  "edge.devtools.sources.enabled": true,
  "edge.devtools.performance.enabled": true,
  "edge.devtools.memory.enabled": true,
  "edge.devtools.security.enabled": true
}
```

## 🚀 Launch Configuration Standards

### Individual Debug Configurations

#### Standard Microsoft Edge Configuration

```json
{
  "type": "msedge",
  "name": "Launch Microsoft Edge",
  "request": "launch",
  "url": "http://localhost:3000",
  "webRoot": "${workspaceFolder}/web",
  "sourceMaps": true,
  "userDataDir": "${workspaceFolder}/.vscode/edge-data",
  "runtimeArgs": [
    "--remote-debugging-port=9222",
    "--disable-web-security",
    "--disable-features=VizDisplayCompositor"
  ],
  "presentation": {
    "hidden": false,
    "group": "browser",
    "order": 1
  }
}
```

#### Headless Mode Configuration

```json
{
  "type": "msedge",
  "name": "Launch Microsoft Edge (Headless)",
  "request": "launch",
  "url": "http://localhost:3000",
  "webRoot": "${workspaceFolder}/web",
  "sourceMaps": true,
  "userDataDir": "${workspaceFolder}/.vscode/edge-data-headless",
  "runtimeArgs": [
    "--headless",
    "--remote-debugging-port=9222",
    "--disable-gpu"
  ],
  "presentation": {
    "hidden": true,
    "group": "browser",
    "order": 2
  }
}
```

#### Mobile Emulation Configuration

```json
{
  "type": "msedge",
  "name": "Debug Mobile View (DevTools)",
  "request": "launch",
  "url": "http://localhost:3000",
  "webRoot": "${workspaceFolder}/web",
  "sourceMaps": true,
  "userDataDir": "${workspaceFolder}/.vscode/edge-data-mobile",
  "runtimeArgs": [
    "--remote-debugging-port=9222",
    "--user-agent=Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1"
  ],
  "presentation": {
    "hidden": false,
    "group": "browser",
    "order": 3
  }
}
```

#### Attach to Existing Edge Instance

```json
{
  "type": "msedge",
  "name": "Attach to existing Edge instance",
  "request": "attach",
  "port": 9222,
  "webRoot": "${workspaceFolder}/web",
  "sourceMaps": true,
  "presentation": {
    "hidden": false,
    "group": "browser",
    "order": 4
  }
}
```

#### Edge DevTools Direct Access

```json
{
  "type": "vscode-edge-devtools.debug",
  "name": "Open Edge DevTools",
  "request": "attach",
  "url": "http://localhost:3000",
  "webRoot": "${workspaceFolder}/web",
  "port": 9222,
  "pathMapping": {
    "/": "${workspaceFolder}/web/",
    "/_next": "${workspaceFolder}/web/.next/",
    "/static": "${workspaceFolder}/web/public/"
  },
  "presentation": {
    "hidden": true,
    "group": "devtools",
    "order": 1
  }
}
```

### Compound Debugging Workflows

#### Complete Web Development Workflow

```json
{
  "name": "Web Development (Complete)",
  "configurations": [
    "Next.js debug full-stack",
    "Launch Microsoft Edge",
    "Open Edge DevTools"
  ],
  "stopAll": true,
  "presentation": {
    "hidden": false,
    "group": "web-dev",
    "order": 1
  }
}
```

#### Mobile Testing Workflow

```json
{
  "name": "Mobile Testing Workflow",
  "configurations": [
    "Next.js debug full-stack",
    "Debug Mobile View (DevTools)"
  ],
  "stopAll": true,
  "presentation": {
    "hidden": false,
    "group": "web-dev",
    "order": 2
  }
}
```

#### Performance Analysis Suite

```json
{
  "name": "Performance Analysis Suite",
  "configurations": [
    "Next.js debug full-stack",
    "Launch Microsoft Edge",
    "Open Edge DevTools"
  ],
  "stopAll": true,
  "presentation": {
    "hidden": false,
    "group": "web-dev",
    "order": 3
  }
}
```

#### Headless Testing Environment

```json
{
  "name": "Headless Testing Environment",
  "configurations": [
    "Python: FastAPI Server",
    "Launch Microsoft Edge (Headless)"
  ],
  "stopAll": true,
  "presentation": {
    "hidden": true,
    "group": "testing",
    "order": 1
  }
}
```

## 🎨 CSS Variables Solution for Inline Styles

### Problem Resolution

The original "no-inline-styles" warning from Edge DevTools has been resolved using CSS variables pattern instead of React inline styles.

### Implementation Pattern

#### Before (Causes Warning)

```tsx
// ❌ Triggers no-inline-styles warning
<div style={{ backgroundColor: color }}>Content</div>
```

#### After (Compliant Solution)

```tsx
// ✅ Uses CSS variables - no warnings
<div
  style={{ '--dynamic-color': color } as React.CSSProperties}
  className={styles.dynamicColor}>
  Content
</div>
```

#### CSS Module Implementation

```css
/* ColorDemo.module.css */
.dynamicColor {
  background-color: var(--dynamic-color, #3367d6);
  /* Fallback color provided */
}
```

### ESLint Configuration

Update `eslint.config.mjs` to handle CSS variables pattern:

```javascript
export default [
  // ... existing config
  {
    rules: {
      'react/no-inline-styles': [
        'error',
        {
          allowCSSVariables: true,
        },
      ],
    },
  },
];
```

## 🔒 Security and Development Settings

### Development Mode Browser Arguments

Essential arguments for development debugging:

```json
{
  "runtimeArgs": [
    "--remote-debugging-port=9222",
    "--disable-web-security",
    "--disable-features=VizDisplayCompositor",
    "--allow-running-insecure-content",
    "--disable-extensions",
    "--no-sandbox",
    "--disable-gpu"
  ]
}
```

### Security Considerations

- **Never use `--disable-web-security` in production**
- Use separate `userDataDir` for isolated debugging sessions
- Configure appropriate timeout values for debugging
- Enable only necessary browser features for development
- Document security implications of development settings

### User Data Directory Management

```json
{
  "userDataDir": "${workspaceFolder}/.vscode/edge-data",
  "userDataDir": "${workspaceFolder}/.vscode/edge-data-headless",
  "userDataDir": "${workspaceFolder}/.vscode/edge-data-mobile"
}
```

## 🗂️ Path Mapping and Source Resolution

### Next.js Path Mapping Configuration

```json
{
  "webRoot": "${workspaceFolder}/web",
  "sourceMapPathOverrides": {
    "webpack:///./~/*": "${workspaceFolder}/web/node_modules/*",
    "webpack:///./*": "${workspaceFolder}/web/*",
    "webpack:///src/*": "${workspaceFolder}/web/src/*",
    "webpack:///(webpack)/buildin/*": "${workspaceFolder}/web/node_modules/webpack/buildin/*"
  },
  "pathMapping": {
    "/": "${workspaceFolder}/web/",
    "/_next": "${workspaceFolder}/web/.next/",
    "/static": "${workspaceFolder}/web/public/"
  }
}
```

### Source Map Integration

Ensure proper source map configuration in `next.config.js`:

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

## 📊 Performance Optimization

### Skip Files Configuration

```json
{
  "skipFiles": [
    "node_modules/**",
    "${workspaceFolder}/web/.next/**",
    "${workspaceFolder}/web/out/**",
    "**/webpack/**",
    "**/babel/**"
  ]
}
```

### Advanced Debugging Features

```json
{
  "smartStep": true,
  "justMyCode": true,
  "stopOnEntry": false,
  "showAsyncStacks": true,
  "trace": "verbose"
}
```

## 🚨 Error Handling and Troubleshooting

### Common Configuration Issues

1. **Port 9222 Already in Use**

   ```bash
   # Find process using port
   lsof -i :9222

   # Kill process
   kill -9 <PID>
   ```

2. **DevTools Not Connecting**
   - Restart VS Code
   - Check Edge browser installation
   - Verify port availability
   - Clear user data directories

3. **Source Maps Not Working**
   - Check `sourceMaps: true` in configuration
   - Verify webpack source map settings
   - Ensure file paths are correct
   - Validate `webRoot` configuration

4. **Breakpoints Not Hitting**
   - Verify source map generation
   - Check path mapping configuration
   - Ensure TypeScript compilation includes source maps
   - Validate `sourceMapPathOverrides` settings

### Clean Reset Procedure

```bash
# Remove all user data directories
rm -rf .vscode/edge-data*

# Clear Next.js cache
rm -rf web/.next

# Restart development server
npm run dev
```

## 📖 Usage Instructions

### Quick Start

1. **Configure VS Code Settings**
   - Add Edge DevTools settings to `.vscode/settings.json`
   - Configure warning disabling and tool panels

2. **Set Up Launch Configurations**
   - Add individual debug configurations to `.vscode/launch.json`
   - Configure compound workflows for different scenarios

3. **Start Debugging**
   - Press `F5` to open debug configuration picker
   - Select appropriate workflow for your scenario
   - Use compound configurations for complete workflows

### Workflow Selection Guide

- **Daily Development**: Use "Web Development (Complete)"
- **Mobile Testing**: Use "Mobile Testing Workflow"
- **Performance Analysis**: Use "Performance Analysis Suite"
- **Automated Testing**: Use "Headless Testing Environment"
- **Quick Debugging**: Use individual Edge configurations

### Best Practices

1. **Development Workflow**
   - Use compound configurations for comprehensive debugging
   - Set breakpoints in source files, not transpiled code
   - Leverage DevTools Console for quick testing
   - Use Network tab for API debugging

2. **Performance Optimization**
   - Use Performance tab for profiling
   - Monitor memory usage with Memory tab
   - Analyze network requests for optimization
   - Use Lighthouse for comprehensive analysis

3. **Mobile Development**
   - Test with mobile user agents
   - Use device emulation for responsive design
   - Debug touch interactions
   - Validate PWA features

## 🔄 Integration with Memory Bank

### Dependencies Update

This instruction file depends on:

- `memory-bank/dependencies.md` - Track Edge DevTools extension
- `memory-bank/systemPatterns.md` - Document debugging patterns
- `memory-bank/activeContext.md` - Update current debugging state

### Progress Tracking

Update `memory-bank/progress.md` with:

- Edge DevTools configuration completion
- CSS variables implementation success
- Launch configuration setup
- Debugging workflow establishment

## 📚 Additional Resources

- [Microsoft Edge DevTools Documentation](https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/)
- [VS Code Debugging Guide](https://code.visualstudio.com/docs/editor/debugging)
- [Edge DevTools Extension](https://marketplace.visualstudio.com/items?itemName=ms-edgedevtools.vscode-edge-devtools)
- [Next.js Debugging](https://nextjs.org/docs/advanced-features/debugging)

---

**Note**: This instruction file follows the strict protocol requirements for `.github/instructions/` directory. All settings and configurations must be applied through proper VS Code settings and launch configuration files. No unauthorized files should be created in `.vscode/` directory beyond standard VS Code configuration files.
