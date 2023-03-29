<script>
	import '$lib/startcss/startcss.css';
	import Nav from '$lib/components/Nav.svelte';
	import Cookies from '$lib/components/Cookies.svelte';
	import { Toaster } from 'svelte-french-toast';
</script>

<main class="scrollbar">
	<Nav />
	<slot />
</main>

<Cookies />
<Toaster />

<style lang="postcss">
	main {
		background-color: var(--c-neutral);
	}
</style>
