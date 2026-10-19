import { expect, test } from '@playwright/test';

test.describe('Authentication module', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/playwright/auth/login');
	});

	test('login flow redirects to protected page', async ({ page }) => {
		await page.locator('#username').fill('test');
		await page.locator('#password').fill('test123');
		await page.click('#login-btn');

		await expect(page).toHaveURL('/playwright/auth/protected');
		await expect(page.locator('h1')).toContainText('Protected Page');
		await expect(page.locator('strong')).toContainText('test');
	});

	test('protected page redirects to login when not authenticated', async ({ page }) => {
		await page.goto('/playwright/auth/protected');
		await expect(page).toHaveURL('/playwright/auth/login');
		await expect(page.locator('h1')).toContainText('Login');
	});

	test('invalid credentials show error', async ({ page }) => {
		await page.locator('#username').fill('wrong');
		await page.locator('#password').fill('wrong');
		await page.click('#login-btn');

		await expect(page.locator('#login-error')).toContainText('Invalid username or password');
		await expect(page).toHaveURL('/playwright/auth/login');
	});

	test('logout clears session', async ({ page }) => {
		// Log in first
		await page.locator('#username').fill('test');
		await page.locator('#password').fill('test123');
		await page.click('#login-btn');
		await expect(page).toHaveURL('/playwright/auth/protected');

		// Log out
		await page.click('#logout-btn');
		await expect(page).toHaveURL('/playwright/auth/login');
		await expect(page.locator('#username')).toHaveValue('');
	});
});
