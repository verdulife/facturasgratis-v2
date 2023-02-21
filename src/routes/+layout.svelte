<script>
	import '$lib/startcss/startcss.css';
	import Nav from '$lib/components/Nav.svelte';
</script>

<main class="scrollbar">
	<Nav />
	<slot />
</main>

<style lang="postcss">
	main {
		background-color: var(--c-neutral);
	}
</style>
