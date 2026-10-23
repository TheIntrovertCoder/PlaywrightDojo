<script lang="ts">
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import ThemeToggle from '#lib/components/ThemeToggle.svelte';
	import { theme } from '#lib/theme.svelte.js';
	import type { LayoutProps } from './$types';
	import { modules } from '#lib/modules';

	let { children }: LayoutProps = $props();

	// Helper to resolve module hrefs with proper typing for SvelteKit's resolve function
	function resolveModuleHref(href: string): string {
		// @ts-expect-error - href is a valid route path
		return resolve(href);
	}

	// Hide navbar inside the iframe-content page (it inherits this layout)
	const showNavbar = page.route.id !== '/playwright/frames/iframe-content';

	onMount(() => {
		theme.init();
		return () => theme.destroy();
	});
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if showNavbar}
	<nav class="sticky top-0 z-40 border-b border-line/50 bg-surface/90 backdrop-blur-md">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 items-center justify-between">
				<div class="flex items-center gap-2">
					<a href={resolve('/')} class="text-xl font-bold tracking-tight"
						>Playwright<span class="text-brand">Learn</span></a
					>
				</div>
				<div class="flex items-center gap-4">
					<ThemeToggle />
					<a
						href={resolve('/')}
						class="hidden text-sm font-medium text-brand hover:text-brand-strong md:inline">Home</a
					>
				</div>
			</div>
			<!-- Module links strip — horizontally scrollable on narrow screens -->
			<nav
				class="-mx-4 overflow-x-auto px-4 pb-2 whitespace-nowrap sm:mx-0 sm:px-0"
				aria-label="Modules"
			>
				<ul class="flex items-center gap-4">
					<li>
						<a
							href={resolve('/')}
							class="text-sm font-medium text-brand hover:text-brand-strong"
							aria-current={page.url.pathname === '/' ? 'page' : undefined}
						>
							Home
						</a>
					</li>
					{#each modules as mod (mod.id)}
						<li>
							<a
								href={resolveModuleHref(mod.href)}
								class="text-sm font-medium text-muted-fg hover:text-fg"
								aria-current={page.url.pathname.startsWith(mod.href) ? 'page' : undefined}
							>
								{mod.shortTitle}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</div>
	</nav>
{/if}

{@render children()}
