import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';

// Format « flat config », requis depuis ESLint 9 (l'ancien .eslintrc était chargé comme un
// module ES — le package.json racine est en `"type": "module"` — et ESLint rejetait alors la
// propriété `__esModule` du namespace, d'où un lint cassé à l'échelle du monorepo).

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.expo/**',
      '**/storybook-static/**',
      '**/*.d.ts',
    ],
  },

  js.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'react-hooks': reactHooks,
      prettier,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
      // Seules les deux règles historiques sont activées : la v7 du plugin embarque aussi les
      // diagnostics du React Compiler, hors sujet ici. `rules-of-hooks` détecte de vraies
      // erreurs, `exhaustive-deps` reste un avertissement — le code l'écarte sciemment par
      // endroits (Panel, Slider, VideoStories), et ces `eslint-disable` retrouvent un sens.
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // Le préfixe `_` marque un paramètre ou une variable volontairement ignorés.
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      // `no-undef` fait doublon avec le typage en TypeScript, et ignore ses globales (JSX,
      // types DOM) : il produirait des faux positifs en masse.
      'no-undef': 'off',
    },
  },

  // Storybook rend `render` comme un composant : les hooks qu'il contient sont parfaitement
  // légitimes, mais la règle ne peut pas le savoir (le nom ne commence pas par une majuscule).
  {
    files: ['**/*.stories.{ts,tsx}'],
    rules: {
      'react-hooks/rules-of-hooks': 'off',
    },
  },

  {
    files: ['**/*.{js,jsx,mjs}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: { prettier },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
    },
  },

  // Fichiers de configuration en CommonJS (babel, metro, commitlint) : ils tournent sous Node
  // et utilisent `module`, `require`, `__dirname`, que `no-undef` ne connaît pas autrement.
  {
    files: ['**/*.cjs', '**/babel.config.js', '**/metro.config.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'commonjs',
      globals: {
        module: 'writable',
        require: 'readonly',
        exports: 'writable',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
    plugins: { prettier },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
    },
  },
];
