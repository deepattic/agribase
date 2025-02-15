<script lang='ts'>
    import type { Snippet } from 'svelte';
    let { children }: { children?: Snippet } = $props();
</script>
<div class="hidden space-y-6 p-10 pb-16 md:block">
	<div class="space-y-0.5">
		<h2 class="text-2xl font-bold tracking-tight"> Profile Settings</h2>
		<p class="text-muted-foreground">
			Manage your account settings and set e-mail preferences.
		</p>
	</div>
	<div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
		<div class="flex-1 lg:max-w-2xl">
			{@render children?.()}
		</div>
	</div>
</div>