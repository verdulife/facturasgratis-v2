<script>
	import { searchTerm } from '$lib/stores';
</script>

<header class="col acenter wfull">
	<h1>Herramientas gratuitas para autónomos y pymes</h1>
	<!-- <p>
		La manera más sencilla y rápida de crear, modificar y gestionar tus facturas, presupuestos,
		albaranes, clientes, proveedores, productos y servicios. Si eres <strong>autónomo</strong> o
		tienes una <strong>pequeña empresa</strong> esta es tu herramienta. Empieza ahora, sin registrarte
		y gratis.
	</p> -->

	<input class="wfull" type="text" placeholder="🔍 ¿Que quieres hacer?" bind:value={$searchTerm} />
</header>

<style lang="postcss">
	header {
		background: radial-gradient(ellipse at top, var(--c-accent-300), var(--c-neutral) 75%);
		text-align: center;
		padding: clamp(120px, 10%, 10%) 40px 60px 40px;
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
		max-width: 550px;
	}
</style>
