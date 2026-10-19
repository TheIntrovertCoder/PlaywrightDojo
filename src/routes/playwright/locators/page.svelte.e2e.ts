import { expect, test } from '@playwright/test';

test.describe('Locator Strategies module', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/playwright/locators');
	});

	test('getByRole: button, link, textbox', async ({ page }) => {
		await expect(page.getByRole('button', { name: 'Submit request' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'Help center' })).toBeVisible();
		await expect(page.getByRole('textbox', { name: 'Search input' })).toBeVisible();
	});

	test('getByLabel: username and password inputs', async ({ page }) => {
		await expect(page.getByLabel('Username')).toBeVisible();
		await expect(page.getByLabel('Password')).toBeVisible();

		await page.getByLabel('Username').fill('ada');
		await expect(page.getByLabel('Username')).toHaveValue('ada');

		await page.getByLabel('Password').fill('secret');
		await expect(page.getByLabel('Password')).toHaveValue('secret');
	});

	test('getByText: paragraph and buttons', async ({ page }) => {
		await expect(page.getByText('Welcome to the locator practice page.')).toBeVisible();
		await expect(page.getByRole('button', { name: 'Save changes' })).toBeVisible();
		await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
	});

	test('getByTestId: user card and status badge', async ({ page }) => {
		await expect(page.getByTestId('user-card')).toBeVisible();
		await expect(page.getByTestId('user-card')).toContainText('User profile card');
		await expect(page.getByTestId('status-badge')).toContainText('Active');
	});

	test('chaining: scope within a container', async ({ page }) => {
		const itemList = page.locator('#item-list');
		await expect(itemList.getByText('Apple')).toBeVisible();
		await expect(itemList.getByText('Carrot')).toBeVisible();
	});

	test('filtering: narrow down list items', async ({ page }) => {
		const input = page.locator('#filter-input');
		await input.fill('carrot');
		await expect(page.getByTestId('item-carrot')).toBeVisible();
		await expect(page.getByTestId('item-apple')).toBeHidden();
		await expect(page.locator('#item-count')).toContainText('1 item(s) matching');
	});

	test('filtering: clear filter shows all items', async ({ page }) => {
		const input = page.locator('#filter-input');
		await input.fill('apple');
		await expect(page.getByTestId('item-apple')).toBeVisible();

		await input.fill('');
		await expect(page.getByTestId('item-apple')).toBeVisible();
		await expect(page.getByTestId('item-banana')).toBeVisible();
		await expect(page.getByTestId('item-carrot')).toBeVisible();
		await expect(page.getByTestId('item-broccoli')).toBeVisible();
		await expect(page.getByTestId('item-cherry')).toBeVisible();
		await expect(page.locator('#item-count')).toContainText('5 item(s) matching');
	});
});
