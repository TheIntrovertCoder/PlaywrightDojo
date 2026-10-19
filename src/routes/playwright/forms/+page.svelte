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
	<h1 class="mb-6 text-3xl font-bold tracking-tight text-gray-900">Forms</h1>
	<p class="mb-10 text-lg text-gray-600">
		Practice form interactions: fill inputs, select options, check boxes, upload files, submit, and
		assert validation.
	</p>

	<form id="practice-form" onsubmit={handleSubmit} class="space-y-6">
		<!-- Text input -->
		<div>
			<label for="name-input" class="mb-1 block text-sm font-medium text-gray-700"
				>Name <span class="text-red-500">*</span></label
			>
			<input
				id="name-input"
				type="text"
				bind:value={nameValue}
				placeholder="Enter your name"
				class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
				aria-required="true"
			/>
			{#if submitError === 'Name is required'}
				<p id="name-error" class="mt-1 text-sm text-red-600" role="alert">Name is required</p>
			{/if}
		</div>

		<!-- Email input -->
		<div>
			<label for="email-input" class="mb-1 block text-sm font-medium text-gray-700"
				>Email <span class="text-red-500">*</span></label
			>
			<input
				id="email-input"
				type="email"
				bind:value={emailValue}
				placeholder="Enter your email"
				class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
				aria-required="true"
			/>
			{#if submitError === 'Email is required'}
				<p id="email-error" class="mt-1 text-sm text-red-600" role="alert">Email is required</p>
			{/if}
		</div>

		<!-- Textarea -->
		<div>
			<label for="message-textarea" class="mb-1 block text-sm font-medium text-gray-700"
				>Message</label
			>
			<textarea
				id="message-textarea"
				bind:value={messageValue}
				placeholder="Type your message..."
				rows="4"
				class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
			></textarea>
			<p id="message-count" class="mt-1 text-xs text-gray-500">
				{messageValue.length} characters
			</p>
		</div>

		<!-- Checkbox -->
		<div class="flex items-start gap-3">
			<input
				id="agree-checkbox"
				type="checkbox"
				bind:checked={agreeChecked}
				class="mt-0.5 h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
			/>
			<div>
				<label for="agree-checkbox" class="text-sm font-medium text-gray-700"
					>I agree to the terms <span class="text-red-500">*</span></label
				>
				{#if submitError === 'You must agree to the terms'}
					<p id="agree-error" class="mt-1 text-sm text-red-600" role="alert">
						You must agree to the terms
					</p>
				{/if}
			</div>
		</div>

		<!-- Radio group -->
		<div>
			<span id="plan-label" class="mb-2 block text-sm font-medium text-gray-700"> Plan </span>
			<div class="space-y-2">
				{#each ['starter', 'pro', 'enterprise'] as plan (plan)}
					<label class="flex cursor-pointer items-center gap-3">
						<input
							type="radio"
							name="plan"
							bind:group={planValue}
							value={plan}
							class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
						/>
						<span class="text-sm text-gray-700">
							{plan === 'starter'
								? 'Starter — $9/mo'
								: plan === 'pro'
									? 'Pro — $29/mo'
									: 'Enterprise — $99/mo'}
						</span>
					</label>
				{/each}
			</div>
			<p id="plan-display" class="mt-1 text-sm text-gray-600">
				Selected: {planValue || '(none)'}
			</p>
		</div>

		<!-- Select dropdown -->
		<div>
			<label for="department-select" class="mb-1 block text-sm font-medium text-gray-700"
				>Department</label
			>
			<select
				id="department-select"
				bind:value={planValue}
				class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
			>
				<option value="">Select a department</option>
				<option value="engineering">Engineering</option>
				<option value="design">Design</option>
				<option value="product">Product</option>
			</select>
		</div>

		<!-- File upload -->
		<div>
			<label for="file-upload" class="mb-1 block text-sm font-medium text-gray-700"
				>Upload a file</label
			>
			<input
				id="file-upload"
				type="file"
				onchange={handleFileSelect}
				class="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
			/>
			{#if fileName}
				<p id="file-display" class="mt-1 text-sm text-gray-600">
					Selected: {fileName}
				</p>
			{/if}
		</div>

		<!-- Submit -->
		<button
			id="submit-btn"
			type="submit"
			class="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
		>
			Submit
		</button>

		<!-- Submit error -->
		{#if submitError}
			<p id="submit-error" class="mt-2 text-sm text-red-600" role="alert">
				{submitError}
			</p>
		{/if}

		<!-- Success -->
		{#if successShown}
			<div
				id="success-message"
				class="mt-4 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800"
			>
				Form submitted successfully! Submissions: {submitCount}
			</div>
		{/if}

		<!-- Reset -->
		<button
			id="reset-btn"
			type="button"
			onclick={resetForm}
			class="mt-4 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:outline-none"
		>
			Reset form
		</button>
	</form>
</main>
