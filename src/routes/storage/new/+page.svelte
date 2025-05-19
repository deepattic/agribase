<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import Label from '$lib/components/ui/label/label.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { invalidateAll } from '$app/navigation';
	import { applyAction, enhance } from '$app/forms';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Toaster, toast } from 'svelte-sonner';
	import { AlertCircle } from 'lucide-svelte';

	let loading = $state(false);

	let capacity = $state<number>(0);
	let utilization = $state<number>(0);
	let overUtilized = $derived(utilization > capacity && capacity > 0);

	function updateCapacity(e: Event) {
		const target = e.target as HTMLInputElement;
		capacity = parseInt(target.value) || 0;
		console.log('Capacity updated:', capacity);
	}

	function updateUtilization(e: Event) {
		const target = e.target as HTMLInputElement;
		utilization = parseInt(target.value) || 0;
		console.log('Utilization updated:', utilization);
	}

	const submitAddStorage = () => {
		console.log(
			'Submit attempted - Capacity:',
			capacity,
			'Utilization:',
			utilization,
			'Over?',
			overUtilized
		);

		if (overUtilized) {
			toast.error('Cannot save! Utilization exceeds capacity.', {
				description: 'Please reduce utilization or increase capacity before saving.',
				duration: 5000
			});
			return () => {
				return false;
			};
		}

		loading = true;
		return async ({ result }: { result: any }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					break;
				case 'error':
					break;
				default:
					await applyAction(result);
					break;
			}
			loading = false;
		};
	};
	const districts = [
		{ value: 'Ampara', label: 'Ampara' },
		{ value: 'Anuradhapura', label: 'Anuradhapura' },
		{ value: 'Badulla', label: 'Badulla' },
		{ value: 'Batticaloa', label: 'Batticaloa' },
		{ value: 'Colombo', label: 'Colombo' },
		{ value: 'Galle', label: 'Galle' },
		{ value: 'Gampaha', label: 'Gampaha' },
		{ value: 'Hambantota', label: 'Hambantota' },
		{ value: 'Jaffna', label: 'Jaffna' },
		{ value: 'Kalutara', label: 'Kalutara' },
		{ value: 'Kandy', label: 'Kandy' },
		{ value: 'Kegalle', label: 'Kegalle' },
		{ value: 'Kilinochchi', label: 'Kilinochchi' },
		{ value: 'Kurunegala', label: 'Kurunegala' },
		{ value: 'Mannar', label: 'Mannar' },
		{ value: 'Matale', label: 'Matale' },
		{ value: 'Matara', label: 'Matara' },
		{ value: 'Monaragala', label: 'Monaragala' },
		{ value: 'Mullaitivu', label: 'Mullaitivu' },
		{ value: 'Nuwara Eliya', label: 'Nuwara Eliya' },
		{ value: 'Polonnaruwa', label: 'Polonnaruwa' },
		{ value: 'Puttalam', label: 'Puttalam' },
		{ value: 'Ratnapura', label: 'Ratnapura' },
		{ value: 'Trincomalee', label: 'Trincomalee' },
		{ value: 'Vavuniya', label: 'Vavuniya' }
	];

	let value = $state('');

	const triggerContent = $derived(
		districts.find((f) => f.value === value)?.label ?? 'Select a district'
	);
</script>

<div class="container mx-auto bg-muted py-6 lg:rounded-lg">
	<Toaster />
	<div class="overflow-x-auto">
		<form
			method="POST"
			use:enhance={submitAddStorage}
			action="?/addStorage"
			enctype="multipart/form-data"
		>
			<h2 class="mb-4 text-2xl font-semibold">Manage/Add Storage Facilities</h2>

			<div class="mt-4 grid grid-cols-2 gap-4 p-2">
				<div>
					<Label for="district">District</Label>
					<Select.Root type="single" name="district" disabled={loading} bind:value>
						<Select.Trigger class="w-[180px]">
							{triggerContent}
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								<Select.GroupHeading>Districts</Select.GroupHeading>
								{#each districts as district}
									<Select.Item value={district.value} label={district.label}
										>{district.label}</Select.Item
									>
								{/each}
							</Select.Group>
						</Select.Content>
					</Select.Root>
				</div>
			</div>

			<div class="mt-4 grid grid-cols-2 gap-4 p-2">
				<div>
					<Label for="capacity">Capacity</Label>
					<Input
						id="capacity"
						type="number"
						name="capacity"
						disabled={loading}
						bind:value={capacity}
						oninput={updateCapacity}
						min="1"
					/>
				</div>
				<div>
					<Label for="current_utilization">Current Utilization</Label>
					<Input
						id="current_utilization"
						type="number"
						name="current_utilization"
						disabled={loading}
						bind:value={utilization}
						oninput={updateUtilization}
						min="0"
					/>
				</div>
			</div>

			{#if overUtilized}
				<div class="mt-2 p-2">
					<div
						class="flex items-start gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive"
					>
						<AlertCircle class="mt-0.5 h-4 w-4" />
						<div>
							<p class="font-medium">Over Capacity Alert</p>
							<p>
								The current utilization ({utilization}) exceeds the storage capacity ({capacity}) by {utilization -
									capacity} units.
							</p>
						</div>
					</div>
				</div>
			{/if}

			<div class="mt-4 p-2">
				<Label for="location">Location</Label>
				<Textarea
					name="location"
					placeholder="Enter The location of the Storage Facility"
					disabled={loading}
				/>
			</div>

			<Button type="submit" class="mt-4" disabled={loading || overUtilized}>Add</Button>
		</form>
	</div>
</div>
