<script lang="ts">
	import type { PageData } from './$types';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Plus, Warehouse } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import * as Table from '$lib/components/ui/table/index.js';
	let { data }: { data: PageData } = $props();
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
		<input type="text" placeholder="Search name..." class="w-full max-w-md rounded border p-2" />
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
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each data.storage as s}
					<Table.Row>
						<Table.Cell class="font-medium">
							<div class="flex h-12 w-12 items-center justify-center rounded bg-gray-300 text-xs">
								<Warehouse size="2rem" />
							</div></Table.Cell
						>
						<Table.Cell>s.district</Table.Cell>
						<Table.Cell>s.location</Table.Cell>
						<Table.Cell class="text-right">{s.capacity}</Table.Cell>
						<Table.Cell class="text-right"
							>{Math.floor((s.current_utilization / s.capacity) * 100)}%</Table.Cell
						>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</div>
