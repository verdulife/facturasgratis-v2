<script>
	import { tools } from '$lib/tools';

	import Image from '$lib/components/Image.svelte';
</script>

<nav class="col acenter wfull">
	<main class="row acenter wfull">
		<a class="row" href="/">
			<Image width="200px" src="/logo.svg" alt="Facturasgratis" />
		</a>

		<button>
			<p>Herramientas</p>
		</button>

		<a class="btn" href="/ajustes">Tus datos</a>
	</main>

	<ul class="row wrap wfull">
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

		&:has(button:focus-within) ul {
			transform: translateY(0);
			opacity: 1;
			pointer-events: all;
		}
	}

	main {
		gap: 2em;
		background-color: hsl(var(--base-900-hsl), 0.8);
		backdrop-filter: blur(1em);
		border-bottom: 1px solid hsl(var(--base-hsl), 0.1);
		padding: 1em 2em;
		z-index: 2;
		pointer-events: all;

		& span {
			cursor: pointer;
		}
	}

	ul {
		max-width: var(--media-xl);
		background-color: hsl(var(--base-900-hsl), 0.8);
		backdrop-filter: blur(1em);
		border: 1px solid hsl(var(--base-hsl), 0.1);
		border-top: none;
		border-radius: 0 0 0.5em 0.5em;
		padding: 1em;
		transform: translateY(-50px);
		opacity: 0;
		pointer-events: none;
		transition: 150ms;
		z-index: 1;

		& li {
			width: 220px;
		}

		& a {
			height: 80px;
			gap: 1em;
			text-decoration: none;
			border-radius: 0.5em;
			padding: 1em;
			transition: 150ms;

			&:hover {
				background-color: hsl(var(--base-hsl), 0.05);
			}

			& p {
				font-size: var(--font-xs);
			}
		}
	}

	a.btn {
		margin-left: auto;
	}
</style>
