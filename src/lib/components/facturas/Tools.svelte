<script>
	import { months, currency, currentYear } from '$lib/utils';
	import Search from '$lib/icons/Search.svelte';
	import Container from '$lib/components/Forms/Container.svelte';

	export let filteredBills;
	export let idFilter, monthFilter, yearFilter;

	const billYears = [...new Set([...filteredBills.map((bill) => bill.date.year), currentYear])];

	function getAmount(kind) {
		return currency(filteredBills.reduce((acc, bill) => acc + bill.totals[kind], 0));
	}
</script>

<nav class="col wfull">
	<Container>
		<article class="row jbetweem astretch wfull">
			<div class="row astretch grow">
				<label class="row astretch" for="search">
					<picture class="row fcenter">
						<Search width="1.5em" />
					</picture>
					<input id="search" type="search" bind:value={idFilter} placeholder="Nombre/Número" />
				</label>

				<select id="month" bind:value={monthFilter}>
					<option value="">Todos los meses</option>
					{#each months as month, i}
						<option value={i + 1}>{month}</option>
					{/each}
				</select>

				<select id="year" bind:value={yearFilter}>
					{#each billYears as year}
						<option value={year}>{year}</option>
					{/each}
				</select>
			</div>

			<a role="button" class="row fcenter" href="/facturas/editar">CREAR FACTURA</a>
		</article>

		<span class="xdiv" />

		<footer class="row jbetween acenter wfull">
			<p><b>Facturas:</b> {filteredBills.length}</p>

			<aside class="row acenter">
				<p><b>Base:</b> {getAmount('base')}</p>
				<p><b>IVA:</b> {getAmount('iva')}</p>
				<p><b>IRPF:</b> -{getAmount('ret')}</p>
				<p><b>Total:</b> {getAmount('total')}</p>
			</aside>
		</footer>
	</Container>
</nav>

<style lang="postcss">
	nav {
		position: sticky;
		top: 100px;
		left: 0;
		max-width: var(--media-lg);
		margin: 0 auto;
	}

	article {
		& label {
			& picture {
				background-color: var(--base-100);
				border-radius: 0.3em 0 0 0.3em;
				padding: 0.5em;

				@media (--dark) {
					background-color: var(--base-800);
				}
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

		@media (--dark) {
			background-color: var(--base-800);
		}
	}

	footer {
		& p {
			font-size: 12px;
		}

		& aside {
			gap: 1em;

			& p:last-of-type {
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
