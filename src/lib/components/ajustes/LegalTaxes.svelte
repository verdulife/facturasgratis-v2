<script>
	import Container from '$components/Forms/Container.svelte';
	import Title from '$components/Forms/Title.svelte';
	import Label from '$components/Forms/Label.svelte';
	import Row from '$components/Forms/Row.svelte';

	export let currency, iva, ret;
</script>

<Container>
	<Title>Moneda e impuestos</Title>

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
			<Label>IVA %</Label>
			<input class="wfull" id="iva" type="number" bind:value={iva} placeholder="Ej. 21" required />
		</label>

		<label class="col grow" for="ret">
			<Label>IRPF %</Label>
			<input class="wfull" id="ret" type="number" bind:value={ret} placeholder="Ej. 15" required />
		</label>
	</Row>
</Container>
