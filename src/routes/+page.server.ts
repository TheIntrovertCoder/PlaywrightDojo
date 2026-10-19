import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	const modules = [
		{
			id: 'basics',
			title: 'Basics',
			href: '/playwright/basics',
			description: 'Navigation, clicks, assertions, page title, and URL checks.',
			topics: ['goto', 'click', 'toBeVisible', 'toHaveText', 'toHaveURL']
		},
		{
			id: 'forms',
			title: 'Forms',
			href: '/playwright/forms',
			description:
				'Text inputs, textarea, checkboxes, radio groups, selects, file upload, validation.',
			topics: ['fill', 'pressSequentially', 'selectOption', 'check', 'setInputFiles']
		},
		{
			id: 'waiting',
			title: 'Waiting & Timing',
			href: '/playwright/waiting',
			description: 'Load states, delayed content, async buttons, network-dependent elements.',
			topics: ['waitForLoadState', 'waitForResponse', 'toBeHidden', 'toContainText']
		},
		{
			id: 'locators',
			title: 'Locator Strategies',
			href: '/playwright/locators',
			description: 'getByRole, getByLabel, getByText, getByTestId, chaining, filtering.',
			topics: ['getByRole', 'getByLabel', 'getByTestId', 'filter', 'locator chaining']
		},
		{
			id: 'dialogs',
			title: 'Dialogs & Modals',
			href: '/playwright/dialogs',
			description: 'JS alerts, confirms, prompts, and custom modal handling.',
			topics: ['dialog event', 'accept', 'dismiss', 'custom modal']
		},
		{
			id: 'frames',
			title: 'iframes & Shadow DOM',
			href: '/playwright/frames',
			description: 'Frame locators, nested frames, shadow DOM piercing.',
			topics: ['frameLocator', 'nested frames', 'shadow DOM']
		},
		{
			id: 'interactions',
			title: 'Complex Interactions',
			href: '/playwright/interactions',
			description: 'Hover, drag-and-drop, keyboard shortcuts, modifier keys.',
			topics: ['hover', 'dragTo', 'press', 'Shift/Ctrl click']
		},
		{
			id: 'tables',
			title: 'Data Tables',
			href: '/playwright/tables',
			description: 'Row/cell selection, sorting, pagination, dynamic data.',
			topics: ['row iteration', 'cell assertions', 'sorting', 'pagination']
		},
		{
			id: 'auth',
			title: 'Authentication',
			href: '/playwright/auth',
			description: 'Login flows, protected routes, storageState, session handling.',
			topics: ['login', 'storageState', 'protected routes', 'logout']
		},
		{
			id: 'visual',
			title: 'Visual Testing',
			href: '/playwright/visual',
			description: 'Screenshots, video, trace, complex layouts, animations.',
			topics: ['screenshot', 'toHaveScreenshot', 'video', 'trace']
		}
	];

	return { modules };
};
