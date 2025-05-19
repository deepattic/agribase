<script lang="ts">
	import type { PageData } from './$types';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Plus, Warehouse, Pencil, Trash2 } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import * as Table from '$lib/components/ui/table/index.js';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { invalidateAll } from '$app/navigation';
	import { enhance } from '$app/forms';
	
	let { data }: { data: PageData } = $props();
	$inspect(data.storage);
	
	let searchTerm = $state('');
	let isDeleteDialogOpen = $state(false);
	let storageToDelete = $state(null);
	let deletionInProgress = $state(false);
	
	const filteredStorage = $derived(
		searchTerm 
			? data.storage.filter(s => 
				s.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
				s.location.toLowerCase().includes(searchTerm.toLowerCase())
			)
			: data.storage
	);
	
	function handleEdit(id) {
		goto(`/storage/${id}/edit`);
	}
	
	function handleDelete(id) {
		storageToDelete = id;
		isDeleteDialogOpen = true;
	}
	
	function onDeleteSubmit() {
		deletionInProgress = true;
		return async ({ result }: { result: any }) => {
			if (result.type === 'success') {
				await invalidateAll();
			}
			isDeleteDialogOpen = false;
			storageToDelete = null;
			deletionInProgress = false;
		};
	}
</script>

<div class="container mx-auto py-6">
	<div class="mb-6 flex items-center justify-between">
		<div>
			<h2 class="text-2xl font-bold">Storage</h2>
			<p class="text-sm text-gray-500">Manage/Add Storage Facilities</p>
		</div>
		<Button
			variant="outline"
			class="flex items-center"
			onclick={() => {
				goto('storage/new');
			}}
		>
			<Plus class="mr-2 h-4 w-4" />
			Add New
		</Button>
	</div>

	<div class="mb-4">
		<input 
			type="text" 
			placeholder="Search name or location..." 
			class="w-full max-w-md rounded border p-2"
			bind:value={searchTerm} 
		/>
	</div>

	<div class="overflow-x-auto">
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[100px]"></Table.Head>
					<Table.Head>District</Table.Head>
					<Table.Head>Location</Table.Head>
					<Table.Head class="text-right">Capacity</Table.Head>
					<Table.Head class="text-right">Current Utilization</Table.Head>
					<Table.Head class="text-right">Actions</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each filteredStorage as s}
					<Table.Row>
						<Table.Cell class="font-medium">
							<div class="flex h-12 w-12 items-center justify-center rounded bg-gray-300 text-xs">
								<Warehouse size="2rem" />
							</div>
						</Table.Cell>
						<Table.Cell>{s.district}</Table.Cell>
						<Table.Cell>{s.location}</Table.Cell>
						<Table.Cell class="text-right">{s.capacity}</Table.Cell>
						<Table.Cell class="text-right"
							>{Math.floor((s.current_utilization / s.capacity) * 100)}%</Table.Cell>
						<Table.Cell class="text-right">
							<div class="flex justify-end space-x-2">
								<Button
									variant="outline"
									size="sm"
									onclick={() => handleEdit(s.id)}
									class="h-8 w-8 p-0"
								>
									<Pencil class="h-4 w-4" />
									<span class="sr-only">Edit</span>
								</Button>
								<Button
									variant="destructive"
									size="sm"
									onclick={() => handleDelete(s.id)}
									class="h-8 w-8 p-0"
								>
									<Trash2 class="h-4 w-4" />
									<span class="sr-only">Delete</span>
								</Button>
							</div>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</div>

<AlertDialog.Root bind:open={isDeleteDialogOpen}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you sure?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete the storage facility.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<form method="POST" action="?/deleteStorage" use:enhance={onDeleteSubmit}>
				<input type="hidden" name="id" value={storageToDelete} />
				<div class="flex justify-end gap-4">
					<AlertDialog.Cancel disabled={deletionInProgress}>Cancel</AlertDialog.Cancel>
					<Button type="submit" variant="destructive" disabled={deletionInProgress}>
						{deletionInProgress ? 'Deleting...' : 'Delete'}
					</Button>
				</div>
			</form>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>