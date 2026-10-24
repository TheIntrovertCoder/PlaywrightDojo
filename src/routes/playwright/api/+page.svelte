<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';

	let users = $state<{ id: number; name: string; role: string }[]>([]);
	let total = $state(0);
	let newName = $state('');
	let newRole = $state('');
	let statusMessage = $state<string | null>(null);
	let statusType = $state<'success' | 'error'>('success');
	let isLoading = $state(false);
	let staticMode = $state(false);

	// In-browser seeded data for static hosting fallback
	const seedUsers = [
		{ id: 1, name: 'Ada Lovelace', role: 'developer' },
		{ id: 2, name: 'Grace Hopper', role: 'engineer' },
		{ id: 3, name: 'Alan Turing', role: 'researcher' }
	];
	let localUsers = $state([...seedUsers]);
	let localNextId = 4;

	// Use resolve() for all API URLs to respect base path
	const apiUsersUrl = resolve('/api/users');

	async function fetchUsers(search = '') {
		isLoading = true;
		try {
			const url = search ? `${apiUsersUrl}?search=${encodeURIComponent(search)}` : apiUsersUrl;
			const res = await fetch(url);
			if (res.status === 404) {
				// Static hosting: API endpoint doesn't exist
				throw new Error('STATIC_MODE');
			}
			if (!res.ok) {
				throw new Error(`HTTP ${res.status}`);
			}
			const data = await res.json();
			users = data.users;
			total = data.total;
			staticMode = false;
			statusMessage = null;
		} catch (err) {
			if (err instanceof Error && err.message === 'STATIC_MODE') {
				staticMode = true;
				const filtered = search
					? localUsers.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()))
					: localUsers;
				users = [...filtered]; // Create a copy to avoid mutating localUsers
				total = filtered.length;
				statusMessage = null;
			} else {
				users = [];
				total = 0;
				statusMessage = 'Failed to load users';
				statusType = 'error';
			}
		} finally {
			isLoading = false;
		}
	}

	async function createUser() {
		isLoading = true;
		const res = await fetch(apiUsersUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name: newName, role: newRole })
		});
		if (res.status === 404) {
			// Static hosting fallback: operate on local store
			const newUser = { id: localNextId++, name: newName, role: newRole };
			localUsers.push(newUser);
			users.push(newUser);
			total = localUsers.length;
			statusMessage = `Created ${newUser.name} (${newUser.role})`;
			statusType = 'success';
			staticMode = true;
			newName = '';
			newRole = '';
			isLoading = false;
			return;
		}
		const data = await res.json();
		if (res.ok) {
			statusMessage = `Created ${data.user.name} (${data.user.role})`;
			statusType = 'success';
			newName = '';
			newRole = '';
			await fetchUsers();
		} else {
			statusMessage = 'Failed to create user';
			statusType = 'error';
		}
		isLoading = false;
	}

	async function deleteUser(id: number) {
		const res = await fetch(apiUsersUrl, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id })
		});
		if (res.status === 404) {
			// Static hosting fallback
			const idx = localUsers.findIndex((u) => u.id === id);
			if (idx !== -1) {
				localUsers.splice(idx, 1);
				users = users.filter((u) => u.id !== id);
				total = localUsers.length;
				statusMessage = `Deleted user ${id}`;
				statusType = 'success';
				staticMode = true;
				return;
			}
			statusMessage = 'User not found';
			statusType = 'error';
			return;
		}
		const data = await res.json();
		if (data.deleted) {
			statusMessage = `Deleted user ${id}`;
			statusType = 'success';
			await fetchUsers();
		} else {
			statusMessage = data.error || 'Failed to delete';
			statusType = 'error';
		}
	}

	async function searchUsers(event: Event) {
		const input = event.target as HTMLInputElement;
		await fetchUsers(input.value);
	}

	onMount(() => {
		void fetchUsers();
	});
</script>

<svelte:head>
	<title>API Interception — Playwright Learning Hub</title>
</svelte:head>

<main class="mx-auto max-w-3xl px-4 py-12">
	<h1 class="mb-6 text-3xl font-bold tracking-tight text-fg">API Interception</h1>
	<p class="mb-10 text-lg text-muted-fg">
		Practice Playwright API testing: intercept requests with
		<code class="rounded bg-subtle px-1.5">page.route()</code>, mock responses, and assert API calls
		with <code class="rounded bg-subtle px-1.5">APIRequestContext</code>.
	</p>

	{#if staticMode}
		<div
			id="static-api-banner"
			class="mb-6 rounded-lg border border-warning-border bg-warning-bg p-4 text-sm text-warning-fg"
			role="status"
		>
			<strong>Static demo mode</strong> — using in-browser data.
			<a
				href="https://github.com/TheIntrovertCoder/PlaywrightLearn"
				target="_blank"
				rel="noopener noreferrer"
				class="ml-2 underline hover:no-underline"
			>
				Run locally
			</a>
			for API interception tests.
		</div>
	{/if}

	<!-- User list -->
	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-fg">User List</h2>
		<div class="mb-4 flex gap-4">
			<input
				id="search-input"
				type="text"
				placeholder="Search users..."
				oninput={searchUsers}
				class="w-full rounded-lg border border-line-strong px-3 py-2 text-sm focus:ring-2 focus:ring-brand focus:outline-none"
			/>
			<span id="user-count" class="flex items-center text-sm text-muted-fg">{total} user(s)</span>
		</div>
		<table id="users-table" class="w-full border-collapse border border-line">
			<thead>
				<tr class="bg-muted">
					<th class="border border-line px-3 py-2 text-left text-sm font-medium text-muted-fg">
						ID
					</th>
					<th class="border border-line px-3 py-2 text-left text-sm font-medium text-muted-fg">
						Name
					</th>
					<th class="border border-line px-3 py-2 text-left text-sm font-medium text-muted-fg">
						Role
					</th>
					<th class="border border-line px-3 py-2 text-left text-sm font-medium text-muted-fg">
						Actions
					</th>
				</tr>
			</thead>
			<tbody>
				{#each users as user (user.id)}
					<tr id={`user-${user.id}`} class="border-b border-line/50 hover:bg-muted">
						<td class="px-3 py-2 text-sm text-muted-fg">{user.id}</td>
						<td class="px-3 py-2 text-sm text-muted-fg">{user.name}</td>
						<td class="px-3 py-2 text-sm text-muted-fg">{user.role}</td>
						<td class="px-3 py-2 text-sm">
							<button
								id={`delete-${user.id}`}
								onclick={() => deleteUser(user.id)}
								class="text-xs text-error-fg underline hover:text-error-fg/80"
							>
								Delete
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
		{#if isLoading}
			<p id="loading-state" class="mt-2 text-sm text-faint">Loading...</p>
		{/if}
	</section>

	<!-- Create user -->
	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-fg">Create User</h2>
		<form id="create-form" onsubmit={createUser} class="space-y-4">
			<div>
				<label for="new-name" class="mb-1 block text-sm font-medium text-muted-fg">Name</label>
				<input
					id="new-name"
					type="text"
					bind:value={newName}
					placeholder="Enter name"
					class="w-full rounded-lg border border-line-strong px-3 py-2 text-sm focus:ring-2 focus:ring-brand focus:outline-none"
				/>
			</div>
			<div>
				<label for="new-role" class="mb-1 block text-sm font-medium text-muted-fg">Role</label>
				<input
					id="new-role"
					type="text"
					bind:value={newRole}
					placeholder="Enter role"
					class="w-full rounded-lg border border-line-strong px-3 py-2 text-sm focus:ring-2 focus:ring-brand focus:outline-none"
				/>
			</div>
			<button
				id="create-btn"
				type="submit"
				class="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-strong focus:ring-2 focus:ring-brand focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
				disabled={isLoading}
			>
				{isLoading ? 'Creating...' : 'Create User'}
			</button>
		</form>
		{#if statusMessage}
			<div
				id="status-message"
				class={`mt-4 rounded-lg p-3 text-sm ${
					statusType === 'success'
						? 'border border-success-border bg-success-bg text-success-fg'
						: 'border border-error-border bg-error-bg text-error-fg'
				}`}
			>
				{statusMessage}
			</div>
		{/if}
	</section>
</main>
