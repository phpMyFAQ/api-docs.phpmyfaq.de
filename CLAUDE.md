# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static site that hosts the phpMyFAQ API documentation. 
It renders `swagger-ui-react` against OpenAPI specs fetched at runtime from the `thorsten/phpMyFAQ` GitHub repo (branches `4.0`, `4.1`, `main`). 
Deployed on Vercel — pushing to `main` triggers deployment.

## Commands

- `pnpm dev` — Next.js dev server on http://localhost:3000 (Turbopack)
- `pnpm build` — production build
- `pnpm start` — serve the production build
- `pnpm lint` — ESLint flat config (`eslint.config.mjs`), composing `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`. Note: Next 16 removed `next lint`, so this script invokes `eslint` directly.
- `pnpm test` — Vitest (jsdom + Testing Library). `pnpm test:watch` for watch mode. A single test: `pnpm test -- path/to/file.test.tsx -t "name"`. Test setup (`vitest.setup.ts`) stubs `window.matchMedia` (jsdom doesn't implement it) and resets the `dark` class on `<html>` between tests. `swagger-ui-react` is mocked in component tests to avoid pulling its CSS/runtime.

## Architecture

- Next.js 16 App Router (Turbopack default), React 19, TypeScript, Tailwind CSS 4 (CSS-first; no `tailwind.config.*` — configure via `@theme`/`@custom-variant` in `app/globals.css`). PostCSS uses `@tailwindcss/postcss`.
- The entire UI is a single client component: `app/page.tsx`. It owns version selection, dark-mode toggle, and renders `<SwaggerUI url={...}/>`. New API versions are added by extending the `apiUrls` map and the corresponding `<option>` entries there.
- `app/layout.tsx` and `app/globals.css` set up the global shell. Dark-mode styling for Swagger UI relies on the `.swagger-container-dark` / `.swagger-container-light` class wrappers plus the `dark` class on `<html>`.
- Security headers (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: origin-when-cross-origin`) are configured in `next.config.mjs` and applied to all routes.
