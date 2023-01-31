<script>
	import '$lib/layout-classes/all.css';
	import Nav from '../lib/components/Nav.svelte';
</script>

<main class="viewport col">
	<Nav />
	<slot />
</main>

<style lang="postcss">
	main {
		background-color: var(--c-neutral);
	}
</style>
