<script>
	import Label from '$lib/components/Forms/Label.svelte';

	export let note;

	function maxLength(e) {
		const el = e.target;
		if (el.value.length > el.maxLength) el.value = el.value.slice(0, el.maxLength);
	}
</script>

<label class="col wfull" for="bill_note">
	<div class="row jbetween acenter wfull">
		<Label><slot /></Label>
		<small>{note ? note.length : 0} / 350</small>
	</div>

	<textarea
		class={$$props.class}
		id={$$props.id}
		bind:value={note}
		on:keydown={(e) => maxLength(e)}
		maxlength="350"
		placeholder="Ej. Transporte no incluido"
	/>
</label>

<style lang="postcss">
	small {
		margin-right: 1em;
	}
</style>
