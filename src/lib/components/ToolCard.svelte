<script>
	export let tool;
</script>

<article class="col acenter full" style="background-image: url('{tool.icon}')">
	<a class="full" href={tool.slug}>
		<picture>
			<img width="50" height="50" src={tool.icon} alt={tool.title} title={tool.title} />
		</picture>

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
		border-radius: 0.5em;
		padding: 0;
		overflow: hidden;

		@media (--mobile) {
			width: calc(50% - 2px);
			min-width: 0;
			margin: 1px;
		}
	}

	a {
		background-color: hsl(var(--a-neutral), 0.6);
		backdrop-filter: blur(50px) saturate(0.5);
		color: var(--text-accent);
		text-decoration: none;
		border: 1px solid var(--c-neutral-200);
		border-radius: 0.5em;
		padding: 20px;
		transition: 150ms;
		overflow: hidden;

		&:hover {
			background-color: var(--c-accent);
		}
	}

	picture {
		margin-bottom: 10px;
	}

	h2 {
		margin-bottom: 10px;
		line-height: 1;

		@media (--mobile) {
			font-size: 18px;
		}
	}

	p {
		font-size: 16px;

		@media (--mobile) {
			font-size: 12px;
		}
	}

	span {
		position: absolute;
		top: 10px;
		right: 10px;
		background: var(--c-error);
		font-size: 10px;
		text-transform: uppercase;
		color: var(--c-neutral);
		border-radius: 5px;
		padding: 2px 5px;
		z-index: 9;
	}
</style>
