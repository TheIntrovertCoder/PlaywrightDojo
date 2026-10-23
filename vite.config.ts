import tailwindcss from '@tailwindcss/vite';
import adapterAuto from '@sveltejs/adapter-auto';
import adapterStatic from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const isGithubPages = process.env.GITHUB_PAGES === 'true';
const rawBasePath = process.env.BASE_PATH ?? '';
const base: '' | `/${string}` = rawBasePath.startsWith('/') ? (rawBasePath as `/${string}`) : '';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// Use adapter-static for GitHub Pages, adapter-auto for local/dev.
			adapter: isGithubPages ? adapterStatic({ fallback: '404.html' }) : adapterAuto(),

			// Base path for GitHub Pages project sites (e.g. /mock-website-playwright).
			// Empty string in dev/local to keep root-relative links working normally.
			paths: { base },

			// The [module] stub route is not linked from anywhere (real modules are at /playwright/basics, etc.)
			// so it won't be crawled. Ignore it to avoid prerender failure.
			prerender: {
				handleUnseenRoutes: 'ignore'
			}
		})
	]
});
