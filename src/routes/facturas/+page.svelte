<script>
	import { facturas as meta } from '$lib/meta';
	import { facturas } from '$lib/tools';
	import { User, Bills } from '$lib/stores';
	import { currentYear, sortByNumber } from '$lib/utils';

	import Meta from '$lib/components/Meta.svelte';
	import FirstSteps from '$lib/components/FirstSteps.svelte';
	import Header from '$lib/components/facturas/Header.svelte';
	import Tools from '$lib/components/facturas/Tools.svelte';
	import Card from '$lib/components/facturas/Card.svelte';

	$: idFilter = '';
	$: monthFilter = '';
	$: yearFilter = currentYear;

	const sortedBills = $Bills.sort(sortByNumber);

	$: filteredBills = sortedBills.filter((b) => {
		const billClientName = b.client.legal_name.toLowerCase();
		const billNumber = b.number.toString();
		const billDateMonth = b.date.month.toString();
		const billDateYear = b.date.year.toString();

		const id = idFilter.toLowerCase();
		const month = monthFilter.toString();
		const year = yearFilter.toString();

		return (
			(billClientName.includes(id) || billNumber.includes(id)) &&
			billDateMonth.includes(month) &&
			billDateYear.includes(year)
		);
	});
</script>

<Meta data={meta} />

<Header data={facturas} />
<section class="col acenter wfull">
	{#if $User.legal_name}
		<Tools {filteredBills} bind:idFilter bind:monthFilter bind:yearFilter />

		<ul class="col wfull">
			{#each filteredBills as bill}
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
