import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      // Disable inline styles warning for dynamic styles
      'react/no-unknown-property': 'off',
      '@next/next/no-css-tags': 'off',
      // Allow inline styles when using CSS variables
      'react/no-inline-styles': 'off',
      // Custom rule for our CSS variable pattern
      'no-restricted-syntax': [
        'warn',
        {
          selector:
            'JSXAttribute[name.name="style"] > JSXExpressionContainer > ObjectExpression:not([properties.length=1]):not([properties.0.key.name="--dynamic-color"])',
          message:
            'Prefer CSS modules over inline styles. Use CSS variables for dynamic values.',
        },
      ],
    },
  },
];

export default eslintConfig;
