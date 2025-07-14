# Microsoft Edge DevTools Configuration Guide

## Overview

This document provides comprehensive configuration options for Microsoft Edge DevTools VS Code extension to handle various scenarios and warnings.

## Configuration Options

### 1. Disable Specific Warnings

```json
{
  "edge.devtools.warnings.inlineStyles": "disabled",
  "edge.devtools.linting.enabled": false,
  "edge.devtools.issues.enabled": false
}
```

### 2. Enable Specific Tools

```json
{
  "edge.devtools.network.enabled": true,
  "edge.devtools.console.enabled": true,
  "edge.devtools.elements.enabled": true,
  "edge.devtools.application.enabled": true,
  "edge.devtools.sources.enabled": true
}
```

### 3. Auto-attach Configuration

```json
{
  "edge.devtools.autoAttach": false
}
```

## Handling Warnings

### no-inline-styles Warning

**Problem**: CSS inline styles should not be used, move styles to an external CSS file

**Solutions**:

1. **Use CSS Variables (Recommended)**:

   ```tsx
   // Component
   <div style={{ '--dynamic-color': color } as React.CSSProperties}>

   // CSS
   .dynamicColor {
     background-color: var(--dynamic-color, #3367d6);
   }
   ```

2. **Disable in ESLint**:

   ```javascript
   rules: {
     'react/no-inline-styles': 'off',
   }
   ```

3. **Disable in VS Code Settings**:

   ```json
   {
     "edge.devtools.warnings.inlineStyles": "disabled"
   }
   ```

4. **Inline Comment Disable**:
   ```tsx
   {/* eslint-disable-next-line react/no-inline-styles */}
   <div style={{ backgroundColor: color }}>
   ```

### Future Scenarios

For any future warnings or issues:

1. **Check VS Code Settings**: Look for `edge.devtools.*` settings
2. **ESLint Configuration**: Add rules to `eslint.config.mjs`
3. **Per-file Disable**: Use `eslint-disable` comments
4. **Global Disable**: Add to workspace settings

## Tool-Specific Configurations

### Elements Tool

- Inspect and modify DOM
- Live CSS editing with source map support

### Console Tool

- JavaScript execution
- Error logging and debugging

### Network Tool

- Request/response inspection
- Performance monitoring

### Application Tool

- Storage inspection
- Service worker debugging
- PWA manifest validation

### Sources Tool

- Breakpoint debugging
- Source map support

## Best Practices

1. **Prefer CSS Modules**: Use external stylesheets over inline styles
2. **Use CSS Variables**: For dynamic styling needs
3. **Configure Appropriately**: Enable only needed tools
4. **Handle Warnings**: Address in code first, then configuration
5. **Document Exceptions**: When disabling rules, explain why

## Troubleshooting

### Common Issues

1. **Extension Not Working**: Check if Edge browser is installed
2. **Warnings Persist**: Restart VS Code after configuration changes
3. **Performance Issues**: Disable unused tools in settings
4. **Source Maps**: Ensure proper build configuration

### Support Resources

- [Microsoft Edge DevTools Documentation](https://learn.microsoft.com/en-us/microsoft-edge/visual-studio-code/microsoft-edge-devtools-extension)
- [VS Code Extension Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-edgedevtools.vscode-edge-devtools)
- [GitHub Repository](https://github.com/Microsoft/vscode-edge-devtools)

## 📚 Additional Resources

- **[Complete Debugging Guide](./edge-devtools-debug-guide.md)**: Comprehensive setup and workflows
- **[Quick Reference](./edge-devtools-quick-reference.md)**: Fast lookup for configurations and shortcuts
- **[DevTools Extensions](./devtools-extensions/README.md)**: Custom extension management
- **[Microsoft Edge DevTools Documentation](https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/)**
- **[VS Code Debugging Documentation](https://code.visualstudio.com/docs/editor/debugging)**

## 🎯 Next Steps

1. **Set up debugging**: Configure `launch.json` with Edge debugging configurations
2. **Install extensions**: Add React DevTools, Redux DevTools to `devtools-extensions/`
3. **Test workflows**: Try the compound debugging configurations
4. **Optimize performance**: Use Performance Analysis Suite for optimization
5. **Mobile testing**: Use Mobile Testing Workflow for responsive design

---

This configuration provides comprehensive Microsoft Edge DevTools integration for modern web development workflows.
