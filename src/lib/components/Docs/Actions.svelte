<script>
	import { downloadPdf, printPdf } from '$lib/print';
	import { User, Bills, Rectify_bills, Firebase } from '$lib/stores';
	import { removeDoc, addDoc, updateDoc } from '$lib/database/config';
	import { numerationFormat, printReason, unbindStore } from '$lib/utils';
	import { goto } from '$app/navigation';

	import Container from '$components/Forms/Container.svelte';
	import Title from '$components/Forms/Title.svelte';
	import Label from '$components/Forms/Label.svelte';
	import Row from '$components/Forms/Row.svelte';

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

[Rectificada]
Factura rectificada
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

	function nextNumeration() {
		if ($Rectify_bills.length === 0) return 1;

		const currentYear = $Rectify_bills.filter((b) => b.date.year === currentDate.getFullYear());
		const currentNumeration = Math.max(...currentYear.map((b) => b.number));

		return currentNumeration + 1;
	}

	async function addNewRectify(data) {
		let id;
		if ($Firebase.user) id = await addDoc({ collection: 'rectify_bills', data });

		if (id) data.id = id;
		$Rectify_bills = [data, ...$Rectify_bills];
	}

	async function updateBill() {
		const billIndex = $Bills.findIndex(
			(b) => numerationFormat(b.number, b.date.year, true) === bill.numeration
		);

		$Bills[billIndex] = bill;
		if ($Firebase.user) await updateDoc({ collection: 'bills', data: bill });
	}

	async function createRectify() {
		if (!rectify_reason) {
			alert('No has seleccionado un motivo');
			return;
		}

		let { id, state, ...rectify } = unbindStore(bill);
		const number = nextNumeration();
		const numeration = numerationFormat(number, currentDate.getFullYear(), true);
		const from = { id, numeration: bill.numeration };

		rectify._updated = new Date();
		rectify.type = 'rectificativa';
		rectify.number = number;
		rectify.numeration = numeration;
		rectify.date = {
			day: currentDate.getDate(),
			month: currentDate.getMonth() + 1,
			year: currentDate.getFullYear()
		};
		rectify.from = from;
		rectify.reason = rectify_reason;
		rectify.note = printReason(from, rectify_reason);

		bill._updated = new Date();
		bill.state = 'rectify';

		if (rectify_reason === 'cancel') {
			rectify.items.forEach((b) => {
				b.amount = -Math.abs(b.amount);
			});
		}

		await addNewRectify(rectify);
		await updateBill();
		goto(`/rectificativas/${rectify.numeration}`);
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
				<option value="rectify" disabled>Rectificada</option>
			</select>
		</label>

		<button type="button" on:click={() => (src = printPdf({ ...bill, user: $User }))}
			>DESCARGAR</button
		>
		<!-- <button type="button" on:click={() => downloadPdf(bill, 'Factura')}>DESCARGAR</button> -->

		{#if bill.type !== 'rectificativa'}
			{#if bill.state !== 'rectify'}
				<button type="button" on:click={() => (rectifing = true)}>CREAR RECTIFICATIVA</button>
			{/if}

			<button type="button" class="error" on:click={deleteBill}>ELIMINAR</button>
		{/if}
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
