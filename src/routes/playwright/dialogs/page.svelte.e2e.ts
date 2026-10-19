import { expect, test } from '@playwright/test';

test.describe('Dialogs & Modals module', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/playwright/dialogs');
	});

	test('handles JS alert', async ({ page }) => {
		let dialogMessage = '';
		page.on('dialog', async (dialog) => {
			dialogMessage = dialog.message();
			await dialog.accept();
		});

		await page.click('#alert-btn');
		await expect(page.locator('#dialog-result-text')).toHaveText('alert accepted');
		await expect(dialogMessage).toContain('This is an alert');
	});

	test('handles JS confirm (accept)', async ({ page }) => {
		page.on('dialog', async (dialog) => {
			await dialog.accept();
		});

		await page.click('#confirm-btn');
		await expect(page.locator('#dialog-result-text')).toHaveText('confirm accepted');
	});

	test('handles JS confirm (dismiss)', async ({ page }) => {
		page.on('dialog', async (dialog) => {
			await dialog.dismiss();
		});

		await page.click('#confirm-btn');
		await expect(page.locator('#dialog-result-text')).toHaveText('confirm dismissed');
	});

	test('handles JS prompt with text', async ({ page }) => {
		page.on('dialog', async (dialog) => {
			await dialog.accept('Playwright User');
		});

		await page.click('#prompt-btn');
		await expect(page.locator('#dialog-result-text')).toHaveText('prompt: Playwright User');
	});

	test('opens and closes custom modal', async ({ page }) => {
		const modal = page.locator('#modal');

		await expect(modal).toBeHidden();
		await page.click('#open-modal-btn');
		await expect(modal).toBeVisible();
		await expect(page.locator('#modal-title')).toHaveText('Modal Title');

		// Close by clicking the backdrop
		await page.locator('#modal').click({ position: { x: 100, y: 100 } });
		await expect(modal).toBeHidden();
	});

	test('closes custom modal on confirm', async ({ page }) => {
		await page.click('#open-modal-btn');
		await expect(page.locator('#modal')).toBeVisible();
		await page.locator('#modal-confirm-btn').click({ force: true });

		await expect(page.locator('#modal')).toBeHidden();
	});

	test('closes custom modal on cancel', async ({ page }) => {
		await page.click('#open-modal-btn');
		await expect(page.locator('#modal')).toBeVisible();
		await page.locator('#modal-cancel-btn').click({ force: true });

		await expect(page.locator('#modal')).toBeHidden();
	});
});
