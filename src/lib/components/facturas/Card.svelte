<script>
	import { numerationFormat, dateObjectFormat, currency } from '$lib/utils';
	export let bill;

	const { client, date, number, totals } = bill;
</script>

<article class="col wfull">
	<header class="row jbetween wfull">
		<div class="col">
			<small>{numerationFormat(number, date.year)}</small>
			<h4><b>{client.legal_name}</b></h4>
		</div>

		<aside class="row">
			<a role="button" href="facturas/{number}">Editar</a>
			<button>Descargar</button>
		</aside>
	</header>

	<footer class="row jbetween wfull">
		<p><b>Fecha:</b> {dateObjectFormat(date)}</p>

		<aside class="row acenter">
			<p><b>Base:</b> {currency(totals.base)}</p>
			<p><b>IVA:</b> {currency(totals.iva)}</p>
			<p><b>IRPF:</b> -{currency(totals.ret)}</p>
			<p><b>Total:</b> {currency(totals.total)}</p>
		</aside>
	</footer>
</article>

<style lang="postcss">
	article {
		gap: 0.5em;
		border-bottom: 1px solid var(--base-200);
		padding: 1.5em 2em;
		transition: 150ms;

		&:hover {
			border-color: hsl(var(--accent-hsl), 0.4);
		}

		@media (--dark) {
			border-bottom: 1px solid var(--base-800);
		}

		& header {
			& aside {
				gap: 0.5em;
			}
		}

		& button,
		& a[role='button'] {
			padding: 0.5em 1.5em;
		}

		& p {
			font-size: 12px;
		}

		& footer {
			& aside {
				gap: 1em;

				& p:last-of-type {
					color: var(--accent);
					font-size: var(--font-xs);
					text-shadow: 0 0 20px hsl(var(--accent-hsl), 0.4);
				}
			}
		}
	}
</style>
