<script lang="ts">
    import type { PageData } from './$types';
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    let { data }: { data: PageData } = $props();
</script>

<div class="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
    <div class="w-full max-w-sm">
        <Card.Root class="w-[400px]">
            <Card.Header>
                <Card.Title>Login</Card.Title>
            </Card.Header>
            <Card.Content>
                <form method="POST">
                    <div class="flex w-full max-w-sm flex-col gap-1.5 m-2">
                        <Label for="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            placeholder="email"
                            name="email"
                        />
                    </div>
                    <div class="flex w-full max-w-sm flex-col gap-1.5 m-2">
                        <Label for="password">Password</Label>
                        <Input
                            type="password"
                            id="password"
                            placeholder="password"
                            name="password"
                        />
                    </div>
                    <Button type="submit" class="m-2">Login</Button>
                </form>
            </Card.Content>
        </Card.Root>
    </div>
</div>
