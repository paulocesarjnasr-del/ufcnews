// @ts-check
/**
 * ESLint Flat Config — UFC News Hub
 *
 * Stack: Next.js 15 + TypeScript + React 19
 * Approach: Strict enough to catch real bugs, relaxed enough to not block dev
 *
 * Layers:
 *  1. Core JS recommended
 *  2. TypeScript-ESLint recommended
 *  3. Next.js + React + React Hooks + Core Web Vitals (via compat)
 *  4. Prettier compat (disables formatting conflicts)
 *  5. Project-specific overrides
 *
 * @see https://eslint.org/docs/latest/use/configure/configuration-files
 * @see https://nextjs.org/docs/app/api-reference/config/eslint
 * @see https://typescript-eslint.io/users/configs
 */

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';
import prettierConfig from 'eslint-config-prettier';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Bridge for legacy eslint-config-next (still CJS/legacy format)
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // ──────────────────────────────────────────────────
  // 1. Global ignores — never lint these
  // ──────────────────────────────────────────────────
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'src/generated/**',       // Prisma auto-generated
      'scripts/**',             // Standalone scrapers/utilities
      'public/**',
      '*.config.js',
      '*.config.mjs',
      'logs/**',
    ],
  },

  // ──────────────────────────────────────────────────
  // 2. Core ESLint recommended rules
  // ──────────────────────────────────────────────────
  eslint.configs.recommended,

  // ──────────────────────────────────────────────────
  // 3. TypeScript-ESLint recommended
  //    Catches: unused vars, explicit any, type errors
  // ──────────────────────────────────────────────────
  ...tseslint.configs.recommended,

  // ──────────────────────────────────────────────────
  // 4. Next.js Core Web Vitals + TypeScript
  //    Includes: React, React Hooks, @next/next, jsx-a11y, CWV
  //    Using FlatCompat because eslint-config-next is still legacy format
  // ──────────────────────────────────────────────────
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // ──────────────────────────────────────────────────
  // 5. Prettier compat — disable formatting rules
  // ──────────────────────────────────────────────────
  prettierConfig,

  // ──────────────────────────────────────────────────
  // 6. Project-specific overrides
  // ──────────────────────────────────────────────────
  {
    name: 'ufc-news-hub/overrides',
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      // ── Relaxed for now (Phase 1) — will tighten later ──

      // Allow @ts-ignore with description
      '@typescript-eslint/ban-ts-comment': ['warn', {
        'ts-ignore': 'allow-with-description',
        'ts-expect-error': 'allow-with-description',
        'ts-nocheck': true,
      }],

      // Warn on `any` instead of error — too many to fix at once
      '@typescript-eslint/no-explicit-any': 'warn',

      // Warn on unused vars, allow underscore prefix (_unused)
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],

      // Allow empty functions (event handlers, default callbacks)
      '@typescript-eslint/no-empty-function': 'off',

      // Allow `require()` in some places
      '@typescript-eslint/no-require-imports': 'off',

      // ── React / Next.js ──

      // Warn on <img> instead of error — FighterImage uses <img> with fallback
      '@next/next/no-img-element': 'warn',

      // Allow click handlers on non-interactive elements
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/no-noninteractive-element-interactions': 'off',

      // ── Code quality ──

      // No console.log in components (allow warn/error/info)
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],

      // Prefer const when value never reassigned
      'prefer-const': 'error',

      // No duplicate imports from same module
      'no-duplicate-imports': 'error',

      // No var — always let/const
      'no-var': 'error',

      // Enforce === over ==
      eqeqeq: ['error', 'smart'],
    },
  },

  // ──────────────────────────────────────────────────
  // 7. API Routes — server-side, more lenient
  // ──────────────────────────────────────────────────
  {
    name: 'ufc-news-hub/api-routes',
    files: ['src/app/api/**/*.ts'],
    rules: {
      'no-console': 'off',
    },
  },

  // ──────────────────────────────────────────────────
  // 8. AI Company — complex types, dynamic tool params
  // ──────────────────────────────────────────────────
  {
    name: 'ufc-news-hub/ai-company',
    files: ['src/lib/ai-company/**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
    },
  },
];
