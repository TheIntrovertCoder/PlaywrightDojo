<script lang="ts">
	let loading = $state(false);
	let loadedMessage = $state<string | null>(null);
	let loadError = $state<string | null>(null);
	let buttonDisabled = $state(false);
	let delayedContentVisible = $state(false);

	async function simulateLoad() {
		loading = true;
		loadError = null;
		loadedMessage = null;
		buttonDisabled = true;

		try {
			await new Promise((resolve) => setTimeout(resolve, 1500));
			loadedMessage = 'Content loaded successfully after 1.5 seconds.';
		} catch {
			loadError = 'Failed to load content.';
		} finally {
			loading = false;
			buttonDisabled = false;
		}
	}

	async function simulateDelayedContent() {
		delayedContentVisible = false;
		await new Promise((resolve) => setTimeout(resolve, 1000));
		delayedContentVisible = true;
	}

	function reset() {
		loading = false;
		loadedMessage = null;
		loadError = null;
		buttonDisabled = false;
		delayedContentVisible = false;
	}
</script>

<svelte:head>
	<title>Waiting & Timing — Playwright Learning Hub</title>
</svelte:head>

<main class="mx-auto max-w-3xl px-4 py-12">
	<h1 class="mb-6 text-3xl font-bold tracking-tight text-fg">Waiting & Timing</h1>
	<p class="mb-10 text-lg text-muted-fg">
		Practice Playwright waiting strategies: load states, delayed content, async buttons, and
		asserting visibility over time.
	</p>

	<!-- Section: load state -->
	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-fg">Load state</h2>
		<p class="mb-4 text-muted-fg">
			Click to simulate an async load. The button disables and a spinner appears while loading.
		</p>
		<button
			id="load-btn"
			onclick={simulateLoad}
			disabled={buttonDisabled}
			class="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-strong focus:ring-2 focus:ring-brand focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
		>
			{loading ? 'Loading...' : 'Load content'}
		</button>
		{#if loading}
			<div
				id="spinner"
				class="mt-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-line border-t-brand"
				role="status"
				aria-label="Loading"
			></div>
		{/if}
		{#if loadedMessage}
			<p id="loaded-message" class="mt-4 text-sm text-success-fg">
				{loadedMessage}
			</p>
		{/if}
		{#if loadError}
			<p id="load-error" class="mt-4 text-sm text-error-fg" role="alert">
				{loadError}
			</p>
		{/if}
	</section>

	<!-- Section: delayed content -->
	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-fg">Delayed content</h2>
		<p class="mb-4 text-muted-fg">
			Content appears after a 1-second delay. Use toBeVisible / toContainText with retrying
			assertions.
		</p>
		<button
			id="show-delayed-btn"
			onclick={simulateDelayedContent}
			class="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-strong focus:ring-2 focus:ring-brand focus:outline-none"
		>
			Show delayed content
		</button>
		{#if delayedContentVisible}
			<div
				id="delayed-content"
				class="mt-4 rounded-lg border border-info-border bg-info-bg p-4 text-sm text-info-fg"
			>
				<p id="delayed-text">
					This content appeared after a delay. Wait for it to become visible before asserting.
				</p>
			</div>
		{/if}
	</section>

	<!-- Section: visibility timing -->
	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-fg">Visibility timing</h2>
		<p class="mb-4 text-muted-fg">
			An element appears briefly then disappears. Assert it is visible, then hidden.
		</p>
		<button
			id="flash-btn"
			onclick={() => {
				loading = true;
				setTimeout(() => {
					loading = false;
				}, 800);
			}}
			class="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-strong focus:ring-2 focus:ring-brand focus:outline-none"
		>
			Flash message
		</button>
		{#if loading}
			<div
				id="flash-message"
				class="mt-4 rounded-lg border border-warning-border bg-warning-bg p-4 text-sm text-warning-fg"
				role="status"
			>
				<p id="flash-text">Temporary message — visible for 800ms.</p>
			</div>
		{/if}
	</section>

	<!-- Section: reset -->
	<section>
		<button
			id="reset-btn"
			onclick={reset}
			class="rounded-lg border border-line-strong px-4 py-2 text-sm font-medium text-muted-fg hover:bg-muted focus:ring-2 focus:ring-line-strong focus:outline-none"
		>
			Reset all
		</button>
	</section>
</main>
