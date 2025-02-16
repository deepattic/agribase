<script lang="ts">
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import { navItems } from "$lib/data";

	let {
		items,
	}: {
		items: {
			title: string;
			url: string;
			icon: any;
			isActive: boolean;
		}[];
	} = $props();
	let activeItem = $state(navItems[0]);
</script>
<Sidebar.Group class="group-data-[collapsible=icon]">
<Sidebar.Menu>
	{#each items as item (item.title)}
		<Sidebar.MenuItem>
			<Sidebar.MenuButton onclick={() => {activeItem = item;}} isActive={activeItem.title === item.title}>
				{#snippet child({ props })}
					<a href={item.url} {...props}>
						<item.icon />
						<span>{item.title}</span>
					</a>
				{/snippet}
			</Sidebar.MenuButton>
		</Sidebar.MenuItem>
	{/each}
</Sidebar.Menu>
</Sidebar.Group>