<script lang="ts">
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';

	let authenticated = $state(false);
	let username = $state('');

	onMount(() => {
		const token = localStorage.getItem('auth_token');
		if (!token) {
			void window.location.assign('/playwright/auth/login');
			return;
		}
		authenticated = true;
		const user = localStorage.getItem('auth_user');
		username = user ?? '';
	});

	function handleLogout() {
		localStorage.removeItem('auth_token');
		localStorage.removeItem('auth_user');
		authenticated = false;
		username = '';
		void window.location.assign('/playwright/auth/login');
	}
</script>

<svelte:head>
	<title>Protected — Playwright Learning Hub</title>
</svelte:head>

<main class="mx-auto max-w-md px-4 py-12">
	{#if authenticated}
		<div class="text-center">
			<h1 class="mb-6 text-2xl font-bold tracking-tight text-gray-900">Protected Page</h1>
			<p class="mb-6 text-lg text-gray-600">
				Welcome, <strong>{username}</strong>! You are viewing a protected page that requires
				authentication.
			</p>
			<div class="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
				Session active. Token stored in localStorage.
			</div>
			<button
				id="logout-btn"
				onclick={handleLogout}
				class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
			>
				Logout
			</button>
			<a
				id="login-link"
				href={resolve('/playwright/auth/login')}
				class="mt-4 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-900"
			>
				Go to login page
			</a>
		</div>
	{:else}
		<div class="text-center">
			<h1 class="mb-6 text-2xl font-bold tracking-tight text-gray-900">Access Denied</h1>
			<p class="mb-6 text-lg text-gray-600">You must be logged in to view this page.</p>
			<button
				id="login-btn"
				onclick={() => {
					void window.location.assign('/playwright/auth/login');
				}}
				class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
			>
				Go to login
			</button>
		</div>
	{/if}
</main>
