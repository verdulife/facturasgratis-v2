<script>
	import { twoDigitYear } from '$lib/utils';
	export let number, date, legal_initials;
</script>

<article class="col wfull">
	<h2><b>Datos de la factura</b></h2>
	<p>La numeración y fecha se rellenan automatiamente, pero puedes modificarlas.</p>

	<label class="col wfull" for="number">
		<small>Número</small>
		<span class="row jstart acenter wfull">
			<input type="text" value="{legal_initials}/{twoDigitYear(date.year)}" disabled />
			<span><b>-</b></span>
			<input
				class="grow"
				id="number"
				type="number"
				inputmode="numeric"
				bind:value={number}
				required
			/>
		</span>
	</label>

	<div class="date row wfull">
		<label class="col wfull" for="day">
			<small>Día</small>
			<input
				class="wfull"
				id="day"
				type="number"
				inputmode="numeric"
				bind:value={date.day}
				required
			/>
		</label>

		<label class="col wfull" for="month">
			<small>Mes</small>
			<input
				class="wfull"
				id="month"
				type="number"
				inputmode="numeric"
				bind:value={date.month}
				required
			/>
		</label>

		<label class="col wfull" for="year">
			<small>Año</small>
			<input
				class="wfull"
				id="year"
				type="number"
				inputmode="numeric"
				bind:value={date.year}
				required
			/>
		</label>
	</div>
</article>

<style lang="postcss">
	article {
		background-color: hsl(var(--base-hsl), 0.8);
		border: 1px solid var(--base-200);
		border-radius: 0.3em;
		padding: 1.25em;
		overflow: hidden;

		@media (--dark) {
			background-color: hsl(var(--base-900-hsl), 0.8);
			border-color: var(--base-800);
		}
	}

	p {
		font-size: var(--font-xs);
	}

	label {
		margin-top: 2em;

		& small {
			color: var(--base-500);
			padding: 0 1em;

			@media (--dark) {
				color: var(--base-600);
			}
		}

		& input {
			margin-top: 0.5em;

			&:disabled {
				width: 90px;
			}
		}
	}

	div {
		gap: 2em;

		&.date {
			gap: 0;

			& label {
				& input {
					border-radius: 0;
				}

				&:first-of-type input {
					border-radius: 0.3em 0 0 0.3em;
				}
				&:last-of-type input {
					border-radius: 0 0.3em 0.3em 0;
				}
			}
		}
	}

	span {
		gap: 0.5em;
	}
</style>
