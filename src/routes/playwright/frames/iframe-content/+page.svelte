<script lang="ts">
	let count = $state(0);

	function increment() {
		count += 1;
	}
</script>

<svelte:head>
	<title>Iframe Content — Playwright Learning Hub</title>
</svelte:head>

<main class="p-6 text-center">
	<h1 id="frame-heading" class="mb-4 text-xl font-bold text-gray-900">Inside the iframe</h1>
	<p id="frame-text" class="mb-6 text-gray-600">
		This page is loaded inside an iframe. Use frameLocator to interact.
	</p>
	<button
		id="frame-btn"
		onclick={increment}
		class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
	>
		Click count: {count}
	</button>
	<p id="frame-count" class="mt-3 text-sm text-gray-600">
		Count: {count}
	</p>
</main>
