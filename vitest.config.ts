import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'istanbul',
      include: ['src/**'],
      thresholds: {
        statements: 90,
        lines: 90,
        functions: 90,
        branches: 90
      }
    }
  }
})
