<script lang="ts">
	import NavMain from "$lib/components/nav-main.svelte";
	import NavUser from "$lib/components/nav-user.svelte";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import type { ComponentProps } from "svelte";
	import {Sprout} from "lucide-svelte";

	let {
		ref = $bindable(null),
		collapsible = "icon",
		navItems,
		navdata,
		...restProps
	}: ComponentProps<typeof Sidebar.Root> & { navItems: any; navdata: any } = $props();
	
</script>

<Sidebar.Root bind:ref {collapsible} {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="lg">
					{#snippet child({ props })}
						<a href="/" {...props}>
							<div
								class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
							>
								<Sprout class="size-4"/>
							</div>
							<div class="flex flex-col gap-0.5 leading-none">
								<span class="font-semibold">Agribase</span>
							</div>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={navItems} />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser user={navdata} />
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
