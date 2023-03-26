<script>
	import { currency as formatCurrency, roundWithTwoDecimals } from '$lib/utils';

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

<article class="col wfull">
	<div class="row wfull">
		<label class="col w3/4">
			<small>Concepto</small>
			<input class="wfull" type="text" bind:value={item.label} autofocus required />
		</label>

		<label class="col grow">
			<small>Cantidad</small>
			<input class="wfull" type="number" bind:value={item.amount} required />
		</label>
	</div>

	<div class="row acenter wfull">
		<label class="col wfull">
			<small>Precio {currency}</small>
			<input
				class="wfull"
				type="number"
				bind:value={item.price}
				on:input={calcWithTaxes}
				required
			/>
		</label>

		<label class="col wfull">
			<small>PVP {currency}</small>
			<input
				class="wfull"
				type="number"
				bind:value={item.pvp}
				on:input={calcWithoutTaxes}
				required
			/>
		</label>

		<label class="col wfull">
			<small>Descuento %</small>
			<input class="wfull" type="number" bind:value={item.dto} required />
		</label>

		<div class="col aend wfull">
			<small>Total {currency}</small>
			<h3>{formatCurrency(item.total || 0)}</h3>
			<button type="button" on:click={deleteItem}>Borrar</button>
		</div>
	</div>
</article>

<style lang="postcss">
	article {
		gap: 1em;
		background-color: hsl(var(--base-hsl), 0.8);
		border: 1px solid var(--base-200);
		border-radius: 0.3em;
		padding: 1.25em;
		overflow: hidden;

		@media (--dark) {
			background-color: hsl(var(--base-900-hsl), 0.8);
			border-color: var(--base-800);
		}
	}

	label {
		& small {
			color: var(--base-500);
			padding: 0 1em;

			@media (--dark) {
				color: var(--base-600);
			}
		}

		& input {
			margin-top: 0.5em;
		}
	}

	div {
		gap: 0.5em;
	}
</style>
