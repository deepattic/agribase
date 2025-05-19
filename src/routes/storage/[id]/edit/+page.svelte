<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import Label from '$lib/components/ui/label/label.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { invalidateAll } from '$app/navigation';
	import { applyAction, enhance } from '$app/forms';
	import * as Select from '$lib/components/ui/select/index.js';

	let { data } = $props();
	let loading = $state(false);

	// Initialize form values from data
	let value = $state(data.storage.district);

	const submitUpdateStorage = () => {
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

	const triggerContent = $derived(
		districts.find((f) => f.value === value)?.label ?? 'Select a district'
	);
</script>

<div class="container mx-auto bg-muted py-6 lg:rounded-lg">
	<div class="overflow-x-auto">
		<form
			method="POST"
			use:enhance={submitUpdateStorage}
			action="?/updateStorage"
			enctype="multipart/form-data"
		>
			<h2 class="mb-4 text-2xl font-semibold">Edit Storage Facility</h2>

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
						value={data.storage.capacity} 
					/>
				</div>
				<div>
					<Label for="current_utilization">Current Utilization</Label>
					<Input
						id="current_utilization"
						type="number"
						name="current_utilization"
						disabled={loading}
						value={data.storage.current_utilization}
					/>
				</div>
			</div>

			<div class="mt-4 p-2">
				<Label for="location">Location</Label>
				<Textarea
					name="location"
					placeholder="Enter The location of the Storage Facility"
					disabled={loading}
					value={data.storage.location}
				/>
			</div>

			<div class="mt-4 flex space-x-2">
				<Button type="submit" disabled={loading}>Update</Button>
				<Button type="button" variant="outline" onclick={() => window.history.back()}>Cancel</Button>
			</div>
		</form>
	</div>
</div>
