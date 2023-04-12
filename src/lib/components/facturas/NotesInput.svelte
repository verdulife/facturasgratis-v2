<script>
	import Container from '$lib/components/Forms/Container.svelte';
	import Title from '$lib/components/Forms/Title.svelte';
	import Note from '$lib/components/Forms/Note.svelte';

	export let note;
</script>

<Container>
	<Title>Notas</Title>
	<Note class="wfull" id="bill_note" bind:note>Nota</Note>
</Container>
