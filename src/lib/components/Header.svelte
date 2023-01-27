<script>
	import { User } from '$lib/stores';

	const userData = Object.keys($User).length > 0;
</script>

<header class="col acenter xfill">
	<h1>Herramientas gratuitas para autónomos y pymes</h1>
	<p>
		La manera más sencilla y rápida de crear, modificar y gestionar tus facturas, presupuestos,
		albaranes, clientes, proveedores, productos y servicios. Si eres <strong>autónomo</strong> o
		tienes una <strong>pequeña empresa</strong> esta es tu herramienta. Empieza ahora, sin registrarte
		y gratis.
	</p>

	{#if !userData}
		<h2>Primeros pasos</h2>
		<p>
			Para empezar a trabajar con <strong>facturasgratis</strong>, el primer paso es rellenar tus
			datos.
		</p>
	{/if}

	<a href="/ajustes" class="btn succ semi">TUS DATOS</a>
</header>

<style lang="postcss">
	header {
		background: linear-gradient(45deg, var(--c-neutral-900) 50%, var(--c-neutral-700));
		text-align: center;
		color: var(--c-neutral);
		padding: 60px 40px;

		@media (--mobile) {
			padding: 40px 20px;
		}
	}

	h1 {
		max-width: 900px;
		font-size: 3vw;
		line-height: 1.2;
		margin-bottom: 40px;

		@media (--mobile) {
			font-size: 5vh;
			margin-bottom: 20px;
		}
	}

	h2 {
		font-size: 2em;
	}

	p {
		max-width: 900px;
		font-size: 18px;
		color: var(--c-neutral);
		margin-bottom: 20px;

		@media (--mobile) {
			font-size: 14px;
		}
	}

	a.btn {
		min-width: 200px;
	}
</style>
