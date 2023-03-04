<script>
	import { numerationFormat, dateObjectFormat, currency } from '$lib/utils';
	export let bill;

	const { client, date, number, totals } = bill;
</script>

<article class="col wfull">
	<header class="col wfull">
		<small>{numerationFormat(number, date.year)}</small>
		<h4><b>{client.legal_name}</b></h4>
	</header>

	<footer class="row jbetween wfull">
		<p><b>Fecha:</b> {dateObjectFormat(date)}</p>

		<aside class="row">
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
		padding: 1em 2em;
		transition: 150ms;

		&:hover {
			background: linear-gradient(to right, transparent, var(--base-200), transparent);
		}

		& aside {
			gap: 1em;
		}

		& p {
			font-size: 12px;
		}
	}
</style>
