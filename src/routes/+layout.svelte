<script lang="ts">
	import { resolve } from '$app/paths';
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav class="sticky top-0 z-40 border-b bg-white/90 backdrop-blur-md">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<div class="flex items-center gap-2">
				<span class="text-xl font-bold tracking-tight"
					>Playwright<span class="text-indigo-600">Learn</span></span
				>
			</div>
			<div class="hidden items-center gap-6 md:flex">
				<a href={resolve('/')} class="text-sm font-medium text-indigo-600 hover:text-indigo-900"
					>Home</a
				>
				<a
					href={resolve('/playwright/[module]', { module: 'basics' })}
					class="text-sm font-medium text-gray-600 hover:text-gray-900">Basics</a
				>
				<a
					href={resolve('/playwright/[module]', { module: 'forms' })}
					class="text-sm font-medium text-gray-600 hover:text-gray-900">Forms</a
				>
				<a
					href={resolve('/playwright/[module]', { module: 'waiting' })}
					class="text-sm font-medium text-gray-600 hover:text-gray-900">Waiting</a
				>
				<a
					href={resolve('/playwright/[module]', { module: 'locators' })}
					class="text-sm font-medium text-gray-600 hover:text-gray-900">Locators</a
				>
				<a
					href={resolve('/playwright/[module]', { module: 'dialogs' })}
					class="text-sm font-medium text-gray-600 hover:text-gray-900">Dialogs</a
				>
			</div>
		</div>
	</div>
</nav>

{@render children()}
