<script lang="ts">
	let nameValue = $state('');
	let emailValue = $state('');
	let messageValue = $state('');
	let agreeChecked = $state(false);
	let planValue = $state('');
	let fileName = $state<string | null>(null);
	let submitCount = $state(0);
	let submitError = $state<string | null>(null);
	let successShown = $state(false);

	function handleFileSelect(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			fileName = input.files[0].name;
		}
	}

	function handleSubmit(event: Event) {
		event.preventDefault();
		submitError = null;

		if (!nameValue.trim()) {
			submitError = 'Name is required';
			return;
		}
		if (!emailValue.trim()) {
			submitError = 'Email is required';
			return;
		}
		if (!agreeChecked) {
			submitError = 'You must agree to the terms';
			return;
		}

		submitCount += 1;
		successShown = true;
	}

	function resetForm() {
		nameValue = '';
		emailValue = '';
		messageValue = '';
		agreeChecked = false;
		planValue = '';
		fileName = null;
		submitCount = 0;
		submitError = null;
		successShown = false;
	}
</script>

<svelte:head>
	<title>Forms — Playwright Learning Hub</title>
</svelte:head>

<main class="mx-auto max-w-3xl px-4 py-12">
	<h1 class="mb-6 text-3xl font-bold tracking-tight text-fg">Forms</h1>
	<p class="mb-10 text-lg text-muted-fg">
		Practice form interactions: fill inputs, select options, check boxes, upload files, submit, and
		assert validation.
	</p>

	<form id="practice-form" onsubmit={handleSubmit} class="space-y-6">
		<!-- Text input -->
		<div>
			<label for="name-input" class="mb-1 block text-sm font-medium text-muted-fg"
				>Name <span class="text-error-fg">*</span></label
			>
			<input
				id="name-input"
				type="text"
				bind:value={nameValue}
				placeholder="Enter your name"
				class="w-full rounded-lg border border-line-strong px-3 py-2 text-sm focus:ring-2 focus:ring-brand focus:outline-none"
				aria-required="true"
			/>
			{#if submitError === 'Name is required'}
				<p id="name-error" class="mt-1 text-sm text-error-fg" role="alert">Name is required</p>
			{/if}
		</div>

		<!-- Email input -->
		<div>
			<label for="email-input" class="mb-1 block text-sm font-medium text-muted-fg"
				>Email <span class="text-error-fg">*</span></label
			>
			<input
				id="email-input"
				type="email"
				bind:value={emailValue}
				placeholder="Enter your email"
				class="w-full rounded-lg border border-line-strong px-3 py-2 text-sm focus:ring-2 focus:ring-brand focus:outline-none"
				aria-required="true"
			/>
			{#if submitError === 'Email is required'}
				<p id="email-error" class="mt-1 text-sm text-error-fg" role="alert">Email is required</p>
			{/if}
		</div>

		<!-- Textarea -->
		<div>
			<label for="message-textarea" class="mb-1 block text-sm font-medium text-muted-fg"
				>Message</label
			>
			<textarea
				id="message-textarea"
				bind:value={messageValue}
				placeholder="Type your message..."
				rows="4"
				class="w-full rounded-lg border border-line-strong px-3 py-2 text-sm focus:ring-2 focus:ring-brand focus:outline-none"
			></textarea>
			<p id="message-count" class="mt-1 text-xs text-faint">
				{messageValue.length} characters
			</p>
		</div>

		<!-- Checkbox -->
		<div class="flex items-start gap-3">
			<input
				id="agree-checkbox"
				type="checkbox"
				bind:checked={agreeChecked}
				class="mt-0.5 h-4 w-4 border-line-strong text-brand focus:ring-brand"
			/>
			<div>
				<label for="agree-checkbox" class="text-sm font-medium text-muted-fg"
					>I agree to the terms <span class="text-error-fg">*</span></label
				>
				{#if submitError === 'You must agree to the terms'}
					<p id="agree-error" class="mt-1 text-sm text-error-fg" role="alert">
						You must agree to the terms
					</p>
				{/if}
			</div>
		</div>

		<!-- Radio group -->
		<div>
			<span id="plan-label" class="mb-2 block text-sm font-medium text-muted-fg"> Plan </span>
			<div class="space-y-2">
				{#each ['starter', 'pro', 'enterprise'] as plan (plan)}
					<label class="flex cursor-pointer items-center gap-3">
						<input
							type="radio"
							name="plan"
							bind:group={planValue}
							value={plan}
							class="h-4 w-4 border-line-strong text-brand focus:ring-brand"
						/>
						<span class="text-sm text-muted-fg">
							{plan === 'starter'
								? 'Starter — $9/mo'
								: plan === 'pro'
									? 'Pro — $29/mo'
									: 'Enterprise — $99/mo'}
						</span>
					</label>
				{/each}
			</div>
			<p id="plan-display" class="mt-1 text-sm text-muted-fg">
				Selected: {planValue || '(none)'}
			</p>
		</div>

		<!-- Select dropdown -->
		<div>
			<label for="department-select" class="mb-1 block text-sm font-medium text-muted-fg"
				>Department</label
			>
			<select
				id="department-select"
				bind:value={planValue}
				class="w-full rounded-lg border border-line-strong px-3 py-2 text-sm focus:ring-2 focus:ring-brand focus:outline-none"
			>
				<option value="">Select a department</option>
				<option value="engineering">Engineering</option>
				<option value="design">Design</option>
				<option value="product">Product</option>
			</select>
		</div>

		<!-- File upload -->
		<div>
			<label for="file-upload" class="mb-1 block text-sm font-medium text-muted-fg"
				>Upload a file</label
			>
			<input
				id="file-upload"
				type="file"
				onchange={handleFileSelect}
				class="mt-1 block w-full text-sm text-muted-fg file:mr-4 file:rounded-lg file:border-0 file:bg-brand-soft file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand hover:file:bg-brand-soft/80"
			/>
			{#if fileName}
				<p id="file-display" class="mt-1 text-sm text-muted-fg">
					Selected: {fileName}
				</p>
			{/if}
		</div>

		<!-- Submit -->
		<button
			id="submit-btn"
			type="submit"
			class="w-full rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-strong focus:ring-2 focus:ring-brand focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
		>
			Submit
		</button>

		<!-- Submit error -->
		{#if submitError}
			<p id="submit-error" class="mt-2 text-sm text-error-fg" role="alert">
				{submitError}
			</p>
		{/if}

		<!-- Success -->
		{#if successShown}
			<div
				id="success-message"
				class="mt-4 rounded-lg border border-success-border bg-success-bg p-4 text-sm text-success-fg"
			>
				Form submitted successfully! Submissions: {submitCount}
			</div>
		{/if}

		<!-- Reset -->
		<button
			id="reset-btn"
			type="button"
			onclick={resetForm}
			class="mt-4 rounded-lg border border-line-strong px-4 py-2 text-sm font-medium text-muted-fg hover:bg-muted focus:ring-2 focus:ring-line-strong focus:outline-none"
		>
			Reset form
		</button>
	</form>
</main>
