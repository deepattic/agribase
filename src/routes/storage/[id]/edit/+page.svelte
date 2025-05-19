<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import Label from '$lib/components/ui/label/label.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { invalidateAll } from '$app/navigation';
	import { applyAction, enhance } from '$app/forms';
	import * as Select from '$lib/components/ui/select/index.js';
	import * as Progress from '$lib/components/ui/progress/index.js';
	import { AlertCircle } from 'lucide-svelte';
	import { Toaster, toast } from 'svelte-sonner';

	let { data } = $props();
	let loading = $state(false);

	// Initialize form values from data
	let value = $state(data.storage.district);
	let capacity = $state(parseInt(data.storage.capacity));
	let utilization = $state(parseInt(data.storage.current_utilization));
	let utilizationPercentage = $derived(Math.round((utilization / capacity) * 100) || 0);
	let overUtilized = $derived(utilization > capacity);

	function updateUtilization(e) {
		utilization = parseInt(e.target.value);
	}

	function updateCapacity(e) {
		capacity = parseInt(e.target.value) || 1;
	}

	const submitUpdateStorage = () => {
		// Check if utilization exceeds capacity before allowing submission
		if (utilization > capacity) {
			toast.error("Cannot save! Utilization exceeds capacity.", {
				description: "Please reduce utilization or increase capacity before saving.",
				duration: 5000
			});
			return ({ cancel }) => {
				// Cancel the form submission
				cancel();
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

	const triggerContent = $derived(
		districts.find((f) => f.value === value)?.label ?? 'Select a district'
	);
</script>

<div class="container mx-auto py-6 lg:rounded-lg">
	<Toaster richColors />
	<div class="bg-card shadow-lg rounded-xl overflow-hidden">
		<div class="bg-primary/10 p-6 border-b">
			<h2 class="text-2xl font-semibold flex items-center gap-2">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6"><path d="M22 20V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2Z"></path></svg>
				Edit Storage Facility
			</h2>
		</div>

		<form
			method="POST"
			use:enhance={submitUpdateStorage}
			action="?/updateStorage"
			enctype="multipart/form-data"
			class="p-6"
		>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div class="space-y-4">
					<div>
						<Label for="district" class="text-sm font-medium">District</Label>
						<Select.Root type="single" name="district" disabled={loading} bind:value>
							<Select.Trigger class="w-full">
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
						<div class="flex items-center gap-2 mt-2">
							<div class="h-3 w-3 rounded-full bg-primary"></div>
							<span class="text-xs text-muted-foreground">Normal: 0-100% of capacity</span>
						</div>
						<div class="flex items-center gap-2">
							<div class="h-3 w-3 rounded-full bg-destructive"></div>
							<span class="text-xs text-muted-foreground">Overutilized: >100% of capacity</span>
						</div>
					</div>

					<div>
						<Label for="capacity" class="text-sm font-medium">Capacity</Label>
						<Input 
							id="capacity" 
							type="number" 
							name="capacity" 
							disabled={loading} 
							bind:value={capacity}
							on:input={updateCapacity}
							min="1"
							class="w-full"
						/>
					</div>

					<div>
						<Label for="location" class="text-sm font-medium">Location</Label>
						<Textarea
							name="location"
							placeholder="Enter the location of the Storage Facility"
							disabled={loading}
							value={data.storage.location}
							class="resize-none"
							rows="4"
						/>
					</div>
				</div>

				<div class="space-y-6">
					<div class="bg-muted rounded-lg p-6 space-y-4">
					<div class="space-y-4">
						<div>
							<Label for="current_utilization" class="text-sm font-medium">Current Utilization</Label>
							<Input
								id="current_utilization"
								type="number"
								name="current_utilization"
								bind:value={utilization}
								on:input={updateUtilization}
								min="0"
								class="w-full"
								disabled={loading}
							/>
						</div>

						<div class="space-y-2">
							<div class="flex justify-between items-center">
								<span class="text-sm font-medium">Utilization Indicator</span>
								<span class={`text-sm font-medium rounded-full px-2 py-1 ${overUtilized ? 'bg-destructive/20 text-destructive' : 'bg-primary/20 text-primary'}`}>
									{utilization} / {capacity} ({utilizationPercentage}%)
								</span>
							</div>
							
							<Progress.Root class="h-2 w-full" value={utilizationPercentage > 150 ? 150 : utilizationPercentage}>
								<Progress.Indicator 
									class={`h-full transition-all ${overUtilized ? 'bg-destructive' : 'bg-primary'}`} 
									style={`width: ${utilizationPercentage > 150 ? 150 : utilizationPercentage}%`} 
								/>
							</Progress.Root>
						</div>

						{#if overUtilized}
							<div class="flex items-start gap-2 text-destructive text-sm p-3 bg-destructive/10 rounded-md">
								<AlertCircle class="h-4 w-4 mt-0.5" />
								<div>
									<p class="font-medium">Over Capacity Alert</p>
									<p>The current utilization exceeds the storage capacity by {utilization - capacity} units.</p>
								</div>
							</div>
						{/if}
				</div>
			</div>

			<div class="mt-8 flex space-x-3">
				<Button type="submit" disabled={loading} class="px-6">
					{#if loading}
						<svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
						Updating...
					{:else}
						Save Changes
					{/if}
				</Button>
				<Button type="button" variant="outline" onclick={() => window.history.back()}>Cancel</Button>
			</div>
		</form>
	</div>
</div>