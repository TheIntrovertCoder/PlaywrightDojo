import { expect, test } from '@playwright/test';

test.describe('Basics module', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/playwright/basics');
	});

	test('displays the main heading', async ({ page }) => {
		const heading = page.locator('#main-heading');
		await expect(heading).toBeVisible();
		await expect(heading).toHaveText('Basics');
	});

	test('displays stable welcome text', async ({ page }) => {
		const welcome = page.locator('#welcome-text');
		await expect(welcome).toBeVisible();
		await expect(welcome).toContainText('Welcome to the Basics module');
	});

	test('changes text when button is clicked', async ({ page }) => {
		const dynamicText = page.locator('#dynamic-text');
		const button = page.locator('#change-text-btn');

		await expect(dynamicText).toHaveText('Click me');
		await button.click();
		await expect(dynamicText).toHaveText('Clicked!');
		await button.click();
		await expect(dynamicText).toHaveText('Click me');
	});

	test('toggles extra content visibility', async ({ page }) => {
		const toggle = page.locator('#toggle-extra-btn');
		const extra = page.locator('#extra-content');

		await expect(extra).toBeHidden();
		await toggle.click();
		await expect(extra).toBeVisible();
		await expect(page.locator('#extra-text')).toContainText('This content appears and disappears');
		await toggle.click();
		await expect(extra).toBeHidden();
	});

	test('navigates to home via link', async ({ page }) => {
		await page.click('#link-home');
		await expect(page).toHaveURL('/');
		await expect(page.locator('h1')).toContainText('Playwright Automation');
	});

	test('navigates to forms module via link', async ({ page }) => {
		await page.click('#link-forms');
		await expect(page).toHaveURL('/playwright/forms');
	});
});
