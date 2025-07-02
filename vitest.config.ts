import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Strict test execution: Only one test file/module should be run per invocation.
  // The 'include' pattern is intentionally omitted to require explicit file input.
  // Example: `vitest run src/tests/auth/manager.test.ts`
  test: {
    // include: ['src/tests/**/*.test.ts'], // Disabled for strict one-file-at-a-time policy
    exclude: ['src/types/**'],
    coverage: {
      provider: 'istanbul',
      include: ['src/**'],
      exclude: [
        'src/tests/**',
        'src/types/**',
        'src/**/*.d.ts',
      ],
      thresholds: {
        statements: 90,
        lines: 90,
        functions: 90,
        branches: 90,
      },
    },
  },
});
