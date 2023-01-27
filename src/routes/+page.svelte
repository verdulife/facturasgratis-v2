<script>
	import { home } from '$lib/meta';
	import { User } from '$lib/stores';
	import { tools } from '$lib/tools';
	import { tips } from '$lib/tips';

	const userData = Object.keys($User).length > 0;
</script>

<svelte:head>
	<title>{home.title}</title>
	<meta name="description" content={home.description} />
	<meta name="keywords" content={home.keywords} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={home.url} />
	<meta property="og:title" content={home.title} />
	<meta property="og:description" content={home.description} />
	<meta property="og:image" content={home.image} />
	<meta property="og:image:secure_url" content={home.image} />
	<meta property="og:image:type" content="image/jpeg" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={home.url} />
	<meta name="twitter:title" content={home.title} />
	<meta name="twitter:description" content={home.description} />
	<meta name="twitter:image" content={home.image} />
</svelte:head>

<main class="scroll">
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

	<section class="col xfill">
		<ul class="tools row jcenter xfill">
			{#each tools as tool}
				<li>
					<article class="col acenter fill">
						<a class="fill" href={tool.slug}>
							<picture>
								<img width="50" height="50" src={tool.icon} alt={tool.title} title={tool.title} />
							</picture>

							<h2 class="xfill">{tool.title}</h2>
							<p>{tool.desc}</p>

							{#if tool.soon}
								<div class="label-tag">PRONTO</div>
							{/if}
						</a>
					</article>
				</li>
			{/each}
		</ul>
	</section>

	<section class="tips col acenter xfikk">
		<h2>Consejos para hacer tus facturas</h2>
		<p>
			Aquí encontraras algunos de los consejos que te ayudaran a hacer mejores facturas, evitar
			problemas comunes y organizar mejor tu contabilidad.
		</p>

		<ul class="grid">
			{#each tips as tip}
				<li>
					<article class="col">
						<h3>{tip.title}</h3>
						<p>{@html tip.description}</p>
					</article>
				</li>
			{/each}
		</ul>
	</section>
</main>

<style lang="postcss">
	header {
		background: linear-gradient(45deg, var(--c-neutral-900) 50%, var(--c-neutral-700));
		text-align: center;
		color: var(--c-neutral);
		padding: 60px 40px;

		@media (--mobile) {
			padding: 40px 20px;
		}

		& h1 {
			max-width: 900px;
			font-size: 3vw;
			line-height: 1.2;
			margin-bottom: 40px;

			@media (--mobile) {
				font-size: 5vh;
				margin-bottom: 20px;
			}
		}

		& h2 {
			font-size: 2em;
		}

		& p {
			max-width: 900px;
			font-size: 18px;
			color: var(--c-neutral);
			margin-bottom: 20px;

			@media (--mobile) {
				font-size: 14px;
			}
		}

		& a.btn {
			min-width: 200px;
		}
	}

	.tools {
		max-width: 1400px;
		margin: 0 auto;
		align-items: stretch;
		padding: 40px;
		padding-bottom: 100px;

		@media (--mobile) {
			padding: 40px 5px;
		}

		& li {
			cursor: pointer;
			position: relative;
			width: 25%;
			min-width: 250px;
			border: 1px solid var(--c-neutral-200);
			border-radius: 0.25em;
			margin: 3px;
			padding: 0;
			transition: 200ms;

			@media (--mobile) {
				width: calc(50% - 2px);
				min-width: 0;
				margin: 1px;
			}

			&:hover {
				background: var(--c-neutral-200);
			}

			& a {
				color: var(--text-accent);
				padding: 20px;
			}

			& picture {
				margin-bottom: 10px;
			}

			& h2 {
				font-size: 2em;
				margin-bottom: 10px;
				line-height: 1;

				@media (--mobile) {
					font-size: 18px;
				}
			}

			& p {
				@media (--mobile) {
					font-size: 12px;
				}
			}

			& .label-tag {
				position: absolute;
				top: 10px;
				right: 10px;
				background: var(--c-error);
				font-size: 10px;
				text-transform: uppercase;
				color: var(--c-neutral);
				border-radius: 5px;
				padding: 2px 5px;
				z-index: 9;
			}
		}
	}

	.tips {
		max-width: 900px;
		margin: 0 auto;
		padding: 40px;
		padding-bottom: 100px;

		& h2 {
			font-size: 2vw;
			text-align: center;
			margin-bottom: 10px;

			@media (--mobile) {
				font-size: 4vh;
			}
		}

		& p {
			text-align: center;
			margin-bottom: 40px;
		}

		& .grid {
			column-count: 3;
			column-gap: 20px;

			@media (--mobile) {
				column-count: 1;
			}

			& article {
				background-color: var(--c-netrual);
				-webkit-column-break-inside: avoid;
				page-break-inside: avoid;
				break-inside: avoid;
				border: 1px solid var(--c-neutral-200);
				border-radius: 0.25em;
				margin-bottom: 20px;
				padding: 30px 20px;

				& h3 {
					font-size: 2em;
					margin-bottom: 10px;
				}

				& p {
					font-size: 14px;
					text-align: left;
					margin: 0;
				}
			}
		}
	}
</style>
