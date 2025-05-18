<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import Label from '$lib/components/ui/label/label.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { invalidateAll } from '$app/navigation';
	import { applyAction, enhance } from '$app/forms';
    import { toast } from "svelte-sonner";
    import { Toaster } from "$lib/components/ui/sonner/index.js";
    import { ArrowLeft, Save, User } from 'lucide-svelte';
    import { goto } from "$app/navigation";
    import * as Card from "$lib/components/ui/card/index.js";
    import { avatarImageURL } from '$lib/utils.js';

	let { data } = $props();
	let loading = $state(false);

	//:TODO put a concrete type later
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

<div class="container mx-auto py-6 max-w-2xl">
    <div class="flex items-center mb-6">
        <Button variant="ghost" class="mr-4 pl-0" onclick={() => goto('/farmers')}>
            <ArrowLeft class="mr-2 h-4 w-4" />
            Back to Farmers
        </Button>
        <h2 class="text-2xl font-bold">Edit Farmer</h2>
    </div>

    <Card.Root class="border shadow-sm">
        <Card.Header>
            <div class="flex items-center">
                <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    {#if data.farmer.avatar}
                        <img 
                            src= {data.farmer?.avatar ? avatarImageURL(data.farmer.collectionId, data.farmer.id, data.farmer.avatar, "80x80"): `https://via.placeholder.com/80/4506CB/FFFFFF/?text$={data.farmer.name}`}
                            alt="Farmer profile" 
                            class="w-16 h-16 rounded-full object-cover"
                        />
                    {:else}
                        <User class="h-8 w-8 text-blue-500" />
                    {/if}
                </div>
                <div>
                    <Card.Title>{data.farmer.name}</Card.Title>
                    <Card.Description>Farmer ID: {data.farmer.id}</Card.Description>
                </div>
            </div>
        </Card.Header>
        <Card.Content>
            <form
                method="POST"
                use:enhance={submitUpdateProfile}
                action="?/updateFarmer"
                enctype="multipart/form-data"
                class="space-y-6"
            >
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-2">
                        <Label for="name" class="text-sm font-medium">Name</Label>
                        <Input 
                            id="name" 
                            type="text" 
                            name="name" 
                            value={data.farmer.name} 
                            disabled={loading} 
                            class="w-full"
                        />    
                    </div>
                    
                    <div class="space-y-2">
                        <Label for="nic" class="text-sm font-medium">NIC</Label>
                        <Input 
                            id="nic" 
                            type="text" 
                            name="nic" 
                            value={data.farmer.nic} 
                            disabled={loading} 
                            class="w-full"
                        />
                    </div>
                    
                    <div class="space-y-2">
                        <Label for="contact" class="text-sm font-medium">Contact</Label>
                        <Input 
                            id="contact" 
                            type="text" 
                            name="contact" 
                            value={data.farmer.contact} 
                            disabled={loading} 
                            class="w-full"
                        />
                    </div>
                    
                    <div class="space-y-2">
                        <Label for="address" class="text-sm font-medium">Address</Label>
                        <Input 
                            id="address" 
                            type="text" 
                            name="address" 
                            value={data.farmer.address} 
                            disabled={loading} 
                            class="w-full"
                        />
                    </div>
                </div>
                
                <div class="space-y-2">
                    <Label for="picture" class="text-sm font-medium">Profile Picture</Label>
                    <Input 
                        id="picture" 
                        type="file" 
                        name="avatar" 
                        disabled={loading} 
                        class="w-full"
                    />
                </div>
                
                <div class="flex justify-end pt-4">
                    <Button 
                        type="button" 
                        variant="outline" 
                        class="mr-2" 
                        disabled={loading}
                        onclick={() => goto('/farmers')}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading} class="flex items-center">
                        <Save class="mr-2 h-4 w-4" />
                        Save Changes
                    </Button>
                </div>
            </form>
        </Card.Content>
    </Card.Root>
</div>

