import { expect, test } from '@playwright/test';

test.describe('Visual Testing module', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/playwright/visual');
	});

	test('renders hero banner', async ({ page }) => {
		const banner = page.locator('#hero-banner');
		await expect(banner).toBeVisible();
		await expect(page.locator('h1')).toContainText('Visual Testing');
		await expect(page.locator('text=Visual Testing Playground')).toBeVisible();
	});

	test('cards respond to hover', async ({ page }) => {
		const card = page.locator('#card-1');

		await expect(card).toHaveClass(/border-gray-200/);
		await expect(card).not.toHaveClass(/border-indigo-500/);

		await card.hover();
		await expect(card).toHaveClass(/border-indigo-500/);
		await expect(card).toHaveClass(/shadow-lg/);
	});

	test('status badges render with correct colors', async ({ page }) => {
		await expect(page.locator('#badge-success')).toHaveClass(/bg-green-100/);
		await expect(page.locator('#badge-warning')).toHaveClass(/bg-amber-100/);
		await expect(page.locator('#badge-error')).toHaveClass(/bg-red-100/);
		await expect(page.locator('#badge-info')).toHaveClass(/bg-blue-100/);
	});

	test('form inputs show validation states', async ({ page }) => {
		await expect(page.locator('#valid-input')).toHaveClass(/border-green-500/);
		await expect(page.locator('#invalid-input')).toHaveClass(/border-red-500/);
	});

	test('page is ready for screenshot capture', async ({ page }) => {
		// Verify all major sections are visible before screenshot
		await expect(page.locator('#hero-banner')).toBeVisible();
		await expect(page.locator('#card-1')).toBeVisible();
		await expect(page.locator('#card-2')).toBeVisible();
		await expect(page.locator('#card-3')).toBeVisible();
		await expect(page.locator('#capture-btn')).toBeVisible();
	});
});
