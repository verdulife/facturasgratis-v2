<script>
	import { tools } from '$lib/tools';
	import { searchTerm } from '$lib/stores';

	import ToolCard from '$lib/components/ToolCard.svelte';

	$: filteredTools = tools.filter((t) => {
		const tool = t.title.toLowerCase();
		const term = $searchTerm.toLowerCase();

		return tool.includes(term);
	});
</script>

<section class="col acenter xfill">
	<ul class="row jcenter xfill">
		{#each filteredTools as tool}
			<li class="row">
				<ToolCard {tool} />
			</li>
		{/each}
	</ul>
</section>

<style lang="postcss">
	ul {
		max-width: 1200px;
		gap: 0.75em;
		align-items: stretch;
		padding: 2em 0;
	}
</style>
