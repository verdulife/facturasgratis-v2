<script>
	import { roundWithTwoDecimals, currency } from '$lib/utils';

	export let totals = {},
		items,
		taxes;
	const { iva, ret } = taxes;

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

		console.log(totals);
	}

	$: base, calcTotals();
</script>

<article class="row fcenter wfull">
	<div class="row w1/2">
		<div class="col">
			<small>Base</small>
			<h3>{currency(base)}</h3>
		</div>

		<div class="col">
			<small>{iva}% IVA</small>
			<h3>{currency(totals.iva)}</h3>
		</div>

		<div class="col">
			<small>{ret}% IRPF</small>
			<h3>-{currency(totals.ret)}</h3>
		</div>
	</div>

	<div class="col">
		<small>Total</small>
		<h3>{currency(totals.total)}</h3>
	</div>
</article>
