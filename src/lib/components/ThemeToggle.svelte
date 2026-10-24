<script lang="ts">
	import { theme, type ThemePreference } from '../theme.svelte.js';

	const options: { value: ThemePreference; label: string }[] = [
		{ value: 'light', label: 'Light' },
		{ value: 'dark', label: 'Dark' },
		{ value: 'system', label: 'System' }
	];
</script>

{#snippet icon(preference: ThemePreference)}
	{#if preference === 'light'}
		<circle cx="12" cy="12" r="5"></circle>
		<line x1="12" y1="1" x2="12" y2="3"></line>
		<line x1="12" y1="21" x2="12" y2="23"></line>
		<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
		<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
		<line x1="1" y1="12" x2="3" y2="12"></line>
		<line x1="21" y1="12" x2="23" y2="12"></line>
		<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
		<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
	{:else if preference === 'dark'}
		<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
	{:else}
		<rect x="2" y="3" width="20" height="14" rx="2"></rect>
		<line x1="8" y1="21" x2="16" y2="21"></line>
		<line x1="12" y1="17" x2="12" y2="21"></line>
	{/if}
{/snippet}

<div role="group" aria-label="Color theme" class="flex items-center gap-1 rounded-lg bg-muted p-1">
	{#each options as opt (opt.value)}
		<button
			type="button"
			aria-pressed={theme.preference === opt.value}
			onclick={() => theme.set(opt.value)}
			class={`
				flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium
				focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2
				focus-visible:ring-offset-surface
				${
					theme.preference === opt.value
						? 'bg-surface text-fg shadow-sm'
						: 'text-muted-fg hover:bg-subtle hover:text-fg'
				}
			`}
		>
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
				class="h-4 w-4"
			>
				{@render icon(opt.value)}
			</svg>
			<span class="sr-only">{opt.label}</span>
		</button>
	{/each}
</div>

<style>
	/* Ensure minimum touch target size */
	button {
		min-height: 36px;
		min-width: 36px;
	}
</style>
