<script>
	import { facturas as meta } from '$lib/meta';
	import { facturas } from '$lib/tools';
	import { User, Bills } from '$lib/stores';

	import Meta from '$lib/components/Meta.svelte';
	import FirstSteps from '$lib/components/FirstSteps.svelte';
	import Header from '$lib/components/facturas/Header.svelte';
	import Tools from '$lib/components/facturas/Tools.svelte';
	import Card from '$lib/components/facturas/Card.svelte';
</script>

<Meta data={meta} />

<Header data={facturas} />
<section class="col acenter wfull">
	{#if $User.legal_name}
		<Tools data={$Bills} />

		<ul class="col wfull">
			{#each $Bills as bill}
				<Card {bill} />
				<Card {bill} />
				<Card {bill} />
				<Card {bill} />
				<Card {bill} />
				<Card {bill} />
				<Card {bill} />
			{/each}
		</ul>
	{:else}
		<FirstSteps />
	{/if}
</section>

<style lang="postcss">
	section {
		padding: 2em;
	}

	ul {
		max-width: var(--media-lg);
	}
</style>
