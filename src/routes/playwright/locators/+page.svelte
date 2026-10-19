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
	<h1 class="mb-6 text-3xl font-bold tracking-tight text-gray-900">Locator Strategies</h1>
	<p class="mb-10 text-lg text-gray-600">
		Practice Playwright locators: getByRole, getByLabel, getByText, getByTestId, chaining, and
		filtering.
	</p>

	<!-- Section: getByRole -->
	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-gray-900">getByRole</h2>
		<p class="mb-4 text-gray-600">Locate elements by their ARIA role and accessible name.</p>
		<div class="space-y-3">
			<button
				id="submit-role-btn"
				class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
			>
				Submit request
			</button>
			<a
				id="help-link"
				href={resolve('/')}
				class="text-sm text-indigo-600 underline hover:text-indigo-900"
			>
				Help center
			</a>
			<input
				id="search-role-input"
				type="text"
				placeholder="Search..."
				class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
				aria-label="Search input"
			/>
		</div>
	</section>

	<!-- Section: getByLabel -->
	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-gray-900">getByLabel</h2>
		<p class="mb-4 text-gray-600">Locate form inputs by their associated label text.</p>
		<div class="space-y-4">
			<div class="flex items-start gap-3">
				<input
					id="username-input"
					type="text"
					class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
				/>
				<label for="username-input" class="text-sm text-gray-700"> Username </label>
			</div>
			<div class="flex items-start gap-3">
				<input
					id="password-input"
					type="password"
					class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
				/>
				<label for="password-input" class="text-sm text-gray-700"> Password </label>
			</div>
		</div>
	</section>

	<!-- Section: getByText -->
	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-gray-900">getByText</h2>
		<p class="mb-4 text-gray-600">Locate elements by their visible text content.</p>
		<div class="space-y-3">
			<p id="welcome-text" class="text-gray-700">Welcome to the locator practice page.</p>
			<button
				id="save-text-btn"
				class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
			>
				Save changes
			</button>
			<button
				id="cancel-text-btn"
				class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:outline-none"
			>
				Cancel
			</button>
		</div>
	</section>

	<!-- Section: getByTestId -->
	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-gray-900">getByTestId</h2>
		<p class="mb-4 text-gray-600">
			Locate elements by their data-testid attribute — ideal for stable test targets.
		</p>
		<div class="space-y-3">
			<div
				id="user-card"
				data-testid="user-card"
				class="rounded-lg border border-gray-200 bg-gray-50 p-4"
			>
				<p class="text-sm text-gray-700">User profile card</p>
			</div>
			<div
				id="status-badge"
				data-testid="status-badge"
				class="inline-flex items-center gap-1.5 rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700"
			>
				<span class="h-2 w-2 rounded-full bg-green-500"></span>
				<span>Active</span>
			</div>
		</div>
	</section>

	<!-- Section: chaining & filtering -->
	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-gray-900">Chaining & filtering</h2>
		<p class="mb-4 text-gray-600">Chain locators to narrow scope, then filter results.</p>
		<div>
			<label for="filter-input" class="mb-1 block text-sm font-medium text-gray-700"
				>Filter items</label
			>
			<input
				id="filter-input"
				type="text"
				bind:value={filterValue}
				placeholder="Filter by name..."
				oninput={handleFilterInput}
				class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
			/>
		</div>
		<ul id="item-list" class="mt-4 space-y-2">
			{#each filteredItems as item (item.id)}
				<li
					data-testid={`item-${item.id}`}
					class="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3"
				>
					<span class="text-sm text-gray-700">{item.name}</span>
					<span class="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
						{item.category}
					</span>
				</li>
			{/each}
		</ul>
		<p id="item-count" class="mt-2 text-sm text-gray-600">
			{filteredItems.length} item(s) matching
		</p>
	</section>
</main>
