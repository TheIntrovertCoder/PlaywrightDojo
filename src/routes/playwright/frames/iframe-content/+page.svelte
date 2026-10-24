<script lang="ts">
	let count = $state(0);

	function increment() {
		count += 1;
	}
</script>

<svelte:head>
	<title>Iframe Content — PlaywrightDojo</title>
</svelte:head>

<main class="p-6 text-center">
	<h1 id="frame-heading" class="mb-4 text-xl font-bold text-fg">Inside the iframe</h1>
	<p id="frame-text" class="mb-6 text-muted-fg">
		This page is loaded inside an iframe. Use frameLocator to interact.
	</p>
	<button
		id="frame-btn"
		onclick={increment}
		class="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-strong focus:ring-2 focus:ring-brand focus:outline-none"
	>
		Click count: {count}
	</button>
	<p id="frame-count" class="mt-3 text-sm text-muted-fg">
		Count: {count}
	</p>
</main>
