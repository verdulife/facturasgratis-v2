<script>
	import { downloadPdf } from '$lib/print';
	import { Bills } from '$lib/stores';
	import { removeDoc } from '$lib/database/config';
	import { numerationFormat, printReason } from '$lib/utils';
	import { goto } from '$app/navigation';

	import Container from '$lib/components/Forms/Container.svelte';
	import Title from '$lib/components/Forms/Title.svelte';
	import Label from '$lib/components/Forms/Label.svelte';
	import Row from '$lib/components/Forms/Row.svelte';

	export let state, bill;

	$: src = '';
	const currentDate = new Date();
	let rectifing = false;
	let rectify_reason = '';
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

		if (check) {
			rectifing = true;
			return;
		}

		const billIndex = $Bills.findIndex(
			(b) => numerationFormat(b.number, b.date.year, true) === bill.numeration
		);

		$Bills.splice(billIndex, 1);
		await removeDoc({ collection: 'bills', data: bill });

		goto('/facturas');
	}

	async function createRectify() {
		if (!rectify_reason) alert('No has seleccionado un motivo');
		else {
			let { id, state, ...rectify } = bill;
			const number = 1;
			const numeration = numerationFormat(number, currentDate.getFullYear(), true);

			rectify = {
				_updated: new Date(),
				type: 'rectificativa',
				number,
				numeration,
				date: {
					day: currentDate.getDate(),
					month: currentDate.getMonth() + 1,
					year: currentDate.getFullYear()
				},
				from: { id, numeration: bill.numeration },
				reason: rectify_reason,
				note: printReason(rectify_reason)
			};

			console.log(rectify);
		}

		//TODO: Create method
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
		<button type="button" on:click={() => (rectifing = true)}>CREAR RECTIFICATIVA</button>
		<button type="button" class="error" on:click={deleteBill}>ELIMINAR</button>
	</Row>

	{#if rectifing}
		<Container>
			<Title>Factura rectificativa</Title>

			<Row class="aend">
				<label class="col grow">
					<Label>MOTIVO</Label>
					<select class="wfull" type="number" bind:value={rectify_reason}>
						<option value="" disabled>Selecciona un motivo de rectificación</option>
						<option value="amount">Error en el importe</option>
						<option value="data">Error en los datos del cliente</option>
						<option value="refund">Devolución de mercancía</option>
						<option value="dto">Descuento posterior</option>
						<option value="cancel">Anulación de factura original</option>
					</select>
				</label>

				<button type="button" on:click={createRectify}>CREAR</button>
				<button type="button" class="error" on:click={() => (rectifing = false)}>CANCELAR</button>
			</Row>
		</Container>
	{/if}
</Container>

{#if src}
	<Container>
		<iframe width="100%" height="800px" {src} title="preview" />
	</Container>
{/if}
