<script>
	import Container from '$lib/components/Forms/Container.svelte';
	import Title from '$lib/components/Forms/Title.svelte';
	import Note from '$lib/components/Forms/Note.svelte';
	import Row from '$lib/components/Forms/Row.svelte';

	export let bill_note, budget_note, delivery_note, proforma_note;
</script>

<Container>
	<Title>Datos legales</Title>

	<Row>
		<Note class="wfull" id="bill_note" note={bill_note}>Facturas</Note>
		<Note class="wfull" id="budget_note" note={budget_note}>Presupuestos</Note>
	</Row>

	<Row>
		<Note class="wfull" id="delivery_note" note={delivery_note}>Albaranes</Note>
		<Note class="wfull" id="proforma_note" note={proforma_note}>Proformas</Note>
	</Row>
</Container>
