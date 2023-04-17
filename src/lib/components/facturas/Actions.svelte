<script>
	import { downloadPdf } from '$lib/print';
	import { Bills } from '$lib/stores';
	import { removeDoc } from '$lib/database/config';
	import { goto } from '$app/navigation';

	import Container from '$lib/components/Forms/Container.svelte';
	import Title from '$lib/components/Forms/Title.svelte';
	import Label from '$lib/components/Forms/Label.svelte';
	import Row from '$lib/components/Forms/Row.svelte';

	export let state, bill;

	$: src = '';
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

	async function deleteBill() {
		let check;
		if (bill.state) {
			check = confirm(
				'⚠️ Esta factura ya ha sido enviada\n\n¿Prefieres hacer una rectificativa en lugar de borrarla?'
			);
		} else {
			check = confirm(
				'⚠️ Borrar esta factura puede afectar a la correlación en la numeración.\n\n¿Prefieres hacer una rectificativa en lugar de borrarla?'
			);
		}

		if (!check) {
			const billIndex = $Bills.findIndex((b) => b.number === bill.number);
			$Bills.splice(billIndex, 1);
			await removeDoc({ collection: 'bills', data: bill });

			goto('/facturas');
		}
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
				<option value="closed">Cerrada</option>
			</select>
		</label>

		<button type="button" on:click={() => downloadPdf(bill, 'Factura')}>DESCARGAR</button>
		<button type="button">CREAR RECTIFICATIVA</button>
		<button type="button" class="error" on:click={deleteBill}>ELIMINAR</button>
	</Row>
</Container>

{#if src}
	<Container>
		<iframe width="100%" height="800px" {src} title="preview" />
	</Container>
{/if}
