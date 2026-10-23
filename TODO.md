# Plan: Playwright Learning Mock Website — Website Fundamentals

## Main Objective

Build a mock website (SvelteKit + Playwright) that serves as a hands-on learning hub for Playwright end-to-end automation testing fundamentals. Each module is an isolated route with an interactive demo page and co-located e2e tests, so a learner can practice one Playwright capability at a time against controlled UI.

## Repository

`/home/iambabu/Projects/mock-website` — SvelteKit v3, Svelte 5 runes, Tailwind CSS v4, TypeScript strict, Vite, Bun, Playwright e2e.

## Completed (all checks pass: svelte-check, prettier, eslint, vite build, Playwright 69/69 tests)

| Module                  | Route                                  | Tests | Capabilities Covered                                                                               |
| ----------------------- | -------------------------------------- | ----- | -------------------------------------------------------------------------------------------------- |
| Hub (landing + sandbox) | `/`                                    | —     | Hero, nav, interactive sandbox (button counter, text input, checkbox, radio, select, modal, toast) |
| Basics                  | `/playwright/basics`                   | 6     | `goto`, `click`, `toBeVisible`, `toHaveText`, `toHaveURL`, navigation links                        |
| Forms                   | `/playwright/forms`                    | 9     | `fill`, `pressSequentially`, `check`, `selectOption`, validation errors, submit, reset             |
| Waiting                 | `/playwright/waiting`                  | 4     | Load states, delayed content, flash message visibility, `toBeHidden`                               |
| Dialogs & Modals        | `/playwright/dialogs`                  | 7     | JS alert/confirm/prompt dialogs, custom modal open/close                                           |
| Locators                | `/playwright/locators`                 | 7     | `getByRole`, `getByLabel`, `getByText`, `getByTestId`, chaining, filtering                         |
| Frames                  | `/playwright/frames`                   | 3     | `frameLocator` for iframes, shadow DOM piercing via `page.evaluate()`                              |
| Interactions            | `/playwright/interactions`             | 4     | `hover()`, `dragTo()`, keyboard shortcuts (`Control+KeyK`), `keyboard.down()`/`up()`               |
| Tables                  | `/playwright/tables`                   | 5     | Row selection, column sorting, pagination, reset                                                   |
| Auth                    | `/playwright/auth/login`, `/protected` | 4     | Login flow, protected route redirect, invalid credentials, logout                                  |
| Visual                  | `/playwright/visual`                   | 5     | Hero banner, hover card states, status badges, form validation states, screenshot readiness        |
| API Interception        | `/playwright/api`                      | 6     | `page.route()` interception, request body mocking, error responses, `APIRequestContext` direct API |
| Theme Switching         | (global)                               | 6     | System/light/dark modes, localStorage persistence, prefers-color-scheme, reduced-motion respect    |

## Hosting / Deployment (GitHub Pages)

- **Adapter**: conditional `adapter-static` (for Pages) / `adapter-auto` (local/dev) in `vite.config.ts`
- **Base path**: `/mock-website-playwright` set via `BASE_PATH` env var at build time; empty string for local dev
- **Prerendering**: all routes prerendered (`+layout.ts: export const prerender = true`)
- **Fallback**: `404.html` generated for client-side routing on static hosting
- **API fallback**: `/playwright/api` detects 404 on `/api/users` and switches to in-browser seeded data with a banner; create/delete/search work locally
- **Workflow**: `.github/workflows/deploy.yml` — Bun, configure-pages, build with `GITHUB_PAGES=true`, upload-pages-artifact, deploy-pages
- **Local static verification**: `bun run build:pages` (sets `GITHUB_PAGES=true BASE_PATH=/mock-website-playwright`)

## Remaining Fundamentals Gaps (the "20% → 80%" backlog)

These are UI E2E fundamentals not yet covered in the mock site:

- [x] **API request interception** — `page.route()` and `APIRequestContext` — DONE
- [ ] **Cross-browser test matrix** — Playwright config currently runs one browser; add Chromium + Firefox + WebKit
- [ ] **Mobile / responsive testing** — viewport emulation tests
- [ ] **Soft assertions** — `expect.soft` for non-failing assertion batches
- [ ] **Page Object Model** — tests are co-located scripts; extract reusable page objects
- [ ] **Trace-on-failure / debugging workflow** — `trace: 'retain-on-failure'` config and `playwright show-trace` usage
- [ ] **Test data fixtures** — beyond `test.beforeEach`, reusable fixture patterns for complex setup
- [ ] **Visual regression baselines** — committed screenshots for `toHaveScreenshot` diffing (Visual module exists but no baselines)
- [ ] **Runtime accessibility tests** — axe-core or similar in e2e tests (currently only eslint-plugin-svelte a11y lint)

## Graphify Status (local code graph)

- CLI installed at `~/.local/bin/graphify`
- `graphify-out/graph.json` built via `graphify extract --code-only --no-cluster` — **278 nodes, 308 edges** (local AST, no API key)
- Semantic extraction blocked: OpenRouter account has no credits and no free model access; provided OpenAI key invalid
- Usable commands: `graphify query`, `graphify explain`, `graphify path`, `graphify affected`, `graphify god-nodes`
- **Workflow**: always run `graphify extract ... --code-only --no-cluster` before and after each coherent change; use graph queries instead of grep for structure/impact analysis

## How to Resume

1. Switch out of Plan mode (if not already).
2. Pick a gap from the Remaining list above.
3. Add the module/demo + `page.svelte.e2e.ts` test file.
4. Run `graphify extract ... --code-only --no-cluster`, then `bun run check`, `bun run lint`, `bun run build`, `bun test` before committing.
5. Update this tracker and the plan tracker.
