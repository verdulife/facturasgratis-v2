<script>
	import { months, currency, currentYear } from '$lib/utils';
	import { page } from '$app/stores';

	import Search from '$lib/icons/Search.svelte';
	import Container from '$components/Forms/Container.svelte';

	export let filtered, idFilter, monthFilter, yearFilter;
	export let readonly = null;

	const pathname = $page.route.id;
	const docType = pathname.substring(1, pathname.length - 1);
	const billYears = [...new Set([...filtered.map((b) => b.date.year), currentYear])];

	function getAmount(kind) {
		if (!filtered) return currency(0);
		return currency(filtered.reduce((acc, b) => acc + b.totals[kind], 0));
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

			{#if !readonly}
				<a role="button" class="row fcenter" href="{pathname}/editar">CREAR {docType}</a>
			{/if}
		</article>

		<span class="xdiv" />

		<footer class="row jbetween acenter wfull">
			<p><b>{docType}s:</b> {filtered.length}</p>

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
