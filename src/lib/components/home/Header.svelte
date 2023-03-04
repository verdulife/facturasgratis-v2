<script>
	import { searchTerm } from '$lib/stores';
	import HeaderBackground from '$lib/components/HeaderBackground.svelte';
</script>

<HeaderBackground>
	<h1>Herramientas de gestión para <strong>autónomos</strong> y <strong>pymes</strong></h1>
	<input class="wfull" type="search" placeholder="¿Que quieres hacer?" bind:value={$searchTerm} />
</HeaderBackground>

<style lang="postcss">
	h1 {
		max-width: 900px;
		font-size: var(--font-2xl);
		line-height: 1.2;
	}

	input {
		max-width: var(--media-md);
	}
</style>
