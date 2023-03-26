<script>
	import { roundWithTwoDecimals, currency } from '$lib/utils';

	export let totals, items, taxes;
	const { iva, ret } = taxes;

	$: base = items.reduce((acc, item) => {
		const amountPrice = (item.price || 0) * item.amount;
		const dtoPrice = (amountPrice * item.dto) / 100;
		return roundWithTwoDecimals(acc + (amountPrice - dtoPrice));
	}, 0);

	function calcTotals() {
		const ivaValue = (base * iva) / 100;
		const retValue = (base * ret) / 100;

		totals = {
			base,
			iva: ivaValue,
			ret: retValue,
			total: base + ivaValue - retValue
		};
	}

	$: base, calcTotals();
</script>

<article class="row wfull">
	<div class="row w1/2">
		<div class="col">
			<b>Base</b>
			<h3>{currency(totals.base)}</h3>
		</div>

		<div class="col">
			<b>{iva}% IVA</b>
			<h3>{currency(totals.iva)}</h3>
		</div>

		<div class="col">
			<b>{ret}% IRPF</b>
			<h3>-{currency(totals.ret)}</h3>
		</div>

		<div class="col">
			<b>Total</b>
			<h3>{currency(totals.total)}</h3>
		</div>
	</div>
</article>
