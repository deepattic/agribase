<script lang="ts">
    let { data } = $props();
    $inspect(data.farmer)
    import { avatarImageURL } from '$lib/utils.js';
</script>

<div>
    {data.farmer.name}
    abc
    <img src="{data.farmer?.avatar ? avatarImageURL(data.farmer.collectionId, data.farmer.id, data.farmer.avatar, "80x80"): `https://via.placeholder.com/80/4506CB/FFFFFF/?text$={data.farmer.name}`}" alt="farmar avatar" srcset="">
</div>