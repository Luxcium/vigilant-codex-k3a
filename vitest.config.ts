import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    include: ['src/tests/**/*.test.ts'],
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
