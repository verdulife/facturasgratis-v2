<script>
	import { tips } from '$lib/tips';
	import TipCard from '$lib/components/TipCard.svelte';
</script>

<section class="col acenter wfull">
	<h2>Consejos para hacer tus facturas</h2>
	<p>
		Aquí encontraras algunos de los consejos que te ayudaran a hacer mejores facturas, evitar
		problemas comunes y organizar mejor tu contabilidad.
	</p>

	<ul>
		{#each tips as tip}
			<li>
				<TipCard {tip} />
			</li>
		{/each}
	</ul>
</section>

<style lang="postcss">
	section {
		max-width: 900px;
		margin: 0 auto;
		padding: 40px;
		padding-bottom: 100px;
	}

	h2 {
		font-size: 2vw;
		text-align: center;
		margin-bottom: 10px;

		@media (--mobile) {
			font-size: 4vh;
		}
	}

	p {
		text-align: center;
		margin-bottom: 40px;
	}

	ul {
		column-count: 3;
		column-gap: 20px;

		@media (--mobile) {
			column-count: 1;
		}
	}
</style>
