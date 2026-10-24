<script lang="ts">
	let dropdownOpen = $state(false);
	let draggedItem = $state<string | null>(null);
	let dropZoneMessage = $state<string | null>(null);
	let shortcutMessage = $state<string | null>(null);
	let ctrlHeld = $state(false);

	function toggleDropdown() {
		dropdownOpen = !dropdownOpen;
	}

	function setDragItem(item: string) {
		draggedItem = item;
	}

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		const target = (event.currentTarget as HTMLElement).id;
		dropZoneMessage = `Dropped "${draggedItem}" into "${target}"`;
		draggedItem = null;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Control' || event.key === 'Meta') {
			ctrlHeld = true;
		}
		if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
			event.preventDefault();
			shortcutMessage = 'Cmd/Ctrl + K shortcut triggered';
		}
	}

	function handleKeyup(event: KeyboardEvent) {
		if (event.key === 'Control' || event.key === 'Meta') {
			ctrlHeld = false;
		}
	}

	function reset() {
		dropdownOpen = false;
		draggedItem = null;
		dropZoneMessage = null;
		shortcutMessage = null;
		ctrlHeld = false;
	}
</script>

<svelte:head>
	<title>Complex Interactions — PlaywrightDojo</title>
</svelte:head>

<main class="mx-auto max-w-3xl px-4 py-12">
	<h1 class="mb-6 text-3xl font-bold tracking-tight text-fg">Complex Interactions</h1>
	<p class="mb-10 text-lg text-muted-fg">
		Practice Playwright interactions: hover, drag-and-drop, keyboard shortcuts, and modifier keys.
	</p>

	<!-- Section: hover dropdown -->
	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-fg">Hover dropdown</h2>
		<p class="mb-4 text-muted-fg">
			Hover over the button to reveal a dropdown menu. Use
			<code class="rounded bg-subtle px-1.5">hover()</code> to reveal hidden items.
		</p>
		<div class="relative inline-block">
			<button
				id="dropdown-trigger"
				onmouseenter={toggleDropdown}
				onmouseleave={toggleDropdown}
				class="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-strong focus:ring-2 focus:ring-brand focus:outline-none"
			>
				Options
			</button>
			{#if dropdownOpen}
				<div
					id="dropdown-menu"
					class="absolute mt-2 w-48 rounded-lg border border-line bg-surface p-2 shadow-lg"
				>
					<button
						id="dropdown-item-1"
						class="w-full px-3 py-2 text-left text-sm text-muted-fg hover:bg-muted"
					>
						Action 1
					</button>
					<button
						id="dropdown-item-2"
						class="w-full px-3 py-2 text-left text-sm text-muted-fg hover:bg-muted"
					>
						Action 2
					</button>
				</div>
			{/if}
		</div>
		<p id="dropdown-state" class="mt-2 text-xs text-faint">
			Dropdown: {dropdownOpen ? 'open' : 'closed'}
		</p>
	</section>

	<!-- Section: drag and drop -->
	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-fg">Drag & drop</h2>
		<p class="mb-4 text-muted-fg">
			Drag an item into the drop zone. Use
			<code class="rounded bg-subtle px-1.5">dragTo()</code> to simulate dragging.
		</p>
		<div class="flex gap-6">
			<div class="flex flex-col gap-2">
				<p class="text-sm font-medium text-muted-fg">Items</p>
				<div
					id="drag-item-1"
					draggable="true"
					ondragstart={() => setDragItem('Item 1')}
					class="cursor-grab rounded-lg border border-line-strong bg-muted p-3 text-sm text-muted-fg"
					role="button"
					aria-label="Drag Item 1"
					tabindex={0}
				>
					Item 1
				</div>
				<div
					id="drag-item-2"
					draggable="true"
					ondragstart={() => setDragItem('Item 2')}
					class="cursor-grab rounded-lg border border-line-strong bg-muted p-3 text-sm text-muted-fg"
					role="button"
					aria-label="Drag Item 2"
					tabindex={0}
				>
					Item 2
				</div>
			</div>
			<div
				id="drop-zone"
				ondragover={handleDragOver}
				ondrop={handleDrop}
				class="min-w-[200px] rounded-xl border-2 border-dashed border-line-strong bg-muted p-6 text-center"
				role="button"
				aria-label="Drop zone"
				tabindex={0}
			>
				<p id="drop-zone-text" class="text-sm text-muted-fg">Drop items here</p>
			</div>
		</div>
		{#if dropZoneMessage}
			<p id="drop-result" class="mt-4 text-sm text-success-fg">
				{dropZoneMessage}
			</p>
		{/if}
	</section>

	<!-- Section: keyboard shortcuts -->
	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-fg">Keyboard shortcuts</h2>
		<p class="mb-4 text-muted-fg">
			Press <kbd class="rounded bg-subtle px-1.5">Cmd</kbd>/<kbd class="rounded bg-subtle px-1.5"
				>Ctrl</kbd
			>
			+
			<kbd class="rounded bg-subtle px-1.5">K</kbd> to trigger a shortcut.
		</p>
		<div
			id="shortcut-area"
			class="rounded-lg border border-line bg-muted p-4"
			onkeydown={handleKeydown}
			onkeyup={handleKeyup}
			role="button"
			aria-label="Shortcut area"
			tabindex={0}
		>
			<p class="text-sm text-muted-fg">Focus this area, then press Cmd/Ctrl+K</p>
		</div>
		{#if shortcutMessage}
			<p id="shortcut-result" class="mt-4 text-sm text-success-fg">
				{shortcutMessage}
			</p>
		{/if}
		<p id="ctrl-state" class="mt-2 text-xs text-faint">
			Modifier held: {ctrlHeld ? 'yes' : 'no'}
		</p>
	</section>

	<!-- Section: reset -->
	<section>
		<button
			id="reset-btn"
			onclick={reset}
			class="rounded-lg border border-line-strong px-4 py-2 text-sm font-medium text-muted-fg hover:bg-muted focus:ring-2 focus:ring-line-strong focus:outline-none"
		>
			Reset all
		</button>
	</section>
</main>
