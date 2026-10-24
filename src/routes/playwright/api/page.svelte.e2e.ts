import { expect, test, type Page } from '@playwright/test';

async function expectSeededUsers(page: Page) {
	await expect(page.locator('#user-1')).toContainText('Ada Lovelace');
	await expect(page.locator('#user-2')).toContainText('Grace Hopper');
	await expect(page.locator('#user-3')).toContainText('Alan Turing');
}

test.describe('API Interception module', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/playwright/api');
	});

	test('renders user list from API', async ({ page }) => {
		await expect(page.locator('#users-table')).toBeVisible();

		// Wait for the user count to load (the page fetches users on mount)
		// Retry a few times in case other tests have temporarily polluted API state
		await expect
			.poll(
				async () => {
					const countText = (await page.locator('#user-count').textContent()) ?? '';
					const userCount = Number(countText.match(/\d+/)?.[0] ?? 0);
					return userCount;
				},
				{ timeout: 10000, intervals: [500, 1000, 2000] }
			)
			.toBeGreaterThanOrEqual(3);

		await expectSeededUsers(page);
	});

	test('intercepts API response with page.route()', async ({ page }) => {
		// Mock the API to return a single user
		await page.route('**/api/users', async (route) => {
			await route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify({ users: [{ id: 99, name: 'Mock User', role: 'tester' }], total: 1 })
			});
		});

		await page.reload();
		await expect(page.locator('#user-count')).toContainText('1 user(s)');
		await expect(page.locator('#user-99')).toContainText('Mock User');
		await expect(page.locator('#user-1')).toBeHidden();
	});

	test('intercepts and modifies request body', async ({ page }) => {
		let capturedBody: string | null = null;

		await page.route('**/api/users', async (route) => {
			const request = route.request();
			if (request.method() === 'POST') {
				capturedBody = request.postData();
				// Fulfill the request so we don't actually POST to the shared API
				// and pollute state for other tests
				await route.fulfill({
					status: 201,
					contentType: 'application/json',
					body: JSON.stringify({ user: { id: 999, name: 'Test User', role: 'tester' } })
				});
				return;
			}
			await route.continue();
		});

		await page.locator('#new-name').fill('Test User');
		await page.locator('#new-role').fill('tester');

		// Click and wait for the form submission to complete by waiting for the status message
		await Promise.all([
			page.click('#create-btn'),
			page.waitForResponse(
				(resp) => resp.url().includes('/api/users') && resp.request().method() === 'POST'
			)
		]);

		// Wait for status message to confirm creation
		await expect(page.locator('#status-message')).toContainText('Created', { timeout: 10000 });

		// Verify the request body was captured
		expect(capturedBody).toContain('Test User');
		expect(capturedBody).toContain('tester');
	});

	test('mocks API error response', async ({ page }) => {
		await page.route('**/api/users', async (route) => {
			await route.fulfill({
				status: 500,
				contentType: 'application/json',
				body: JSON.stringify({ error: 'Server error' })
			});
		});

		await page.reload();
		await expect(page.locator('#user-count')).toContainText('0 user(s)');
	});

	test('uses APIRequestContext for direct API assertions', async ({ request }) => {
		// Direct API call without loading the page
		const response = await request.get('/api/users');
		expect(response.ok()).toBeTruthy();
		const body = await response.json();
		expect(body.users.length).toBeGreaterThanOrEqual(3);
		expect(body.total).toBeGreaterThanOrEqual(3);

		// Verify known users exist
		const names = body.users.map((u: { name: string }) => u.name);
		expect(names).toContain('Ada Lovelace');
		expect(names).toContain('Grace Hopper');
		expect(names).toContain('Alan Turing');

		// Search filter
		const searchResponse = await request.get('/api/users?search=ada');
		const searchBody = await searchResponse.json();
		expect(searchBody.users.length).toBe(1);
		expect(searchBody.users[0].name).toBe('Ada Lovelace');

		// Create a user via API
		const createResponse = await request.post('/api/users', {
			data: { name: 'API User', role: 'tester' }
		});
		expect(createResponse.ok()).toBeTruthy();
		const createBody = await createResponse.json();
		expect(createBody.user.name).toBe('API User');
		expect(createBody.user.role).toBe('tester');

		// Verify the created user appears
		const verifyResponse = await request.get('/api/users');
		const verifyBody = await verifyResponse.json();
		expect(verifyBody.users.some((u: { name: string }) => u.name === 'API User')).toBeTruthy();

		// Clean up: delete the created user so it doesn't affect other tests
		const deleteResponse = await request.delete('/api/users', {
			data: { id: createBody.user.id }
		});
		expect(deleteResponse.ok()).toBeTruthy();
	});

	test('deletes a user via APIRequestContext', async ({ request }) => {
		// Create a user first so we have something to delete
		const createResponse = await request.post('/api/users', {
			data: { name: 'ToDelete', role: 'temp' }
		});
		expect(createResponse.ok()).toBeTruthy();
		const createBody = await createResponse.json();
		const createdId = createBody.user.id;

		// Verify it was created
		const beforeDelete = await request.get('/api/users');
		const beforeBody = await beforeDelete.json();
		expect(beforeBody.users.some((u: { id: number }) => u.id === createdId)).toBeTruthy();

		// Delete the created user
		const deleteResponse = await request.delete(`/api/users`, {
			data: { id: createdId }
		});
		expect(deleteResponse.ok()).toBeTruthy();

		// Verify deletion
		const afterDelete = await request.get('/api/users');
		const afterBody = await afterDelete.json();
		expect(afterBody.users.some((u: { id: number }) => u.id === createdId)).toBeFalsy();

		// Delete non-existent user
		const notFound = await request.delete('/api/users', {
			data: { id: 99999 }
		});
		expect(notFound.ok()).toBeFalsy();
		const notFoundBody = await notFound.json();
		expect(notFoundBody.error).toBe('User not found');
	});

	test('shows static-mode banner and seeded data when API returns 404', async ({ page }) => {
		// Intercept the API call and return 404 to simulate static hosting
		await page.route('**/api/users', async (route) => {
			await route.fulfill({
				status: 404,
				contentType: 'application/json',
				body: JSON.stringify({ error: 'Not found' })
			});
		});

		await page.goto('/playwright/api');

		// Banner should be visible
		await expect(page.locator('#static-api-banner')).toBeVisible();
		await expect(page.locator('#static-api-banner')).toContainText('Static demo mode');
		await expect(page.locator('#static-api-banner a')).toHaveAttribute(
			'href',
			'https://github.com/TheIntrovertCoder/PlaywrightDojo'
		);

		// Seeded data should render (3 users)
		await expect(page.locator('#user-count')).toContainText('3 user(s)');
		await expectSeededUsers(page);

		// Create should work against local store
		await page.locator('#new-name').fill('Local User');
		await page.locator('#new-role').fill('local');

		// Submit the form by pressing Enter in the role input (last field)
		await page.locator('#new-role').press('Enter');

		// Wait for the status message to appear (form submission is async)
		await expect(page.locator('#status-message')).toBeVisible({ timeout: 10000 });
		await expect(page.locator('#status-message')).toContainText('Created Local User (local)');

		// Delete should work against local store
		await page.locator(`button[id="delete-1"]`).click();
		await expect(page.locator('#status-message')).toContainText('Deleted user 1');
	});
});
