<script>
	import { home } from '$lib/meta';

	import Meta from '../lib/components/Meta.svelte';
	import Header from '$lib/components/home/Header.svelte';
	import ToolsList from '$lib/components/home/ToolsList.svelte';
	import TipsList from '$lib/components/home/TipsList.svelte';

	let searchTerm = '';
</script>

<Meta data={home} />

<Header bind:searchTerm />
<ToolsList {searchTerm} />
<TipsList />
