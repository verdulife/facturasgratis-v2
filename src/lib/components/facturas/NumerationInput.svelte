<script>
	import { twoDigitYear } from '$lib/utils';
	export let number, date, legal_initials;
</script>

<article class="col wfull">
	<h2><b>Datos de la factura</b></h2>

	<div class="date row wfull">
		<label class="col wfull" for="number">
			<small>Número</small>
			<span class="row jstart acenter wfull">
				<input type="text" value="{legal_initials}/{twoDigitYear(date.year)}" disabled />
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

	h2 {
		background-color: var(--base-800);
		font-size: var(--font-xs);
		border: 1px solid var(--base-700);
		border-radius: 0.3em;
		padding: 0.25em 0.5em;
	}

	label {
		margin-top: 1.25em;

		& span {
			gap: 0;

			& input {
				border-radius: 0;

				&:first-of-type {
					border-radius: 0.3em 0 0 0.3em;
				}

				&:last-of-type {
					border-radius: 0 0.3em 0.3em 0;
				}
			}
		}

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
		gap: 0.5em;
	}

	span {
		gap: 0.5em;
	}
</style>
