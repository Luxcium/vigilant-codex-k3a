import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  js.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      // Auto-fixable style rules as warnings (not errors)
      '@stylistic/semi': 'warn',
      '@stylistic/quotes': ['warn', 'single', {avoidEscape: true}],
      '@stylistic/indent': ['warn', 2],
      '@stylistic/comma-dangle': ['warn', 'always-multiline'],
      '@stylistic/arrow-parens': ['warn', 'as-needed'],
      '@stylistic/brace-style': ['warn', '1tbs'],
      '@stylistic/array-bracket-spacing': ['warn', 'never'],
      '@stylistic/space-infix-ops': 'warn',
      '@stylistic/keyword-spacing': ['warn', {before: true, after: true}],
      '@stylistic/space-before-blocks': ['warn', 'always'],
      '@stylistic/no-multi-spaces': 'warn',
      '@stylistic/eol-last': ['warn', 'always'],
      '@stylistic/no-trailing-spaces': 'warn',
      '@stylistic/comma-spacing': ['warn', {before: false, after: true}],

      // Align with Prettier defaults to avoid conflicts
      '@stylistic/object-curly-spacing': ['warn', 'always'], // Matches Prettier bracketSpacing: true
      '@stylistic/template-curly-spacing': ['warn', 'never'], // Matches Prettier default

      // Remove space-in-parens rule that conflicts with Prettier
      '@stylistic/space-in-parens': 'off',
    },
  },
  {
    files: ['**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    ignores: ['node_modules/**', 'web/**', 'coverage/**', '*.js', '*.mjs'],
  },
  // Add prettier config last to disable any remaining conflicting rules
  eslintConfigPrettier
);
