<script>
	import { currency as formatCurrency, roundWithTwoDecimals } from '$lib/utils';
	import Container from '$lib/components/Forms/Container.svelte';
	import Label from '$lib/components/Forms/Label.svelte';
	import Remove from '$lib/icons/Remove.svelte';

	export let item, currency, deleteItem, iva;
	const ivaOperator = (100 + iva) / 100;

	function calcWithTaxes() {
		item.pvp = roundWithTwoDecimals(item.price * ivaOperator);
	}

	function calcWithoutTaxes() {
		item.price = roundWithTwoDecimals(item.pvp / ivaOperator);
	}

	function calcTotal() {
		const amountPvp = item.pvp * item.amount;
		const dtoPvp = (amountPvp * item.dto) / 100;
		item.total = amountPvp - dtoPvp;
	}

	$: item, calcTotal();
</script>

<Container class="col wfull">
	<div class="row wfull">
		<label class="col w3/4">
			<Label>Concepto</Label>
			<input class="wfull" type="text" bind:value={item.label} required />
		</label>

		<label class="col grow">
			<Label>Cantidad</Label>
			<input class="wfull" type="number" bind:value={item.amount} required />
		</label>
	</div>

	<div class="row aend wfull">
		<label class="col wfull">
			<Label>Precio {currency}</Label>
			<input
				class="wfull"
				type="number"
				bind:value={item.price}
				on:input={calcWithTaxes}
				required
			/>
		</label>

		<label class="col wfull">
			<Label>PVP {currency}</Label>
			<input
				class="wfull"
				type="number"
				bind:value={item.pvp}
				on:input={calcWithoutTaxes}
				required
			/>
		</label>

		<label class="col wfull">
			<Label>Descuento %</Label>
			<input class="wfull" type="number" bind:value={item.dto} required />
		</label>

		<label class="col wfull">
			<Label>Total {currency}</Label>
			<input class="wfull" type="number" bind:value={item.total} disabled />
		</label>

		<div class="col aend wfull">
			<button type="button" class="unset row fcenter" on:click={deleteItem}>
				<Remove width="1.5em" /> Borrar
			</button>
		</div>
	</div>
</Container>

<style lang="postcss">
	div,
	button {
		gap: 0.5em;
	}

	button {
		color: hsl(var(--error-hsl), 0.7);

		&:hover,
		&:focus {
			color: hsl(var(--error-hsl), 1);
		}
	}
</style>
