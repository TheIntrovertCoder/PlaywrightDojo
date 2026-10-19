import { expect, test } from '@playwright/test';

test.describe('Data Tables module', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/playwright/tables');
	});

	test('displays table rows', async ({ page }) => {
		await expect(page.locator('#row-1')).toBeVisible();
		await expect(page.locator('#row-1')).toContainText('Ada Lovelace');
		await expect(page.locator('#row-2')).toContainText('Grace Hopper');
		await expect(page.locator('#row-5')).toContainText('Nikola Tesla');
	});

	test('selects a table row', async ({ page }) => {
		await page.click('#row-3');
		await expect(page.locator('#selected-row')).toContainText('Selected row: 3');
		await page.click('#row-3');
		await expect(page.locator('#selected-row')).toContainText('Selected row: none');
	});

	test('sorts by column', async ({ page }) => {
		const rows = page.locator('#users-table tbody tr');

		await page.click('#col-name');
		await expect(rows.first()).toContainText('Ada Lovelace');
		await expect(rows.nth(1)).toContainText('Alan Turing');

		await page.click('#col-name');
		await expect(rows.first()).toContainText('Nikola Tesla');
	});

	test('paginates through pages', async ({ page }) => {
		await expect(page.locator('#row-6')).toBeHidden();
		await expect(page.locator('#row-7')).toBeHidden();

		await page.click('#next-page');
		await expect(page.locator('#row-6')).toBeVisible();
		await expect(page.locator('#row-6')).toContainText('Marie Curie');
		await expect(page.locator('#row-7')).toBeVisible();
		await expect(page.locator('#row-7')).toContainText('Charles Babbage');

		await page.click('#prev-page');
		await expect(page.locator('#row-1')).toBeVisible();
		await expect(page.locator('#row-6')).toBeHidden();
	});

	test('resets table state', async ({ page }) => {
		await page.click('#row-2');
		await expect(page.locator('#selected-row')).toContainText('Selected row: 2');

		await page.click('#reset-btn');
		await expect(page.locator('#selected-row')).toContainText('Selected row: none');
	});
});
