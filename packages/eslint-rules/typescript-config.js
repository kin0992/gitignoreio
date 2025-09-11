import tseslint from 'typescript-eslint';
import perfectionist from 'eslint-plugin-perfectionist';

export default [
  ...tseslint.config(
    ...tseslint.configs.strict,
    ...tseslint.configs.stylistic,
    perfectionist.configs['recommended-alphabetical'],
    {
      languageOptions: {
        parserOptions: {
          project: true,
          tsconfigDirName: import.meta.dirname,
        },
      },
    },
  ),
  {
    // Ignore eslint.config.mjs files from TypeScript parsing
    ignores: ['**/eslint.config.mjs'],
  },
];
