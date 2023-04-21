<script>
	import Container from '$components/Forms/Container.svelte';
	import Title from '$components/Forms/Title.svelte';
	import Note from '$components/Forms/Note.svelte';

	export let note;
</script>

<Container>
	<Title>Notas</Title>
	<Note class="wfull" id="bill_note" bind:note>Nota</Note>
</Container>
