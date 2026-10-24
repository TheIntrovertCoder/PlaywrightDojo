/**
 * Theme store — light / dark / system preference.
 * Uses Svelte 5 runes, persists to localStorage, and applies .dark on <html>.
 */

export type ThemePreference = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const THEME_PREFERENCES: readonly string[] = ['light', 'dark', 'system'];

function isThemePreference(value: unknown): value is ThemePreference {
	return typeof value === 'string' && THEME_PREFERENCES.includes(value);
}

function readStoredPreference(): ThemePreference {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return isThemePreference(raw) ? raw : 'system';
	} catch {
		// localStorage unavailable (private browsing, etc.)
		return 'system';
	}
}

function getSystemTheme(): ResolvedTheme {
	if (typeof window === 'undefined') return 'light';
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolveTheme(pref: ThemePreference): ResolvedTheme {
	if (pref === 'system') return getSystemTheme();
	return pref;
}

function applyTheme(resolved: ResolvedTheme): void {
	if (typeof document === 'undefined') return;
	const html = document.documentElement;
	html.classList.toggle('dark', resolved === 'dark');
	html.style.colorScheme = resolved;
	html.setAttribute('data-theme', resolved);
}

class ThemeStore {
	#preference = $state<ThemePreference>('system');
	#resolved = $state<ResolvedTheme>('light');
	#mediaQuery: MediaQueryList | null = null;
	#mediaHandler: ((e: MediaQueryListEvent) => void) | null = null;
	#storageHandler: ((e: StorageEvent) => void) | null = null;
	#initialized = false;

	get preference(): ThemePreference {
		return this.#preference;
	}

	get resolved(): ResolvedTheme {
		return this.#resolved;
	}

	/** Initialize the store — safe to call multiple times. */
	init(): void {
		if (this.#initialized || typeof window === 'undefined') return;
		this.#initialized = true;

		// Read persisted preference
		const stored = readStoredPreference();
		this.#preference = stored;
		this.#resolved = resolveTheme(stored);
		applyTheme(this.#resolved);

		// Listen for system preference changes
		this.#mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		this.#mediaHandler = (e: MediaQueryListEvent) => {
			if (this.#preference === 'system') {
				this.#resolved = e.matches ? 'dark' : 'light';
				applyTheme(this.#resolved);
			}
		};
		this.#mediaQuery.addEventListener('change', this.#mediaHandler);

		// Listen for storage changes from other tabs
		this.#storageHandler = (e: StorageEvent) => {
			if (e.key === STORAGE_KEY) {
				const newPref = readStoredPreference();
				this.#preference = newPref;
				this.#resolved = resolveTheme(newPref);
				applyTheme(this.#resolved);
			}
		};
		window.addEventListener('storage', this.#storageHandler);
	}

	/** Set an explicit user preference. */
	set(pref: ThemePreference): void {
		this.#preference = pref;
		try {
			localStorage.setItem(STORAGE_KEY, pref);
		} catch {
			// ignore
		}
		this.#resolved = resolveTheme(pref);
		applyTheme(this.#resolved);
	}

	/** Cleanup listeners (e.g. on page unload or testing). */
	destroy(): void {
		if (this.#mediaQuery && this.#mediaHandler) {
			this.#mediaQuery.removeEventListener('change', this.#mediaHandler);
		}
		if (this.#storageHandler) {
			window.removeEventListener('storage', this.#storageHandler);
		}
		this.#initialized = false;
	}
}

// Singleton instance
export const theme = new ThemeStore();
