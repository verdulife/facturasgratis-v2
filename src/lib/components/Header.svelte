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
</header>

<style lang="postcss">
	header {
		--x-gradient: 100%;

		background: radial-gradient(
			ellipse at var(--x-gradient) 0,
			hsl(var(--accent-hsl), 0.8),
			transparent 70%
		);
		text-align: center;
		padding: clamp(120px, 10%, 10%) 40px 60px 40px;

		@media (--dark) {
			background: radial-gradient(
				ellipse at var(--x-gradient) 0,
				hsl(var(--accent-hsl), 0.2),
				transparent 70%
			);
		}
	}

	h1 {
		max-width: 900px;
		font-size: clamp(40px 8vw, 60px);
		line-height: 1.2;
		margin-bottom: 40px;

		@media (--sm) {
			font-size: 5vh;
			margin-bottom: 20px;
		}
	}

	/* p {
		max-width: 900px;
		font-size: 18px;
		color: var(--c-neutral);
		margin-bottom: 20px;

		@media (--sm) {
			font-size: 14px;
		}
	} */

	input {
		max-width: var(--media-md);
	}
</style>
