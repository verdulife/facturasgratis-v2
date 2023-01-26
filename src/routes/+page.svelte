<script>
	import Image from '$lib/components/Image.svelte';
</script>

<section class="col acenter xfill">
	<article class="col xfill">
		<picture class="row">
			<Image src="/mobile.png" width="100px" height="100px" alt="Verdu" />
		</picture>

		<h1>Lorem ipsum</h1>
		<a href="https://www.buymeacoffee.com/facturasgratis"
			><img
				src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=facturasgratis&button_colour=FFDD00&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=ffffff"
				alt="buymeacoffee"
			/></a
		>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam sit quam eligendi incidunt,
			necessitatibus blanditiis illo nemo dicta accusamus alias sequi, quisquam excepturi ipsa
			aspernatur porro repellendus, explicabo error placeat.
		</p>

		<button class="accent round">BUTTON</button>
	</article>
</section>

<style lang="postcss">
	article {
		max-width: 900px;
		gap: 2em;
		padding: 3em;

		& picture {
			border-radius: 50%;
			border: 2px solid var(--c-neutral-400);
			overflow: hidden;
		}

		& h1 {
			color: var(--c-neutral-700);
		}
	}
</style>
