<script lang="ts">
	const modules: Record<string, { title: string; description: string; topics: string[] }> = {
		basics: {
			title: 'Basics',
			description: 'Navigation, clicks, assertions, page title, and URL checks.',
			topics: ['goto', 'click', 'toBeVisible', 'toHaveText', 'toHaveURL']
		},
		forms: {
			title: 'Forms',
			description:
				'Text inputs, textarea, checkboxes, radio groups, selects, file upload, validation.',
			topics: ['fill', 'pressSequentially', 'selectOption', 'check', 'setInputFiles']
		},
		waiting: {
			title: 'Waiting & Timing',
			description: 'Load states, delayed content, async buttons, network-dependent elements.',
			topics: ['waitForLoadState', 'waitForResponse', 'toBeHidden', 'toContainText']
		},
		locators: {
			title: 'Locator Strategies',
			description: 'getByRole, getByLabel, getByText, getByTestId, chaining, filtering.',
			topics: ['getByRole', 'getByLabel', 'getByTestId', 'filter', 'locator chaining']
		},
		dialogs: {
			title: 'Dialogs & Modals',
			description: 'JS alerts, confirms, prompts, and custom modal handling.',
			topics: ['dialog event', 'accept', 'dismiss', 'custom modal']
		},
		frames: {
			title: 'iframes & Shadow DOM',
			description: 'Frame locators, nested frames, shadow DOM piercing.',
			topics: ['frameLocator', 'nested frames', 'shadow DOM']
		},
		interactions: {
			title: 'Complex Interactions',
			description: 'Hover, drag-and-drop, keyboard shortcuts, modifier keys.',
			topics: ['hover', 'dragTo', 'press', 'Shift/Ctrl click']
		},
		tables: {
			title: 'Data Tables',
			description: 'Row/cell selection, sorting, pagination, dynamic data.',
			topics: ['row iteration', 'cell assertions', 'sorting', 'pagination']
		},
		auth: {
			title: 'Authentication',
			description: 'Login flows, protected routes, storageState, session handling.',
			topics: ['login', 'storageState', 'protected routes', 'logout']
		},
		visual: {
			title: 'Visual Testing',
			description: 'Screenshots, video, trace, complex layouts, animations.',
			topics: ['screenshot', 'toHaveScreenshot', 'video', 'trace']
		}
	};
</script>

<svelte:head>
	<title>Playwright Module — Learning Hub</title>
</svelte:head>

<main class="mx-auto max-w-2xl px-4 py-12">
	<h1 class="mb-4 text-3xl font-bold tracking-tight text-gray-900">Module Page</h1>
	<p class="mb-8 text-lg text-gray-600">
		This is a stub for the <code class="rounded bg-gray-100 px-1.5">[module]</code> route. Each module
		will have its own interactive demo and Playwright tests.
	</p>

	<h2 class="mb-3 text-lg font-semibold text-gray-900">Planned modules</h2>
	<ul class="mb-8 list-disc space-y-2 pl-5 text-sm text-gray-600">
		{#each Object.values(modules) as mod (mod.title)}
			<li>
				<strong>{mod.title}</strong> — {mod.description}
			</li>
		{/each}
	</ul>

	<div class="rounded-xl border border-amber-200 bg-amber-50 p-6">
		<h3 class="mb-3 font-bold text-gray-900">Coming soon</h3>
		<p class="text-sm text-gray-700">
			Click a module link from the home page to navigate here once the demo is built.
		</p>
	</div>

	<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
	<a href="/" class="mt-6 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-900">
		← Back to home
	</a>
</main>
