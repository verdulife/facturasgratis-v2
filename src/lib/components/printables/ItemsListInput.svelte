<script>
	import Container from '$lib/components/Forms/Container.svelte';
	import Title from '$lib/components/Forms/Title.svelte';
	import Row from '$lib/components/Forms/Row.svelte';
	import ItemInput from '$lib/components/printables/ItemInput.svelte';
	import Totals from '$lib/components/printables/Totals.svelte';

	export let items, currency, taxes, totals;

	function scrollToItem() {
		const scroll = document.querySelector('.scrollbar');
		const button = document.querySelector('button[type="button"]');

		scroll.scrollTo({
			top: scroll.scrollTop + button.offsetTop
		});
	}

	function addItem() {
		const emptyItem = {
			label: '',
			amount: 1,
			price: 0,
			pvp: 0,
			dto: 0,
			total: 0
		};

		items = [...items, emptyItem];
		setTimeout(scrollToItem);
	}

	function deleteItem(i) {
		items.splice(i, 1);
		items = items;
	}
</script>

<Container>
	<Title>Conceptos</Title>

	{#if items.length > 0}
		<ul class="col wfull">
			{#each items as item, i}
				<li>
					<ItemInput bind:item {currency} deleteItem={() => deleteItem(i)} iva={taxes.iva} />
				</li>
			{/each}
		</ul>
	{/if}

	<Row class="jbetween acenter">
		<button type="button" on:click={addItem}>Añadir concepto</button>
		<Totals bind:totals {items} {taxes} />
	</Row>
</Container>

<style lang="postcss">
	ul {
		gap: 1em;
	}
</style>
