<script>
	import Image from '$lib/components/Image.svelte';

	export let tool;
</script>

<article class="col full" style="background-image: url('{tool.icon}')">
	<a class="col jend full" href={tool.slug}>
		<Image width="60" src={tool.icon} alt={tool.title} title />

		<h2 class="wfull">{tool.title}</h2>
		<p>{tool.desc}</p>

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
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		border: 1px solid var(--base-800);
		border-radius: 0.5em;
		overflow: hidden;

		@media (--mobile) {
			width: calc(50% - 2px);
			min-width: 0;
			margin: 1px;
		}
	}

	a {
		background-color: hsl(var(--base-900-hsl), 0.9);
		backdrop-filter: blur(50px);
		color: var(--text-accent);
		text-decoration: none !important;
		border-radius: 0.5em;
		padding: 1.25em;
		overflow: hidden;
		transition: 150ms;

		&:hover {
			background-color: hsl(var(--base-900-hsl), 0.8);
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
		font-size: 10px;
		text-transform: uppercase;
		border-radius: 0.25em;
		padding: 0.25em 0.75em;
		z-index: 1;
	}
</style>
