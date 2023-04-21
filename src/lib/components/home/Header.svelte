<script>
	import HeaderBackground from '$components/global/HeaderBackground.svelte';

	export let searchTerm;
</script>

<HeaderBackground>
	<h1>Herramientas de gestión para <strong>autónomos</strong> y <strong>pymes</strong></h1>
	<input class="wfull" type="search" placeholder="¿Que quieres hacer?" bind:value={searchTerm} />
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
