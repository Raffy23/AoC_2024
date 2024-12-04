import pluginJs from '@eslint/js';
import tsESlint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier/recommended';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['src/*.{js,mjs,cjs,ts}'],
  },
  pluginJs.configs.recommended,
  prettier,
  ...tsESlint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
];
