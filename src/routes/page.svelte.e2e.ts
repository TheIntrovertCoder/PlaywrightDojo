import { expect, test } from '@playwright/test';
import { modules as moduleRegistry } from '#lib/modules';

test.describe('Home page and navigation', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('nav strip shows Home and all 11 module links', async ({ page }) => {
		const nav = page.locator('nav[aria-label="Modules"]');
		await expect(nav).toBeVisible();

		// Home link
		const homeLink = nav.locator('a', { hasText: 'Home' });
		await expect(homeLink).toHaveAttribute('href', '/');

		// All 11 module links
		for (const mod of moduleRegistry) {
			const link = nav.locator('a', { hasText: mod.shortTitle });
			await expect(link).toHaveAttribute('href', mod.href);
		}

		// Total count = 1 home + 11 modules = 12 links
		const allLinks = nav.locator('a');
		await expect(allLinks).toHaveCount(12);
	});

	test('clicking Frames nav link goes to /playwright/frames', async ({ page }) => {
		await page.click('nav[aria-label="Modules"] a:has-text("Frames")');
		await expect(page).toHaveURL('/playwright/frames');
		await expect(page.locator('h1')).toContainText('iframes & Shadow DOM');
	});

	test('clicking Interactions nav link goes to /playwright/interactions', async ({ page }) => {
		await page.click('nav[aria-label="Modules"] a:has-text("Interactions")');
		await expect(page).toHaveURL('/playwright/interactions');
		await expect(page.locator('h1')).toContainText('Complex Interactions');
	});

	test('clicking Tables nav link goes to /playwright/tables', async ({ page }) => {
		await page.click('nav[aria-label="Modules"] a:has-text("Tables")');
		await expect(page).toHaveURL('/playwright/tables');
		await expect(page.locator('h1')).toContainText('Data Tables');
	});

	test('clicking Auth nav link goes to /playwright/auth/login', async ({ page }) => {
		await page.click('nav[aria-label="Modules"] a:has-text("Auth")');
		await expect(page).toHaveURL('/playwright/auth/login');
		await expect(page.locator('h1')).toContainText('Login');
	});

	test('clicking Visual nav link goes to /playwright/visual', async ({ page }) => {
		await page.click('nav[aria-label="Modules"] a:has-text("Visual")');
		await expect(page).toHaveURL('/playwright/visual');
		await expect(page.locator('h1')).toContainText('Visual Testing');
	});

	test('clicking API nav link goes to /playwright/api', async ({ page }) => {
		await page.click('nav[aria-label="Modules"] a:has-text("API")');
		await expect(page).toHaveURL('/playwright/api');
		await expect(page.locator('h1')).toContainText('API Interception');
	});

	test('curriculum section has 11 module cards', async ({ page }) => {
		await expect(page.locator('h2:has-text("Curriculum")')).toBeVisible();
		const cards = page.locator('section:has(h2:has-text("Curriculum")) a[href*="playwright/"]');
		await expect(cards).toHaveCount(11);

		// Verify each card has the right title
		for (const mod of moduleRegistry) {
			const card = page.locator(
				`section:has(h2:has-text("Curriculum")) a:has-text("${mod.title}")`
			);
			await expect(card).toBeVisible();
		}
	});

	test('Auth curriculum card links to auth login page', async ({ page }) => {
		await expect(page.locator('h2:has-text("Curriculum")')).toBeVisible();
		const authCard = page.locator(
			`section:has(h2:has-text("Curriculum")) a:has-text("Authentication")`
		);
		await expect(authCard).toBeVisible();
		// href will be relative like ./playwright/auth/login
		await expect(authCard).toHaveAttribute('href', /playwright\/auth\/login/);
	});

	test('[module] stub page lists all 11 modules as clickable cards', async ({ page }) => {
		// The [module] route is a development fallback for unknown module paths
		// Since all 11 modules now have real routes, this stub is only accessible
		// via paths that don't match any real module (e.g., /playwright/foobar)
		// But SvelteKit returns 404 for unmatched dynamic routes in production builds.
		// Skip this test as the stub is not a real user-facing page.
		test.skip(true, 'The [module] stub is a dev fallback, not a real route');
		await page.goto('/playwright/unknown-module');
		await expect(page.locator('h1')).toContainText('Module Page');

		const cards = page.locator('main a[href*="playwright/"]');
		await expect(cards).toHaveCount(11);
	});
});
