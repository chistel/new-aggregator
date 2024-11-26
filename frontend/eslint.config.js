import { fileURLToPath } from 'url';


import importPlugin from 'eslint-plugin-import';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import * as parser from '@typescript-eslint/parser';
import jest from 'eslint-plugin-jest';
import reactHooks from 'eslint-plugin-react-hooks';
import tsPlugin from '@typescript-eslint/eslint-plugin';
export default [
    eslint.configs.recommended,
    //tseslint.configs.recommendedTypeChecked,
    //tseslint.configs.stylisticTypeChecked,
    //importPlugin.flatConfigs.recommended,
    prettierRecommended,
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat['jsx-runtime'],
    {

      files: ['src/**/*.{ts,js,jsx,tsx}'],
      settings: {
        react: {
          "version": "detect"
        }
      },
      plugins: {
        // "prettier": prettierRecommended,
        // reactPlugin,
        // "react-hooks": reactHooks,
        '@typescript-eslint': tsPlugin,
      },
      rules: {

        'prettier/prettier': 'error', // Ensure Prettier errors are treated as ESLint errors
        'react/react-in-jsx-scope': 'off', // React 17+ no longer requires React to be in scope
        // 'jsx-a11y/anchor-is-valid': 'error', // Ensure valid anchor tags
        'react/prop-types': 'off', // Assuming you're using TypeScript, prop-types are not needed
        '@typescript-eslint/no-unused-vars': 'off', // Turn off if you don’t want unused vars warnings
        'react/no-unescaped-entities': 'off', // Allow unescaped entities in JSX
        '@typescript-eslint/explicit-module-boundary-types': 'off', // Disable explicit return types for functions
        '@typescript-eslint/no-var-requires': 'off', // Allow CommonJS require statements
        '@typescript-eslint/ban-ts-comment': 'off', // Disable restriction on TypeScript comments
      },
  }
];
