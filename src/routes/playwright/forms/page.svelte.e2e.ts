import { expect, test } from '@playwright/test';

test.describe('Forms module', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/playwright/forms');
	});

	test('fills text input and asserts value', async ({ page }) => {
		const nameInput = page.locator('#name-input');
		await nameInput.fill('Ada Lovelace');
		await expect(nameInput).toHaveValue('Ada Lovelace');
	});

	test('presses sequentially into input', async ({ page }) => {
		const nameInput = page.locator('#name-input');
		await nameInput.pressSequentially('Grace', { delay: 10 });
		await expect(nameInput).toHaveValue('Grace');
	});

	test('fills textarea and counts characters', async ({ page }) => {
		const textarea = page.locator('#message-textarea');
		const count = page.locator('#message-count');
		await textarea.fill('Hello, Playwright!');
		await expect(textarea).toHaveValue('Hello, Playwright!');
		await expect(count).toContainText('18 characters');
	});

	test('checks and unchecks checkbox', async ({ page }) => {
		const checkbox = page.locator('#agree-checkbox');
		await expect(checkbox).not.toBeChecked();
		await checkbox.check();
		await expect(checkbox).toBeChecked();
		await checkbox.uncheck();
		await expect(checkbox).not.toBeChecked();
	});

	test('selects a radio option', async ({ page }) => {
		const proRadio = page.locator('input[name="plan"][value="pro"]');
		await proRadio.check();
		await expect(proRadio).toBeChecked();
		await expect(page.locator('#plan-display')).toContainText('Selected: pro');
	});

	test('selects an option from a dropdown', async ({ page }) => {
		const select = page.locator('#department-select');
		await select.selectOption('design');
		await expect(select).toHaveValue('design');
	});

	test('shows validation errors on empty submit', async ({ page }) => {
		await page.click('#submit-btn');
		await expect(page.locator('#name-error')).toContainText('Name is required');

		await page.locator('#name-input').fill('Test User');
		await page.click('#submit-btn');
		await expect(page.locator('#email-error')).toContainText('Email is required');

		await page.locator('#email-input').fill('test@example.com');
		await page.click('#submit-btn');
		await expect(page.locator('#submit-error')).toContainText('You must agree to the terms');
	});

	test('submits the form successfully', async ({ page }) => {
		await page.locator('#name-input').fill('Test User');
		await page.locator('#email-input').fill('test@example.com');
		await page.locator('#agree-checkbox').check();
		await page.click('#submit-btn');

		await expect(page.locator('#success-message')).toBeVisible();
		await expect(page.locator('#success-message')).toContainText('Submissions: 1');
	});

	test('resets the form', async ({ page }) => {
		await page.locator('#name-input').fill('Test User');
		await page.locator('#agree-checkbox').check();
		await page.click('#reset-btn');

		await expect(page.locator('#name-input')).toHaveValue('');
		await expect(page.locator('#agree-checkbox')).not.toBeChecked();
		await expect(page.locator('#success-message')).not.toBeVisible();
	});

	test('radio group and select dropdown operate independently', async ({ page }) => {
		// Select a plan via radio group
		const proRadio = page.locator('input[name="plan"][value="pro"]');
		await proRadio.check();
		await expect(proRadio).toBeChecked();
		await expect(page.locator('#plan-display')).toContainText('Selected: pro');

		// Select a department via dropdown
		const select = page.locator('#department-select');
		await select.selectOption('design');
		await expect(select).toHaveValue('design');

		// Plan radio should remain selected (independence)
		await expect(proRadio).toBeChecked();
		await expect(page.locator('#plan-display')).toContainText('Selected: pro');

		// Reset clears both
		await page.click('#reset-btn');
		await expect(page.locator('#plan-display')).toContainText('Selected: (none)');
		await expect(select).toHaveValue('');
	});
});
