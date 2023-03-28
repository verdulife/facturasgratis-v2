<script>
	import { nueva_factura as meta } from '$lib/meta';
	import { facturas } from '$lib/tools';
	import { User, Bills, Firebase } from '$lib/stores';
	import { goto } from '$app/navigation';
	import { syncDocumentsData } from '$lib/database/config';

	import Meta from '$lib/components/Meta.svelte';
	import Header from '$lib/components/facturas/Header.svelte';
	import NumerationInput from '$lib/components/facturas/NumerationInput.svelte';
	import ClientInput from '$lib/components/facturas/ClientInput.svelte';
	import ItemsListInput from '$lib/components/facturas/ItemsListInput.svelte';
	import NotesInput from '$lib/components/facturas/NotesInput.svelte';

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

	async function saveBillData() {
		const numerationExists = $Bills.find((b) => b.number === bill.number);

		if (bill.items.length === 0) {
			alert('No has añadido ningun concepto');
			return;
		}

		if (numerationExists) {
			const check = confirm(
				`Ya existe una factura con la siguiente numeración: ${bill.number}\n\n¿Guardar de todas formas?`
			);
		}

		$Bills = [bill, ...$Bills];

		if ($Firebase.uid)
			await syncDocumentsData({ uid: $Firebase.uid, documents: 'bills', documentsStore: $Bills });

		goto('/facturas');
	}
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
		bind:totals={bill.totals}
		currency={$User.currency}
		taxes={{ iva: $User.iva, ret: $User.ret }}
	/>

	<NotesInput bind:note={$User.bill_note} />

	<footer class="row jcenter wfull">
		<button type="submit" class="grow">Crear factura</button>
		<a role="button" class="error" href="/facturas">Cancelar</a>
	</footer>
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
