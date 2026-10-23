<script lang="ts">
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import ThemeToggle from '#lib/components/ThemeToggle.svelte';
	import { theme } from '#lib/theme.svelte.js';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	onMount(() => {
		theme.init();
		return () => theme.destroy();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav class="sticky top-0 z-40 border-b border-line/50 bg-surface/90 backdrop-blur-md">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<div class="flex items-center gap-2">
				<span class="text-xl font-bold tracking-tight"
					>Playwright<span class="text-brand">Learn</span></span
				>
			</div>
			<div class="flex items-center gap-4">
				<ThemeToggle />
				<div class="hidden items-center gap-6 md:flex">
					<a href={resolve('/')} class="text-sm font-medium text-brand hover:text-brand-strong"
						>Home</a
					>
					<a
						href={resolve('/playwright/[module]', { module: 'basics' })}
						class="text-sm font-medium text-muted-fg hover:text-fg">Basics</a
					>
					<a
						href={resolve('/playwright/[module]', { module: 'forms' })}
						class="text-sm font-medium text-muted-fg hover:text-fg">Forms</a
					>
					<a
						href={resolve('/playwright/[module]', { module: 'waiting' })}
						class="text-sm font-medium text-muted-fg hover:text-fg">Waiting</a
					>
					<a
						href={resolve('/playwright/[module]', { module: 'locators' })}
						class="text-sm font-medium text-muted-fg hover:text-fg">Locators</a
					>
					<a
						href={resolve('/playwright/[module]', { module: 'dialogs' })}
						class="text-sm font-medium text-muted-fg hover:text-fg">Dialogs</a
					>
				</div>
			</div>
		</div>
	</div>
</nav>

{@render children()}
