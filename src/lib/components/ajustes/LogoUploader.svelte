<script>
	import { resizeImage } from '$lib/utils';

	import Container from '$lib/components/Forms/Container.svelte';
	import Title from '$lib/components/Forms/Title.svelte';
	import Row from '$lib/components/Forms/Row.svelte';
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

<Container>
	<Title>Logotipo</Title>

	<Row>
		<nav class="col acenter wfull@md">
			<button type="button" class="wfull@md">
				<label for="logo">subir imagen</label>
			</button>

			{#if logo}
				<button class="unset" on:click={removeLogo}>BORRAR IMÁGEN</button>
			{/if}
		</nav>

		<label class="grow" for="logo">
			<input id="logo" type="file" accept="image/png, image/jpeg" bind:files />

			<picture class="row fcenter wfull">
				{#if logo}
					<Image height="100%" src={logo} alt="Logotipo" />
				{/if}
			</picture>
		</label>
	</Row>
</Container>

<style lang="postcss">
	input[type='file'] {
		position: absolute;
		opacity: 0;
		pointer-events: none;
	}

	nav {
		gap: 2em;

		& button > label {
			cursor: pointer;
		}
	}

	picture {
		height: 200px;
		background: conic-gradient(from 70deg, var(--base), var(--base-100));
		border: 1px solid var(--base-200);
		border-radius: 0.3em;
		padding: 1.5em;

		@media (--dark) {
			background: conic-gradient(from 70deg, var(--base-800), var(--base-900));
			border-color: var(--base-800);
		}
	}
</style>
