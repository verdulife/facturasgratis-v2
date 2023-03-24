<script>
	import { onMount } from 'svelte';
	import { tools } from '$lib/tools';

	import Image from '$lib/components/Image.svelte';
	import Logo from '$lib/icons/Logo.svelte';
	import Session from '$lib/components/Session.svelte';

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
	<main class="row jbetween acenter wfull" class:visible>
		<aside class="row acenter center">
			<a class="row" href="/">
				<Logo width="175px" />
			</a>

			<button class="unset row fcenter">Herramientas</button>
		</aside>

		<Session />
	</main>

	<ul class="row jcenter wrap wfull">
		{#each tools as { slug, title, icon }}
			<li>
				<a class="row acenter wfull" href={slug}>
					<Image src={icon} alt="title" width="30px" />
					<p><b>{title}</b></p>
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

		&:has(aside > button:focus-within) > ul {
			transform: translateY(0);
			opacity: 1;
			pointer-events: all;
		}

		& ul:has(a:focus-within) {
			transform: translateY(0);
			opacity: 1;
			pointer-events: all;
		}
	}

	main {
		gap: 2em;
		padding: 1em calc(50% - var(--media-xl) / 2);
		z-index: 2;
		pointer-events: all;
		transition: background 150ms;

		& aside {
			gap: 4em;
			margin-left: 2em;
		}
	}

	.visible {
		background-color: hsl(var(--base-hsl), 0.8);
		backdrop-filter: blur(6px);
		border-bottom: 1px solid hsl(var(--base-900-hsl), 0.1);

		@media (--dark) {
			background-color: hsl(var(--base-900-hsl), 0.8);
			border-bottom: 1px solid hsl(var(--base-hsl), 0.1);
		}
	}

	ul {
		max-width: var(--media-lg);
		background-color: hsl(var(--base-hsl), 0.8);
		backdrop-filter: blur(6px);
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
			border: 1px solid transparent;
			border-radius: 0.3em;
			padding: 1em;
			transition: 150ms;

			&:hover {
				border-color: var(--base-200);

				@media (--dark) {
					border-color: var(--base-800);
				}
			}

			& p {
				font-size: var(--font-xs);
			}
		}
	}
</style>
