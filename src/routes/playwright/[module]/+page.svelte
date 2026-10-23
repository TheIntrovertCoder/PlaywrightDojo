<script lang="ts">
	import { resolve } from '$app/paths';

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
	<h1 class="mb-4 text-3xl font-bold tracking-tight text-fg">Module Page</h1>
	<p class="mb-8 text-lg text-muted-fg">
		This is a stub for the <code class="rounded bg-subtle px-1.5">[module]</code> route. Each module will
		have its own interactive demo and Playwright tests.
	</p>

	<h2 class="mb-3 text-lg font-semibold text-fg">Planned modules</h2>
	<ul class="mb-8 list-disc space-y-2 pl-5 text-sm text-muted-fg">
		{#each Object.values(modules) as mod (mod.title)}
			<li>
				<strong>{mod.title}</strong> — {mod.description}
			</li>
		{/each}
	</ul>

	<div class="rounded-xl border border-warning-border bg-warning-bg p-6">
		<h3 class="mb-3 font-bold text-fg">Coming soon</h3>
		<p class="text-sm text-warning-fg">
			Click a module link from the home page to navigate here once the demo is built.
		</p>
	</div>

	<a
		href={resolve('/')}
		class="mt-6 inline-block text-sm font-medium text-brand hover:text-brand-strong"
	>
		← Back to home
	</a>
</main>
