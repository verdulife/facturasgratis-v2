<script>
	import { onMount } from 'svelte';
	import { searchTerm } from '$lib/stores';

	onMount(() => {
		window.addEventListener('mousemove', (e) => {
			const { clientX } = e;
			const xPercentage = `${(clientX / window.innerWidth) * 100}%`;
			const header = document.querySelector('header');

			header.style.setProperty('--x-gradient', xPercentage);
		});
	});
</script>

<header class="col acenter wfull">
	<h1>Herramientas de gestión para <strong>autónomos</strong> y <strong>pymes</strong></h1>

	<input class="wfull" type="text" placeholder="¿Que quieres hacer?" bind:value={$searchTerm} />

	<span class="ydiv" />
</header>

<style lang="postcss">
	header {
		--x-gradient: 100%;

		gap: 2em;
		background: radial-gradient(ellipse at var(--x-gradient) 0, hsl(var(--base-900-hsl), 0.2), transparent 70%);
		text-align: center;
		padding: clamp(120px, 12%, 12%) 40px 0 40px;

		@media (--dark) {
			background: radial-gradient(
				ellipse at var(--x-gradient) 0,
				hsl(var(--base-hsl), 0.2),
				transparent 70%
			);
		}
	}

	h1 {
		max-width: 900px;
		font-size: var(--font-2xl);
		line-height: 1.2;
	}

	input {
		max-width: var(--media-md);
	}

	.ydiv {
		height: 8em;
		background: linear-gradient(to bottom, transparent, var(--base-300), transparent);

		@media (--dark) {
			background: linear-gradient(to bottom, transparent, var(--base-700), transparent);
		}
	}
</style>
