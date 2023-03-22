<script>
	export let legal_name, legal_id, legal_initials;
</script>

<article class="col wfull">
	<h2><b>Datos legales</b></h2>
	<p>Los campos marcados con un → son obligatorios.</p>

	<label class="col wfull" for="legal_name">
		<small class="wfull">→ Nombre fiscal</small>

		<input
			class="wfull"
			id="legal_name"
			type="text"
			bind:value={legal_name}
			placeholder="Ej. Factura Gratis S.L."
			required
		/>
	</label>

	<div class="row wfull">
		<label class="col wfull" for="legal_id">
			<small>→ CIF/NIF</small>
			<input
				class="wfull"
				id="legal_id"
				type="text"
				bind:value={legal_id}
				placeholder="Ej. B00011100"
				required
			/>
		</label>

		<label class="col grow" for="legal_initials">
			<small>Iniciales</small>
			<input
				class="wfull"
				id="legal_initials"
				type="text"
				bind:value={legal_initials}
				maxlength="3"
				minlength="2"
				placeholder="Ej. FG"
			/>
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
