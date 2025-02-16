<script lang="ts">
	import '../app.css';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import NavTopRight from '$lib/components/nav-top-right.svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import { navItems } from '$lib/data';

	let { children, scrollable = true, data }: { children: any; scrollable?: boolean; data: any } = $props();
</script>

<Sidebar.Provider open={false}>
	<AppSidebar navItems={navItems} navdata={data.user}/>
	<Sidebar.Inset>
		<header
			class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
		>
			<div class="flex flex-1 items-center gap-2 px-4">
				<Sidebar.Trigger class="-ml-1" />
				<Separator orientation="vertical" class="mr-2 h-4" />
				<Breadcrumb.Root>
					<Breadcrumb.List>
						<Breadcrumb.Item class="hidden md:block">
							<Breadcrumb.Link href="#">Building Your Application</Breadcrumb.Link>
						</Breadcrumb.Item>
						<Breadcrumb.Separator class="hidden md:block" />
						<Breadcrumb.Item>
							<Breadcrumb.Page>Data Fetching</Breadcrumb.Page>
						</Breadcrumb.Item>
					</Breadcrumb.List>
				</Breadcrumb.Root>
			</div>
			<div class="ml-auto px-3">
				<NavTopRight user={data.user} />
			</div>
		</header>
		{#if scrollable}
			<ScrollArea class="h-[calc(100dvh-52px)]">
				<div class="flex flex-1 p-4 md:px-6">{@render children()}</div>
			</ScrollArea>
		{:else}
			<div class="flex flex-1 p-4 md:px-6">{@render children()}</div>
		{/if}
	</Sidebar.Inset>
</Sidebar.Provider>
