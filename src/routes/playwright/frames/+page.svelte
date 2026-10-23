<script lang="ts">
	import { resolve } from '$app/paths';

	let shadowHostVisible = $state(true);
	let shadowAttached = $state(false);
	let shadowHostEl: HTMLDivElement | undefined;

	function toggleShadowHost() {
		shadowHostVisible = !shadowHostVisible;
	}

	$effect(() => {
		if (shadowHostEl && !shadowAttached) {
			const shadow = shadowHostEl.attachShadow({ mode: 'open' });
			shadow.innerHTML = `
				<style>
					:host { 
						display: block; 
						padding: 1rem; 
						border: 1px solid var(--color-line); 
						border-radius: 0.5rem; 
						background: var(--color-muted); 
						color: var(--color-fg);
					}
					#shadow-text { color: var(--color-brand); font-size: 0.875rem; margin-bottom: 0.5rem; }
					#shadow-btn { padding: 0.25rem 0.75rem; font-size: 0.75rem; background: var(--color-brand); color: #fff; border: none; border-radius: 0.375rem; cursor: pointer; }
					#shadow-btn:hover { background: var(--color-brand-strong); }
				</style>
				<p id="shadow-text">This is real shadow DOM content.</p>
				<button id="shadow-btn">Shadow button</button>
			`;
			shadowAttached = true;
		}
	});
</script>

<svelte:head>
	<title>iframes & Shadow DOM — Playwright Learning Hub</title>
</svelte:head>

<main class="mx-auto max-w-3xl px-4 py-12">
	<h1 class="mb-6 text-3xl font-bold tracking-tight text-fg">iframes & Shadow DOM</h1>
	<p class="mb-10 text-lg text-muted-fg">
		Practice Playwright frame locators and shadow DOM piercing.
	</p>

	<!-- Section: iframes -->
	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-fg">iframes</h2>
		<p class="mb-4 text-muted-fg">
			An iframe loads a separate page. Use
			<code class="rounded bg-subtle px-1.5">frameLocator</code> to target elements inside it.
		</p>
		<iframe
			id="demo-iframe"
			src={resolve('/playwright/frames/iframe-content')}
			class="h-56 w-full rounded-lg border border-line shadow-sm"
			title="Iframe demo content"
		></iframe>
	</section>

	<!-- Section: shadow DOM -->
	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-fg">Shadow DOM</h2>
		<p class="mb-4 text-muted-fg">
			Shadow DOM encapsulates markup and styles. Playwright can pierce shadow roots with
			<code class="rounded bg-subtle px-1.5">locator(...).shadow()</code>.
		</p>
		<button
			id="toggle-shadow-btn"
			onclick={toggleShadowHost}
			class="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-strong focus:ring-2 focus:ring-brand focus:outline-none"
		>
			Toggle shadow host
		</button>
		<div
			id="shadow-host"
			bind:this={shadowHostEl}
			class={shadowHostVisible ? 'mt-4 rounded-lg border border-line bg-muted p-4' : 'hidden'}
		></div>
	</section>
</main>
