<script>
	import Image from '$lib/components/Image.svelte';

	export let tool;

	function handleInner(e) {
		const { clientX, currentTarget } = e;
		const percentageX =
			((clientX - currentTarget.offsetLeft) / currentTarget.clientWidth) * 100 + '%';
		currentTarget.style.setProperty('--inner-x', percentageX);
	}
</script>

<article class="col full" on:mousemove={handleInner}>
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
		--inner-x: 0;

		position: relative;
		width: 250px;
		height: 300px;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		border: 1px solid var(--base-200);
		border-radius: 0.3em;
		overflow: hidden;

		&:before {
			content: '';
			position: absolute;
			top: 50%;
			left: var(--inner-x);
			transform: translate(-50%, -50%);
			width: 60%;
			height: 150%;
			background-color: var(--base-200);
			border-radius: 50%;
		}

		@media (--dark) {
			border: 1px solid var(--base-800);
		}

		@media (--sm) {
			width: calc(50% - 2px);
			min-width: 0;
			margin: 1px;
		}
	}

	a {
		background-color: var(--base);
		backdrop-filter: blur(50px);
		text-decoration: none !important;
		border-radius: 0.3em;
		padding: 1.25em;
		transition: 150ms;
		z-index: 1;

		@media (--dark) {
			background-color: var(--base-800);
		}

		&:hover {
			background-color: hsl(var(--base-hsl), 0.6);

			@media (--dark) {
				background-color: hsl(var(--base-800-hsl), 0.95);
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
