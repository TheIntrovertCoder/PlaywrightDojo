<script lang="ts">
	let cardHovered = $state<string | null>(null);

	function hoverCard(id: string) {
		cardHovered = id;
	}

	function unhoverCard() {
		cardHovered = null;
	}
</script>

<svelte:head>
	<title>Visual Testing — PlaywrightDojo</title>
</svelte:head>

<main class="mx-auto max-w-4xl px-4 py-12">
	<h1 class="mb-6 text-3xl font-bold tracking-tight text-fg">Visual Testing</h1>
	<p class="mb-10 text-lg text-muted-fg">
		Practice Playwright visual testing: screenshots, video, trace, and asserting complex layouts and
		animations.
	</p>

	<!-- Section: hero banner -->
	<section class="mb-12">
		<div
			id="hero-banner"
			class="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center text-white shadow-lg"
		>
			<h2 class="mb-2 text-2xl font-bold">Visual Testing Playground</h2>
			<p class="text-indigo-100">
				Complex layouts, gradients, shadows, and hover states for screenshot testing.
			</p>
		</div>
	</section>

	<!-- Section: cards grid -->
	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-fg">Card components</h2>
		<p class="mb-6 text-muted-fg">
			Hover over cards to see state changes. Use screenshots to capture different visual states.
		</p>
		<div class="grid gap-6 md:grid-cols-3">
			{#each [1, 2, 3] as cardId (cardId)}
				<div
					id={`card-${cardId}`}
					onmouseenter={() => hoverCard(`card-${cardId}`)}
					onmouseleave={unhoverCard}
					class={`rounded-xl border p-6 transition-all duration-200 ${
						cardHovered === `card-${cardId}`
							? '-translate-y-1 transform border-indigo-500 bg-indigo-50 shadow-lg dark:border-indigo-400 dark:bg-indigo-900/30'
							: 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600'
					}`}
					role="button"
					aria-label={`Card ${cardId}`}
					tabindex={0}
				>
					<h3 class="mb-2 text-lg font-bold text-gray-900 dark:text-gray-100">
						Card {cardId}
					</h3>
					<p class="text-sm text-gray-600 dark:text-gray-400">
						This card responds to hover. Screenshot both states to test visual regressions.
					</p>
					<div class="mt-4 h-12 rounded-lg bg-gray-100 dark:bg-gray-700"></div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Section: status badges -->
	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-fg">Status indicators</h2>
		<p class="mb-6 text-muted-fg">
			Color-coded badges for testing color contrast and visual states.
		</p>
		<div class="flex gap-4">
			<span
				id="badge-success"
				class="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-200"
			>
				Success
			</span>
			<span
				id="badge-warning"
				class="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-200"
			>
				Warning
			</span>
			<span
				id="badge-error"
				class="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-200"
			>
				Error
			</span>
			<span
				id="badge-info"
				class="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
			>
				Info
			</span>
		</div>
	</section>

	<!-- Section: form states -->
	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-fg">Form states</h2>
		<p class="mb-6 text-muted-fg">Valid and invalid input states for visual testing.</p>
		<div class="grid gap-6 md:grid-cols-2">
			<div>
				<label for="valid-input" class="mb-1 block text-sm font-medium text-muted-fg"
					>Valid input</label
				>
				<input
					id="valid-input"
					type="text"
					value="Valid entry"
					class="w-full rounded-lg border border-green-500 px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
				/>
			</div>
			<div>
				<label for="invalid-input" class="mb-1 block text-sm font-medium text-muted-fg"
					>Invalid input</label
				>
				<input
					id="invalid-input"
					type="text"
					value="Invalid entry"
					class="w-full rounded-lg border border-red-500 px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
				/>
			</div>
		</div>
	</section>

	<!-- Section: visual test button -->
	<section>
		<button
			id="capture-btn"
			class="rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-strong focus:ring-2 focus:ring-brand focus:outline-none"
		>
			Take a screenshot of this page
		</button>
	</section>
</main>
