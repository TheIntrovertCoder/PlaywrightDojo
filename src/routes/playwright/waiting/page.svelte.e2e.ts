import { expect, test } from '@playwright/test';

test.describe('Waiting & Timing module', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/playwright/waiting');
	});

	test('loads content after async operation', async ({ page }) => {
		const loadBtn = page.locator('#load-btn');
		const spinner = page.locator('#spinner');
		const message = page.locator('#loaded-message');

		await expect(loadBtn).toBeVisible();
		await loadBtn.click();

		// Button disabled while loading
		await expect(loadBtn).toBeDisabled();
		await expect(spinner).toBeVisible();

		// Content appears after delay
		await expect(message).toContainText('Content loaded successfully after 1.5 seconds.');
		await expect(loadBtn).toBeEnabled();
		await expect(spinner).toBeHidden();
	});

	test('shows delayed content', async ({ page }) => {
		const btn = page.locator('#show-delayed-btn');
		const content = page.locator('#delayed-content');

		await expect(content).toBeHidden();
		await btn.click();

		// Content appears after delay — Playwright retries automatically
		await expect(content).toBeVisible();
		await expect(page.locator('#delayed-text')).toContainText(
			'This content appeared after a delay'
		);
	});

	test('flash message appears then disappears', async ({ page }) => {
		const flash = page.locator('#flash-message');

		await expect(flash).toBeHidden();
		await page.click('#flash-btn');
		await expect(flash).toBeVisible();
		await expect(page.locator('#flash-text')).toContainText('Temporary message');

		// Wait for it to disappear
		await expect(flash).toBeHidden({ timeout: 5000 });
	});

	test('reset clears all state', async ({ page }) => {
		await page.click('#load-btn');
		await expect(page.locator('#spinner')).toBeVisible();

		await page.click('#reset-btn');
		await expect(page.locator('#spinner')).toBeHidden();
		await expect(page.locator('#loaded-message')).toBeHidden();
	});
});
