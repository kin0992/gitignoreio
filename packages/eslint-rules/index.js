import jseslint from '@eslint/js';
import tseslint from './typescript-config.js';
import prettier from './prettier-config.js';

export default [
  // Load js rules
  jseslint.configs.recommended,
  // Load ts strict and stylistic config
  ...tseslint,
  // Runs Prettier as an ESLint rule and reports differences as individual
  // ESLint issues
  prettier,
  {
    // Ignore everything under any dist/ directory
    ignores: ['**/dist/', '**/.turbo/'],
  },
];
