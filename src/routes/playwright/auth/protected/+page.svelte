<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';

	let authenticated = $state(false);
	let username = $state('');

	onMount(() => {
		const token = localStorage.getItem('auth_token');
		if (!token) {
			void goto(resolve('/playwright/auth/login'));
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
		void goto(resolve('/playwright/auth/login'));
	}
</script>

<svelte:head>
	<title>Protected — PlaywrightDojo</title>
</svelte:head>

<main class="mx-auto max-w-md px-4 py-12">
	{#if authenticated}
		<div class="text-center">
			<h1 class="mb-6 text-2xl font-bold tracking-tight text-fg">Protected Page</h1>
			<p class="mb-6 text-lg text-muted-fg">
				Welcome, <strong>{username}</strong>! You are viewing a protected page that requires
				authentication.
			</p>
			<div
				class="mb-6 rounded-lg border border-success-border bg-success-bg p-4 text-sm text-success-fg"
			>
				Session active. Token stored in localStorage.
			</div>
			<button
				id="logout-btn"
				onclick={handleLogout}
				class="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-strong focus:ring-2 focus:ring-brand focus:outline-none"
			>
				Logout
			</button>
			<a
				id="login-link"
				href={resolve('/playwright/auth/login')}
				class="mt-4 inline-block text-sm font-medium text-brand hover:text-brand-strong"
			>
				Go to login page
			</a>
		</div>
	{:else}
		<div class="text-center">
			<h1 class="mb-6 text-2xl font-bold tracking-tight text-fg">Access Denied</h1>
			<p class="mb-6 text-lg text-muted-fg">You must be logged in to view this page.</p>
			<button
				id="login-btn"
				onclick={() => {
					void goto(resolve('/playwright/auth/login'));
				}}
				class="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-strong focus:ring-2 focus:ring-brand focus:outline-none"
			>
				Go to login
			</button>
		</div>
	{/if}
</main>
