<script>
	import { browser } from '$app/environment';
	import { facturas as meta } from '$lib/meta';
	import { facturas } from '$lib/tools';
	import { unbindStore, numerationFormat } from '$lib/utils';
	import { User, Bills, Clients, Products, Firebase } from '$lib/stores';
	import { goto } from '$app/navigation';
	import { addDoc, updateDoc } from '$lib/database/config';

	import toast from 'svelte-french-toast';
	import Meta from '$components/global/Meta.svelte';
	import Header from '$components/Docs/Header.svelte';
	import NumerationInput from '$components/Docs/NumerationInput.svelte';
	import ClientInput from '$components/Docs/ClientInput.svelte';
	import ItemsListInput from '$components/Docs/ItemsListInput.svelte';
	import NotesInput from '$components/Docs/NotesInput.svelte';
	import CustomTaxes from '$components/Docs/CustomTaxes.svelte';
	import Actions from '$components/Docs/Actions.svelte';

	export let data;
	const { n } = data;
	const matched =
		browser &&
		unbindStore($Bills.find((b) => numerationFormat(b.number, b.date.year, true) === n));
	const currentDate = new Date();

	function findFirstMissNumber(currentYear, maxN) {
		const numerations = currentYear.map((b) => b.number).sort();
		let missingNumers = [];

		for (let i = 1; i < maxN; i++) {
			if (!numerations.includes(i)) missingNumers.push(i);
		}

		return missingNumers[0];
	}

	function nextNumeration() {
		if ($Bills.length === 0) return 1;

		const currentYear = $Bills.filter((b) => b.date.year === currentDate.getFullYear());
		const currentNumeration = Math.max(...currentYear.map((b) => b.number));
		const missNumber = findFirstMissNumber(currentYear, currentNumeration);

		if (missNumber) {
			const check = confirm(
				`Existe una numeración vacia con el numero ${missNumber}\n\n¿Quieres usarla?`
			);

			if (check) return missNumber;
		}

		return currentNumeration + 1;
	}

	const defaultTaxes = matched?.taxes || { iva: $User.iva, ret: $User.ret };
	const defaultState = matched?.state || '';
	const defaultNote = matched?.note || $User.bill_note || '';

	$: bill = matched
		? {
				...matched,
				taxes: defaultTaxes,
				state: defaultState,
				note: defaultNote
		  }
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

		client._updated = new Date();
		$Clients = [client, ...$Clients];
		await addDoc({ collection: 'clients', data: client });
	}

	async function saveProductData() {
		const { items } = bill;
		items.forEach(async (item) => {
			const productExists = $Products.find((p) => p.label === item.label);

			if (productExists) return;

			const { amount, dto, total, ...product } = item;

			product._updated = new Date();
			$Products = [product, ...$Products];
			await addDoc({ collection: 'products', data: product });
		});
	}

	async function addNewBill() {
		let id;
		if ($Firebase.user) {
			id = await addDoc({ collection: 'bills', data: bill });
			await saveClientData();
			await saveProductData();
		}

		if (id) bill.id = id;
		$Bills = [bill, ...$Bills];
	}

	async function updateBill() {
		const billIndex = $Bills.findIndex(
			(b) => numerationFormat(b.number, b.date.year, true) === bill.numeration
		);

		$Bills[billIndex] = bill;

		if ($Firebase.user) {
			await updateDoc({ collection: 'bills', data: bill });
			await saveClientData();
			await saveProductData();
		}
	}

	async function saveBillData() {
		const numerationExists = $Bills.some(
			(b) => numerationFormat(b.number, b.date.year, true) === bill.numeration
		);

		if (bill.items.length === 0) {
			toast.error('No has añadido ningun concepto');
			return;
		}

		if (bill.numeration !== n && numerationExists) {
			toast.error(`Ya existe la factura número ${bill.numeration}`);
			return;
		}

		bill.type = 'factura';
		bill._updated = new Date();

		if (matched) await updateBill();
		else await addNewBill();

		goto('/facturas');
	}

	$: bill.number, (bill.numeration = numerationFormat(bill.number, bill.date.year, true));
</script>

<Meta data={meta} />

<Header data={facturas} />

<form class="col acenter wfull" on:submit|preventDefault={saveBillData}>
	{#if matched}
		<Actions bind:state={bill.state} {bill} />
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
