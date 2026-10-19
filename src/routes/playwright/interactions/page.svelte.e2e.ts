import { expect, test } from '@playwright/test';

test.describe('Complex Interactions module', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/playwright/interactions');
	});

	test('reveals dropdown on hover', async ({ page }) => {
		const trigger = page.locator('#dropdown-trigger');
		const menu = page.locator('#dropdown-menu');

		await expect(menu).toBeHidden();
		await trigger.hover();
		await expect(menu).toBeVisible();
		await expect(page.locator('#dropdown-item-1')).toHaveText('Action 1');
		await expect(page.locator('#dropdown-item-2')).toHaveText('Action 2');
	});

	test('drags an item into the drop zone', async ({ page }) => {
		await page.locator('#drag-item-1').dragTo(page.locator('#drop-zone'));
		await expect(page.locator('#drop-result')).toContainText('Dropped "Item 1" into "drop-zone"');
	});

	test('triggers keyboard shortcut', async ({ page }) => {
		const shortcutArea = page.locator('#shortcut-area');
		await shortcutArea.click();
		await shortcutArea.press('Control+KeyK');
		await expect(page.locator('#shortcut-result')).toHaveText('Cmd/Ctrl + K shortcut triggered');
	});

	test('detects modifier key state', async ({ page }) => {
		const shortcutArea = page.locator('#shortcut-area');
		await shortcutArea.click();
		await page.keyboard.down('Control');
		await expect(page.locator('#ctrl-state')).toHaveText('Modifier held: yes');
		await page.keyboard.up('Control');
		await expect(page.locator('#ctrl-state')).toHaveText('Modifier held: no');
	});
});
