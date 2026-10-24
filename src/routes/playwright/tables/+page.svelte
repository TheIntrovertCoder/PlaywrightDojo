<script lang="ts">
	let sortColumn = $state<string | null>(null);
	let sortDirection = $state<'asc' | 'desc'>('asc');
	let page = $state(1);
	let pageSize = $state(5);
	let selectedRowId = $state<number | null>(null);

	const users = [
		{ id: 1, name: 'Ada Lovelace', role: 'Developer', status: 'active' },
		{ id: 2, name: 'Grace Hopper', role: 'Engineer', status: 'active' },
		{ id: 3, name: 'Alan Turing', role: 'Researcher', status: 'inactive' },
		{ id: 4, name: 'Katherine Johnson', role: 'Mathematician', status: 'active' },
		{ id: 5, name: 'Nikola Tesla', role: 'Inventor', status: 'inactive' },
		{ id: 6, name: 'Marie Curie', role: 'Scientist', status: 'active' },
		{ id: 7, name: 'Charles Babbage', role: 'Engineer', status: 'inactive' }
	];

	const sortedUsers = $derived.by(() => {
		if (!sortColumn) return [...users];
		return [...users].sort((a, b) => {
			const aVal = String(a[sortColumn as keyof typeof a]);
			const bVal = String(b[sortColumn as keyof typeof b]);
			const cmp = aVal.localeCompare(bVal);
			return sortDirection === 'asc' ? cmp : -cmp;
		});
	});

	const paginatedUsers = $derived.by(() => {
		const start = (page - 1) * pageSize;
		return sortedUsers.slice(start, start + pageSize);
	});

	const totalPages = $derived.by(() => Math.ceil(sortedUsers.length / pageSize));

	function sortBy(column: string) {
		if (sortColumn === column) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortColumn = column;
			sortDirection = 'asc';
		}
	}

	function selectRow(id: number) {
		selectedRowId = selectedRowId === id ? null : id;
	}

	function goToPage(n: number) {
		page = n;
	}

	function reset() {
		sortColumn = null;
		sortDirection = 'asc';
		page = 1;
		selectedRowId = null;
	}
</script>

<svelte:head>
	<title>Data Tables — PlaywrightDojo</title>
</svelte:head>

<main class="mx-auto max-w-3xl px-4 py-12">
	<h1 class="mb-6 text-3xl font-bold tracking-tight text-fg">Data Tables</h1>
	<p class="mb-10 text-lg text-muted-fg">
		Practice Playwright table interactions: row/cell selection, sorting, pagination, and dynamic
		data.
	</p>

	<!-- Table -->
	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-fg">User table</h2>
		<table id="users-table" class="w-full border-collapse border border-line">
			<thead>
				<tr class="bg-muted">
					<th
						id="col-name"
						onclick={() => sortBy('name')}
						class="cursor-pointer border border-line px-3 py-2 text-left text-sm font-medium text-muted-fg hover:bg-subtle"
					>
						Name
						{#if sortColumn === 'name'}
							{sortDirection === 'asc' ? ' ▲' : ' ▼'}
						{/if}
					</th>
					<th
						id="col-role"
						onclick={() => sortBy('role')}
						class="cursor-pointer border border-line px-3 py-2 text-left text-sm font-medium text-muted-fg hover:bg-subtle"
					>
						Role
						{#if sortColumn === 'role'}
							{sortDirection === 'asc' ? ' ▲' : ' ▼'}
						{/if}
					</th>
					<th
						id="col-status"
						onclick={() => sortBy('status')}
						class="cursor-pointer border border-line px-3 py-2 text-left text-sm font-medium text-muted-fg hover:bg-subtle"
					>
						Status
						{#if sortColumn === 'status'}
							{sortDirection === 'asc' ? ' ▲' : ' ▼'}
						{/if}
					</th>
				</tr>
			</thead>
			<tbody>
				{#each paginatedUsers as user (user.id)}
					<tr
						id={`row-${user.id}`}
						onclick={() => selectRow(user.id)}
						class={`
							border border-line
							${selectedRowId === user.id ? 'bg-brand-soft' : 'bg-surface hover:bg-muted'}
							cursor-pointer
						`}
					>
						<td class="px-3 py-2 text-sm text-muted-fg">{user.name}</td>
						<td class="px-3 py-2 text-sm text-muted-fg">{user.role}</td>
						<td class="px-3 py-2 text-sm text-muted-fg">{user.status}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<p id="selected-row" class="mt-3 text-sm text-muted-fg">
			Selected row: {selectedRowId ?? 'none'}
		</p>
	</section>

	<!-- Pagination -->
	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-fg">Pagination</h2>
		<p class="mb-4 text-muted-fg">
			Page {page} of {totalPages} ({sortedUsers.length} total users)
		</p>
		<div class="flex gap-2">
			<button
				id="prev-page"
				onclick={() => goToPage(Math.max(1, page - 1))}
				disabled={page === 1}
				class="rounded-lg border border-line-strong px-3 py-2 text-sm text-muted-fg hover:bg-muted focus:ring-2 focus:ring-line-strong focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
			>
				Prev
			</button>
			<button
				id="next-page"
				onclick={() => goToPage(Math.min(totalPages, page + 1))}
				disabled={page === totalPages}
				class="rounded-lg border border-line-strong px-3 py-2 text-sm text-muted-fg hover:bg-muted focus:ring-2 focus:ring-line-strong focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
			>
				Next
			</button>
		</div>
	</section>

	<!-- Reset -->
	<section>
		<button
			id="reset-btn"
			onclick={reset}
			class="rounded-lg border border-line-strong px-4 py-2 text-sm font-medium text-muted-fg hover:bg-muted focus:ring-2 focus:ring-line-strong focus:outline-none"
		>
			Reset table
		</button>
	</section>
</main>
