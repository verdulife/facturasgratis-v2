<script>
	import { es } from '$lib/postal-codes';

	import Container from '$lib/components/Forms/Container.svelte';
	import Title from '$lib/components/Forms/Title.svelte';
	import Label from '$lib/components/Forms/Label.svelte';
	import Row from '$lib/components/Forms/Row.svelte';

	export let street, cp, city, country;

	function autocompleteByPostalCode() {
		if (!cp || cp.length < 5) return;

		const autocomplete = es.find((code) => code.zipcode === cp);

		if (!autocomplete) return;

		city = autocomplete.city;
		country = 'España';
	}
</script>

<Container>
	<Title>Dirección fiscal</Title>
	<p>Los campos marcados con un → son obligatorios.</p>

	<label class="col wfull" for="street">
		<Label class="wfull">→ Dirección</Label>

		<input
			class="wfull"
			id="street"
			type="text"
			bind:value={street}
			placeholder="Ej. Calle Mayor 18, Ático"
			required
		/>
	</label>

	<Row>
		<label class="col grow" for="cp">
			<Label>→ Código postal</Label>
			<input
				class="wfull"
				list="postal_codes"
				id="cp"
				type="text"
				bind:value={cp}
				on:input={autocompleteByPostalCode}
				placeholder="Ej. 08818"
				required
			/>

			<datalist id="postal_codes">
				{#each es as { zipcode, city }}
					<option value={zipcode}>{city}</option>
				{/each}
			</datalist>
		</label>

		<label class="col grow" for="city">
			<Label>→ Población</Label>
			<input
				class="wfull"
				id="city"
				type="text"
				bind:value={city}
				placeholder="Ej. Barcelona"
				required
			/>
		</label>

		<label class="col grow" for="country">
			<Label>→ País</Label>
			<input
				class="wfull"
				id="country"
				type="text"
				bind:value={country}
				placeholder="Ej. España"
				required
			/>
		</label>
	</Row>
</Container>

<style lang="postcss">
	p {
		font-size: var(--font-xs);
	}

	div {
		gap: 0.5em;
	}
</style>
