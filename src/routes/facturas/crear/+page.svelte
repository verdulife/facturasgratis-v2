<script>
	import { nueva_factura as meta } from '$lib/meta';
	import { facturas } from '$lib/tools';

	import Meta from '$lib/components/Meta.svelte';
	import Header from '$lib/components/facturas/Header.svelte';
	import Numeration from '$lib/components/facturas/Numeration.svelte';

	const currentDate = new Date();

	$: bill = {
		number: 1,
		date: {
			day: currentDate.getDate(),
			month: currentDate.getMonth() + 1,
			year: currentDate.getFullYear()
		}
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
	<Numeration bind:number={bill.number} bind:date={bill.date} />
</form>

<style lang="postcss">
	form {
		max-width: var(--media-lg);
		gap: 2em;
		margin: 0 auto;
		padding: 2em;

		& footer {
			gap: 1em;
		}
	}
</style>
