<script>
	import HeaderBackground from '$components/global/HeaderBackground.svelte';

	export let user;
</script>

<HeaderBackground>
	{#if user.legal_name}
		<h1>Hola <b>{user.legal_name}</b></h1>
	{:else}
		<h1>Tus <strong>datos</strong> fiscales</h1>
		<p>Estos datos se usaran para generar tus facturas, presupuestos, proformas y albaranes</p>
	{/if}
</HeaderBackground>

<style lang="postcss">
	h1 {
		max-width: 900px;
		font-size: var(--font-2xl);
		line-height: 1.2;
	}
</style>
