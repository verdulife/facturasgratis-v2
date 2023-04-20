<script>
	import { roundWithTwoDecimals, currency } from '$lib/utils';

	export let totals, items, taxes;
	$: ({ iva, ret } = taxes);

	$: base = items.reduce((acc, item) => {
		const amountPrice = item.price * item.amount;
		const dtoPrice = (amountPrice * item.dto) / 100;
		return roundWithTwoDecimals(acc + (amountPrice - dtoPrice));
	}, 0);

	function calcTotals() {
		const ivaValue = (base * iva) / 100;
		const retValue = (base * ret) / 100;

		totals = {
			base,
			iva: roundWithTwoDecimals(ivaValue),
			ret: roundWithTwoDecimals(retValue),
			total: roundWithTwoDecimals(base + ivaValue - retValue)
		};
	}

	$: items, calcTotals();
	$: iva || ret, calcTotals();
</script>

<article class="row fcenter">
	<p><b>Base:</b> {currency(totals.base)}</p>
	<p><b>IVA:</b> {currency(totals.iva)}</p>
	<p><b>IRPF:</b> -{currency(totals.ret)}</p>
	<p><b>Total:</b> {currency(totals.total)}</p>
</article>

<style lang="postcss">
	article {
		gap: 1em;

		& p {
			font-size: 12px;

			&:last-of-type {
				background-color: var(--accent);
				color: var(--base-900);
				font-size: var(--font-xs);
				border-radius: 0.2rem;
				box-shadow: 0 0 20px hsl(var(--accent-hsl), 0.4);
				padding: 0.25em 0.75em;
			}
		}
	}
</style>
