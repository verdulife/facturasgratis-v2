<script>
	import { es } from '$lib/postal-codes';
	export let clientsData, client;

	function autocompleteByPostalCode() {
		const { cp } = client;

		if (!cp || cp.length < 5) return;

		const autocomplete = es.find((code) => code.zipcode === cp);

		if (!autocomplete) return;

		client.city = autocomplete.city;
		client.country = 'España';
	}
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

	<div class="row wfull">
		<label class="col wfull" for="legal_id">
			<small>CIF/NIF</small>
			<input class="wfull" id="legal_id" type="text" bind:value={client.legal_id} />
		</label>

		<label class="col wfull" for="contact">
			<small>Contacto</small>
			<input class="wfull" id="contact" type="text" bind:value={client.contact} />
		</label>
	</div>

	<label class="col wfull" for="address">
		<small>Calle, número y piso</small>
		<input class="wfull" id="address" type="text" bind:value={client.address} />
	</label>

	<label class="col wfull" for="cp">
		<small>Código postal</small>
		<input
			class="wfull"
			list="postal_codes"
			id="cp"
			type="text"
			bind:value={client.cp}
			on:input={autocompleteByPostalCode}
		/>

		<datalist id="postal_codes">
			{#each es as { zipcode, city }}
				<option value={zipcode}>{city}</option>
			{/each}
		</datalist>
	</label>

	<div class="row wfull">
		<label class="col wfull" for="city">
			<small>Ciudad</small>
			<input class="wfull" id="city" type="text" bind:value={client.city} />
		</label>

		<label class="col wfull" for="country">
			<small>País</small>
			<input class="wfull" id="country" type="text" bind:value={client.country} />
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
