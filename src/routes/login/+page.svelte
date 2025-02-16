<script lang="ts">
	import type { PageData } from './$types';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { page } from '$app/state';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Alert from '$lib/components/ui/alert/index.js';

	import { superForm } from 'sveltekit-superforms';
	import * as Form from '$lib/components/ui/form/index.js';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { schema } from './schema.js';
	import SuperDebug from 'sveltekit-superforms';

	let { data }: { data: PageData } = $props();

	const form = superForm(data.form, {
		validators: zodClient(schema)
	});
	const { form: formData, enhance, delayed} = form;

	let message: string = $state(page.url.searchParams.get('message') ?? '');
</script>

{#if message}
	<Alert.Root>
		<Alert.Description>{message}</Alert.Description>
	</Alert.Root>
{/if}

<div class="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
	<div class="w-full max-w-sm">
		<Card.Root class="w-[400px]">
			<Card.Header>
				<Card.Title>Login</Card.Title>
			</Card.Header>
			<Card.Content>
				<form method="POST" use:enhance>
					<div class="m-2 flex w-full max-w-sm flex-col gap-1.5">
						<Form.Field {form} name="email">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Email</Form.Label>
									<Input {...props} bind:value={$formData.email} />
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
					</div>
					<div class="m-2 flex w-full max-w-sm flex-col gap-1.5">
						<Form.Field {form} name="password">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Password</Form.Label>
									<Input {...props} bind:value={$formData.password} type="password" />
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
					</div>
					<Button type="submit" class="m-2" disabled={$delayed}>Login</Button>
				</form>
			</Card.Content>
		</Card.Root>
	</div>
</div>

<SuperDebug data={$formData} />