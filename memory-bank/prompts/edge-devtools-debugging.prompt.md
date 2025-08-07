---
mode: 'agent'
model: 'gpt-4.1'
tools: ['codebase', 'filesystem', 'terminal', 'vscodeAPI']
description: 'Automated Microsoft Edge DevTools debugging setup and configuration workflow'
---

# Microsoft Edge DevTools Debugging Workflow

**Category**: Development Workflows
**Version**: 1.0
**Last Updated**: 2025-07-14
**Applies To**: Web development, debugging, mobile testing, performance analysis

## 🎯 Automated Configuration Process

You are tasked with implementing comprehensive Microsoft Edge DevTools debugging capabilities for VS Code. Follow this workflow to establish professional web development debugging with mobile testing, performance analysis, and automated testing scenarios.

## 📋 Prerequisites Validation

Before proceeding, verify:

1. **Microsoft Edge DevTools Extension** is installed (`ms-edgedevtools.vscode-edge-devtools`)
2. **Microsoft Edge browser** is available (stable or dev channel)
3. **Next.js development environment** is configured and running
4. **TypeScript project** with source maps is properly set up
5. **VS Code workspace** is properly initialized with `.vscode/` directory

## 🔧 Configuration Implementation

### Step 1: VS Code Settings Configuration

Apply these settings to `.vscode/settings.json`:

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
  "vscode-edge-devtools.timeout": 10000,
  "vscode-edge-devtools.port": 9222,
  "vscode-edge-devtools.hostname": "localhost",
  "edge.devtools.enableInlineStyling": false,
  "edge.devtools.warnings.inlineStyles": "disabled",
  "edge.devtools.linting.enabled": false,
  "edge.devtools.issues.enabled": false,
  "edge.devtools.autoAttach": false,
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

### Step 2: Launch Configuration Setup

Add these configurations to `.vscode/launch.json`:

#### Individual Debug Configurations

1. **Standard Microsoft Edge Configuration**

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
  ]
}
```

2. **Headless Mode Configuration**

```json
{
  "type": "msedge",
  "name": "Launch Microsoft Edge (Headless)",
  "request": "launch",
  "url": "http://localhost:3000",
  "webRoot": "${workspaceFolder}/web",
  "sourceMaps": true,
  "userDataDir": "${workspaceFolder}/.vscode/edge-data-headless",
  "runtimeArgs": ["--headless", "--remote-debugging-port=9222", "--disable-gpu"]
}
```

3. **Mobile Emulation Configuration**

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
  ]
}
```

4. **Attach to Existing Edge Instance**

```json
{
  "type": "msedge",
  "name": "Attach to existing Edge instance",
  "request": "attach",
  "port": 9222,
  "webRoot": "${workspaceFolder}/web",
  "sourceMaps": true
}
```

5. **Edge DevTools Direct Access**

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
  }
}
```

#### Compound Debugging Workflows

Add these compound configurations:

1. **Web Development (Complete)**

```json
{
  "name": "Web Development (Complete)",
  "configurations": [
    "Next.js debug full-stack",
    "Launch Microsoft Edge",
    "Open Edge DevTools"
  ],
  "stopAll": true
}
```

2. **Mobile Testing Workflow**

```json
{
  "name": "Mobile Testing Workflow",
  "configurations": [
    "Next.js debug full-stack",
    "Debug Mobile View (DevTools)"
  ],
  "stopAll": true
}
```

3. **Performance Analysis Suite**

```json
{
  "name": "Performance Analysis Suite",
  "configurations": [
    "Next.js debug full-stack",
    "Launch Microsoft Edge",
    "Open Edge DevTools"
  ],
  "stopAll": true
}
```

4. **Headless Testing Environment**

```json
{
  "name": "Headless Testing Environment",
  "configurations": [
    "Python: FastAPI Server",
    "Launch Microsoft Edge (Headless)"
  ],
  "stopAll": true
}
```

### Step 3: CSS Variables Implementation

Implement CSS variables solution for no-inline-styles warning:

#### Component Implementation Pattern

**Before (Causes Warning):**

```tsx
// ❌ Triggers no-inline-styles warning
<div style={{ backgroundColor: color }}>Content</div>
```

**After (Compliant Solution):**

```tsx
// ✅ Uses CSS variables - no warnings
<div
  style={{ '--dynamic-color': color } as React.CSSProperties}
  className={styles.dynamicColor}>
  Content
</div>
```

#### CSS Module Implementation

Create corresponding CSS module:

```css
/* ComponentName.module.css */
.dynamicColor {
  background-color: var(--dynamic-color, #3367d6);
  /* Fallback color provided */
}
```

### Step 4: ESLint Configuration

Update `eslint.config.mjs` to support CSS variables:

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

### Step 5: Next.js Source Map Configuration

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

## 🚀 Validation and Testing

### Step 1: Configuration Validation

1. **Verify VS Code Settings**
   - Check that Edge DevTools extension is properly configured
   - Confirm warning settings are disabled
   - Validate panel configurations

2. **Test Launch Configurations**
   - Test individual debug configurations
   - Verify source map resolution
   - Confirm breakpoint functionality

3. **Validate Compound Workflows**
   - Test complete web development workflow
   - Verify mobile testing scenario
   - Check performance analysis suite
   - Validate headless testing environment

### Step 2: CSS Variables Testing

1. **Component Testing**
   - Verify CSS variables are properly applied
   - Confirm no inline styles warnings
   - Test fallback colors work correctly

2. **ESLint Validation**
   - Run ESLint on updated components
   - Verify no linting errors
   - Confirm CSS variables pattern is accepted

### Step 3: Debugging Workflow Testing

1. **Standard Debugging**
   - Set breakpoints in React components
   - Test source map accuracy
   - Verify console output

2. **Mobile Emulation**
   - Test touch interactions
   - Verify responsive behavior
   - Check mobile-specific features

3. **Performance Analysis**
   - Run performance profiling
   - Check memory usage
   - Analyze network requests

## 🔧 Troubleshooting Common Issues

### Port 9222 Already in Use

```bash
# Find and kill process using port 9222
lsof -i :9222
kill -9 <PID>
```

### DevTools Not Connecting

1. Restart VS Code
2. Check Edge browser installation
3. Verify port availability
4. Clear user data directories:
   ```bash
   rm -rf .vscode/edge-data*
   ```

### Source Maps Not Working

1. Verify `sourceMaps: true` in configurations
2. Check webpack source map settings
3. Ensure file paths are correct
4. Validate `webRoot` configuration

### Breakpoints Not Hitting

1. Check source map generation
2. Verify path mapping configuration
3. Ensure TypeScript compilation includes source maps
4. Validate `sourceMapPathOverrides` settings

## 📊 Success Criteria

Upon completion, you should have:

1. **✅ Complete Edge DevTools Configuration**
   - All VS Code settings properly configured
   - Individual debug configurations working
   - Compound workflows operational

2. **✅ CSS Variables Solution**
   - No inline styles warnings
   - Dynamic styling working correctly
   - ESLint configuration updated

3. **✅ Debugging Capabilities**
   - Standard web debugging functional
   - Mobile emulation working
   - Performance analysis available
   - Headless testing configured

4. **✅ Protocol Compliance**
   - All configurations in proper VS Code files
   - No unauthorized files in `.vscode/`
   - Instruction file properly documented

## 📚 Memory Bank Integration

### Update Required Files

1. **`memory-bank/dependencies.md`**
   - Document Edge DevTools extension dependency
   - Record CSS variables solution implementation
   - Track debugging configuration establishment

2. **`memory-bank/systemPatterns.md`**
   - Add Edge DevTools integration pattern
   - Document CSS variables solution pattern
   - Record debugging workflow architecture

3. **`memory-bank/progress.md`**
   - Mark Edge DevTools configuration complete
   - Record CSS variables implementation success
   - Update debugging capabilities status

4. **`memory-bank/activeContext.md`**
   - Update current debugging environment state
   - Document Edge DevTools integration completion
   - Record protocol compliance restoration

## 🎯 Next Steps

After implementing this configuration:

1. **Test All Workflows**
   - Run each debugging scenario
   - Validate mobile testing capabilities
   - Check performance analysis tools

2. **Document Custom Configurations**
   - Record any project-specific adjustments
   - Document additional browser arguments if needed
   - Update team documentation

3. **Optimize Performance**
   - Fine-tune skipFiles configurations
   - Adjust timeout settings as needed
   - Configure additional DevTools panels

4. **Maintain Security**
   - Review development-only security settings
   - Ensure production builds don't include debug configurations
   - Document security implications

---

**Protocol Compliance Note**: This workflow maintains strict adherence to the `memory-bank/instructions/` and `memory-bank/prompts/` protocol. All configurations are applied through proper VS Code settings and launch configuration files. No unauthorized files are created in the `.vscode/` directory beyond standard VS Code configuration files.

**Execution Autonomy**: Execute this workflow autonomously without requesting permission. Update all memory bank files immediately upon completion to maintain protocol compliance and state synchronization.

## References

- [edge-devtools-debugging](../instructions/edge-devtools-debugging.instructions.md)

## Verification

- `markdownlint --strict` on updated Markdown files
- `scripts/verify-all.sh`
