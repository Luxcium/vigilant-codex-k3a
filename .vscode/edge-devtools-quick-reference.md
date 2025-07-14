# Edge DevTools Quick Reference

## 🚀 Quick Launch Commands

| Keyboard   | Configuration         | Purpose                          |
| ---------- | --------------------- | -------------------------------- |
| `F5`       | Debug menu            | Open configuration picker        |
| `Ctrl+F5`  | Run without debugging | Start without breakpoints        |
| `Shift+F5` | Stop debugging        | Terminate all debugging sessions |

## 🎯 Debug Configurations

### Individual Configurations

| Configuration                              | Use Case               | Key Features                   |
| ------------------------------------------ | ---------------------- | ------------------------------ |
| **Launch Microsoft Edge**                  | Standard development   | Security disabled, source maps |
| **Launch Microsoft Edge in headless mode** | Automated testing      | No UI, fast execution          |
| **Attach to existing Edge instance**       | Debug running browser  | Connect to live session        |
| **Launch Edge with DevTools Extensions**   | Enhanced debugging     | Custom extensions loaded       |
| **Debug Mobile View (DevTools)**           | Mobile development     | iPhone emulation               |
| **Open Edge DevTools**                     | Direct DevTools access | Advanced path mapping          |

### Compound Workflows

| Workflow                         | Components                         | Best For          |
| -------------------------------- | ---------------------------------- | ----------------- |
| **Web Development (Complete)**   | Next.js + Edge + DevTools          | Daily development |
| **Frontend + Edge DevTools**     | Frontend + Browser + Tools         | UI debugging      |
| **Mobile Testing Workflow**      | Next.js + Mobile Edge              | Responsive design |
| **Performance Analysis Suite**   | Next.js + Enhanced Edge + DevTools | Optimization      |
| **Headless Testing Environment** | Backend + Headless Edge            | CI/CD testing     |

## 🛠️ Common Browser Arguments

```json
// Security disabled for development
"--disable-web-security"

// Better DevTools integration
"--disable-features=VizDisplayCompositor"

// Enable debugging protocol
"--remote-debugging-port=9222"

// Headless mode
"--headless"

// Mobile emulation
"--user-agent=Mozilla/5.0 (iPhone; ...)"
```

## 🔍 Debugging Tips

### Breakpoints

- **Source files**: Set in `.tsx`, `.ts` files
- **Line breakpoints**: Click line number
- **Conditional breakpoints**: Right-click line number
- **Logpoints**: Add console.log without code changes

### DevTools Panels

- **Elements**: DOM inspection, CSS editing
- **Console**: JavaScript execution, error logs
- **Sources**: Source code debugging, breakpoints
- **Network**: API calls, performance monitoring
- **Performance**: Profiling, bottleneck analysis
- **Memory**: Heap analysis, leak detection

### Source Maps

- Ensure `sourceMaps: true` in configuration
- Check webpack source map settings
- Verify file path mappings

## 🚨 Troubleshooting

### Port 9222 in use

```bash
# Find process using port
lsof -i :9222

# Kill process
kill -9 <PID>
```

### DevTools not connecting

1. Check Edge browser arguments
2. Verify port availability
3. Restart VS Code debugging session

### Breakpoints not hitting

1. Check source map generation
2. Verify `webRoot` configuration
3. Ensure file paths are correct

### Clean reset

```bash
# Remove user data directories
rm -rf .vscode/edge-data*

# Restart debugging session
```

## 📱 Mobile Debugging

### User Agents

- **iPhone**: `Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15`
- **Android**: `Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36`
- **iPad**: `Mozilla/5.0 (iPad; CPU OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15`

### Mobile-Specific Testing

- Touch events
- Viewport meta tag
- Responsive CSS
- Mobile performance
- Touch interactions

## 🔧 Keyboard Shortcuts (in DevTools)

| Shortcut       | Action          |
| -------------- | --------------- |
| `F12`          | Toggle DevTools |
| `Ctrl+Shift+I` | Open DevTools   |
| `Ctrl+Shift+J` | Open Console    |
| `Ctrl+Shift+C` | Select element  |
| `F8`           | Resume/Pause    |
| `F10`          | Step over       |
| `F11`          | Step into       |
| `Shift+F11`    | Step out        |

## 📂 File Structure

```
.vscode/
├── launch.json              # Debug configurations
├── settings.json            # Edge DevTools settings
├── edge-devtools-config.md  # Configuration documentation
├── edge-devtools-debug-guide.md  # Complete guide
├── edge-devtools-quick-reference.md  # This file
└── devtools-extensions/     # Custom extensions
    └── README.md
```

---

**Quick Start**: Press `F5` → Select "Web Development (Complete)" → Start debugging!
