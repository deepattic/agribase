<script lang="ts">
	import '../app.css';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import NavTopRight from '$lib/components/nav-top-right.svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import { navItems } from '$lib/data';
	import { derived } from 'svelte/store';
	import { page } from '$app/stores';
	// Regex to match a 16-character alphanumeric ID
	const idPattern = /^[a-zA-Z0-9]{16}$/;

	// Compute breadcrumbs dynamically from the URL
	const breadcrumbs = derived(page, ($page) => {
		const segments = $page.url.pathname.split('/').filter(Boolean);

		return segments.map((segment, index) => ({
			name: idPattern.test(segment)
				? 'ID'
				: segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()), // Convert "data-fetching" -> "Data Fetching"
			path: '/' + segments.slice(0, index + 1).join('/')
		}));
	});

	let {
		children,
		scrollable = true,
		data
	}: { children: any; scrollable?: boolean; data: any } = $props();
</script>

<Sidebar.Provider open={false}>
	<AppSidebar {navItems} navdata={data.user} />
	<Sidebar.Inset>
		<header
			class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
		>
			<div class="flex flex-1 items-center gap-2 px-4">
				<Sidebar.Trigger class="-ml-1" />
				<Separator orientation="vertical" class="mr-2 h-4" />
				<Breadcrumb.Root>
					<Breadcrumb.List>
						{#each $breadcrumbs as crumb, i}
							<Breadcrumb.Item>
								{#if i !== $breadcrumbs.length - 1}
									<Breadcrumb.Link href={crumb.path}>{crumb.name}</Breadcrumb.Link>
									<Breadcrumb.Separator />
								{:else}
									<Breadcrumb.Page>{crumb.name}</Breadcrumb.Page>
								{/if}
							</Breadcrumb.Item>
						{/each}
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
