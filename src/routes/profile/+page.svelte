<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
  import Label from '$lib/components/ui/label/label.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { invalidateAll } from '$app/navigation';
	import { applyAction, enhance } from '$app/forms';

	let { data } = $props();
  let loading = $state(false);

  const submitUpdateProfile = () => {
    loading = true;
    return async ({ result }) => {
      switch (result.type) {
        case 'success':
          await invalidateAll();
          break;
        case 'error':
          break;
        default:
          await applyAction(result);
          break;
      }
  loading = false;
  }
}

</script>

<form method="POST" use:enhance={submitUpdateProfile} action="?/updateProfile" enctype="multipart/form-data">
	<div class="grid w-full max-w-sm items-center gap-1.5">
		<Label for="name">Name</Label>
		<Input id="picture" type="text" name="name" disabled={loading} />
	</div>
	<div class="grid w-full max-w-sm items-center gap-1.5">
		<Label for="picture">Picture</Label>
		<Input id="picture" type="file" name="avatar" disabled={loading} />
	</div>
					<Button type="submit" class="m-2" disabled={loading}>Register</Button>
</form>
