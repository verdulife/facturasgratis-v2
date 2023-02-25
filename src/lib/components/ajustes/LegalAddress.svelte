<script>
	export let street, cp, city, country;
</script>

<article class="col wfull">
	<h2><b>Dirección fiscal</b></h2>
	<p class="notice">Los campos marcados con un → son obligatorios.</p>

	<label class="col wfull" for="street">
		<small class="wfull">→ Dirección</small>

		<input
			class="wfull"
			id="street"
			type="text"
			bind:value={street}
			placeholder="Ej. Calle Mayor 18, Ático"
			required
		/>
	</label>

	<label class="col wfull" for="city">
		<small>→ Población</small>
		<input
			class="wfull"
			id="city"
			type="text"
			bind:value={city}
			placeholder="Ej. Barcelona"
			required
		/>
	</label>

	<div class="row wfull">
		<label class="col wfull" for="cp">
			<small>→ Código postal</small>
			<input class="wfull" id="cp" type="text" bind:value={cp} placeholder="Ej. 08818" required />
		</label>

		<label class="col wfull" for="country">
			<small>→ País</small>
			<input
				class="wfull"
				id="country"
				type="text"
				bind:value={country}
				placeholder="Ej. España"
				required
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
