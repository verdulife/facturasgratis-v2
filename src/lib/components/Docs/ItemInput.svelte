<script>
	import { roundWithTwoDecimals, currency as currencyFormat } from '$lib/utils';
	import { Products } from '$lib/stores';

	import Container from '$components/Forms/Container.svelte';
	import Label from '$components/Forms/Label.svelte';
	import Row from '$components/Forms/Row.svelte';

	export let item, currency, deleteItem, iva;
	$: ivaOperator = (100 + iva) / 100;

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

	function autocompleteProduct() {
		const price = $Products.find((p) => p.label === item.label)?.price;
		item.price = price || 0;

		calcWithTaxes();
		calcTotal();
	}

	$: iva, calcWithTaxes();
	$: item || iva, calcTotal();

	if (!item.pvp && item.price) calcWithTaxes();
</script>

<Container>
	<Row>
		<label class="col wfull">
			<Label>Concepto</Label>
			<input
				class="wfull"
				list="products"
				type="text"
				bind:value={item.label}
				on:change={autocompleteProduct}
				required
			/>

			<datalist id="products">
				{#each $Products as { label, price, pvp }}
					<option value={label}>
						Precio: {currencyFormat(price)} | PVP: {currencyFormat(pvp || 0)}
					</option>
				{/each}
			</datalist>
		</label>

		<label class="col grow">
			<Label>Cantidad</Label>
			<input class="wfull" type="number" step="0.01" bind:value={item.amount} required />
		</label>
	</Row>

	<Row class="aend">
		<label class="col grow">
			<Label>Precio {currency}</Label>
			<input
				class="wfull"
				type="number"
				step="0.01"
				bind:value={item.price}
				on:input={calcWithTaxes}
				required
			/>
		</label>

		<label class="col grow">
			<Label>PVP {currency}</Label>
			<input
				class="wfull"
				type="number"
				step="0.01"
				bind:value={item.pvp}
				on:input={calcWithoutTaxes}
				required
			/>
		</label>

		<label class="col grow">
			<Label>Descuento %</Label>
			<input class="wfull" type="number" step="0.01" bind:value={item.dto} required />
		</label>

		<label class="col grow">
			<Label>Total {currency}</Label>
			<input class="wfull" type="number" step="0.01" bind:value={item.total} disabled />
		</label>

		<div class="col aend grow">
			<button type="button" class="error row fcenter" on:click={deleteItem}> Borrar </button>
		</div>
	</Row>
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
