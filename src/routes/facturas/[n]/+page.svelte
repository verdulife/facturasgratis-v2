<script>
	import { nueva_factura as meta } from '$lib/meta';
	import { facturas } from '$lib/tools';
	import { User, Bills, Clients, Products, Firebase } from '$lib/stores';
	import { goto } from '$app/navigation';
	import { addDoc, updateDoc } from '$lib/database/config';

	import toast from 'svelte-french-toast';
	import Meta from '$lib/components/Meta.svelte';
	import Header from '$lib/components/facturas/Header.svelte';
	import NumerationInput from '$lib/components/facturas/NumerationInput.svelte';
	import ClientInput from '$lib/components/facturas/ClientInput.svelte';
	import ItemsListInput from '$lib/components/facturas/ItemsListInput.svelte';
	import NotesInput from '$lib/components/facturas/NotesInput.svelte';
	import CustomTaxes from '$lib/components/facturas/CustomTaxes.svelte';
	import Actions from '$lib/components/facturas/Actions.svelte';

	export let data;
	const { match, numeration } = data;
	const currentDate = new Date();

	function nextNumeration() {
		if ($Bills.length === 0) return 1;
		const currentNumeration = Math.max(...$Bills.map((bill) => bill.number));
		return currentNumeration + 1;
	}

	const defaultTaxes = match.taxes || { iva: $User.iva, ret: $User.ret };
	const defaultState = match.state || '';
	const defaultNote = match.note || $User.bill_note || '';

	$: bill = match
		? { ...match, taxes: defaultTaxes, state: defaultState, note: defaultNote }
		: {
				number: nextNumeration(),
				date: {
					day: currentDate.getDate(),
					month: currentDate.getMonth() + 1,
					year: currentDate.getFullYear()
				},
				client: {},
				items: [],
				taxes: defaultTaxes,
				totals: {},
				note: defaultNote,
				state: defaultState
		  };

	async function saveClientData() {
		const { client } = bill;
		const clientExists = $Clients.find((c) => c.legal_id === client.legal_id);

		if (clientExists) return;

		$Clients = [client, ...$Clients];
		await addDoc({ collection: 'clients', data: client });
	}

	async function saveProductData() {
		const { items } = bill;
		items.forEach(async (item) => {
			const productExists = $Products.find((p) => p.label === item.label);

			if (productExists) return;

			const { amount, dto, total, ...product } = item;
			$Products = [product, ...$Products];
			await addDoc({ collection: 'products', data: product });
		});
	}

	async function addNewBill() {
		$Bills = [bill, ...$Bills];

		if ($Firebase.user) {
			await addDoc({ collection: 'bills', data: bill });
			await saveClientData();
			await saveProductData();
		}
	}

	async function updateBill() {
		const billIndex = $Bills.findIndex((b) => b.number === bill.number);
		$Bills[billIndex] = bill;

		if ($Firebase.user) {
			await updateDoc({ collection: 'bills', data: bill });
			await saveClientData();
			await saveProductData();
		}
	}

	async function saveBillData() {
		const numerationExists = $Bills.some((b) => b.number === bill.number);

		if (bill.items.length === 0) {
			toast.error('No has añadido ningun concepto');
			return;
		}

		if (bill.number != numeration && numerationExists) {
			toast.error(`Ya existe la factura número ${bill.number}`);
			return;
		}

		if (match) await updateBill();
		else await addNewBill();

		goto('/facturas');
	}
</script>

<Meta data={meta} />

<Header data={facturas} />

<form class="col acenter wfull" on:submit|preventDefault={saveBillData}>
	{#if match}
		<Actions bind:state={bill.state} {bill} user={$User} />
	{/if}

	<NumerationInput
		bind:number={bill.number}
		bind:date={bill.date}
		legal_initials={$User.legal_initials}
	/>

	<ClientInput bind:client={bill.client} />

	<CustomTaxes bind:taxes={bill.taxes} />

	<ItemsListInput
		bind:items={bill.items}
		bind:totals={bill.totals}
		bind:taxes={bill.taxes}
		currency={$User.currency}
	/>

	<NotesInput bind:note={bill.note} />

	<footer class="row jcenter wfull">
		<button type="submit" class="grow">Guardar factura</button>
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
