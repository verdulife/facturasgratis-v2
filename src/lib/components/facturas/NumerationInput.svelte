<script>
	import { twoDigitYear } from '$lib/utils';
	import Container from '$lib/components/Forms/Container.svelte';
	import Title from '$lib/components/Forms/Title.svelte';
	import Label from '$lib/components/Forms/Label.svelte';
	export let number, date, legal_initials;
</script>

<Container>
	<Title>Datos de la factura</Title>

	<div class="date row wfull">
		<label class="col wfull" for="number">
			<Label>Número</Label>
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
			<Label>Día</Label>
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
			<Label>Mes</Label>
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
			<Label>Año</Label>
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
</Container>

<style lang="postcss">
	label span {
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

		& input:disabled {
			width: 90px;
		}
	}

	div {
		gap: 0.5em;
	}

	span {
		gap: 0.5em;
	}
</style>
