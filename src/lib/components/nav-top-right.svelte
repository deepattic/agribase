<script>
	import LogOut from 'lucide-svelte/icons/log-out';
	import User from 'lucide-svelte/icons/user';

	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { goto } from '$app/navigation';
	let { user } = $props();
</script>

{#if user.name !== 'guest'}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			{#snippet child({ props })}
				<Avatar.Root class="h-8 w-8 rounded-lg" {...props}>
					<Avatar.Image src={user.avatar} alt={user.name} />
					<Avatar.Fallback class="rounded-lg">CN</Avatar.Fallback>
				</Avatar.Root>
			{/snippet}
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Group>
				<DropdownMenu.GroupHeading>My Account</DropdownMenu.GroupHeading>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item
						onSelect={() => {
							goto('/profile');
						}}
					>
						<User class="mr-2 size-4" />
						<span>Profile</span>
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Item
					onSelect={() => {
						const form = document.createElement('form');
						form.method = 'POST';
						form.action = '/logout';
						document.body.appendChild(form);
						form.submit();
						form.remove();
					}}
				>
					<LogOut class="mr-2 size-4" />
					<span>Log out</span>
				</DropdownMenu.Item>
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/if}
