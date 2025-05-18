<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Progress } from "$lib/components/ui/progress/index.js";
	
	let { data }: { data: PageData } = $props();

	// Calculate totals for storage capacity and utilization
	const totals = data.storage.reduce(
		(acc, item) => {
			acc.totalCapacity += item.capacity;
			acc.totalUtilization += item.current_utilization;
			return acc;
		},
		{ totalCapacity: 0, totalUtilization: 0 }
	);

	// Calculate utilization percentage
	const utilizationPercentage = Math.round((totals.totalUtilization / totals.totalCapacity) * 100);

	// Prepare data for pie chart
	const pieChartData = [
		{ name: 'Available', value: totals.totalCapacity - totals.totalUtilization },
		{ name: 'Used', value: totals.totalUtilization },
	];

	const COLORS = ['#4ade80', '#3b82f6', '#f97316', '#ec4899'];
	
	// Get latest farmer and storage information
	const latestFarmer = data.farmers.slice(-1)[0];
	const latestStorage = data.storage.slice(-1)[0];
	
	// Recent activities data
	const recentActivities = [
		{
			name: latestFarmer.name,
			action: "Farmer added",
			date: latestFarmer.updated.split(' ')[0],
			avatarColor: '#3b82f6'
		},
		{ 
			name: latestStorage.location, 
			action: 'Storage Location added', 
			date: latestStorage.updated.split(" ")[0], 
			avatarColor: '#4ade80' 
		},
	];

	// Database statistics
	const databaseStats = [
		{ name: 'Total Storage Facilities', value: data.storage.length, icon: '📦', color: 'bg-blue-100' },
		{ name: 'Total Farmers', value: data.farmers.length, icon: '👨‍🌾', color: 'bg-green-100' }
	];

	let pieChartContainer;
	let chartWidth = 0;
	let chartHeight = 0;

	onMount(() => {
		// Create pie chart
		createPieChart();

		// Handle window resize
		const handleResize = () => {
			d3.select(pieChartContainer).selectAll('*').remove();
			createPieChart();
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});

	function createPieChart() {
		if (!pieChartContainer) return;
		
		const container = d3.select(pieChartContainer);
		container.selectAll('*').remove();
		
		chartWidth = pieChartContainer.clientWidth;
		chartHeight = pieChartContainer.clientHeight || 300;

		// Create SVG
		const svg = container
			.append('svg')
			.attr('width', chartWidth)
			.attr('height', chartHeight)
			.attr('viewBox', `0 0 ${chartWidth} ${chartHeight}`);

		const radius = Math.min(chartWidth, chartHeight) / 2 - 40;

		const g = svg.append('g').attr('transform', `translate(${chartWidth / 2},${chartHeight / 2})`);

		// Pie layout
		const pie = d3
			.pie()
			.value(d => d.value)
			.sort(null);

		// Arc generator
		const arc = d3
			.arc()
			.innerRadius(radius * 0.6) // Donut chart
			.outerRadius(radius);

		// Create pie chart
		const arcs = g
			.selectAll('.arc')
			.data(pie(pieChartData))
			.enter()
			.append('g')
			.attr('class', 'arc');

		// Add colored segments
		arcs
			.append('path')
			.attr('d', arc)
			.attr('fill', (d, i) => COLORS[i % COLORS.length])
			.attr('stroke', 'white')
			.attr('stroke-width', 2);

		// Add labels
		arcs
			.append('text')
			.attr('transform', d => `translate(${arc.centroid(d)})`)
			.attr('dy', '.35em')
			.attr('text-anchor', 'middle')
			.attr('fill', '#fff')
			.attr('font-weight', 'bold')
			.text(d => d.data.name);
			
		// Add center text for utilization percentage
		g.append('text')
			.attr('text-anchor', 'middle')
			.attr('dy', '-0.5em')
			.attr('font-size', '1.5rem')
			.attr('font-weight', 'bold')
			.text(`${utilizationPercentage}%`);
			
		g.append('text')
			.attr('text-anchor', 'middle')
			.attr('dy', '1.5em')
			.attr('font-size', '0.9rem')
			.text('Utilization');
	}
</script>

<div class="w-full space-y-6 p-6 bg-gray-50 min-h-screen">
	<!-- Header Section -->
	<div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
		<div>
			<h1 class="text-3xl font-bold text-gray-800">Dashboard</h1>
			<p class="text-gray-500 mt-1">----</p>
		</div>
		<Badge variant="outline" class="px-4 py-2 text-sm bg-white">
			Last Updated: {new Date().toLocaleDateString()}
		</Badge>
	</div>

	<!-- Database Stats Cards -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
		{#each databaseStats as stat}
			<Card.Root class="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
				<Card.Content class="p-6">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-sm font-medium text-gray-500">{stat.name}</p>
							<p class="mt-2 text-3xl font-bold">{stat.value}</p>
						</div>
						<div class={`${stat.color} p-4 rounded-full`}>
							<span class="text-2xl">{stat.icon}</span>
						</div>
					</div>
				</Card.Content>
			</Card.Root>
		{/each}
		
		<!-- Storage Utilization Card -->
		<Card.Root class="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
			<Card.Content class="p-6">
				<div>
					<div class="flex justify-between items-center mb-2">
						<p class="text-sm font-medium text-gray-500">Storage Utilization</p>
						<span class="text-sm font-medium">{utilizationPercentage}%</span>
					</div>
					<Progress value={utilizationPercentage} class="h-2" />
					<p class="mt-2 text-xs text-gray-500">
						{totals.totalUtilization.toLocaleString()} / {totals.totalCapacity.toLocaleString()} units
					</p>
				</div>
			</Card.Content>
		</Card.Root>
	</div>
	
	<!-- Main Content Area -->
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
		<!-- Recent Activities Card -->
		<Card.Root class="lg:col-span-1 border-none shadow-md">
			<Card.Header>
				<Card.Title class="text-xl font-bold">Recent Activities</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="space-y-4">
					{#each recentActivities as activity}
						<div class="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-100 transition-colors">
							<Avatar.Root>
								<Avatar.Fallback 
									style="background-color: {activity.avatarColor}"
									class="text-white"
								>
									{activity.name.charAt(0)}
								</Avatar.Fallback>
							</Avatar.Root>
							<div class="flex-1">
								<p class="font-medium">{activity.name}</p>
								<p class="text-sm text-gray-500">{activity.action}</p>
							</div>
							<div class="text-sm text-gray-500">{activity.date}</div>
						</div>
						{#if activity !== recentActivities[recentActivities.length - 1]}
							<hr class="border-gray-100" />
						{/if}
					{/each}
				</div>
			</Card.Content>
		</Card.Root>

		<!-- Pie Chart Card -->
		<Card.Root class="lg:col-span-2 border-none shadow-md">
			<Card.Header>
				<Card.Title class="text-xl font-bold">Storage Distribution</Card.Title>
				<p class="text-sm text-gray-500">
					Current storage utilization across all facilities
				</p>
			</Card.Header>
			<Card.Content>
				<div class="h-80" bind:this={pieChartContainer}></div>
			</Card.Content>
		</Card.Root>
	</div>
	
	<!-- Storage Locations Table -->
	<Card.Root class="border-none shadow-md">
		<Card.Header>
			<Card.Title class="text-xl font-bold">Storage Locations</Card.Title>
		</Card.Header>
		<Card.Content>
			<div class="overflow-x-auto">
				<table class="w-full text-sm">
					<thead>
						<tr class="bg-gray-50">
							<th class="text-left p-3">Location</th>
							<th class="text-left p-3">Capacity</th>
							<th class="text-left p-3">Current Usage</th>
							<th class="text-left p-3">Utilization</th>
							<th class="text-left p-3">Last Updated</th>
						</tr>
					</thead>
					<tbody>
						{#each data.storage as storage}
							<tr class="border-b border-gray-100 hover:bg-gray-50">
								<td class="p-3 font-medium">{storage.location}</td>
								<td class="p-3">{storage.capacity.toLocaleString()} units</td>
								<td class="p-3">{storage.current_utilization.toLocaleString()} units</td>
								<td class="p-3">
									<div class="flex items-center">
										<Progress 
											value={(storage.current_utilization / storage.capacity) * 100} 
											class="h-2 w-24 mr-2" 
										/>
										<span>{Math.round((storage.current_utilization / storage.capacity) * 100)}%</span>
									</div>
								</td>
								<td class="p-3 text-gray-500">{storage.updated}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</Card.Content>
	</Card.Root>
</div>