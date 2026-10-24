<script lang="ts">
	import { resolve } from '$app/paths';
	import { modules } from '#lib/modules';

	// Helper to resolve module hrefs with proper typing for SvelteKit's resolve function
	function resolveModuleHref(href: string): string {
		// @ts-expect-error - href is a valid route path
		return resolve(href);
	}
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->

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
			<a
				href={resolveModuleHref(mod.href)}
				class="group block rounded-2xl border border-line bg-surface p-6 transition hover:border-brand hover:shadow-md"
			>
				<div class="mb-3 flex items-center justify-between">
					<span class="text-sm font-semibold text-brand group-hover:text-brand-strong"
						>{mod.title}</span
					>
					<svg
						class="h-4 w-4 text-faint group-hover:text-brand"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"
						></path>
					</svg>
				</div>
				<p class="mb-3 line-clamp-2 text-sm text-muted-fg">{mod.description}</p>
				<ul class="space-y-1 text-xs text-faint">
					{#each mod.topics as topic (topic)}
						<li>• {topic}</li>
					{/each}
				</ul>
			</a>
		{/each}
	</div>

	<a
		href={resolve('/')}
		class="mt-6 inline-block text-sm font-medium text-brand hover:text-brand-strong"
	>
		← Back to home
	</a>
</main>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		overflow: hidden;
	}
</style>
