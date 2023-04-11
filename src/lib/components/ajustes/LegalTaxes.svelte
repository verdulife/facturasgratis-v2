<script>
	import Container from '$lib/components/Forms/Container.svelte';
	import Title from '$lib/components/Forms/Title.svelte';
	import Label from '$lib/components/Forms/Label.svelte';
	import Row from '$lib/components/Forms/Row.svelte';

	export let currency, iva, ret;
</script>

<Container>
	<Title>Moneda e impuestos</Title>
	<p>Los campos marcados con un → son obligatorios.</p>

	<Row>
		<label class="col wfull" for="currency">
			<Label>Moneda</Label>

			<select class="wfull" id="currency" bind:value={currency} required>
				<option value="€">Euro (€)</option>
				<option value="$">Dollar ($)</option>
				<option value="£">Libra (£)</option>
				<option value="¥">Yuan/Yen (¥)</option>
				<option value="₹">Rupia (₹)</option>
			</select>
		</label>

		<label class="col grow" for="iva">
			<Label>IVA (%)</Label>
			<input class="wfull" id="iva" type="number" bind:value={iva} placeholder="Ej. 21" required />
		</label>

		<label class="col grow" for="ret">
			<Label>IRPF (%)</Label>
			<input class="wfull" id="ret" type="number" bind:value={ret} placeholder="Ej. 15" required />
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
