<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import Label from '$lib/components/ui/label/label.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { invalidateAll } from '$app/navigation';
	import { applyAction, enhance } from '$app/forms';
    import { toast } from "svelte-sonner";
    import { Toaster } from "$lib/components/ui/sonner/index.js";

	let { data } = $props();
	let loading = $state(false);

	//:TODO put a concreate type later
	const submitUpdateProfile = () => {
		loading = true;
		return async ({ result }: { result: any }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
                    toast.success('Farmer Updated Successfully');
					break;
				case 'error':
                    toast.error('Farmer Update Failed Please Try Again Later');
					break;
				default:
					await applyAction(result);
					break;
			}
			loading = false;
		};
	};
</script>


<Toaster />
<form
	method="POST"
	use:enhance={submitUpdateProfile}
    action="?/updateFarmer"
	enctype="multipart/form-data"
>
	<div class="grid w-full max-w-sm items-center gap-1.5">
		<Label for="name">Name</Label>
		<Input id="picture" type="text" name="name" placeholder={data.farmer.name} disabled={loading} />    
	</div>
	<div class="grid w-full max-w-sm items-center gap-1.5">
		<Label for="nic">NIC</Label>
		<Input id="nic" type="text" name="nic" placeholder={data.farmer.nic} disabled={loading} />
	</div>
	<div class="grid w-full max-w-sm items-center gap-1.5">
		<Label for="contact">Contact</Label>
		<Input id="contact" type="text" name="contact" placeholder={data.farmer.contact} disabled={loading} />
	</div>
	<div class="grid w-full max-w-sm items-center gap-1.5">
		<Label for="address">Address</Label>
		<Input id="address" type="text" name="address" placeholder={data.farmer.address} disabled={loading} />
	</div>
	<div class="grid w-full max-w-sm items-center gap-1.5">
		<Label for="picture">Picture</Label>
		<Input id="picture" type="file" name="avatar" placeholder={data.farmer.avatar} disabled={loading} />
	</div>
	<Button type="submit" class="m-2" disabled={loading}>Update Details</Button>
</form>

