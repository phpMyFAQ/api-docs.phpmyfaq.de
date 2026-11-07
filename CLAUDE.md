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
- `pnpm lint` — oxlint (`.oxlintrc.json`, same rule set as www.phpmyfaq.de; plugins typescript/react/nextjs/jsx-a11y/vitest/import). `pnpm lint:fix` applies autofixes. No ESLint in this repo.
- `pnpm format` / `pnpm format:check` — oxfmt (`.oxfmtrc.json`: single quotes, 120 cols, trailing commas). Run `pnpm format` before committing; it also formats CSS, JSON and Markdown.
- TypeScript is 7.x (the native compiler). `npx tsc --noEmit` type-checks; `next build` runs it too.
- `pnpm test` — Vitest (jsdom + Testing Library). `pnpm test:watch` for watch mode. A single test: `pnpm test -- path/to/file.test.tsx -t "name"`. Test setup (`vitest.setup.ts`) stubs `window.matchMedia` (jsdom doesn't implement it) and resets `localStorage`, the theme store and `data-theme` on `<html>` between tests. Components using `useTheme()` must be rendered inside `ThemeProvider`. `swagger-ui-react` is mocked in component tests to avoid pulling its CSS/runtime.

## Architecture

- Next.js 16 App Router (Turbopack default), React 19, TypeScript, Tailwind CSS 4 (CSS-first; no `tailwind.config.*` — configure via `@theme`/`@custom-variant` in `app/globals.css`). PostCSS uses `@tailwindcss/postcss`. Requires Node >= 24 (`.nvmrc`, `engines`).
- Visual shell is ported from `phpMyFAQ/www.phpmyfaq.de`: `components/Header.tsx` (dark sticky bar, nav links to www.phpmyfaq.de plus an active "API" entry, GitHub link, theme toggle), `components/Footer.tsx` (link grid + copyright bar), fonts Lato/Cabin and logos in `public/`. Design tokens (`--color-*`, `--font-*`) and all shell styles live in `app/globals.css` as plain CSS, not Tailwind utilities, so they can be diffed against the main site's SCSS.
- `components/SiteShell.tsx` wraps every page in `ThemeProvider` + Header/Footer from `app/layout.tsx`.
- Theme: `lib/themeStore.ts` (ported from www) keeps the choice in `localStorage` and on `<html data-theme>`; `themeBootScript` is inlined in `<head>` to avoid a flash. `components/ThemeProvider.tsx` exposes `useTheme()`. The Tailwind `dark` variant is bound to `[data-theme="dark"]`.
- `app/page.tsx` is the only page: version selector + `<SwaggerUI url={...}/>`. New API versions are added by extending the `apiUrls` map and the `<option>` entries there. Swagger dark mode uses the `.swagger-container-dark` / `.swagger-container-light` wrappers.
- Security headers (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: origin-when-cross-origin`) are configured in `next.config.mjs` and applied to all routes.
