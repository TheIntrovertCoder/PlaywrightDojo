import { expect, test } from '@playwright/test';

test.describe('iframes & Shadow DOM module', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/playwright/frames');
	});

	test('interacts with content inside an iframe', async ({ page }) => {
		const frame = page.frameLocator('#demo-iframe');

		// Elements inside the iframe
		await expect(frame.locator('#frame-heading')).toHaveText('Inside the iframe');
		await expect(frame.locator('#frame-count')).toHaveText('Count: 0');

		// Click the button inside the iframe
		await frame.locator('#frame-btn').click();
		await expect(frame.locator('#frame-count')).toHaveText('Count: 1');
	});

	test('iframe does not render the parent navbar or footer', async ({ page }) => {
		const frame = page.frameLocator('#demo-iframe');

		// Navbar should not exist inside the iframe
		await expect(frame.locator('nav[aria-label="Modules"]')).toHaveCount(0);
		// Footer should not exist inside the iframe
		await expect(frame.locator('footer')).toHaveCount(0);
		// Content should be visible (not covered)
		await expect(frame.locator('#frame-heading')).toBeVisible();
		await expect(frame.locator('#frame-btn')).toBeVisible();
	});

	test('pierces shadow DOM', async ({ page }) => {
		// Shadow DOM content is inside a shadow root — pierce via evaluate
		const shadowText = await page.locator('#shadow-host').evaluate((el) => {
			return (el as HTMLElement).shadowRoot?.querySelector('#shadow-text')?.textContent;
		});
		expect(shadowText).toBe('This is real shadow DOM content.');

		const shadowBtn = await page.locator('#shadow-host').evaluate((el) => {
			return !!(el as HTMLElement).shadowRoot?.querySelector('#shadow-btn');
		});
		expect(shadowBtn).toBe(true);

		// Click the shadow button via evaluate
		await page.locator('#shadow-host').evaluate((el) => {
			const btn = (el as HTMLElement).shadowRoot?.querySelector(
				'#shadow-btn'
			) as HTMLElement | null;
			btn?.click();
		});
	});

	test('toggles shadow host visibility', async ({ page }) => {
		const shadowHost = page.locator('#shadow-host');
		const toggleBtn = page.locator('#toggle-shadow-btn');

		await expect(shadowHost).toBeVisible();
		await toggleBtn.click();
		await expect(shadowHost).toBeHidden();
		await toggleBtn.click();
		await expect(shadowHost).toBeVisible();
	});
});
