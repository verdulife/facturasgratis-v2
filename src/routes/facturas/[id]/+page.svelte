<script>
	import { nueva_factura as meta } from '$lib/meta';
	import { facturas } from '$lib/tools';
	import { User, Bills, Clients, Products, Firebase } from '$lib/stores';
	import { goto } from '$app/navigation';
	import { updateCollection } from '$lib/database/config';

	import Meta from '$lib/components/Meta.svelte';
	import Header from '$lib/components/facturas/Header.svelte';
	import NumerationInput from '$lib/components/facturas/NumerationInput.svelte';
	import ClientInput from '$lib/components/facturas/ClientInput.svelte';
	import ItemsListInput from '$lib/components/facturas/ItemsListInput.svelte';
	import NotesInput from '$lib/components/facturas/NotesInput.svelte';

	export let data;
	const currentDate = new Date();

	function getLastNumeration() {
		if ($Bills.length === 0) return 1;
		const currentNumeration = Math.max(...$Bills.map((bill) => bill.number));
		return currentNumeration + 1;
	}

	$: bill = data.match || {
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

	async function saveClientData() {
		const { client } = bill;
		const clientExists = $Clients.find((c) => c.legal_id === client.legal_id);

		if (clientExists) return;

		$Clients = [client, ...$Clients];
		await updateCollection({ collection: 'clients', data: client });
	}

	async function saveProductData() {
		const { items } = bill;
		items.forEach(async (item) => {
			const productExists = $Products.find((p) => p.label === item.label);

			if (productExists) return;

			const { amount, dto, total, ...product } = item;
			$Products = [product, ...$Products];
			await updateCollection({ collection: 'products', data: product });
		});
	}

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

			if (!check) return;
		}

		$Bills = [bill, ...$Bills];

		if ($Firebase.user) {
			await updateCollection({ collection: 'bills', data: bill });
			await saveClientData();
			await saveProductData();
		}

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
