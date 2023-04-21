<script>
	import { downloadPdf } from '$lib/print';
	import { numerationFormat, dateObjectFormat, currency, printState } from '$lib/utils';
	import { page } from '$app/stores';

	export let data;

	let { client, date, number, numeration, totals, state } = data;
	const pathname = $page.route.id;
	const docType = pathname.substring(1, pathname.length);

	numeration = numeration || numerationFormat(number, date.year, true);
	number = number || 'SN';
</script>

<article class="col wfull">
	<header class="row jbetween wfull">
		<div class="col">
			<small>{numerationFormat(number, date.year)}</small>
			<h4><b>{client.legal_name}</b></h4>
		</div>

		<aside class="row acenter">
			{#if state}
				<span class={state}><b>{printState(state)}</b></span>
			{/if}

			<a role="button" href="{docType}/{numeration}">Editar</a>
			<button on:click={downloadPdf(data, 'Factura')}>Descargar</button>
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

				& span {
					align-self: center !important;
					background-color: var(--accent);
					color: var(--base-900);
					text-transform: uppercase;
					font-size: 12px;
					border-radius: 1em;
					box-shadow: 0 0 20px hsl(var(--accent-hsl), 0.4);
					padding: 0.1em 1em;
					margin-right: 0.5em;

					&.paid {
						background-color: var(--success);
						box-shadow: 0 0 20px hsl(var(--accent-hsl), 0.4);
					}

					&.closed {
						background-color: var(--error);
						box-shadow: 0 0 20px hsl(var(--error-hsl), 0.4);
					}
				}
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
