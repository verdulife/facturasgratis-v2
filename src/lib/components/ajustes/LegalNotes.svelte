<script>
	export let bill_note, budget_note, delivery_note, proforma_note;

	function maxLength(e) {
		const el = e.target;
		if (el.value.length > el.maxLength) el.value = el.value.slice(0, el.maxLength);
	}
</script>

<article class="col wfull">
	<h2><b>Datos legales</b></h2>
	<p>Añade notas a pie de tus facturas, presupuestos o albaranes.</p>

	<label class="col wfull" for="bill_note">
		<small class="row jbetween aend wfull"
			>Facturas <span>{bill_note ? bill_note.length : 0} / 350</span></small
		>

		<textarea
			class="wfull"
			id="bill_note"
			bind:value={bill_note}
			on:keydown={(e) => maxLength(e)}
			maxlength="350"
			placeholder="Ej. Transporte no incluido"
		/>
	</label>

	<label class="col wfull" for="budget_note">
		<small class="row jbetween aend wfull"
			>Presupuestos <span>{budget_note ? budget_note.length : 0} / 350</span></small
		>

		<textarea
			class="wfull"
			id="budget_note"
			bind:value={budget_note}
			on:keydown={(e) => maxLength(e)}
			maxlength="350"
			placeholder="Ej. Transporte no incluido"
		/>
	</label>

	<label class="col wfull" for="delivery_note">
		<small class="row jbetween aend wfull"
			>Albaranes <span>{delivery_note ? delivery_note.length : 0} / 350</span></small
		>

		<textarea
			class="wfull"
			id="delivery_note"
			bind:value={delivery_note}
			on:keydown={(e) => maxLength(e)}
			maxlength="350"
			placeholder="Ej. Transporte no incluido"
		/>
	</label>

	<label class="col wfull" for="proforma_note">
		<small class="row jbetween aend wfull"
			>Proformas <span>{proforma_note ? proforma_note.length : 0} / 350</span></small
		>

		<textarea
			class="wfull"
			id="proforma_note"
			bind:value={proforma_note}
			on:keydown={(e) => maxLength(e)}
			maxlength="350"
			placeholder="Ej. Transporte no incluido"
		/>
	</label>
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

			& span {
				color: var(--base-500);
				font-size: var(--font-xs);
			}
		}

		& textarea {
			margin-top: 0.5em;
		}
	}
</style>
