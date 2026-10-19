<script lang="ts">
	let username = $state('');
	let password = $state('');
	let error = $state<string | null>(null);
	let loading = $state(false);

	function handleSubmit(event: Event) {
		event.preventDefault();
		error = null;

		if (username === 'test' && password === 'test123') {
			localStorage.setItem('auth_token', 'fake-token-12345');
			localStorage.setItem('auth_user', username);
			void window.location.assign('/playwright/auth/protected');
		} else {
			error = 'Invalid username or password';
		}
	}
</script>

<svelte:head>
	<title>Login — Playwright Learning Hub</title>
</svelte:head>

<main class="mx-auto max-w-md px-4 py-12">
	<div class="max-w-sm">
		<h1 class="mb-6 text-2xl font-bold tracking-tight text-gray-900">Login</h1>
		<form onsubmit={handleSubmit} class="space-y-4">
			<div>
				<label for="username" class="mb-1 block text-sm font-medium text-gray-700">Username</label>
				<input
					id="username"
					type="text"
					bind:value={username}
					placeholder="Enter username"
					class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
				/>
			</div>
			<div>
				<label for="password" class="mb-1 block text-sm font-medium text-gray-700">Password</label>
				<input
					id="password"
					type="password"
					bind:value={password}
					placeholder="Enter password"
					class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
				/>
			</div>
			{#if error}
				<p id="login-error" class="text-sm text-red-600" role="alert">{error}</p>
			{/if}
			<button
				id="login-btn"
				type="submit"
				class="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none disabled:opacity-50"
				disabled={loading}
			>
				Sign in
			</button>
		</form>
		<p class="mt-6 text-center text-sm text-gray-600">
			Try: <strong>test</strong> / <strong>test123</strong>
		</p>
	</div>
</main>
