<script>
	import '$lib/startcss/startcss.css';
	import Nav from '$lib/components/Nav.svelte';
	import Cookies from '$lib/components/Cookies.svelte';
</script>

<main class="scrollbar">
	<Nav />
	<slot />
	<Cookies />
</main>

<style lang="postcss">
	main {
		background-color: var(--c-neutral);
	}
</style>
