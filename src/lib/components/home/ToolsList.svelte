<script>
	import { tools } from '$lib/tools';
	import ToolCard from '$components/home/ToolCard.svelte';

	export let searchTerm;

	$: filteredTools = tools.filter((t) => {
		const tool = t.title.toLowerCase();
		const term = searchTerm.toLowerCase();

		return tool.includes(term);
	});
</script>

<section class="col acenter wfull">
	<ul class="row jcenter astretch wrap wfull">
		{#each filteredTools as tool}
			<li class="row hfull">
				<ToolCard {tool} />
			</li>
		{:else}
			<p>No hay conincidencias</p>
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
