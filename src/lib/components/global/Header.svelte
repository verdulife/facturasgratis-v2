<script>
	import HeaderBackground from '$components/global/HeaderBackground.svelte';
	import Image from '$components/global/Image.svelte';

	export let data;
</script>

<HeaderBackground>
	<picture class="row acenter">
		<Image width="80px" src={data.icon} />
		<h1><b>{data.title}</b></h1>
	</picture>
	<p>{data.description}</p>
</HeaderBackground>

<style lang="postcss">
	picture {
		gap: 1em;
	}

	h1 {
		max-width: 900px;
		font-size: var(--font-2xl);
		line-height: 1.2;
	}
</style>
