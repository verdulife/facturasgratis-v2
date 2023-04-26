<script>
	import { browser } from '$app/environment';
	import { rectificativas as meta } from '$lib/meta';
	import { rectificativas } from '$lib/tools';
	import { unbindStore, numerationFormat } from '$lib/utils';
	import { User, Rectify_bills, Firebase } from '$lib/stores';
	import { goto } from '$app/navigation';
	import { updateDoc } from '$lib/database/config';

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
		unbindStore($Rectify_bills.find((b) => numerationFormat(b.number, 2023, true) === n));

	$: bill = matched;

	async function updateBill() {
		const billIndex = $Rectify_bills.findIndex(
			(b) => numerationFormat(b.number, b.date.year, true) === bill.numeration
		);

		$Rectify_bills[billIndex] = bill;

		if ($Firebase.user) {
			await updateDoc({ collection: 'rectify_bills', data: bill });
		}
	}

	async function saveBillData() {
		const numerationExists = $Rectify_bills.some(
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

		bill.type = 'rectificativa';
		bill._updated = new Date();

		await updateBill();

		goto('/rectificativas');
	}
</script>

<Meta data={meta} />

<Header data={rectificativas} />

<form class="col acenter wfull" on:submit|preventDefault={saveBillData}>
	{#if matched}
		<Actions bind:state={bill.state} {bill} />

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
	{/if}

	<footer class="row jcenter wfull">
		<button type="submit" class="grow">Guardar rectificativa</button>
		<a role="button" class="error" href="/rectificativas">Cancelar</a>
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
