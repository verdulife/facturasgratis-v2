<script>
	import Container from '$components/Forms/Container.svelte';
	import Title from '$components/Forms/Title.svelte';
	import Label from '$components/Forms/Label.svelte';
	import Row from '$components/Forms/Row.svelte';

	export let phone, email;
</script>

<Container>
	<Title>Contacto</Title>

	<Row>
		<label class="col grow" for="phone">
			<Label>Teléfono</Label>

			<input
				class="wfull"
				id="phone"
				type="tel"
				bind:value={phone}
				placeholder="Ej. 600 600 600"
				required
			/>
		</label>

		<label class="col grow" for="email">
			<Label>Email</Label>

			<input
				class="wfull"
				id="email"
				type="email"
				bind:value={email}
				placeholder="Ej. facturasgratis.app@gmail.com"
				required
			/>
		</label>
	</Row>
</Container>
