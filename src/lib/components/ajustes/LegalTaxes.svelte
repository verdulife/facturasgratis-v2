<script>
	export let currency, iva, ret;
</script>

<article class="col wfull">
	<h2><b>Datos legales</b></h2>
	<p class="notice">Los campos marcados con un → son obligatorios.</p>

	<label class="col wfull" for="currency">
		<small class="wfull">→ Moneda</small>

		<select class="wfull" id="currency" bind:value={currency} required>
			<option value="€">Euro (€)</option>
			<option value="$">Dollar ($)</option>
			<option value="£">Libra (£)</option>
			<option value="¥">Yuan/Yen (¥)</option>
			<option value="₹">Rupia (₹)</option>
		</select>
	</label>

	<div class="row wfull">
		<label class="col wfull" for="iva">
			<small>→ IVA (%)</small>
			<input class="wfull" id="iva" type="number" bind:value={iva} placeholder="Ej. 21" required />
		</label>

		<label class="col wfull" for="ret">
			<small>→ IRPF (%)</small>
			<input class="wfull" id="ret" type="number" bind:value={ret} placeholder="Ej. 15" required />
		</label>
	</div>
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
			margin-top: 0.5em;
		}
	}

	div {
		gap: 2em;
	}
</style>
