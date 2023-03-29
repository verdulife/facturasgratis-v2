<script>
	import Container from '$lib/components/Forms/Container.svelte';
	import Title from '$lib/components/Forms/Title.svelte';
	import Label from '$lib/components/Forms/Label.svelte';
	import Row from '$lib/components/Forms/Row.svelte';

	export let phone, email;
</script>

<Container>
	<Title>Contacto</Title>
	<p>Los campos marcados con un → son obligatorios.</p>

	<Row>
		<label class="col grow" for="phone">
			<Label class="wfull">→ Teléfono</Label>

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
			<Label class="wfull">→ Email</Label>

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

<style lang="postcss">
	p {
		font-size: var(--font-xs);
	}

	div {
		gap: 0.5em;
	}
</style>
