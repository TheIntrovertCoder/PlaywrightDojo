# PlaywrightDojo — TODO

## Main Objective

Build a mock website (SvelteKit + Playwright) that serves as a hands-on learning hub for Playwright end-to-end automation testing fundamentals. Each module is an isolated route with an interactive demo page and co-located e2e tests, so a learner can practice one Playwright capability at a time against controlled UI.

## Repository

`/home/iambabu/Projects/mock-website` — SvelteKit v3, Svelte 5 runes, Tailwind CSS v4, TypeScript strict, Vite, Bun, Playwright e2e.

**Source:** https://github.com/TheIntrovertCoder/PlaywrightDojo

## Completed (all checks pass: svelte-check, prettier, eslint, vite build, Playwright 168/168 tests, 2 skipped)

| Module                  | Route                                  | Tests (×2 browsers) | Capabilities Covered                                                                                                                                                                           |
| ----------------------- | -------------------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hub (landing + sandbox) | `/`                                    | 13 × 2              | Hero, nav (11 links), footer (source link), interactive sandbox (counter, input, checkbox, radio, select, modal, toast), curriculum grid (11 cards), sandbox independence tests, [module] stub |
| Basics                  | `/playwright/basics`                   | 6 × 2               | `goto`, `click`, `toBeVisible`, `toHaveText`, `toHaveURL`, navigation links                                                                                                                    |
| Forms                   | `/playwright/forms`                    | 10 × 2              | `fill`, `pressSequentially`, `check`, `selectOption`, `setInputFiles`, validation, radio/select independence                                                                                   |
| Waiting                 | `/playwright/waiting`                  | 4 × 2               | Load states, delayed content, flash message visibility, `toBeHidden`                                                                                                                           |
| Dialogs & Modals        | `/playwright/dialogs`                  | 7 × 2               | JS alert/confirm/prompt dialogs, custom modal open/close                                                                                                                                       |
| Locators                | `/playwright/locators`                 | 8 × 2               | `getByRole`, `getByLabel`, `getByText`, `getByTestId`, chaining, filtering, input size assertions                                                                                              |
| Frames                  | `/playwright/frames`                   | 4 × 2               | `frameLocator` for iframes, shadow DOM piercing via `page.evaluate()`, navbar/footer suppression, iframe sizing                                                                                |
| Interactions            | `/playwright/interactions`             | 4 × 2               | `hover()`, `dragTo()`, keyboard shortcuts (`Control+KeyK`), `keyboard.down()`/`up()`                                                                                                           |
| Tables                  | `/playwright/tables`                   | 5 × 2               | Row selection, column sorting, pagination, reset                                                                                                                                               |
| Auth                    | `/playwright/auth/login`, `/protected` | 4 × 2               | Login flow, protected route redirect, invalid credentials, logout                                                                                                                              |
| Visual                  | `/playwright/visual`                   | 5 × 2               | Hero banner, hover card states, status badges, form validation states, screenshot readiness                                                                                                    |
| API Interception        | `/playwright/api`                      | 7 × 2               | `page.route()` interception, request body mocking, error responses, `APIRequestContext` direct API, static-mode fallback                                                                       |
| Theme Switching         | (global)                               | 8 × 2               | System/light/dark modes, localStorage persistence, prefers-color-scheme, reduced-motion respect                                                                                                |

## Remaining Fundamentals Gaps (the "20% → 80%" backlog)

These are UI E2E fundamentals not yet covered in the mock site:

- [x] **API request interception** — `page.route()` and `APIRequestContext` — DONE
- [x] **Cross-browser test matrix** — Chromium + Firefox configured in `playwright.config.ts` — DONE
- [ ] **Mobile / responsive testing** — viewport emulation tests
- [ ] **Soft assertions** — `expect.soft` for non-failing assertion batches
- [ ] **Page Object Model** — tests are co-located scripts; extract reusable page objects
- [ ] **Trace-on-failure / debugging workflow** — `trace: 'retain-on-failure'` config and `playwright show-trace` usage
- [ ] **Test data fixtures** — beyond `test.beforeEach`, reusable fixture patterns for complex setup
- [ ] **Visual regression baselines** — committed screenshots for `toHaveScreenshot` diffing (Visual module exists but no baselines)
- [ ] **Runtime accessibility tests** — axe-core or similar in e2e tests (currently only eslint-plugin-svelte a11y lint)
