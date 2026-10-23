<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	// Interactive sandbox state — these elements are Playwright test targets
	let clickCount = $state(0);
	let inputValue = $state('');
	let isChecked = $state(false);
	let selectedRadio = $state('');
	let selectedPlan = $state('');
	let modalOpen = $state(false);
	let toastVisible = $state(false);

	function increment() {
		clickCount += 1;
	}

	function reset() {
		clickCount = 0;
		inputValue = '';
		isChecked = false;
		selectedRadio = '';
		selectedPlan = '';
	}

	function openModal() {
		modalOpen = true;
	}

	function closeModal() {
		modalOpen = false;
	}

	function showToast() {
		toastVisible = true;
		setTimeout(() => {
			toastVisible = false;
		}, 3000);
	}

	// Helper to resolve module hrefs with proper typing for SvelteKit's resolve function
	function resolveModuleHref(href: string): string {
		// @ts-expect-error - href is a valid route path
		return resolve(href);
	}

	// Modules come from +page.server.ts via `data.modules`
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->

<svelte:head>
	<title>Playwright Learning Hub — Mock Website</title>
</svelte:head>

<main class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	<!-- Hero -->
	<section class="mb-16 text-center">
		<h1 class="mb-4 text-4xl font-bold tracking-tight text-fg sm:text-5xl">
			Playwright Automation <span class="text-brand">Learning Hub</span>
		</h1>
		<p class="mx-auto mb-8 max-w-2xl text-lg text-muted-fg">
			A mock website built to help you learn Playwright for end-to-end automation testing. Each
			module isolates a specific capability so you can write focused, repeatable tests.
		</p>
		<div class="flex flex-col justify-center gap-4 sm:flex-row">
			<a
				href={resolve('/playwright/[module]', { module: 'basics' })}
				role="button"
				class="rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-strong focus:ring-4 focus:ring-brand/20 focus:outline-none"
			>
				Start with Basics
			</a>
			<button
				onclick={showToast}
				class="rounded-xl border border-line-strong px-6 py-3 text-sm font-semibold text-muted-fg transition hover:bg-muted focus:ring-4 focus:ring-line focus:outline-none"
			>
				Trigger Toast (sandbox)
			</button>
		</div>
	</section>

	<!-- Interactive sandbox (immediate Playwright test target) -->
	<section id="sandbox" class="mb-16">
		<div class="mb-6 flex items-center justify-between">
			<h2 class="text-2xl font-bold text-fg">Interactive Sandbox</h2>
			<p class="text-sm text-faint">
				Try writing Playwright tests against these elements right now.
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			<!-- Button counter -->
			<div class="rounded-2xl border border-line bg-surface p-6 shadow-sm">
				<h3 class="mb-4 font-bold text-fg">Button & Counter</h3>
				<button
					id="increment-btn"
					onclick={increment}
					class="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-strong focus:ring-2 focus:ring-brand focus:outline-none"
				>
					Increment
				</button>
				<button
					id="reset-btn"
					onclick={reset}
					class="ml-3 rounded-lg border border-line-strong px-4 py-2 text-sm font-medium text-muted-fg hover:bg-muted focus:ring-2 focus:ring-line-strong focus:outline-none"
				>
					Reset
				</button>
				<p id="counter-display" class="mt-4 font-mono text-2xl text-fg">{clickCount}</p>
				<p class="mt-2 text-xs text-faint">
					Test: click #increment-btn, assert #counter-display text
				</p>
			</div>

			<!-- Text input -->
			<div class="rounded-2xl border border-line bg-surface p-6 shadow-sm">
				<h3 class="mb-4 font-bold text-fg">Text Input</h3>
				<label for="name-input" class="mb-2 block text-sm font-medium text-muted-fg"
					>Your name</label
				>
				<input
					id="name-input"
					type="text"
					bind:value={inputValue}
					placeholder="Type something..."
					class="w-full rounded-lg border border-line-strong px-3 py-2 text-sm focus:ring-2 focus:ring-brand focus:outline-none"
				/>
				<p id="input-display" class="mt-3 text-sm text-muted-fg">
					Value: <span class="font-mono">{inputValue || '(empty)'}</span>
				</p>
				<p class="mt-2 text-xs text-faint">Test: fill #name-input, assert #input-display</p>
			</div>

			<!-- Checkbox -->
			<div class="rounded-2xl border border-line bg-surface p-6 shadow-sm">
				<h3 class="mb-4 font-bold text-fg">Checkbox</h3>
				<label class="flex cursor-pointer items-center gap-3">
					<input
						id="agree-checkbox"
						type="checkbox"
						bind:checked={isChecked}
						class="h-5 w-5 border-line-strong text-brand focus:ring-brand"
					/>
					<span class="text-sm text-muted-fg">I agree to the terms</span>
				</label>
				<p id="checkbox-status" class="mt-3 text-sm text-muted-fg">
					State: <span class="font-mono">{isChecked ? 'checked' : 'unchecked'}</span>
				</p>
				<p class="mt-2 text-xs text-faint">Test: check #agree-checkbox, assert state</p>
			</div>

			<!-- Radio group -->
			<div class="rounded-2xl border border-line bg-surface p-6 shadow-sm">
				<h3 class="mb-4 font-bold text-fg">Radio Group</h3>
				<div class="space-y-2">
					{#each ['Option A', 'Option B', 'Option C'] as option (option)}
						<label class="flex cursor-pointer items-center gap-3">
							<input
								type="radio"
								name="choice"
								bind:group={selectedRadio}
								value={option}
								class="h-4 w-4 border-line-strong text-brand focus:ring-brand"
							/>
							<span class="text-sm text-muted-fg">{option}</span>
						</label>
					{/each}
				</div>
				<p id="radio-status" class="mt-3 text-sm text-muted-fg">
					Selected: <span class="font-mono">{selectedRadio || '(none)'}</span>
				</p>
				<p class="mt-2 text-xs text-faint">Test: select a radio, assert #radio-status</p>
			</div>

			<!-- Select dropdown -->
			<div class="rounded-2xl border border-line bg-surface p-6 shadow-sm">
				<h3 class="mb-4 font-bold text-fg">Select Dropdown</h3>
				<label for="plan-select" class="mb-2 block text-sm font-medium text-muted-fg"
					>Choose a plan</label
				>
				<select
					id="plan-select"
					bind:value={selectedPlan}
					class="w-full rounded-lg border border-line-strong px-3 py-2 text-sm focus:ring-2 focus:ring-brand focus:outline-none"
				>
					<option value="">Select...</option>
					<option value="starter">Starter — $9/mo</option>
					<option value="pro">Pro — $29/mo</option>
					<option value="enterprise">Enterprise — $99/mo</option>
				</select>
				<p id="select-display" class="mt-3 text-sm text-muted-fg">
					Plan: <span class="font-mono">{selectedPlan || '(none)'}</span>
				</p>
				<p class="mt-2 text-xs text-faint">Test: selectOption #plan-select, assert text</p>
			</div>

			<!-- Modal trigger -->
			<div class="rounded-2xl border border-line bg-surface p-6 shadow-sm">
				<h3 class="mb-4 font-bold text-fg">Modal / Dialog</h3>
				<button
					id="open-modal-btn"
					onclick={openModal}
					class="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-strong focus:ring-2 focus:ring-brand focus:outline-none"
				>
					Open Modal
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
							<p class="mb-6 text-muted-fg">
								This is a custom modal. You can close it by clicking outside or the button below.
							</p>
							<button
								id="close-modal-btn"
								onclick={closeModal}
								class="w-full rounded-lg border border-line-strong px-4 py-2 text-sm font-medium text-muted-fg hover:bg-muted focus:ring-2 focus:ring-line-strong focus:outline-none"
							>
								Close Modal
							</button>
						</div>
					</div>
				{/if}
				<p class="mt-2 text-xs text-faint">Test: open modal, assert #modal visible, close it</p>
			</div>

			<!-- Toast -->
			<div class="rounded-2xl border border-line bg-surface p-6 shadow-sm">
				<h3 class="mb-4 font-bold text-fg">Toast Notification</h3>
				<button
					id="show-toast-btn"
					onclick={showToast}
					class="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-strong focus:ring-2 focus:ring-brand focus:outline-none"
				>
					Show Toast
				</button>
				{#if toastVisible}
					<div
						id="toast"
						class="mt-4 flex items-center gap-3 rounded-lg border border-success-border bg-success-bg px-4 py-3 text-sm text-success-fg"
						role="status"
						aria-live="polite"
					>
						<span class="font-semibold">Success!</span>
						<span>Your action completed successfully.</span>
					</div>
				{/if}
				<p class="mt-2 text-xs text-faint">
					Test: click #show-toast-btn, assert #toast appears then disappears
				</p>
			</div>
		</div>
	</section>

	<!-- Curriculum grid -->
	<section class="mb-16">
		<div class="mb-8 flex items-center justify-between">
			<h2 class="text-2xl font-bold text-fg">Curriculum</h2>
			<p class="text-sm text-faint">
				Each module is a dedicated route with focused Playwright tests.
			</p>
		</div>

		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each data.modules as module (module.id)}
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
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 5l7 7-7 7"
							></path></svg
						>
					</div>
					<p class="mb-3 line-clamp-2 text-sm text-muted-fg">{module.description}</p>
					<ul class="space-y-1 text-xs text-faint">
						{#each module.topics as topic (topic)}
							<li>• {topic}</li>
						{/each}
					</ul>
				</a>
			{/each}
		</div>
	</section>
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
