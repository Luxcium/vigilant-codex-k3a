import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/tests/**/*.test.ts', 'src/tests/**/*.test.tsx'],
    exclude: ['node_modules/**', 'dist/**'],
  },
});
