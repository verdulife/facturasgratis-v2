<script>
	import { Clients } from '$lib/stores';

	import Container from '$components/Forms/Container.svelte';
	import Title from '$components/Forms/Title.svelte';
	import Label from '$components/Forms/Label.svelte';
	import Row from '$components/Forms/Row.svelte';

	export let client;
	let clientsData = [];

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
		if (!data) return;

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
				address: data.address.fullAddress || '',
				city: data.geo.admin3_desc || '',
				country: 'ESPAÑA'
			};
		});

		client = clientData[0];
	}

	async function autocompleteClient() {
		const savedClient = $Clients.find((c) => c.legal_name === client.legal_name);
		if (savedClient) {
			client = savedClient;
			return;
		}

		if (clientsData.length === 0) return;
		setTimeout(getClientData, 250);
	}
</script>

<Container>
	<Title>Datos del cliente</Title>

	<Row>
		<label class="col wfull" for="legal_name">
			<Label>Nombre fiscal</Label>
			<input
				class="wfull"
				list="clients_data"
				id="legal_name"
				type="text"
				bind:value={client.legal_name}
				on:input={getBusinessData}
				on:change={autocompleteClient}
				required
			/>

			<datalist id="clients_data">
				{#each $Clients as { legal_name, legal_id, contact }}
					<option
						data-value={legal_id}
						value={legal_name}
						on:mousedown={() => console.log('hello')}
					>
						NIF/CIF:{legal_id} | Contacto: {contact}
					</option>
				{/each}

				{#each clientsData as { legal_name, legal_id, contact }}
					<option value={legal_name}>
						NIF/CIF:{legal_id} | Contacto: {contact}
					</option>
				{/each}
			</datalist>
		</label>

		<label class="col grow" for="legal_id">
			<Label>CIF/NIF</Label>
			<input class="wfull" id="legal_id" type="text" bind:value={client.legal_id} required />
		</label>

		<label class="col grow" for="contact">
			<Label>Contacto</Label>
			<input class="wfull" id="contact" type="text" bind:value={client.contact} required />
		</label>
	</Row>

	<label class="col wfull" for="address">
		<Label>Calle, número y piso</Label>
		<input class="wfull" id="address" type="text" bind:value={client.address} required />
	</label>

	<Row>
		<label class="col grow" for="cp">
			<Label>Código postal</Label>
			<input class="wfull" id="cp" type="text" bind:value={client.cp} required />
		</label>

		<label class="col grow" for="city">
			<Label>Población</Label>
			<input class="wfull" id="city" type="text" bind:value={client.city} required />
		</label>

		<label class="col grow" for="country">
			<Label>País</Label>
			<input class="wfull" id="country" type="text" bind:value={client.country} required />
		</label>
	</Row>
</Container>
