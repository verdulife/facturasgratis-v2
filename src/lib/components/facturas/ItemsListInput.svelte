<script>
	export let items, currency;

	let newItem = {};

	function addItem() {
		items = [newItem, ...items];
		newItem = {};
	}
</script>

<article class="col wfull">
	<h2><b>Conceptos</b></h2>
	<p>Todos los productos o servicios a facturar</p>

	<div class="row wfull">
		<label class="col wfull" for="city">
			<small>Concepto</small>
			<input class="grow" id="city" type="text" bind:value={newItem.label} />
		</label>

		<label class="col wfull" for="country">
			<small>Cantidad</small>
			<input class="wfull" id="country" type="number" bind:value={newItem.amount} />
		</label>

		<label class="col wfull" for="country">
			<small>Descuento %</small>
			<input class="wfull" id="country" type="number" bind:value={newItem.dto} />
		</label>

		<label class="col wfull" for="country">
			<small>Precio {currency}</small>
			<input class="wfull" id="country" type="number" bind:value={newItem.price} />
		</label>

		<label class="col wfull" for="country">
			<small>PVP {currency}</small>
			<input class="wfull" id="country" type="number" bind:value={newItem.pvp} />
		</label>

		<label class="col wfull" for="country">
			<small>Total {currency}</small>
			<input class="wfull" id="country" type="number" bind:value={newItem.total} disabled />
		</label>
	</div>

	<button>Añadir concepto</button>
</article>

<style lang="postcss">
	article {
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

	p {
		font-size: var(--font-xs);
	}

	label {
		margin-top: 2em;

		& small {
			color: var(--base-500);
			padding: 0 1em;

			@media (--dark) {
				color: var(--base-600);
			}
		}

		& input {
			border-radius: 0;
			margin-top: 0.5em;
		}

		&:first-of-type input {
			border-radius: 0.3em 0 0 0.3em;
		}

		&:last-of-type input {
			border-radius: 0 0.3em 0.3em 0;
		}
	}

	div {
		gap: 0.1em;
	}
</style>
