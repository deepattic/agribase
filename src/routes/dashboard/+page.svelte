<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card/index.js';

	import DollarSign from 'lucide-svelte/icons/dollar-sign';

	let { data }: { data: PageData } = $props();
</script>

<div class="flex flex-1 flex-col space-y-2">
	<div class="flex items-center justify-between space-y-2">
		<h2 class="text-2xl font-bold tracking-tight">Hi, Welcome back 👋</h2>
	</div>
	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Total Revenue</Card.Title>
				<DollarSign />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">$45,231.89</div>
				<p class="text-xs text-muted-foreground">+20.1% from last month</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Total Revenue</Card.Title>
				<DollarSign />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">$45,231.89</div>
				<p class="text-xs text-muted-foreground">+20.1% from last month</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Total Revenue</Card.Title>
				<DollarSign />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">$45,231.89</div>
				<p class="text-xs text-muted-foreground">+20.1% from last month</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Total Revenue</Card.Title>
				<DollarSign />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">$45,231.89</div>
				<p class="text-xs text-muted-foreground">+20.1% from last month</p>
			</Card.Content>
		</Card.Root>
	</div>
</div>
