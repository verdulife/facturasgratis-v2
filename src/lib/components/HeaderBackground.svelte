<script>
	import { onMount } from 'svelte';

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
	<slot />
	<span class="ydiv" />
</header>

<style lang="postcss">
	header {
		--x-gradient: 100%;

		gap: 2em;
		background: radial-gradient(
			ellipse at var(--x-gradient) 0,
			hsl(var(--base-900-hsl), 0.2),
			transparent 70%
		);
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

	.ydiv {
		height: 8em;
		background: linear-gradient(to bottom, transparent, var(--base-300), transparent);

		@media (--dark) {
			background: linear-gradient(to bottom, transparent, var(--base-700), transparent);
		}
	}
</style>
