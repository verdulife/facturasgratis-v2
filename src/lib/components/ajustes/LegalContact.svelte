<script>
	export let phone, email;
</script>

<article class="col wfull">
	<h2><b>Contacto</b></h2>
	<p>Los campos marcados con un → son obligatorios.</p>

	<label class="col wfull" for="phone">
		<small class="wfull">→ Teléfono</small>

		<input
			class="wfull"
			id="phone"
			type="tel"
			bind:value={phone}
			placeholder="Ej. 600 600 600"
			required
		/>
	</label>

	<label class="col wfull" for="email">
		<small class="wfull">→ Correo electrónico</small>

		<input
			class="wfull"
			id="email"
			type="email"
			bind:value={email}
			placeholder="Ej. facturasgratis.app@gmail.com"
			required
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
		}

		& input {
			margin-top: 0.5em;
		}
	}
</style>
