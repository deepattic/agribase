<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import Label from '$lib/components/ui/label/label.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { invalidateAll } from '$app/navigation';
	import { applyAction, enhance } from '$app/forms';

	let { data } = $props();
	let loading = $state(false);

	//:TODO put a concreate type later
	const submitUpdateProfile = () => {
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
</script>

<div class="container mx-auto py-6 bg-muted lg:rounded-lg">
	<div class="overflow-x-auto">
		<form
			method="POST"
			use:enhance={submitUpdateProfile}
			action="?/addFarmer"
			enctype="multipart/form-data"
		>
				<h2 class="mb-4 text-2xl font-semibold">Add New Farmer</h2>

				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label class="mb-1 block text-sm font-medium">Images</label>
				<div class="rounded-lg border-2 border-dashed p-6 text-center">
					<Input id="picture" type="file" name="avatar" disabled={loading} />
				</div>

				<div class="p-2 mt-4 grid grid-cols-2 gap-4">
					<div>
						<Label for="name">Name</Label>
						<Input
							id="name"
							type="text"
							name="name"
							placeholder="Enter Farmer's name"
							disabled={loading}
						/>
					</div>
					<div>
						<Label for="nic">NIC</Label>
						<Input id="nic" type="text" name="nic" disabled={loading} />
					</div>
				</div>

				<div class="p-2 mt-4 grid grid-cols-2 gap-4">
					<div>
						<Label for="contact">Contact</Label>
						<Input id="contact" type="text" name="contact" disabled={loading} />
					</div>
				</div>

				<div class="mt-4 p-2">
					<Label for="address">Address</Label>
					<Textarea
						name="address"
						placeholder="Enter The Address of the Farmer"
						disabled={loading}
					/>
				</div>

				<Button type="submit" class="mt-4" disabled={loading}>Add</Button>
		</form>
	</div>
</div>
