import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

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
      '@stylistic/semi': 'error',
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/indent': ['error', 2],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/space-before-function-paren': ['error', 'never'],
      '@stylistic/brace-style': ['error', '1tbs'],
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      '@stylistic/space-infix-ops': 'error',
      '@stylistic/keyword-spacing': ['error', { before: true, after: true }],
      '@stylistic/space-before-blocks': ['error', 'always'],
      '@stylistic/space-in-parens': ['error', 'never'],
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/comma-spacing': ['error', { before: false, after: true }],
      // removed invalid stylistic rules for new plugin
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
  }
);
