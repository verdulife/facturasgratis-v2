<script>
	import Container from '$components/Forms/Container.svelte';
	import Title from '$components/Forms/Title.svelte';
	import Label from '$components/Forms/Label.svelte';
	import Row from '$components/Forms/Row.svelte';

	export let street, cp, city, country;
</script>

<Container>
	<Title>Dirección fiscal</Title>

	<label class="col wfull" for="street">
		<Label>Dirección</Label>

		<input
			class="wfull"
			id="street"
			type="text"
			bind:value={street}
			placeholder="Ej. Calle Mayor 18, Ático"
			required
		/>
	</label>

	<Row>
		<label class="col grow" for="cp">
			<Label>Código postal</Label>
			<input class="wfull" id="cp" type="text" bind:value={cp} placeholder="Ej. 08818" required />
		</label>

		<label class="col grow" for="city">
			<Label>Población</Label>
			<input
				class="wfull"
				id="city"
				type="text"
				bind:value={city}
				placeholder="Ej. Barcelona"
				required
			/>
		</label>

		<label class="col grow" for="country">
			<Label>País</Label>
			<input
				class="wfull"
				id="country"
				type="text"
				bind:value={country}
				placeholder="Ej. España"
				required
			/>
		</label>
	</Row>
</Container>
