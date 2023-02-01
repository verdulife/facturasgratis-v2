<script>
	import { home } from '$lib/meta';

	import Header from '$lib/components/Header.svelte';
	import ToolsList from '$lib/components/ToolsList.svelte';
	import TipsList from '$lib/components/TipsList.svelte';

	export let data;
	const { users_data } = data;

	console.log(users_data);
</script>

<svelte:head>
	<title>{home.title}</title>
	<meta name="description" content={home.description} />
	<meta name="keywords" content={home.keywords} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={home.url} />
	<meta property="og:title" content={home.title} />
	<meta property="og:description" content={home.description} />
	<meta property="og:image" content={home.image} />
	<meta property="og:image:secure_url" content={home.image} />
	<meta property="og:image:type" content="image/jpeg" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={home.url} />
	<meta name="twitter:title" content={home.title} />
	<meta name="twitter:description" content={home.description} />
	<meta name="twitter:image" content={home.image} />
</svelte:head>

<div class="scroll">
	<Header />
	<ToolsList />
	<TipsList />
</div>
