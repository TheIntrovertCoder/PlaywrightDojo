<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';

	let data: PageData = $props();

	// Interactive sandbox state — these elements are Playwright test targets
	let clickCount = $state(0);
	let inputValue = $state('');
	let isChecked = $state(false);
	let selectedOption = $state('');
	let modalOpen = $state(false);
	let toastVisible = $state(false);

	function increment() {
		clickCount += 1;
	}

	function reset() {
		clickCount = 0;
		inputValue = '';
		isChecked = false;
		selectedOption = '';
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

	// Modules come from +page.server.ts via `data.modules`
</script>

<svelte:head>
	<title>Playwright Learning Hub — Mock Website</title>
</svelte:head>

<main class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	<!-- Hero -->
	<section class="mb-16 text-center">
		<h1 class="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
			Playwright Automation <span class="text-indigo-600">Learning Hub</span>
		</h1>
		<p class="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
			A mock website built to help you learn Playwright for end-to-end automation testing. Each
			module isolates a specific capability so you can write focused, repeatable tests.
		</p>
		<div class="flex flex-col justify-center gap-4 sm:flex-row">
			<a
				href={resolve('/playwright/[module]', { module: 'basics' })}
				role="button"
				class="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 focus:outline-none"
			>
				Start with Basics
			</a>
			<button
				onclick={showToast}
				class="rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 focus:outline-none"
			>
				Trigger Toast (sandbox)
			</button>
		</div>
	</section>

	<!-- Interactive sandbox (immediate Playwright test target) -->
	<section id="sandbox" class="mb-16">
		<div class="mb-6 flex items-center justify-between">
			<h2 class="text-2xl font-bold text-gray-900">Interactive Sandbox</h2>
			<p class="text-sm text-gray-500">
				Try writing Playwright tests against these elements right now.
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			<!-- Button counter -->
			<div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
				<h3 class="mb-4 font-bold text-gray-900">Button & Counter</h3>
				<button
					id="increment-btn"
					onclick={increment}
					class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
				>
					Increment
				</button>
				<button
					id="reset-btn"
					onclick={reset}
					class="ml-3 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:outline-none"
				>
					Reset
				</button>
				<p id="counter-display" class="mt-4 font-mono text-2xl text-gray-900">{clickCount}</p>
				<p class="mt-2 text-xs text-gray-500">
					Test: click #increment-btn, assert #counter-display text
				</p>
			</div>

			<!-- Text input -->
			<div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
				<h3 class="mb-4 font-bold text-gray-900">Text Input</h3>
				<label for="name-input" class="mb-2 block text-sm font-medium text-gray-700"
					>Your name</label
				>
				<input
					id="name-input"
					type="text"
					bind:value={inputValue}
					placeholder="Type something..."
					class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
				/>
				<p id="input-display" class="mt-3 text-sm text-gray-600">
					Value: <span class="font-mono">{inputValue || '(empty)'}</span>
				</p>
				<p class="mt-2 text-xs text-gray-500">Test: fill #name-input, assert #input-display</p>
			</div>

			<!-- Checkbox -->
			<div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
				<h3 class="mb-4 font-bold text-gray-900">Checkbox</h3>
				<label class="flex cursor-pointer items-center gap-3">
					<input
						id="agree-checkbox"
						type="checkbox"
						bind:checked={isChecked}
						class="h-5 w-5 border-gray-300 text-indigo-600 focus:ring-indigo-500"
					/>
					<span class="text-sm text-gray-700">I agree to the terms</span>
				</label>
				<p id="checkbox-status" class="mt-3 text-sm text-gray-600">
					State: <span class="font-mono">{isChecked ? 'checked' : 'unchecked'}</span>
				</p>
				<p class="mt-2 text-xs text-gray-500">Test: check #agree-checkbox, assert state</p>
			</div>

			<!-- Radio group -->
			<div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
				<h3 class="mb-4 font-bold text-gray-900">Radio Group</h3>
				<div class="space-y-2">
					{#each ['Option A', 'Option B', 'Option C'] as option (option)}
						<label class="flex cursor-pointer items-center gap-3">
							<input
								type="radio"
								name="choice"
								bind:group={selectedOption}
								value={option}
								class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
							/>
							<span class="text-sm text-gray-700">{option}</span>
						</label>
					{/each}
				</div>
				<p id="radio-status" class="mt-3 text-sm text-gray-600">
					Selected: <span class="font-mono">{selectedOption || '(none)'}</span>
				</p>
				<p class="mt-2 text-xs text-gray-500">Test: select a radio, assert #radio-status</p>
			</div>

			<!-- Select dropdown -->
			<div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
				<h3 class="mb-4 font-bold text-gray-900">Select Dropdown</h3>
				<label for="plan-select" class="mb-2 block text-sm font-medium text-gray-700"
					>Choose a plan</label
				>
				<select
					id="plan-select"
					bind:value={selectedOption}
					class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
				>
					<option value="">Select...</option>
					<option value="starter">Starter — $9/mo</option>
					<option value="pro">Pro — $29/mo</option>
					<option value="enterprise">Enterprise — $99/mo</option>
				</select>
				<p id="select-display" class="mt-3 text-sm text-gray-600">
					Plan: <span class="font-mono">{selectedOption || '(none)'}</span>
				</p>
				<p class="mt-2 text-xs text-gray-500">Test: selectOption #plan-select, assert text</p>
			</div>

			<!-- Modal trigger -->
			<div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
				<h3 class="mb-4 font-bold text-gray-900">Modal / Dialog</h3>
				<button
					id="open-modal-btn"
					onclick={openModal}
					class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
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
						<div class="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
							<h3 id="modal-title" class="mb-3 font-bold text-gray-900">Modal Title</h3>
							<p class="mb-6 text-gray-600">
								This is a custom modal. You can close it by clicking outside or the button below.
							</p>
							<button
								id="close-modal-btn"
								onclick={closeModal}
								class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:outline-none"
							>
								Close Modal
							</button>
						</div>
					</div>
				{/if}
				<p class="mt-2 text-xs text-gray-500">Test: open modal, assert #modal visible, close it</p>
			</div>

			<!-- Toast -->
			<div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
				<h3 class="mb-4 font-bold text-gray-900">Toast Notification</h3>
				<button
					id="show-toast-btn"
					onclick={showToast}
					class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
				>
					Show Toast
				</button>
				{#if toastVisible}
					<div
						id="toast"
						class="mt-4 flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
						role="status"
						aria-live="polite"
					>
						<span class="font-semibold">Success!</span>
						<span>Your action completed successfully.</span>
					</div>
				{/if}
				<p class="mt-2 text-xs text-gray-500">
					Test: click #show-toast-btn, assert #toast appears then disappears
				</p>
			</div>
		</div>
	</section>

	<!-- Curriculum grid -->
	<section class="mb-16">
		<div class="mb-8 flex items-center justify-between">
			<h2 class="text-2xl font-bold text-gray-900">Curriculum</h2>
			<p class="text-sm text-gray-500">
				Each module is a dedicated route with focused Playwright tests.
			</p>
		</div>

		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each data.modules as module (module.id)}
				<a
					href={resolve('/playwright/[module]', { module: module.id })}
					class="group block rounded-2xl border border-gray-200 bg-white p-6 transition hover:border-indigo-300 hover:shadow-md"
				>
					<div class="mb-3 flex items-center justify-between">
						<span class="text-sm font-semibold text-indigo-600 group-hover:text-indigo-800"
							>{module.title}</span
						>
						<svg
							class="h-4 w-4 text-gray-400 group-hover:text-indigo-500"
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
					<p class="mb-3 line-clamp-2 text-sm text-gray-600">{module.description}</p>
					<ul class="space-y-1 text-xs text-gray-500">
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
