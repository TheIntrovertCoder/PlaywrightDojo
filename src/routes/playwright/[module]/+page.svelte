<script lang="ts">
	import { resolve } from '$app/paths';
	import { modules } from '#lib/modules';
	import ModuleCard from '#lib/components/ModuleCard.svelte';
</script>

<svelte:head>
	<title>Playwright Module — PlaywrightDojo</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-4 py-12">
	<h1 class="mb-4 text-3xl font-bold tracking-tight text-fg">Module Page</h1>
	<p class="mb-8 text-lg text-muted-fg">
		This is a stub for the <code class="rounded bg-subtle px-1.5">[module]</code> route. Each module has
		its own interactive demo and Playwright tests — click a card below to visit it.
	</p>

	<h2 class="mb-3 text-lg font-semibold text-fg">Available modules</h2>
	<div class="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each modules as mod (mod.id)}
			<ModuleCard module={mod} />
		{/each}
	</div>

	<a
		href={resolve('/')}
		class="mt-6 inline-block text-sm font-medium text-brand hover:text-brand-strong"
	>
		← Back to home
	</a>
</main>
