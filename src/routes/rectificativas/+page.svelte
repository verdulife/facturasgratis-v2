<script>
	import { facturas as meta } from '$lib/meta';
	import { facturas } from '$lib/tools';
	import { User, Rectify_bills } from '$lib/stores';
	import { currentYear, sortByNumber } from '$lib/utils';

	import Meta from '$lib/components/Meta.svelte';
	import FirstSteps from '$lib/components/FirstSteps.svelte';
	import Header from '$lib/components/printables/Header.svelte';
	import Tools from '$lib/components/printables/Tools.svelte';
	import Card from '$lib/components/printables/Card.svelte';

	$: idFilter = '';
	$: monthFilter = '';
	$: yearFilter = currentYear;

	const sorted = $Rectify_bills.sort(sortByNumber);

	$: filtered = sorted.filter((b) => {
		const clientName = b.client.legal_name.toLowerCase();
		const number = b.number ? b.number.toString() : b.number;
		const dateMonth = b.date.month.toString();
		const dateYear = b.date.year.toString();

		const id = idFilter.toLowerCase();
		const month = monthFilter.toString();
		const year = yearFilter.toString();

		return (
			(clientName.includes(id) || number.includes(id)) &&
			dateMonth.includes(month) &&
			dateYear.includes(year)
		);
	});
</script>

<Meta data={meta} />
<!-- TODO: Can autogenerate metadata? -->

<Header data={facturas} />
<section class="col acenter wfull">
	{#if $User.legal_name}
		<Tools {filtered} bind:idFilter bind:monthFilter bind:yearFilter />

		<ul class="col wfull">
			{#each filtered as data}
				<Card {data} />
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
