<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<div class="w-full h-full flex items-center justify-center">
  <section class="max-w-2xl mx-auto text-center py-20 px-4">
    <img
      src="ablogo.webp"
      alt="Agribase Logo"
      class="w-32 h-32 mb-6 mx-auto rounded-full shadow-lg"
    />

    <h1 class="text-4xl md:text-5xl font-bold mb-4">Welcome to Agribase</h1>
    <p class="text-lg md:text-xl text-muted-foreground mb-6">
      Farmer management, crop management, storage tracking, and more.
    </p>

    <div class="space-x-4">
      <Button onclick={() => goto("/login")} class="text-lg px-6 py-4">Login</Button>
      <Button onclick={() => goto("/dashboard")} variant="outline" class="text-lg px-6 py-4">
        DashBoard
      </Button>
    </div>
  </section>
</div>