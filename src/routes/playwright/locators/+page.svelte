<script lang="ts">
	import { resolve } from '$app/paths';

	let filterValue = $state('');
	let items = [
		{ id: 'apple', name: 'Apple', category: 'fruit' },
		{ id: 'banana', name: 'Banana', category: 'fruit' },
		{ id: 'carrot', name: 'Carrot', category: 'vegetable' },
		{ id: 'broccoli', name: 'Broccoli', category: 'vegetable' },
		{ id: 'cherry', name: 'Cherry', category: 'fruit' }
	];

	let filteredItems = $derived.by(() => {
		if (!filterValue.trim()) return items;
		return items.filter((i) => i.name.toLowerCase().includes(filterValue.toLowerCase()));
	});

	function handleFilterInput(event: Event) {
		const input = event.target as HTMLInputElement;
		filterValue = input.value;
	}
</script>

<svelte:head>
	<title>Locator Strategies — Playwright Learning Hub</title>
</svelte:head>

<main class="mx-auto max-w-3xl px-4 py-12">
	<h1 class="mb-6 text-3xl font-bold tracking-tight text-fg">Locator Strategies</h1>
	<p class="mb-10 text-lg text-muted-fg">
		Practice Playwright locators: getByRole, getByLabel, getByText, getByTestId, chaining, and
		filtering.
	</p>

	<!-- Section: getByRole -->
	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-fg">getByRole</h2>
		<p class="mb-4 text-muted-fg">Locate elements by their ARIA role and accessible name.</p>
		<div class="space-y-3">
			<button
				id="submit-role-btn"
				class="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-strong focus:ring-2 focus:ring-brand focus:outline-none"
			>
				Submit request
			</button>
			<a
				id="help-link"
				href={resolve('/')}
				class="text-sm text-brand underline hover:text-brand-strong"
			>
				Help center
			</a>
			<input
				id="search-role-input"
				type="text"
				placeholder="Search..."
				class="w-full rounded-lg border border-line-strong px-3 py-2 text-sm focus:ring-2 focus:ring-brand focus:outline-none"
				aria-label="Search input"
			/>
		</div>
	</section>

	<!-- Section: getByLabel -->
	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-fg">getByLabel</h2>
		<p class="mb-4 text-muted-fg">Locate form inputs by their associated label text.</p>
		<div class="max-w-sm space-y-4">
			<div>
				<label for="username-input" class="mb-1 block text-sm font-medium text-muted-fg"
					>Username</label
				>
				<input
					id="username-input"
					type="text"
					autocomplete="username"
					class="w-full rounded-lg border border-line-strong px-3 py-2 text-sm focus:ring-2 focus:ring-brand focus:outline-none"
				/>
			</div>
			<div>
				<label for="password-input" class="mb-1 block text-sm font-medium text-muted-fg"
					>Password</label
				>
				<input
					id="password-input"
					type="password"
					autocomplete="current-password"
					class="w-full rounded-lg border border-line-strong px-3 py-2 text-sm focus:ring-2 focus:ring-brand focus:outline-none"
				/>
			</div>
		</div>
	</section>

	<!-- Section: getByText -->
	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-fg">getByText</h2>
		<p class="mb-4 text-muted-fg">Locate elements by their visible text content.</p>
		<div class="space-y-3">
			<p id="welcome-text" class="text-muted-fg">Welcome to the locator practice page.</p>
			<button
				id="save-text-btn"
				class="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-strong focus:ring-2 focus:ring-brand focus:outline-none"
			>
				Save changes
			</button>
			<button
				id="cancel-text-btn"
				class="rounded-lg border border-line-strong px-4 py-2 text-sm font-medium text-muted-fg hover:bg-muted focus:ring-2 focus:ring-line-strong focus:outline-none"
			>
				Cancel
			</button>
		</div>
	</section>

	<!-- Section: getByTestId -->
	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-fg">getByTestId</h2>
		<p class="mb-4 text-muted-fg">
			Locate elements by their data-testid attribute — ideal for stable test targets.
		</p>
		<div class="space-y-3">
			<div
				id="user-card"
				data-testid="user-card"
				class="rounded-lg border border-line bg-muted p-4"
			>
				<p class="text-sm text-muted-fg">User profile card</p>
			</div>
			<div
				id="status-badge"
				data-testid="status-badge"
				class="inline-flex items-center gap-1.5 rounded-md bg-success-bg px-2 py-1 text-xs font-medium text-success-fg"
			>
				<span class="h-2 w-2 rounded-full bg-success-fg"></span>
				<span>Active</span>
			</div>
		</div>
	</section>

	<!-- Section: chaining & filtering -->
	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-fg">Chaining & filtering</h2>
		<p class="mb-4 text-muted-fg">Chain locators to narrow scope, then filter results.</p>
		<div>
			<label for="filter-input" class="mb-1 block text-sm font-medium text-muted-fg"
				>Filter items</label
			>
			<input
				id="filter-input"
				type="text"
				bind:value={filterValue}
				placeholder="Filter by name..."
				oninput={handleFilterInput}
				class="w-full rounded-lg border border-line-strong px-3 py-2 text-sm focus:ring-2 focus:ring-brand focus:outline-none"
			/>
		</div>
		<ul id="item-list" class="mt-4 space-y-2">
			{#each filteredItems as item (item.id)}
				<li
					data-testid={`item-${item.id}`}
					class="flex items-center justify-between rounded-lg border border-line bg-surface p-3"
				>
					<span class="text-sm text-muted-fg">{item.name}</span>
					<span class="rounded-full bg-subtle px-2 py-0.5 text-[10px] font-medium text-faint">
						{item.category}
					</span>
				</li>
			{/each}
		</ul>
		<p id="item-count" class="mt-2 text-sm text-muted-fg">
			{filteredItems.length} item(s) matching
		</p>
	</section>
</main>
