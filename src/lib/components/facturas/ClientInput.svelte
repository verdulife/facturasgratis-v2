<script>
	export let clientsData, client;
</script>

<article class="col wfull">
	<h2><b>Datos del cliente</b></h2>
	<p class="notice">Los cambios que realices aqui, no se guardaran en la ficha del cliente</p>

	<label class="col wfull" for="legal_name">
		<small>Nombre fiscal</small>
		<input
			class="wfull"
			list="clients_data"
			id="legal_name"
			type="text"
			bind:value={client.legal_name}
		/>
		<datalist id="clients_data">
			{#each clientsData as { legal_id, legal_name }}
				<option value={legal_name}>{legal_id}</option>
			{/each}
		</datalist>
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
