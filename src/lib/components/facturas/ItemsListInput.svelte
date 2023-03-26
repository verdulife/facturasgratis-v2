<script>
	import ItemInput from './ItemInput.svelte';

	export let items, currency, taxes;

	const { iva } = taxes;

	function scrollToItem() {
		const scroll = document.querySelector('.scrollbar');
		const button = document.querySelector('button[type="button"]');

		scroll.scrollTo({
			top: scroll.scrollTop + button.offsetTop
		});
	}

	function addItem() {
		items = [...items, { amount: 1, dto: 0 }];
		setTimeout(scrollToItem);
	}

	function deleteItem(i) {
		items.splice(i, 1);
		items = items;
	}
</script>

<article class="col wfull">
	<h2><b>Conceptos</b></h2>
	<p>Todos los productos o servicios a facturar</p>

	{#if items.length > 0}
		<ul class="col wfull">
			{#each items as item, i}
				<li>
					<ItemInput bind:item {currency} deleteItem={() => deleteItem(i)} {iva} />
				</li>
			{/each}
		</ul>
	{/if}

	<div class="row">
		<button type="button" on:click={addItem}>Añadir concepto</button>
	</div>
</article>

<style lang="postcss">
	article {
		background-color: hsl(var(--base-hsl), 0.8);
		border: 1px solid var(--base-200);
		border-radius: 0.3em;
		padding: 1.25em;
		overflow: hidden;

		@media (--dark) {
			background-color: hsl(var(--base-900-hsl), 0.8);
			border-color: var(--base-800);
		}
	}

	p {
		font-size: var(--font-xs);
	}

	ul {
		gap: 0.5em;
		margin-top: 2em;
	}

	button {
		margin-top: 2em;
	}
</style>
