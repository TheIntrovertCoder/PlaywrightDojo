<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		open,
		title,
		onclose,
		children,
		footer
	}: {
		open: boolean;
		title: string;
		onclose: () => void;
		children: Snippet;
		footer?: Snippet;
	} = $props();
</script>

{#if open}
	<div
		id="modal"
		class="fixed inset-0 z-50 flex items-center justify-center"
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-title"
	>
		<button
			id="modal-backdrop"
			type="button"
			class="fixed inset-0 bg-black/40 backdrop-blur-sm"
			aria-label="Close modal"
			onclick={onclose}
		></button>
		<div class="relative w-full max-w-md rounded-2xl border border-line bg-surface p-6 shadow-lg">
			<h3 id="modal-title" class="mb-3 font-bold text-fg">{title}</h3>
			<div class="mb-6 text-muted-fg">
				{@render children()}
			</div>
			{#if footer}
				{@render footer()}
			{/if}
		</div>
	</div>
{/if}
