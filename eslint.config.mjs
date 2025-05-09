import globals from 'globals';
import pluginJs from '@eslint/js';
import prettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginImport from 'eslint-plugin-import';
import jest from 'eslint-plugin-jest';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // Global ignore configuration
  {
    ignores: ['dist/**', 'node_modules/**', 'no-use/**'],
  },

  // Recommended JS rules
  pluginJs.configs.recommended,

  // Prettier configuration
  prettier,

  // Linting for `src/` folder
  {
    files: ['src/**/*.js'],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 2021,
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      prettier: pluginPrettier,
      import: pluginImport,
    },
    // rules: {
    //   'prettier/prettier': ['error', { endOfLine: 'auto' }],
    //   'no-unused-vars': 'error',
    //   indent: ['error', 2],
    //   quotes: ['error', 'single'],
    //   semi: ['error', 'always'],
    // },
    settings: {
      'import/resolver': {
        'babel-module': {},
      },
    },
  },

  // Linting for `tests/` folder with Jest support
  {
    files: ['tests/**/*.js'],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 2021,
      globals: {
        ...globals.node,
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        beforeEach: 'readonly',
        afterAll: 'readonly',
        afterEach: 'readonly',
      },
    },
    plugins: {
      jest,
    },
    rules: {
      ...jest.configs.recommended.rules, // Ensure Jest rules are applied
      'no-undef': 'off', // Prevent 'describe is not defined' error
    },
  },
];
