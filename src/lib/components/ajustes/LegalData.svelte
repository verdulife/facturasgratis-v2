<script>
	import Container from '$lib/components/Forms/Container.svelte';
	import Title from '$lib/components/Forms/Title.svelte';
	import Label from '$lib/components/Forms/Label.svelte';
	import Row from '$lib/components/Forms/Row.svelte';

	export let legal_name, legal_id, legal_initials;
</script>

<Container>
	<Title>Datos legales</Title>

	<Row>
		<label class="col wfull" for="legal_name">
			<Label class="wfull">→ Nombre fiscal</Label>

			<input
				class="wfull"
				id="legal_name"
				type="text"
				bind:value={legal_name}
				placeholder="Ej. Factura Gratis S.L."
				required
			/>
			<span />
		</label>

		<label class="col grow" for="legal_id">
			<Label>→ CIF/NIF</Label>
			<input
				class="wfull"
				id="legal_id"
				type="text"
				bind:value={legal_id}
				placeholder="Ej. B00011100"
				required
			/>
			<span />
		</label>

		<label class="col grow" for="legal_initials">
			<Label>Iniciales</Label>
			<input
				class="wfull"
				id="legal_initials"
				type="text"
				bind:value={legal_initials}
				maxlength="3"
				minlength="1"
				placeholder="Ej. FG"
			/>
			<span />
		</label>
	</Row>
</Container>

<style lang="postcss">
	input + span {
		width: 100%;
		font-size: 12px;
		opacity: 0.2;
		padding: 0 0.5em;
	}

	input:invalid + span:before {
		content: 'Campo olbigatorio';
	}
</style>
