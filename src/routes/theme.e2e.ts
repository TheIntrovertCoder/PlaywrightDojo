import { expect, test } from '@playwright/test';

test.describe('Theme switching', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('system dark mode applies .dark class on initial load', async ({ page }) => {
		await page.emulateMedia({ colorScheme: 'dark' });
		await page.reload();
		await expect(page.locator('html')).toHaveClass(/dark/);
	});

	test('explicit light mode overrides system dark and persists after reload', async ({ page }) => {
		await page.emulateMedia({ colorScheme: 'dark' });
		await page.reload();

		const toggleGroup = page.locator('[role="group"][aria-label="Color theme"]');
		await expect(toggleGroup).toBeVisible();

		await toggleGroup.locator('button').nth(0).click(); // Light
		await expect(page.locator('html')).not.toHaveClass(/dark/);

		await page.reload();
		await expect(page.locator('html')).not.toHaveClass(/dark/);
		await expect(toggleGroup.locator('button').nth(0)).toHaveAttribute('aria-pressed', 'true');
	});

	test('explicit dark mode persists after reload', async ({ page }) => {
		const toggleGroup = page.locator('[role="group"][aria-label="Color theme"]');
		await toggleGroup.locator('button').nth(1).click(); // Dark
		await expect(page.locator('html')).toHaveClass(/dark/);

		await page.reload();
		await expect(page.locator('html')).toHaveClass(/dark/);
		await expect(toggleGroup.locator('button').nth(1)).toHaveAttribute('aria-pressed', 'true');
	});

	test('system mode follows live prefers-color-scheme changes', async ({ page }) => {
		const toggleGroup = page.locator('[role="group"][aria-label="Color theme"]');
		await toggleGroup.locator('button').nth(2).click(); // System
		await expect(toggleGroup.locator('button').nth(2)).toHaveAttribute('aria-pressed', 'true');

		await page.emulateMedia({ colorScheme: 'dark' });
		await expect(page.locator('html')).toHaveClass(/dark/);

		await page.emulateMedia({ colorScheme: 'light' });
		await expect(page.locator('html')).not.toHaveClass(/dark/);
	});

	test('invalid stored theme value falls back to system', async ({ page }) => {
		await page.evaluate(() => localStorage.setItem('theme', 'invalid'));
		await page.reload();
		await expect(page.locator('html')).not.toHaveClass(/dark/);
	});

	test('nav, cards, and headings change colors between light and dark', async ({ page }) => {
		await page.emulateMedia({ colorScheme: 'light' });
		await page.reload();

		// Target the main sticky nav (not the module strip)
		const mainNav = page.locator('nav.sticky');
		const navBgLight = await mainNav.evaluate((el) => getComputedStyle(el).backgroundColor);
		const cardBgLight = await page
			.locator('#card-1, .rounded-2xl')
			.first()
			.evaluate((el) => getComputedStyle(el).backgroundColor);
		const h1ColorLight = await page
			.locator('h1')
			.first()
			.evaluate((el) => getComputedStyle(el).color);
		const bodyBgLight = await page
			.locator('body')
			.evaluate((el) => getComputedStyle(el).backgroundColor);

		await page.emulateMedia({ colorScheme: 'dark' });
		await page.reload();

		const navBgDark = await mainNav.evaluate((el) => getComputedStyle(el).backgroundColor);
		const cardBgDark = await page
			.locator('#card-1, .rounded-2xl')
			.first()
			.evaluate((el) => getComputedStyle(el).backgroundColor);
		const h1ColorDark = await page
			.locator('h1')
			.first()
			.evaluate((el) => getComputedStyle(el).color);
		const bodyBgDark = await page
			.locator('body')
			.evaluate((el) => getComputedStyle(el).backgroundColor);

		expect(navBgLight).not.toBe(navBgDark);
		expect(cardBgLight).not.toBe(cardBgDark);
		expect(h1ColorLight).not.toBe(h1ColorDark);
		expect(bodyBgLight).not.toBe(bodyBgDark);
	});

	test('aria-pressed states update on theme toggle click', async ({ page }) => {
		const toggleGroup = page.locator('[role="group"][aria-label="Color theme"]');
		const lightBtn = toggleGroup.locator('button').nth(0);
		const darkBtn = toggleGroup.locator('button').nth(1);
		const systemBtn = toggleGroup.locator('button').nth(2);

		await lightBtn.click();
		await expect(lightBtn).toHaveAttribute('aria-pressed', 'true');
		await expect(darkBtn).toHaveAttribute('aria-pressed', 'false');
		await expect(systemBtn).toHaveAttribute('aria-pressed', 'false');

		await darkBtn.click();
		await expect(darkBtn).toHaveAttribute('aria-pressed', 'true');
		await expect(lightBtn).toHaveAttribute('aria-pressed', 'false');
		await expect(systemBtn).toHaveAttribute('aria-pressed', 'false');

		await systemBtn.click();
		await expect(systemBtn).toHaveAttribute('aria-pressed', 'true');
		await expect(lightBtn).toHaveAttribute('aria-pressed', 'false');
		await expect(darkBtn).toHaveAttribute('aria-pressed', 'false');
	});

	test('theme transition respects prefers-reduced-motion', async ({ page }) => {
		await page.emulateMedia({ reducedMotion: 'reduce' });
		await page.goto('/');

		// Check an element that actually has the theme transition (button in ThemeToggle)
		const transitionDuration = await page
			.locator('nav button')
			.first()
			.evaluate((el) => getComputedStyle(el).transitionDuration);
		// Browser may report as "0.01ms" or "1e-05s" - both equal 0.01ms
		expect(['0.01ms', '1e-05s']).toContain(transitionDuration);
	});
});
