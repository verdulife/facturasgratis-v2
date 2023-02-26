<script>
	import Image from '$lib/components/Image.svelte';
	import { User } from '$lib/stores';
</script>

<nav class="row acenter">
	<aside class="row">
		<button class="unset row acenter" title="Cargar sessíon">
			<b>↑</b>
			<small>Cargar</small>
		</button>

		{#if $User}
			<button class="unset row acenter" title="Descargar sessión">
				<b>↓</b>
				<small>Descargar</small>
			</button>
		{/if}
	</aside>

	<a role="button" class="row acenter" href="/ajustes" title="Sesión actual: {$User.legal_name}">
		<picture avatar>
			<Image src={$User.logo} alt={$User.legal_name} />
		</picture>

		{$User.legal_name}
	</a>
</nav>

<style lang="postcss">
	nav {
		gap: 0.5em;
		background-color: hsl(var(--base-900-hsl), 0.05);
		backdrop-filter: blur(5px);
		color: var(--color);
		border: 1px solid hsl(var(--base-900-hsl), 0.05);
		border-radius: 0.3em;
		margin-right: 2em;
		padding: 0.25em;

		@media (--dark) {
			background-color: hsl(var(--base-hsl), 0.05);
			color: var(--base-100);
			border: 1px solid hsl(var(--base-hsl), 0.05);
		}
	}

	aside {
		gap: 0.5em;
		padding: 0 1em;

		& button {
			gap: 0.25em;
			border: 1px solid hsl(var(--base-hsl), 0.05);
			padding: 0.25em 0.5em;

			& b {
				font-size: var(--font-sm);
			}
		}
	}

	a {
		background-color: hsl(var(--base-900-hsl), 0.5);
		gap: 0.5em;
		padding: 0.5em 1em;

		& picture {
			width: 32px;
			border: none;
			border-radius: 0.3em;
		}
	}
</style>
