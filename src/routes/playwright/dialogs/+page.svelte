<script lang="ts">
	let lastDialogResult = $state<string | null>(null);
	let modalOpen = $state(false);
	let confirmResult = $state<string | null>(null);

	function handleAlert() {
		lastDialogResult = 'alert accepted';
	}

	function handleConfirm(accept: boolean) {
		lastDialogResult = accept ? 'confirm accepted' : 'confirm dismissed';
		confirmResult = lastDialogResult;
	}

	function handlePrompt(response: string) {
		lastDialogResult = `prompt: ${response}`;
	}

	function handleModalConfirm() {
		confirmResult = 'modal confirmed';
		closeModal();
	}

	function openModal() {
		modalOpen = true;
	}

	function closeModal() {
		modalOpen = false;
	}
</script>

<svelte:head>
	<title>Dialogs & Modals — Playwright Learning Hub</title>
</svelte:head>

<main class="mx-auto max-w-3xl px-4 py-12">
	<h1 class="mb-6 text-3xl font-bold tracking-tight text-fg">Dialogs & Modals</h1>
	<p class="mb-10 text-lg text-muted-fg">
		Practice Playwright dialog handling: JS alerts, confirms, prompts, and custom modal
		interactions.
	</p>

	<!-- Section: JS dialogs -->
	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-fg">JS Dialogs</h2>
		<p class="mb-4 text-muted-fg">
			Buttons that trigger browser dialogs. Playwright intercepts these via the <code
				class="rounded bg-subtle px-1.5">dialog</code
			> event.
		</p>
		<div class="space-y-3">
			<button
				id="alert-btn"
				onclick={() => {
					alert('This is an alert!');
					handleAlert();
				}}
				class="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-strong focus:ring-2 focus:ring-brand focus:outline-none"
			>
				Trigger alert
			</button>
			<button
				id="confirm-btn"
				onclick={() => {
					const ok = confirm('Do you confirm this action?');
					handleConfirm(ok);
				}}
				class="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-strong focus:ring-2 focus:ring-brand focus:outline-none"
			>
				Trigger confirm
			</button>
			<button
				id="prompt-btn"
				onclick={() => {
					const val = prompt('Enter your name:', '');
					if (val !== null) {
						handlePrompt(val);
					}
				}}
				class="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-strong focus:ring-2 focus:ring-brand focus:outline-none"
			>
				Trigger prompt
			</button>
		</div>
		<p id="dialog-result" class="mt-4 text-sm text-muted-fg">
			Last dialog result: <span id="dialog-result-text">{lastDialogResult || 'none'}</span>
		</p>
	</section>

	<!-- Section: custom modal -->
	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-fg">Custom Modal</h2>
		<p class="mb-4 text-muted-fg">
			A custom modal dialog rendered in the DOM (not a browser dialog). Use standard locators to
			interact with it.
		</p>
		<button
			id="open-modal-btn"
			onclick={openModal}
			class="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-strong focus:ring-2 focus:ring-brand focus:outline-none"
		>
			Open modal
		</button>
		{#if modalOpen}
			<div
				id="modal"
				class="fixed inset-0 z-50 flex items-center justify-center"
				aria-modal="true"
				role="dialog"
				aria-labelledby="modal-title"
			>
				<div
					id="modal-backdrop"
					class="fixed inset-0 bg-black/40 backdrop-blur-sm"
					role="button"
					aria-label="Close modal"
					tabindex={0}
					onclick={closeModal}
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							closeModal();
						}
					}}
				></div>
				<div class="w-full max-w-md rounded-2xl border border-line bg-surface p-6 shadow-lg">
					<h3 id="modal-title" class="mb-3 font-bold text-fg">Modal Title</h3>
					<p class="mb-6 text-muted-fg">This is a custom modal. Confirm or dismiss it below.</p>
					<div class="flex gap-3">
						<button
							id="modal-confirm-btn"
							onclick={handleModalConfirm}
							class="flex-1 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-strong focus:ring-2 focus:ring-brand focus:outline-none"
						>
							Confirm
						</button>
						<button
							id="modal-cancel-btn"
							onclick={closeModal}
							class="flex-1 rounded-lg border border-line-strong px-4 py-2 text-sm font-medium text-muted-fg hover:bg-muted focus:ring-2 focus:ring-line-strong focus:outline-none"
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		{/if}
		<p id="modal-result" class="mt-4 text-sm text-muted-fg">
			Modal result: <span id="modal-result-text">{confirmResult || 'none'}</span>
		</p>
	</section>
</main>
