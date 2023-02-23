<script>
	import { onMount } from 'svelte';
	import { tools } from '$lib/tools';

	import Image from '$lib/components/Image.svelte';
	import Logo from '$lib/icons/Logo.svelte';

	let visible = false;

	onMount(() => {
		const scrollbar = document.querySelector('.scrollbar');
		scrollbar.addEventListener('scroll', (e) => {
			const { scrollTop } = e.target;
			visible = scrollTop > 100 ? true : false;
		});
	});
</script>

<nav class="col acenter wfull">
	<main class="row acenter wfull" class:visible>
		<a class="row" href="/">
			<Logo width="150px" />
		</a>

		<button class="row fcenter unstyled">Herramientas<span>↘</span></button>

		<a class="btn" href="/ajustes">Tus datos</a>
	</main>

	<ul class="row jcenter wrap wfull">
		{#each tools as { slug, title, icon }}
			<li>
				<a class="row wfull" href={slug}>
					<Image src={icon} alt="title" width="30px" />
					<p>{title}</p>
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style lang="postcss">
	nav {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2;
		pointer-events: none;

		& button > span {
			transition: 150ms;
		}

		&:has(button:focus-within) {
			& button > span {
				transform: rotate(-90deg);
			}

			& ul {
				transform: translateY(0);
				opacity: 1;
				pointer-events: all;
			}
		}
	}

	main {
		gap: 2em;
		padding: 1em calc(50% - var(--media-xl) / 2);
		z-index: 2;
		pointer-events: all;
		transition: background 150ms;

		& a:first-of-type {
			margin-left: 2em;
		}

		& a:last-of-type {
			margin-left: auto;
			margin-right: 2em;
			padding: 1em 4em;
		}
	}

	.visible {
		background-color: hsl(var(--base-hsl), 0.8);
		backdrop-filter: blur(1em);
		border-bottom: 1px solid hsl(var(--base-900-hsl), 0.1);

		@media (--dark) {
			background-color: hsl(var(--base-900-hsl), 0.8);
			border-bottom: 1px solid hsl(var(--base-hsl), 0.1);
		}
	}

	ul {
		max-width: var(--media-lg);
		background-color: hsl(var(--base-hsl), 0.8);
		backdrop-filter: blur(1em);
		border: 1px solid hsl(var(--base-900-hsl), 0.1);
		border-radius: 0.3em;
		padding: 1em;
		margin-top: 0.25em;
		transform: translateY(-50px);
		opacity: 0;
		pointer-events: none;
		transition: 150ms;
		z-index: 1;

		@media (--dark) {
			background-color: hsl(var(--base-900-hsl), 0.8);
			border: 1px solid hsl(var(--base-hsl), 0.1);
		}

		& li {
			width: 220px;
		}

		& a {
			height: 80px;
			gap: 1em;
			text-decoration: none;
			border-radius: 0.3em;
			padding: 1em;
			transition: 150ms;

			&:hover {
				background-color: hsl(var(--base-900-hsl), 0.05);

				@media (--dark) {
					background-color: hsl(var(--base-hsl), 0.05);
				}
			}

			& p {
				font-size: var(--font-xs);
			}
		}
	}
</style>
