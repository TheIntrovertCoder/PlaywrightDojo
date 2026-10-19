<script lang="ts">
	import { onMount } from 'svelte';

	let users = $state<{ id: number; name: string; role: string }[]>([]);
	let total = $state(0);
	let newName = $state('');
	let newRole = $state('');
	let statusMessage = $state<string | null>(null);
	let statusType = $state<'success' | 'error'>('success');
	let isLoading = $state(false);

	async function fetchUsers(search = '') {
		isLoading = true;
		try {
			const url = search ? `/api/users?search=${encodeURIComponent(search)}` : '/api/users';
			const res = await fetch(url);
			if (!res.ok) {
				throw new Error(`HTTP ${res.status}`);
			}
			const data = await res.json();
			users = data.users;
			total = data.total;
			statusMessage = null;
		} catch {
			users = [];
			total = 0;
			statusMessage = 'Failed to load users';
			statusType = 'error';
		} finally {
			isLoading = false;
		}
	}

	async function createUser() {
		isLoading = true;
		const res = await fetch('/api/users', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name: newName, role: newRole })
		});
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
		const res = await fetch(`/api/users?id=${id}`, { method: 'DELETE' });
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
	<h1 class="mb-6 text-3xl font-bold tracking-tight text-gray-900">API Interception</h1>
	<p class="mb-10 text-lg text-gray-600">
		Practice Playwright API testing: intercept requests with
		<code class="rounded bg-gray-100 px-1.5">page.route()</code>, mock responses, and assert API
		calls with <code class="rounded bg-gray-100 px-1.5">APIRequestContext</code>.
	</p>

	<!-- User list -->
	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-gray-900">User List</h2>
		<div class="mb-4 flex gap-4">
			<input
				id="search-input"
				type="text"
				placeholder="Search users..."
				oninput={searchUsers}
				class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
			/>
			<span id="user-count" class="flex items-center text-sm text-gray-600">{total} user(s)</span>
		</div>
		<table id="users-table" class="w-full border-collapse border border-gray-200">
			<thead>
				<tr class="bg-gray-50">
					<th class="border border-gray-200 px-3 py-2 text-left text-sm font-medium text-gray-700">
						ID
					</th>
					<th class="border border-gray-200 px-3 py-2 text-left text-sm font-medium text-gray-700">
						Name
					</th>
					<th class="border border-gray-200 px-3 py-2 text-left text-sm font-medium text-gray-700">
						Role
					</th>
					<th class="border border-gray-200 px-3 py-2 text-left text-sm font-medium text-gray-700">
						Actions
					</th>
				</tr>
			</thead>
			<tbody>
				{#each users as user (user.id)}
					<tr id={`user-${user.id}`} class="border-b border-gray-100 hover:bg-gray-50">
						<td class="px-3 py-2 text-sm text-gray-700">{user.id}</td>
						<td class="px-3 py-2 text-sm text-gray-700">{user.name}</td>
						<td class="px-3 py-2 text-sm text-gray-700">{user.role}</td>
						<td class="px-3 py-2 text-sm">
							<button
								id={`delete-${user.id}`}
								onclick={() => deleteUser(user.id)}
								class="text-xs text-red-600 underline hover:text-red-800"
							>
								Delete
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
		{#if isLoading}
			<p id="loading-state" class="mt-2 text-sm text-gray-500">Loading...</p>
		{/if}
	</section>

	<!-- Create user -->
	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-gray-900">Create User</h2>
		<form id="create-form" onsubmit={createUser} class="space-y-4">
			<div>
				<label for="new-name" class="mb-1 block text-sm font-medium text-gray-700">Name</label>
				<input
					id="new-name"
					type="text"
					bind:value={newName}
					placeholder="Enter name"
					class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
				/>
			</div>
			<div>
				<label for="new-role" class="mb-1 block text-sm font-medium text-gray-700">Role</label>
				<input
					id="new-role"
					type="text"
					bind:value={newRole}
					placeholder="Enter role"
					class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
				/>
			</div>
			<button
				id="create-btn"
				type="submit"
				class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
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
						? 'border border-green-200 bg-green-50 text-green-800'
						: 'border border-red-200 bg-red-50 text-red-800'
				}`}
			>
				{statusMessage}
			</div>
		{/if}
	</section>
</main>
