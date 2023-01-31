<script>
	import { searchTerm } from '$lib/stores';
</script>

<header class="col acenter xfill">
	<h1>Herramientas gratuitas para autónomos y pymes</h1>
	<!-- <p>
		La manera más sencilla y rápida de crear, modificar y gestionar tus facturas, presupuestos,
		albaranes, clientes, proveedores, productos y servicios. Si eres <strong>autónomo</strong> o
		tienes una <strong>pequeña empresa</strong> esta es tu herramienta. Empieza ahora, sin registrarte
		y gratis.
	</p> -->

	<div class="input-wrapper row acenter nowrap">
		<input class="grow" type="text" placeholder="🔍 ¿Que quieres hacer?" bind:value={$searchTerm} />
		<button class="accent round"><b>BUSCAR</b></button>
	</div>
</header>

<style lang="postcss">
	header {
		background: radial-gradient(ellipse at top, var(--c-accent-300), var(--c-neutral) 75%);
		text-align: center;
		padding: 60px 40px;

		@media (--mobile) {
			padding: 40px 20px;
		}
	}

	h1 {
		max-width: 900px;
		font-size: clamp(40px 8vw, 60px);
		line-height: 1.2;
		margin-bottom: 40px;

		@media (--mobile) {
			font-size: 5vh;
			margin-bottom: 20px;
		}
	}

	/* p {
		max-width: 900px;
		font-size: 18px;
		color: var(--c-neutral);
		margin-bottom: 20px;

		@media (--mobile) {
			font-size: 14px;
		}
	} */

	.input-wrapper {
		width: 550px;
		gap: 0.5em;
		background-color: var(--c-neutral);
		border: 1px solid var(--c-neutral-100);
		border-radius: 0.5em;
		padding: 0.25em;

		& input {
			padding: 0;
			padding-left: 0.5em;
		}

		& button {
			padding: 0.5em 1em;
		}
	}
</style>
