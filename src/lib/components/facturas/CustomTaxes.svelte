<script>
	import Container from '$lib/components/Forms/Container.svelte';
	import Title from '$lib/components/Forms/Title.svelte';
	import Label from '$lib/components/Forms/Label.svelte';
	import Row from '$lib/components/Forms/Row.svelte';

  export let taxes;
</script>

<Container>
	<Title>IMPUESTOS</Title>

	<Row>
		<label class="col grow">
			<Label>IVA %</Label>
			<input class="wfull" type="number" bind:value={taxes.iva} required />
		</label>
		<label class="col grow">
			<Label>IRPF %</Label>
			<input class="wfull" type="number" bind:value={taxes.ret} required />
		</label>
	</Row>
</Container>
