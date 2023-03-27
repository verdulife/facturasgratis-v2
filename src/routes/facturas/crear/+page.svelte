<script>
	import { nueva_factura as meta } from '$lib/meta';
	import { facturas } from '$lib/tools';
	import { User, Bills } from '$lib/stores';

	import Meta from '$lib/components/Meta.svelte';
	import Header from '$lib/components/facturas/Header.svelte';
	import NumerationInput from '$lib/components/facturas/NumerationInput.svelte';
	import ClientInput from '$lib/components/facturas/ClientInput.svelte';
	import ItemsListInput from '$lib/components/facturas/ItemsListInput.svelte';

	const currentDate = new Date();

	function getLastNumeration() {
		const currentNumeration = Math.max(...$Bills.map((bill) => bill.number));
		return currentNumeration + 1;
	}

	$: bill = {
		number: getLastNumeration(),
		date: {
			day: currentDate.getDate(),
			month: currentDate.getMonth() + 1,
			year: currentDate.getFullYear()
		},
		client: {},
		items: [],
		totals: {}
	};

	function saveBillData() {}
</script>

<Meta data={meta} />

<Header data={facturas} />

<form
	class="col acenter wfull"
	on:submit|preventDefault={saveBillData}
	autocomplete="off"
	spellcheck="false"
>
	<NumerationInput
		bind:number={bill.number}
		bind:date={bill.date}
		legal_initials={$User.legal_initials}
	/>

	<ClientInput bind:client={bill.client} />

	<ItemsListInput
		bind:items={bill.items}
		totals={bill.totals}
		currency={$User.currency}
		taxes={{ iva: $User.iva, ret: $User.ret }}
	/>
</form>

<style lang="postcss">
	form {
		max-width: var(--media-lg);
		gap: 2em;
		margin: 0 auto;
		padding: 2em;
	}
</style>
