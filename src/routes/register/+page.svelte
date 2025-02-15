<script lang="ts">
	import type { PageData } from './$types';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';

	import { superForm } from 'sveltekit-superforms';
	import * as Form from '$lib/components/ui/form/index.js';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { schema } from './schema.js';
	import SuperDebug from 'sveltekit-superforms';

	let { data }: { data: PageData } = $props();

	const form = superForm(data.form, {
		validators: zodClient(schema)
	});
	const { form: formData, enhance } = form;

</script>

<div class="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
	<div class="w-full max-w-sm">
		<Card.Root class="w-[450px]">
			<Card.Header>
				<Card.Title>Register</Card.Title>
				<Card.Description>Enter Your Details</Card.Description>
			</Card.Header>
			<Card.Content>
				<form method="POST" use:enhance>
					<div class="m-2 flex w-full max-w-sm flex-col gap-1.5">
						<Form.Field {form} name="name">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Username</Form.Label>
									<Input {...props} bind:value={$formData.name} />
								{/snippet}
							</Form.Control>
							<Form.Description>This is your public display name.</Form.Description>
							<Form.FieldErrors />
						</Form.Field>
					</div>
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
									<Input {...props} bind:value={$formData.password} />
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
					</div>
					<div class="m-2 flex w-full max-w-sm flex-col gap-1.5">
						<Form.Field {form} name="passwordConfirm">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Confirm Password</Form.Label>
									<Input {...props} bind:value={$formData.passwordConfirm} />
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
					</div>
					<Button type="submit" class="m-2">Register</Button>
				</form>
			</Card.Content>
		</Card.Root>
	</div>
</div>

<!-- remove this on prod-->
<SuperDebug data={$formData} />