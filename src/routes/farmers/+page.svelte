<script lang="ts">
	import { Plus } from "lucide-svelte"; // Assuming you're using lucide-svelte for icons
	import Button from '$lib/components/ui/button/button.svelte';
	import { avatarImageURL } from "$lib/utils";
	import * as Table from "$lib/components/ui/table/index.js";
	import { goto } from "$app/navigation";
	let { data } = $props();
  </script>
  
  <div class="container mx-auto py-6">
	<div class="flex justify-between items-center mb-6">
	  <div>
		<h2 class="text-2xl font-bold">Farmers</h2>
		<p class="text-sm text-gray-500">Manage Farmers</p>
	  </div>
	  <Button variant="outline" class="flex items-center" onclick={() => {goto('farmers/new')}}>
		<Plus class="mr-2 h-4 w-4" />
		Add New
	  </Button>
	</div>
	
	<div class="mb-4">
	  <input type="text" placeholder="Search name..." class="p-2 border rounded w-full max-w-md" />
	</div>
	
	<div class="overflow-x-auto">
		<Table.Root>
			<Table.Caption>A list of Farmers.</Table.Caption>
			<Table.Header>
			  <Table.Row>
				<Table.Head class="w-[100px]">Avatar</Table.Head>
				<Table.Head>Name</Table.Head>
				<Table.Head>Nic</Table.Head>
				<Table.Head class="text-right">Address</Table.Head>
			  </Table.Row>
			</Table.Header>
			<Table.Body>
			  {#each data.farmers as farmer, f (f)}
				<Table.Row>
				  <Table.Cell class="font-medium">
				<div class="w-12 h-12 bg-gray-300 rounded flex items-center justify-center text-xs">
    			<img src="{farmer?.avatar ? avatarImageURL(farmer.collectionId, farmer.id, farmer.avatar, "80x80"): `https://placehold.co/600x400/orange/white?text={farmer.name}`}" alt="farmar avatar" srcset="">
				</Table.Cell>
				  <Table.Cell onclick={() => {goto(`farmers/${farmer.id}`)}}>{farmer.name}</Table.Cell>
				  <Table.Cell>{farmer.nic}</Table.Cell>
				  <Table.Cell class="text-right">{farmer.address}</Table.Cell>
				</Table.Row>
			  {/each}
			</Table.Body>
		  </Table.Root>
	</div>
  </div>