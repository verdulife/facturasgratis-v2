<script>
	import { home } from '$lib/meta';

	import Meta from '$components/global/Meta.svelte';
	import Header from '$components/home/Header.svelte';
	import ToolsList from '$components/home/ToolsList.svelte';
	import TipsList from '$components/home/TipsList.svelte';

	let searchTerm = '';
</script>

<Meta data={home} />

<Header bind:searchTerm />
<ToolsList {searchTerm} />
<TipsList />
