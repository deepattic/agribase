<script lang="ts">
	import { 
		Plus, 
		Search, 
		Filter, 
		FileText, 
		Check, 
		X, 
		Package, 
		TrendingUp, 
		Clipboard, 
		Tractor
	} from "lucide-svelte";
	import Button from '$lib/components/ui/button/button.svelte';
	import { avatarImageURL } from "$lib/utils";
	import * as Table from "$lib/components/ui/table/index.js";
	import * as Tabs from "$lib/components/ui/tabs/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import { Input } from '$lib/components/ui/input/index.js';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Select from "$lib/components/ui/select/index.js";
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import { toast } from "svelte-sonner";
    import { Toaster } from "$lib/components/ui/sonner/index.js";
    import { enhance } from "$app/forms";
    import { invalidateAll } from "$app/navigation";
	
	let { data } = $props();
	
	// Tabs state
	let activeTab = $state("subsidies");
	
	// Search and filter state
	let searchTerm = $state("");
	let statusFilter = $state("all");
	
	// Dialog states
	let newSubsidyDialogOpen = $state(false);
	let updateStockDialogOpen = $state(false);
	let selectedFarmerId = $state("");
	let selectedFertilizerStockId = $state("");
	let stockQuantity = $state("0");
	let stockOperation = $state("add");
	
	// Form state
	let loading = $state(false);
	let subsidyAmount = $state("");
	let subsidyType = $state("fertilizer");
	let subsidyStatus = $state("pending");
	let subsidyNotes = $state("");
	
	// Derived state for filtered subsidies
	let filteredSubsidies = $derived(
		data.subsidies.filter(subsidy => {
			const matchesSearch = 
				searchTerm === "" || 
				(subsidy.expand?.farmer_id?.name && 
				subsidy.expand.farmer_id.name.toLowerCase().includes(searchTerm.toLowerCase()));
			
			const matchesStatus = 
				statusFilter === "all" || 
				subsidy.status === statusFilter;
			
			return matchesSearch && matchesStatus;
		})
	);
	
	// Derived state for filtered farmers
	let filteredFarmers = $derived(
		data.farmers.filter(farmer => 
			farmer.name.toLowerCase().includes(searchTerm.toLowerCase())
		)
	);
	
	// Handler for submitting new subsidy
	const submitNewSubsidy = () => {
		loading = true;
		return async ({ result }) => {
			if (result.type === 'success') {
				await invalidateAll();
				toast.success('Subsidy created successfully');
				newSubsidyDialogOpen = false;
				resetSubsidyForm();
			} else {
				toast.error('Failed to create subsidy');
			}
			loading = false;
		};
	};
	
	// Handler for updating fertilizer stock
	const submitStockUpdate = () => {
		loading = true;
		return async ({ result }) => {
			if (result.type === 'success') {
				await invalidateAll();
				toast.success('Fertilizer stock updated successfully');
				updateStockDialogOpen = false;
			} else {
				toast.error('Failed to update fertilizer stock');
			}
			loading = false;
		};
	};
	
	// Handler for updating subsidy status
	const updateSubsidyStatus = (subsidyId: string, status: string) => {
		loading = true;
		const formData = new FormData();
		formData.append('subsidy_id', subsidyId);
		formData.append('status', status);
		
		fetch('?/updateSubsidyStatus', {
			method: 'POST',
			body: formData
		})
		.then(async (response) => {
			const result = await response.json();
			if (result.success) {
				await invalidateAll();
				toast.success(`Subsidy ${status === 'approved' ? 'approved' : 'rejected'} successfully`);
			} else {
				toast.error('Failed to update subsidy status');
			}
		})
		.catch(() => {
			toast.error('Failed to update subsidy status');
		})
		.finally(() => {
			loading = false;
		});
	};
	
	function resetSubsidyForm() {
		selectedFarmerId = "";
		subsidyAmount = "";
		subsidyType = "fertilizer";
		subsidyStatus = "pending";
		subsidyNotes = "";
	}
	
	function getFarmerNameById(id: string) {
		const farmer = data.farmers.find(f => f.id === id);
		return farmer ? farmer.name : "Unknown";
	}
	
	function getStatusBadgeClass(status: string) {
		switch (status) {
			case 'approved':
				return 'bg-green-100 text-green-800';
			case 'rejected':
				return 'bg-red-100 text-red-800';
			case 'pending':
			default:
				return 'bg-yellow-100 text-yellow-800';
		}
	}

	const farmers = data.farmers;
	let value = $state("");
	const triggerContent = $derived(
    farmers.find((f) => f.value === value)?.label ?? "Select a Farmer"
  	);

</script>

<Toaster />

<div class="container mx-auto py-6">
	<div class="flex justify-between items-center mb-6">
		<div>
			<h2 class="text-2xl font-bold">Subsidy Management</h2>
			<p class="text-sm text-gray-500">Manage subsidies and fertilizer stock</p>
		</div>
		
		<div class="flex gap-2">
			<Button variant="outline" class="flex items-center" onclick={() => { newSubsidyDialogOpen = true }}>
				<Plus class="mr-2 h-4 w-4" />
				New Subsidy
			</Button>
			<Button variant="outline" class="flex items-center">
				<FileText class="mr-2 h-4 w-4" />
				Generate Report
			</Button>
		</div>
	</div>
	
	<Tabs.Root value={activeTab} onValueChange={(value) => activeTab = value} class="w-full">
		<Tabs.List class="grid grid-cols-3 w-full max-w-md mb-6">
			<Tabs.Trigger value="subsidies" class="flex items-center justify-center">
				<Clipboard class="mr-2 h-4 w-4" />
				Subsidies
			</Tabs.Trigger>
			<Tabs.Trigger value="farmers" class="flex items-center justify-center">
				<Tractor class="mr-2 h-4 w-4" />
				Farmers
			</Tabs.Trigger>
			<Tabs.Trigger value="stock" class="flex items-center justify-center">
				<Package class="mr-2 h-4 w-4" />
				Fertilizer Stock
			</Tabs.Trigger>
		</Tabs.List>
		
		<!-- Subsidies Tab -->
		<Tabs.Content value="subsidies" class="space-y-4">
			<div class="flex flex-wrap gap-4 mb-6">
				<div class="relative w-full max-w-sm">
					<Search class="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
					<Input 
						type="text" 
						bind:value={searchTerm}
						placeholder="Search farmer name..." 
						class="pl-8" 
					/>
				</div>
				
				<div class="flex items-center gap-2">
					<Filter class="h-4 w-4 text-gray-500" />
					<Select.Root value={statusFilter} onValueChange={(value) => statusFilter = value}>
						<Select.Trigger class="w-[180px]">
							<!-- <Select.Value placeholder="Filter by status" /> -->
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="all">All Statuses</Select.Item>
							<Select.Item value="pending">Pending</Select.Item>
							<Select.Item value="approved">Approved</Select.Item>
							<Select.Item value="rejected">Rejected</Select.Item>
						</Select.Content>
					</Select.Root>
				</div>
			</div>
			
			<div class="overflow-x-auto">
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head>Farmer</Table.Head>
							<Table.Head>Amount</Table.Head>
							<Table.Head>Type</Table.Head>
							<Table.Head>Status</Table.Head>
							<Table.Head>Created Date</Table.Head>
							<Table.Head>Actions</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#if filteredSubsidies.length === 0}
							<Table.Row>
								<Table.Cell colspan="6" class="text-center py-6 text-gray-500">
									No subsidies found matching your criteria
								</Table.Cell>
							</Table.Row>
						{:else}
							{#each filteredSubsidies as subsidy}
								<Table.Row>
									<Table.Cell>
										<div class="flex items-center gap-2">
											<div class="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
												{#if subsidy.expand?.farmer_id?.avatar}
													<img 
														src={avatarImageURL(
															subsidy.expand.farmer_id.collectionId, 
															subsidy.expand.farmer_id.id, 
															subsidy.expand.farmer_id.avatar, 
															"40x40"
														)} 
														alt="Farmer avatar"
													/>
												{:else}
													<Tractor class="h-4 w-4 text-gray-500" />
												{/if}
											</div>
											<span>{subsidy.expand?.farmer_id?.name || getFarmerNameById(subsidy.farmer_id)}</span>
										</div>
									</Table.Cell>
									<Table.Cell>${subsidy.amount.toFixed(2)}</Table.Cell>
									<Table.Cell>{subsidy.subsidy_type}</Table.Cell>
									<Table.Cell>
										<span class={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(subsidy.status)}`}>
											{subsidy.status}
										</span>
									</Table.Cell>
									<Table.Cell>{new Date(subsidy.created).toLocaleDateString()}</Table.Cell>
									<Table.Cell>
										{#if subsidy.status === 'pending'}
											<div class="flex gap-2">
												<Button 
													variant="ghost"
													size="sm"
													class="h-8 w-8 p-0 text-green-600" 
													onclick={() => updateSubsidyStatus(subsidy.id, 'approved')}
													disabled={loading}
												>
													<Check class="h-4 w-4" />
													<span class="sr-only">Approve</span>
												</Button>
												<Button 
													variant="ghost"
													size="sm"
													class="h-8 w-8 p-0 text-red-600" 
													onclick={() => updateSubsidyStatus(subsidy.id, 'rejected')}
													disabled={loading}
												>
													<X class="h-4 w-4" />
													<span class="sr-only">Reject</span>
												</Button>
											</div>
										{:else}
											<span class="text-sm text-gray-500">No actions available</span>
										{/if}
									</Table.Cell>
								</Table.Row>
							{/each}
						{/if}
					</Table.Body>
				</Table.Root>
			</div>
		</Tabs.Content>
		
		<!-- Farmers Tab -->
		<Tabs.Content value="farmers" class="space-y-4">
			<div class="relative w-full max-w-sm mb-6">
				<Search class="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
				<Input 
					type="text" 
					bind:value={searchTerm}
					placeholder="Search farmer name..." 
					class="pl-8" 
				/>
			</div>
			
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{#each filteredFarmers as farmer}
					<Card.Root>
						<Card.Header class="pb-3">
							<div class="flex items-center gap-3">
								<div class="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
									{#if farmer.avatar}
										<img 
											src={avatarImageURL(farmer.collectionId, farmer.id, farmer.avatar, "80x80")} 
											alt="Farmer avatar"
										/>
									{:else}
										<Tractor class="h-6 w-6 text-gray-500" />
									{/if}
								</div>
								<div>
									<Card.Title>{farmer.name}</Card.Title>
									<Card.Description>NIC: {farmer.nic}</Card.Description>
								</div>
							</div>
						</Card.Header>
						<Card.Content class="pb-2">
							<div class="grid grid-cols-2 gap-2 text-sm">
								<div>
									<p class="font-medium text-gray-500">Address</p>
									<p>{farmer.address || "Not specified"}</p>
								</div>
								<div>
									<p class="font-medium text-gray-500">Contact</p>
									<p>{farmer.contact || "Not specified"}</p>
								</div>
							</div>
						</Card.Content>
						<Card.Footer class="pt-3 flex justify-end">
							<Button 
								variant="outline" 
								size="sm"
								class="flex items-center" 
								onclick={() => {
									selectedFarmerId = farmer.id;
									newSubsidyDialogOpen = true;
								}}
							>
								<Plus class="mr-2 h-3 w-3" />
								Create Subsidy
							</Button>
						</Card.Footer>
					</Card.Root>
				{/each}
			</div>
		</Tabs.Content>
		
		<!-- Fertilizer Stock Tab -->
		<Tabs.Content value="stock" class="space-y-4">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
				{#each data.fertilizerStock as stock}
					<Card.Root>
						<Card.Header>
							<Card.Title>{stock.name}</Card.Title>
							<Card.Description>{stock.description}</Card.Description>
						</Card.Header>
						<Card.Content>
							<div class="flex items-center justify-between mb-2">
								<span class="text-gray-500">Current Stock:</span>
								<span class="text-xl font-bold">{stock.quantity} {stock.unit}</span>
							</div>
							<div class="w-full bg-gray-200 rounded-full h-2.5">
								<div 
									class="bg-blue-600 h-2.5 rounded-full" 
									style="width: {Math.min(stock.quantity / stock.capacity * 100, 100)}%"
								></div>
							</div>
							<div class="flex justify-between mt-2 text-xs text-gray-500">
								<span>0 {stock.unit}</span>
								<span>{stock.capacity} {stock.unit}</span>
							</div>
						</Card.Content>
						<Card.Footer class="flex justify-end">
							<Button 
								variant="outline" 
								size="sm"
								class="flex items-center" 
								onclick={() => {
									selectedFertilizerStockId = stock.id;
									stockQuantity = "0";
									updateStockDialogOpen = true;
								}}
							>
								<TrendingUp class="mr-2 h-3 w-3" />
								Update Stock
							</Button>
						</Card.Footer>
					</Card.Root>
				{/each}
			</div>
		</Tabs.Content>
	</Tabs.Root>
</div>

<!-- New Subsidy Dialog -->
<Dialog.Root bind:open={newSubsidyDialogOpen}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Create New Subsidy</Dialog.Title>
			<Dialog.Description>
				Add a new subsidy for an eligible farmer.
			</Dialog.Description>
		</Dialog.Header>
		
		<form 
			method="POST" 
			action="?/createSubsidy" 
			use:enhance={submitNewSubsidy}
			class="space-y-4 mt-4"
		>
			<div class="space-y-2">
				<Label for="farmer_id">Farmer</Label>
				<Select.Root value={selectedFarmerId} onValueChange={(value) => selectedFarmerId = value}>
					<Select.Trigger id="farmer_id" class="w-full">
						{triggerContent}
					</Select.Trigger>
					<Select.Content>
						{#each farmers as farmer }
							<Select.Item value={farmer.id}>{farmer.name} ({farmer.nic})</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
				<input type="hidden" name="farmer_id" value={selectedFarmerId} />
			</div>
			
			<div class="space-y-2">
				<Label for="amount">Amount</Label>
				<div class="relative">
					<span class="absolute left-3 top-2.5">$</span>
					<Input 
						id="amount"
						name="amount"
						type="number"
						min="0"
						step="0.01"
						bind:value={subsidyAmount}
						placeholder="0.00"
						class="pl-7"
					/>
				</div>
			</div>
			
			<div class="space-y-2">
				<Label for="subsidy_type">Subsidy Type</Label>
				<Select.Root value={subsidyType} onValueChange={(value) => subsidyType = value}>
					<Select.Trigger id="subsidy_type" class="w-full">
						<!-- <Select.Value placeholder="Select type" /> -->
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="fertilizer">Fertilizer</Select.Item>
						<Select.Item value="seeds">Seeds</Select.Item>
						<Select.Item value="equipment">Equipment</Select.Item>
						<Select.Item value="financial">Financial</Select.Item>
					</Select.Content>
				</Select.Root>
				<input type="hidden" name="subsidy_type" value={subsidyType} />
			</div>
			
			<div class="space-y-2">
				<Label for="status">Status</Label>
				<Select.Root value={subsidyStatus} onValueChange={(value) => subsidyStatus = value}>
					<Select.Trigger id="status" class="w-full">
						<!-- <Select.Value placeholder="Select status" /> -->
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="pending">Pending</Select.Item>
						<Select.Item value="approved">Approved</Select.Item>
						<Select.Item value="rejected">Rejected</Select.Item>
					</Select.Content>
				</Select.Root>
				<input type="hidden" name="status" value={subsidyStatus} />
			</div>
			
			<div class="space-y-2">
				<Label for="notes">Notes</Label>
				<textarea 
					id="notes"
					name="notes"
					bind:value={subsidyNotes}
					placeholder="Add any notes regarding this subsidy..."
					class="w-full min-h-[100px] p-2 border rounded"
				></textarea>
			</div>
			
			<Dialog.Footer>
				<Button type="button" variant="outline" onclick={() => newSubsidyDialogOpen = false}>
					Cancel
				</Button>
				<Button type="submit" disabled={loading || !selectedFarmerId || !subsidyAmount}>
					{loading ? "Creating..." : "Create Subsidy"}
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>

<!-- Update Stock Dialog -->
<Dialog.Root bind:open={updateStockDialogOpen}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Update Fertilizer Stock</Dialog.Title>
			<Dialog.Description>
				Update the current fertilizer stock level.
			</Dialog.Description>
		</Dialog.Header>
		
		<form 
			method="POST" 
			action="?/updateFertilizerStock" 
			use:enhance={submitStockUpdate}
			class="space-y-4 mt-4"
		>
			<input type="hidden" name="stock_id" value={selectedFertilizerStockId} />
			
			<div class="space-y-2">
				<Label for="operation">Operation</Label>
				<Select.Root value={stockOperation} onValueChange={(value) => stockOperation = value}>
					<Select.Trigger id="operation" class="w-full">
						<!-- <Select.Value placeholder="Select operation" /> -->
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="add">Add to Stock</Select.Item>
						<Select.Item value="remove">Remove from Stock</Select.Item>
						<Select.Item value="set">Set Exact Value</Select.Item>
					</Select.Content>
				</Select.Root>
				<input type="hidden" name="operation" value={stockOperation} />
			</div>
			
			<div class="space-y-2">
				<Label for="quantity">Quantity</Label>
				<Input 
					id="quantity"
					name="quantity"
					type="number"
					min="0"
					step="0.01"
					bind:value={stockQuantity}
					placeholder="0.00"
				/>
			</div>
			
			<Dialog.Footer>
				<Button type="button" variant="outline" onclick={() => updateStockDialogOpen = false}>
					Cancel
				</Button>
				<Button type="submit" disabled={loading || stockQuantity === "0"}>
					{loading ? "Updating..." : "Update Stock"}
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>