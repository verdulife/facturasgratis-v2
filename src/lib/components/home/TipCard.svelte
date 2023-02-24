<script>
	export let tip;
</script>

<article class="col">
	<h3>{tip.title}</h3>
	<p>{@html tip.description}</p>
</article>

<style lang="postcss">
	article {
		background-color: var(--c-netrual);
		-webkit-column-break-inside: avoid;
		page-break-inside: avoid;
		break-inside: avoid;
		border: 1px solid var(--c-neutral-200);
		border-radius: 0.25em;
		margin-bottom: 20px;
		padding: 30px 20px;

		& h3 {
			line-height: 1;
			margin-bottom: 10px;
		}

		& p {
			font-size: var(--font-xs);
			text-align: left;
			margin: 0;
		}
	}
</style>
