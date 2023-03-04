<script>
	import { months, currency } from '$lib/utils';

	import Search from '$lib/icons/Search.svelte';

	export let data;

	const currentYear = new Date().getFullYear();
	const billYears = [...new Set(data.map((bill) => bill.date.year))];

	let searchTerm, monthFilter;
	let yearFilter = currentYear;

	function getAmount(kind) {
		return currency(data.reduce((acc, bill) => acc + bill.totals[kind], 0));
	}
</script>

<nav class="col wfull">
	<article class="row jbetweem astretch wfull">
		<div class="row astretch grow">
			<label class="row astretch" for="search">
				<picture class="row fcenter">
					<Search width="1.5em" />
				</picture>
				<input id="search" type="search" bind:value={searchTerm} placeholder="Nombre/Número" />
			</label>

			<select id="month" bind:value={monthFilter}>
				<option value="">Todos los meses</option>
				{#each months as month, i}
					<option value={i}>{month}</option>
				{/each}
			</select>

			<select id="year" bind:value={yearFilter}>
				{#each billYears as year}
					<option value={year}>{year}</option>
				{/each}
			</select>
		</div>

		<a role="button" class="row fcenter" href="/facturas/crear">CREAR FACTURA</a>
	</article>

	<span class="xdiv" />

	<footer class="row jbetween wfull">
		<p><b>Facturas:</b> {data.length}</p>

		<aside class="row">
			<p><b>Base:</b> {getAmount('base')}</p>
			<p><b>IVA:</b> {getAmount('iva')}</p>
			<p><b>IRPF:</b> -{getAmount('ret')}</p>
			<p><b>Total:</b> {getAmount('total')}</p>
		</aside>
	</footer>
</nav>

<style lang="postcss">
	nav {
		position: sticky;
		top: 100px;
		left: 0;
		max-width: var(--media-lg);
		gap: 1em;
		background-color: hsl(var(--base-hsl), 0.8);
		backdrop-filter: blur(6px);
		border: 1px solid hsl(var(--base-900-hsl), 0.1);
		border-radius: 0.3em;
		margin: 0 auto;
		padding: 1em;
	}

	article {
		& label {
			& picture {
				background-color: var(--base-100);
				border-radius: 0.3em 0 0 0.3em;
				padding: 0.5em;
			}

			& input {
				border-radius: 0;
				padding: 0.5em 1.5em;
			}
		}

		& input,
		& select {
			font-size: var(--font-xs);
		}

		& select {
			border-radius: 0;
			margin-left: -1px;
			padding: 0.5em 1.5em;

			&:last-of-type {
				border-radius: 0 0.3em 0.3em 0;
			}
		}

		& a {
			padding: 0.5em 1.5em;
		}
	}

	span {
		background-color: var(--base-100);
	}

	footer {
		& p {
			font-size: 12px;
		}

		& aside {
			gap: 1em;
		}
	}
</style>
