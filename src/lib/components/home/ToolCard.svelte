<script>
	import Image from '$components/global/Image.svelte';

	export let tool;
</script>

<article class="col full">
	<a class="col jend full" href={tool.slug}>
		<Image width="40" src={tool.icon} alt={tool.title} title />

		<h2 class="wfull"><b>{tool.title}</b></h2>
		<p>{tool.description}</p>

		{#if tool.soon}
			<span>PRONTO</span>
		{/if}
	</a>
</article>

<style lang="postcss">
	article {
		position: relative;
		width: 250px;
		height: 300px;
		border: 1px solid var(--base-200);
		border-radius: 0.3em;
		padding: 1.25em;
		overflow: hidden;
		transition: 150ms;

		@media (--dark) {
			border-color: var(--base-800);
		}

		&:hover {
			background-color: var(--base-200);

			@media (--dark) {
				background-color: var(--base-800);
				border-color: var(--base-800);
			}
		}
	}

	h2 {
		font-size: var(--font-lg);
		line-height: 1;
		margin: 1em 0 0.25em 0;
	}

	p {
		font-size: var(--font-xs);
	}

	span {
		position: absolute;
		top: 10px;
		right: 10px;
		background: var(--error);
		color: var(--base);
		font-size: 10px;
		text-transform: uppercase;
		border-radius: 0.25em;
		padding: 0.25em 0.75em;
		z-index: 1;
	}
</style>
