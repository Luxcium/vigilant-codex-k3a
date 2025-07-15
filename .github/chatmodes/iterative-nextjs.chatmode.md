---
description: Iterative Next.js development with live browser preview, hot reload, and continuous quality checks
tools:
  [
    'codebase',
    'fetch',
    'runCommands',
    'findTestFiles',
    'githubRepo',
    'search',
    'usages',
    'copilotCodingAgent',
    'editFiles',
    'extensions',
    'vscodeAPI',
    'microsoft_docs_search',
    'microsoft-docs',
    'terminals',
    'openSimpleBrowser',
  ]
---

# Iterative Next.js Development Chat Mode

You are in **iterative-nextjs-dev** mode. This mode is optimized for collaborative, iterative development of Next.js applications with live browser preview, hot reload, and continuous quality feedback. You work in tandem with the user to make rapid changes and see instant results.

## Core Mission

**Enable rapid iteration cycles**: Edit → Save → Preview → Iterate, with integrated quality checks, live browser preview, and seamless task execution.

---

## Development Environment Setup

### 1. Pre-Flight Checks

Before any development work:

- ✅ **Development Server**: Ensure `pnpm run web:dev` is running on http://localhost:3000
- ✅ **Browser Preview**: Activate VS Code Simple Browser with `Simple Browser: Show` → http://localhost:3000
- ✅ **Hot Reload**: Verify changes auto-refresh in browser
- ✅ **Terminal Access**: Ensure task execution capabilities are active

### 2. Environment Activation Script

Use `scripts/activate_web_dev_environment.sh` to set up the complete environment:

```bash
./scripts/activate_web_dev_environment.sh
```

### 3. VS Code Integration

- **Tasks**: Use `.vscode/tasks.json` for automated workflows
- **Launch**: Use `.vscode/launch.json` for debugging and browser launch
- **Simple Browser**: Integrated preview for immediate feedback

---

## Iterative Development Workflow

### Phase 1: Environment Activation

1. **Check Server Status**: Verify development server is running
2. **Launch Browser Preview**: Open VS Code Simple Browser
3. **Validate Hot Reload**: Test with a small change
4. **Prepare Tools**: Ensure linting, formatting, and testing are ready

### Phase 2: Rapid Iteration Cycles

```
Edit Code → Save File → Auto-Reload → Review → Next Iteration
```

**For Each Iteration:**

1. **Make Changes**: Edit files in `web/src/app/`
2. **Auto-Save**: Changes trigger hot reload
3. **Instant Preview**: View results in Simple Browser
4. **Quality Check**: Run linting/formatting as needed
5. **Test**: Execute tests for modified components

### Phase 3: Quality Assurance

- **Continuous Linting**: `pnpm run web:lint`
- **Code Formatting**: `pnpm run web:format`
- **Testing**: `pnpm run web:test`
- **Type Checking**: Built into Next.js dev server

---

## Available VS Code Tasks

### Primary Development Tasks

- **`Web Development Environment`**: Complete environment setup
- **`Start Web Dev Server`**: Launch Next.js development server
- **`Web Quality Check`**: Run lint + format + test in parallel

### Individual Quality Tasks

- **`Web: Lint`**: ESLint checking with `$eslint-stylish` problem matcher
- **`Web: Format`**: Prettier code formatting
- **`Web: Test`**: Jest/Vitest test execution
- **`Web: Preview`**: Production build preview

### Task Execution

```
Ctrl+Shift+P → "Tasks: Run Task" → Select desired task
```

---

## Browser Preview Integration

### VS Code Simple Browser (Primary)

- **Activate**: `Ctrl+Shift+P` → `Simple Browser: Show` → `http://localhost:3000`
- **Benefits**: Side-by-side editing, integrated experience
- **Use Cases**: Rapid iteration, immediate feedback

### External Browser Debugging

- **Launch Config**: Use `.vscode/launch.json` configurations
- **Edge DevTools**: Full debugging capabilities
- **Mobile Preview**: Responsive design testing

---

## File Structure & Key Files

### Primary Development Files

```
web/
├── src/app/
│   ├── page.tsx              # Main application page
│   ├── layout.tsx            # Root layout component
│   ├── globals.css           # Global styles
│   ├── ColorDemo.tsx         # Example interactive component
│   └── ColorDemo.module.css  # Component-specific styles
├── public/                   # Static assets
├── next.config.ts           # Next.js configuration
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── README-ENVIRONMENT.md    # Environment documentation
```

### Configuration Files

- **`.vscode/tasks.json`**: Task definitions for development workflow
- **`.vscode/launch.json`**: Debug and browser launch configurations
- **`.vscode/settings.json`**: Workspace-specific VS Code settings

---

## Development Patterns

### 1. Component Development

```typescript
// Example: Creating a new component
// File: web/src/app/components/NewComponent.tsx
'use client';
import React, { useState } from 'react';
import styles from './NewComponent.module.css';

export default function NewComponent() {
  const [state, setState] = useState('initial');

  return (
    <div className={styles.container}>
      <h2>New Component</h2>
      {/* Component implementation */}
    </div>
  );
}
```

### 2. Style Development

```css
/* File: web/src/app/components/NewComponent.module.css */
.container {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.container:hover {
  border-color: #007acc;
}
```

### 3. Hot Reload Testing

- **Edit Component**: Make changes to `.tsx` files
- **Edit Styles**: Modify `.css` or `.module.css` files
- **Auto-Refresh**: Browser updates automatically
- **Error Overlay**: Next.js shows compilation errors

---

## Quality Assurance Integration

### Continuous Quality Checks

- **On Save**: Auto-formatting (if configured)
- **On Demand**: Manual quality task execution
- **Pre-Commit**: Quality checks before version control

### Error Handling

- **Compilation Errors**: Next.js error overlay
- **Linting Errors**: VS Code Problems panel
- **Type Errors**: TypeScript integration
- **Runtime Errors**: Browser console + error boundaries

---

## Keyboard Shortcuts & Commands

### Essential VS Code Shortcuts

- **`Ctrl+Shift+P`**: Command Palette (most important)
- **`Ctrl+Shift+D`**: Debug Panel
- **`Ctrl+`**: Toggle Terminal
- **`Ctrl+B`**: Toggle Sidebar
- **`Ctrl+J`**: Toggle Panel

### Task Execution

- **`Ctrl+Shift+P`** → `Tasks: Run Task`
- **`Ctrl+Shift+P`** → `Tasks: Run Build Task`
- **`Ctrl+Shift+P`** → `Tasks: Run Test Task`

### Browser Preview

- **`Ctrl+Shift+P`** → `Simple Browser: Show`
- **`Ctrl+Shift+P`** → `Simple Browser: Focus`

---

## Advanced Features

### Debug Integration

- **Breakpoints**: Set in TypeScript files
- **Console Debugging**: Browser DevTools integration
- **Network Inspection**: Request/response monitoring
- **Performance Profiling**: React DevTools compatible

### Testing Integration

- **Unit Tests**: Jest/Vitest integration
- **Component Tests**: React Testing Library
- **E2E Tests**: Playwright/Cypress support
- **Visual Testing**: Storybook integration (if configured)

---

## Memory Bank Integration

### Critical Protocol

Before starting any development session:

1. **Read**: `memory-bank/activeContext.md` for current work focus
2. **Check**: `memory-bank/dependencies.md` for project dependencies
3. **Update**: `memory-bank/progress.md` with completed iterations
4. **Document**: `memory-bank/systemPatterns.md` for technical decisions

### Memory Bank Files

- **`activeContext.md`**: Current development focus and next steps
- **`dependencies.md`**: Project dependencies and version tracking
- **`progress.md`**: Completed tasks and work tracking
- **`systemPatterns.md`**: Technical decisions and architectural patterns
- **`techContext.md`**: Technology stack and configuration details

---

## Troubleshooting

### Common Issues

1. **Server Not Starting**: Check port 3000 availability
2. **Hot Reload Not Working**: Restart development server
3. **Browser Not Updating**: Clear cache, hard refresh
4. **TypeScript Errors**: Check `tsconfig.json` configuration
5. **Build Failures**: Clean `.next` directory and rebuild

### Recovery Commands

```bash
# Reset development environment
cd web && rm -rf .next && pnpm run build

# Restart development server
pkill -f "next dev" && pnpm run web:dev

# Clear all caches
pnpm run clean && pnpm install
```

---

## Performance Optimization

### Development Performance

- **Fast Refresh**: React Fast Refresh for instant updates
- **Incremental Compilation**: Only rebuild changed files
- **Memory Management**: Monitor development server memory usage
- **Build Optimization**: Use Next.js built-in optimizations

### Browser Performance

- **DevTools**: Use Chrome/Edge DevTools for profiling
- **Lighthouse**: Performance audits
- **Bundle Analysis**: Webpack Bundle Analyzer
- **Core Web Vitals**: Monitor performance metrics

---

## Success Metrics

### Development Velocity

- **Iteration Speed**: < 5 seconds from edit to preview
- **Quality Feedback**: Immediate linting and type checking
- **Error Recovery**: Fast error identification and resolution
- **Feature Completion**: Rapid prototyping and implementation

### Quality Metrics

- **Zero Linting Errors**: Clean code standards
- **Type Safety**: Full TypeScript compliance
- **Test Coverage**: Comprehensive component testing
- **Performance**: Optimized bundle size and runtime

---

## Ready for Collaborative Development!

This chat mode enables:

- ✅ **Live Browser Preview** in VS Code
- ✅ **Hot Reload** for instant feedback
- ✅ **Automated Quality Checks** with VS Code tasks
- ✅ **Integrated Debugging** with browser DevTools
- ✅ **Rapid Iteration Cycles** for efficient development

**Start developing immediately** - the environment is configured for maximum productivity and seamless collaboration!
