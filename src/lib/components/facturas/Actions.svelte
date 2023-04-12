<script>
	import { printPdf } from '$lib/print';

	import Container from '$lib/components/Forms/Container.svelte';
	import Title from '$lib/components/Forms/Title.svelte';
	import Label from '$lib/components/Forms/Label.svelte';
	import Row from '$lib/components/Forms/Row.svelte';

	export let state, bill, user;

	const data = { ...bill, user, type: 'Factura' };
	const stateDescription = `
	[Emitida]
Valor por defecto al crear una factura

[Enviada]
Factura enviada al cliente

[Pagada]
Factura cobrada

[Cerrada]
Factura en cierre trimestral
`;

	$: src = '';

	function download() {
		src = printPdf(data);
	}
</script>

<Container>
	<Title>Acciones</Title>

	<Row class="aend">
		<label class="col grow">
			<Label title={stateDescription}>Estado</Label>
			<select class="wfull" type="number" bind:value={state}>
				<option value="">Emitida</option>
				<option value="send">Enviada</option>
				<option value="paid">Pagada</option>
				<option value="done">Cerrada</option>
			</select>
		</label>

		<button type="button" on:click={download}>DESCARGAR</button>
		<button type="button">CREAR RECTIFICATIVA</button>
		<button type="button" class="error">ELIMINAR</button>
	</Row>
</Container>

<Container>
	<iframe class="wfull hscreen" {src} />
</Container>
