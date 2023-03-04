<script>
	import { home } from '$lib/meta';

	import Meta from '../lib/components/Meta.svelte';
	import Header from '$lib/components/home/Header.svelte';
	import ToolsList from '$lib/components/home/ToolsList.svelte';
	import TipsList from '$lib/components/home/TipsList.svelte';
</script>

<Meta data={home} />

<Header />
<ToolsList />
<TipsList />
