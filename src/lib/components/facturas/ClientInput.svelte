<script>
	import { es } from '$lib/postal-codes';
	export let client;
	let clientsData = [];

	function autocompleteByPostalCode() {
		const { cp } = client;

		if (!cp || cp.length < 5) return;

		const autocomplete = es.find((code) => code.zipcode === cp);

		if (!autocomplete) return;

		client.city = autocomplete.city;
		client.country = 'España';
	}

	async function getBusinessData() {
		if (client.legal_name === '') return;

		const SEARCH_API =
			'https://zerd3zwis9.execute-api.eu-west-1.amazonaws.com/v1/services?country=ESP&lang=es&query_type=multimatch&term_looked=';

		const res = await fetch(SEARCH_API + client.legal_name);
		const json = await res.json();
		const { hits } = json.hits;

		const businessData = hits.map((h) => {
			const { idprovider, nreg, denomination } = h._source;
			const { fullName } = denomination;
			return {
				id: idprovider,
				legal_id: nreg,
				legal_name: fullName
			};
		});

		clientsData = businessData.length > 0 ? businessData : clientsData;
	}

	async function getClientData() {
		const [data] = clientsData;
		const ID_API =
			'https://zerd3zwis9.execute-api.eu-west-1.amazonaws.com/v1/services?country=ESP&lang=es&query_type=detail&term_looked=';

		const res = await fetch(ID_API + data.id);
		const json = await res.json();
		const { hits } = json.hits;

		const clientData = hits.map((h) => {
			const { _source: data } = h;

			return {
				legal_name: data.denomination.fullName || '',
				legal_id: data.nreg || '',
				contact: data.telephone || '',
				cp: data.address.postcode || '',
				address: data.address.fullAddress || ''
			};
		});

		client = clientData[0];
		autocompleteByPostalCode();
	}

	async function autocompleteClient() {
		if (clientsData === 0) return;

		setTimeout(getClientData, 250);
	}
</script>

<article class="col wfull">
	<h2><b>Datos del cliente</b></h2>

	<div class="row wfull">
		<label class="col wfull" for="legal_name">
			<small>Nombre fiscal</small>
			<input
				class="wfull"
				list="clients_data"
				id="legal_name"
				type="text"
				bind:value={client.legal_name}
				on:input={getBusinessData}
				on:change={autocompleteClient}
			/>

			<datalist id="clients_data">
				{#each clientsData as client}
					<option value={client.legal_name}>{client.legal_id}</option>
				{/each}
			</datalist>
		</label>

		<label class="col grow" for="legal_id">
			<small>CIF/NIF</small>
			<input class="wfull" id="legal_id" type="text" bind:value={client.legal_id} />
		</label>

		<label class="col grow" for="contact">
			<small>Contacto</small>
			<input class="wfull" id="contact" type="text" bind:value={client.contact} />
		</label>
	</div>

	<label class="col wfull" for="address">
		<small>Calle, número y piso</small>
		<input class="wfull" id="address" type="text" bind:value={client.address} />
	</label>

	<div class="row wfull">
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
		padding: 1.75em;
		overflow: hidden;

		@media (--dark) {
			background-color: hsl(var(--base-900-hsl), 0.8);
			border-color: var(--base-800);
		}
	}

	h2 {
		background-color: var(--accent);
		color: var(--base-900);
		font-size: var(--font-xs);
		border-radius: 0 0 0.3em 0.3em;
		box-shadow: 0 0 20px hsl(var(--accent-hsl), 0.4);
		transform: translate(1em, -1.75rem);
		padding: 0.25em 1em;
	}

	label {
		margin-top: 1.25em;

		& small {
			background-color: var(--base-800);
			color: var(--base-500);
			font-family: var(--font-title);
			border-radius: 0.3em 0.3em 0 0;
			transform: translateX(1em);
			padding: 0.25em 0.5em;

			@media (--dark) {
				color: var(--base-300);
			}
		}
	}

	div {
		gap: 0.5em;
	}
</style>
