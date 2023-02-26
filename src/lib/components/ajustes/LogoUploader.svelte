<script>
	import { resizeImage } from '$lib/utils';
	import Image from '$lib/components/Image.svelte';

	export let logo;
	let files;

	function processImage() {
		let imageFile = files[0];
		if (!imageFile) return;

		let reader = new FileReader();

		reader.readAsDataURL(imageFile);
		reader.onload = async (e) => {
			logo = await resizeImage(e.target.result);
		};
	}

	function removeLogo() {
		files = undefined;
		logo = undefined;
	}

	$: if (files) processImage();
</script>

<article class="col wfull">
	<h2><b>Logotipo</b></h2>
	<p>Si usas logotipo en tus facturas, presupuestos o albaranes, aqui es el sitio.</p>

	<nav class="row acenter wfull">
		<button type="button">
			<label for="logo">subir imagen</label>
		</button>

		{#if logo}
			<button class="unset" on:click={removeLogo}>BORRAR IMÁGEN</button>
		{/if}
	</nav>

	<input id="logo" type="file" accept="image/png, image/jpeg" bind:files hidden />

	<picture class="row fcenter wfull">
		{#if logo}
			<Image height="100%" src={logo} alt="Logotipo" />
		{/if}
	</picture>
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

	nav {
		gap: 2em;
		margin-top: 2em;

		& button > label {
			cursor: pointer;
		}
	}

	picture {
		height: 200px;
		background: conic-gradient(from 70deg, var(--base), var(--base-100));
		border: 1px solid var(--base-200);
		border-radius: 0.3em;
		margin-top: 1em;
		padding: 1em;

		@media (--dark) {
			background: conic-gradient(from 70deg, var(--base-800), var(--base-900));
			border-color: var(--base-800);
		}
	}
</style>
