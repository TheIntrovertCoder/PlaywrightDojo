# Playwright Learning Hub

A mock website built to help you learn **Playwright for end-to-end automation testing**. Each route isolates a specific Playwright capability — basics, forms, waiting, dialogs, locators, iframes/shadow DOM, interactions, tables, authentication, visual testing, and API interception — so you can write focused, repeatable tests against controlled UI instead of fighting a real production app.

## Intention

This is a **training ground, not a production app**. Every module:

- Has a dedicated route (`/playwright/<topic>`) with an interactive demo.
- Ships with co-located Playwright e2e tests (`*.e2e.ts`) you can read, run, and modify.
- Exists to teach one Playwright capability at a time (locators, waiting, dialog handling, drag-and-drop, etc.).

Use it to practice writing assertions, handling async timing, piercing shadow DOM, managing auth state, and more — without external dependencies or flaky production data.

## Stack

| Layer           | Technology                                                                       |
| --------------- | -------------------------------------------------------------------------------- |
| Framework       | SvelteKit ^3.0.0, Svelte ^5.57.1 (runes mode)                                    |
| Styling         | Tailwind CSS v4.3.0 (forms plugin)                                               |
| Language        | TypeScript (strict)                                                              |
| Build tool      | Vite ^8.3.0                                                                      |
| Adapter         | `@sveltejs/adapter-auto` (local/dev) / `@sveltejs/adapter-static` (GitHub Pages) |
| Testing         | Playwright ^1.60.0 (e2e only)                                                    |
| Lint/format     | ESLint + Prettier + prettier-plugin-svelte/tailwindcss                           |
| Package manager | Bun                                                                              |

## Getting started

```sh
# Install dependencies
bun install

# Start the dev server
bun run dev

# Type-check
bun run check

# Lint + format check
bun run lint

# Format
bun run format

# Build + preview production
bun run build && bun run preview

# Run all Playwright e2e tests (builds, previews, then tests)
bun run test

# Run a single test file
bunx playwright test src/routes/playwright/forms/page.svelte.e2e.ts
```

> **Browser dependencies:** On Linux, Playwright may need system libraries. If tests fail to launch browsers, run `bunx playwright install-deps` (or install `libicu74`, `libxml2`, `libflite1` via your distro).

## Module map

| Route                        | Playwright concept             | Key locators / actions                                                            |
| ---------------------------- | ------------------------------ | --------------------------------------------------------------------------------- |
| `/`                          | Hub / interactive sandbox      | `click`, `fill`, `check`, `selectOption`, modal, toast                            |
| `/playwright/basics`         | Navigation, clicks, assertions | `goto`, `click`, `toBeVisible`, `toHaveText`, `toHaveURL`                         |
| `/playwright/forms`          | Form interactions              | `fill`, `pressSequentially`, `check`, `selectOption`, `setInputFiles`, validation |
| `/playwright/waiting`        | Load states & timing           | `waitForLoadState`, `toBeHidden`, `toContainText`, retries                        |
| `/playwright/dialogs`        | JS dialogs & custom modals     | `page.on('dialog')`, `accept`, `dismiss`, modal locators                          |
| `/playwright/locators`       | Locator strategies             | `getByRole`, `getByLabel`, `getByText`, `getByTestId`, chaining, filtering        |
| `/playwright/frames`         | iframes & shadow DOM           | `frameLocator`, `page.evaluate()` shadow-root piercing                            |
| `/playwright/interactions`   | Hover, drag-and-drop, keyboard | `hover`, `dragTo`, `press`, `keyboard.down()`/`up()`                              |
| `/playwright/tables`         | Data tables                    | Row selection, column sorting, pagination                                         |
| `/playwright/auth/login`     | Auth flow                      | Login form, redirect on success                                                   |
| `/playwright/auth/protected` | Protected routes               | `localStorage` session mock, redirect when unauthenticated                        |
| `/playwright/visual`         | Visual testing                 | Hover states, badge colors, form validation states, screenshot readiness          |
| `/playwright/api`            | API Interception               | `page.route()`, `route.fulfill()`, `route.continue()`, `APIRequestContext`        |

## Writing a new module

1. Create `src/routes/playwright/<topic>/+page.svelte` with an interactive demo (Svelte 5 runes + Tailwind v4).
2. Create `src/routes/playwright/<topic>/page.svelte.e2e.ts` with focused e2e tests.
3. Add the module to the shared registry in `src/lib/modules.ts` (nav, curriculum, and fallback are data-driven).
4. Use `resolve()` from `$app/paths` for all internal links (required by `svelte/no-navigation-without-resolve`).
5. Run `bun run check`, `bun run lint`, and `bun run test` before committing.

## Known limitations & edge cases

These are documented so you don't mistake training-tool behavior for bugs:

- **API is a client-side mock with static fallback.** `/api/users` exists only in the local/dev build (`adapter-auto`). On GitHub Pages (`adapter-static`) the endpoint returns 404 and the API module automatically switches to in-browser seeded data with a banner. Good for learning frontend Playwright; not for API or database testing.
- **Auth is a client-side mock.** `/playwright/auth/protected` checks `localStorage` in `onMount` and redirects via `window.location.assign()`. There is no real session expiration, CSRF protection, or password hashing. Do not use this pattern in production.
- **JS dialogs (`alert`/`confirm`/`prompt`)** may be blocked or behave differently in some headless browser contexts and cross-origin iframes.
- **Shadow DOM** is attached via `$effect` in the browser, so SSR HTML won't contain shadow content until hydration completes. This Playwright version lacks `locator.shadow()`, so the frames test pierces shadow roots via `page.evaluate()`.
- **Drag-and-drop** uses native HTML5 drag events. Playwright's `dragTo()` simulates these, but behavior can vary across Chromium, Firefox, and WebKit.
- **Waiting** uses `setTimeout` (1.5s load, 1s delayed content, 800ms flash). On heavily loaded CI runners these can be flaky — rely on Playwright's auto-retry assertions rather than hard `waitForTimeout`.
- **Forms validation** stops at the first error (name → email → terms), showing one error at a time.
- **Tables** sort client-side in memory; row IDs travel with their data when reordered. Tests should assert row position/text, not a fixed ID-to-person mapping.
- **The hover dropdown** only opens on mouse enter/leave — keyboard-only users cannot reveal it (accessibility gap).
- **Test flakiness:** Two tests can flake under parallel workers:
  - "intercepts and modifies request body" (API) — shared mock server state.
  - "reveals dropdown on hover" (Interactions) — timing-sensitive hover.
    Both pass in isolation. Use `bunx playwright test --workers=1` for reliable runs.
- **Accessibility:** Modules were audited with `eslint-plugin-svelte` a11y rules. Remaining gaps include hover-only dropdowns and some clickable `<div>` elements that now carry `role="button"` + `tabindex={0}` where backported.

## Deployment (GitHub Pages)

The site is configured for static hosting on GitHub Pages:

- **Build command:** `bun run build:pages` (sets `GITHUB_PAGES=true BASE_PATH=/PlaywrightLearn`)
- **Output directory:** `build/` (contains `404.html` fallback, prerendered module pages, and assets)
- **Workflow:** `.github/workflows/deploy.yml` builds with Bun, uploads artifacts via `actions/upload-pages-artifact`, and deploys via `actions/deploy-pages`
- **Live URL:** `https://theintrovertcoder.github.io/PlaywrightLearn/`
- **Static limitations:** The `/api/users` endpoint is not available on Pages; the API module shows a "Static demo mode" banner and uses in-browser seeded data. All other modules work identically.

## CI recommendations

- Install Playwright system dependencies before running tests: `bunx playwright install-deps`.
- Run tests against the production build: `bun run test` (which does `build && preview`).
- If timer-based waiting tests flake on loaded CI, reduce workers: `bunx playwright test --workers=1`.

## Cross-browser test matrix

| Browser           | Version | Result (168 tests)        |
| ----------------- | ------- | ------------------------- |
| Chromium (stable) | v156+   | 83 passed, 1 skipped      |
| Firefox (stable)  | v157+   | 83 passed, 1 skipped      |
| **Total**         | —       | **166 passed, 2 skipped** |

Run `bunx playwright test --project=chromium` or `--project=firefox` to target a single browser.

## Scripts

| Script                | Purpose                                             |
| --------------------- | --------------------------------------------------- |
| `bun run dev`         | Start Vite dev server                               |
| `bun run build`       | Production Vite build (local, uses adapter-auto)    |
| `bun run build:pages` | Static build for GitHub Pages (uses adapter-static) |
| `bun run preview`     | Preview production build                            |
| `bun run check`       | SvelteKit sync + `svelte-check` type check          |
| `bun run lint`        | Prettier check + ESLint                             |
| `bun run format`      | Prettier write                                      |
| `bun run test`        | Run Playwright e2e tests (both browsers)            |
