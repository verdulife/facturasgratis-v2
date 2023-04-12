<script>
	import { User } from '$lib/stores';
	import Image from '$lib/components/Image.svelte';

	$: ({ legal_name, logo } = $User);
</script>

<nav class="row acenter">
	<a class="row acenter" href="/ajustes" title="Sesión actual: {legal_name || 'Sin datos'}">
		{#if legal_name}
			{#if logo}
				<picture class="row">
					<Image width="100%" height="100%" src={logo} alt={legal_name} />
				</picture>
			{/if}

			<span>{legal_name}</span>
		{:else}
			<span>Tus datos</span>
		{/if}
	</a>
</nav>

<style lang="postcss">
	nav {
		gap: 0.5em;
		background-color: hsl(var(--base-900-hsl), 0.05);
		backdrop-filter: var(--blur);
		color: var(--color);
		border: 1px solid hsl(var(--base-900-hsl), 0.05);
		border-radius: 0.3em;
		margin-right: 2em;

		@media (--dark) {
			background-color: hsl(var(--base-hsl), 0.05);
			color: var(--base-100);
			border: 1px solid hsl(var(--base-hsl), 0.05);
		}
	}

	a {
		gap: 0.5em;
		padding: 0.5em;

		& picture {
			width: 36px;
			min-width: 36px;
			max-width: 36px;
			height: 36px;
			border-radius: 0.3em;
		}

		& span {
			font-size: var(--font-xs);
			padding: 0.5em;
		}
	}
</style>
