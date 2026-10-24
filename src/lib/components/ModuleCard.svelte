<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Module } from '#lib/modules';

	let { module }: { module: Module } = $props();

	// Helper to resolve module hrefs with proper typing for SvelteKit's resolve function
	function resolveModuleHref(href: string): string {
		// @ts-expect-error - href is a valid route path
		return resolve(href);
	}
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<a
	href={resolveModuleHref(module.href)}
	class="group block rounded-2xl border border-line bg-surface p-6 transition hover:border-brand hover:shadow-md"
>
	<div class="mb-3 flex items-center justify-between">
		<span class="text-sm font-semibold text-brand group-hover:text-brand-strong"
			>{module.title}</span
		>
		<svg
			class="h-4 w-4 text-faint group-hover:text-brand"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
		</svg>
	</div>
	<p class="mb-3 line-clamp-2 text-sm text-muted-fg">{module.description}</p>
	<ul class="space-y-1 text-xs text-faint">
		{#each module.topics as topic (topic)}
			<li>• {topic}</li>
		{/each}
	</ul>
</a>
