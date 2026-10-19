<script lang="ts">
	import { resolve } from '$app/paths';

	let showExtra = $state(false);
	let buttonText = $state('Click me');

	function toggleExtra() {
		showExtra = !showExtra;
	}

	function changeText() {
		buttonText = buttonText === 'Click me' ? 'Clicked!' : 'Click me';
	}
</script>

<svelte:head>
	<title>Basics — Playwright Learning Hub</title>
</svelte:head>

<main class="mx-auto max-w-3xl px-4 py-12">
	<h1 id="main-heading" class="mb-6 text-3xl font-bold tracking-tight text-gray-900">Basics</h1>

	<p class="mb-8 text-lg text-gray-600">
		Practice the core Playwright actions: navigate, click, assert visibility, text content, and URL.
	</p>

	<!-- Section: text assertions -->
	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-gray-900">Text assertions</h2>
		<p id="welcome-text" class="text-gray-700">
			Welcome to the Basics module. This paragraph has stable text for assertions.
		</p>
		<p id="dynamic-text" class="mt-4 text-gray-700">
			{buttonText}
		</p>
		<button
			id="change-text-btn"
			onclick={changeText}
			class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
		>
			Change text
		</button>
	</section>

	<!-- Section: visibility -->
	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-gray-900">Visibility</h2>
		<button
			id="toggle-extra-btn"
			onclick={toggleExtra}
			class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
		>
			Toggle extra content
		</button>
		{#if showExtra}
			<div id="extra-content" class="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
				<p id="extra-text" class="text-sm text-amber-800">
					This content appears and disappears. Use toBeVisible / toBeHidden to assert its state.
				</p>
			</div>
		{/if}
	</section>

	<!-- Section: navigation -->
	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-gray-900">Navigation</h2>
		<p class="mb-4 text-gray-600">Links update the URL. Assert with toHaveURL.</p>
		<div class="space-y-3">
			<a
				id="link-home"
				href={resolve('/')}
				class="text-sm font-medium text-indigo-600 underline hover:text-indigo-900"
			>
				Go to home
			</a>
			<a
				id="link-forms"
				href={resolve('/playwright/[module]', { module: 'forms' })}
				class="text-sm font-medium text-indigo-600 underline hover:text-indigo-900"
			>
				Go to Forms module
			</a>
			<a
				id="link-waiting"
				href={resolve('/playwright/[module]', { module: 'waiting' })}
				class="text-sm font-medium text-indigo-600 underline hover:text-indigo-900"
			>
				Go to Waiting module
			</a>
		</div>
	</section>
</main>
