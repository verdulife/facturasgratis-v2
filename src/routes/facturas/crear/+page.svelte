<script>
	import { nueva_factura as meta } from '$lib/meta';
	import { facturas } from '$lib/tools';
	import { User, Clients, Bills } from '$lib/stores';

	import Meta from '$lib/components/Meta.svelte';
	import Header from '$lib/components/facturas/Header.svelte';
	import NumerationInput from '$lib/components/facturas/NumerationInput.svelte';
	import ClientInput from '$lib/components/facturas/ClientInput.svelte';

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
		client: {}
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
		bind:legal_initials={$User.legal_initials}
	/>
	<ClientInput bind:client={bill.client} />
</form>

<style lang="postcss">
	form {
		max-width: var(--media-lg);
		gap: 2em;
		margin: 0 auto;
		padding: 2em;
	}
</style>
