<script>
	import { signInWithPopup, signOut } from 'firebase/auth';
	import { auth, provider } from '$lib/database/config';
	import { Firebase } from '$lib/stores';
	import { clearLocalData } from '$lib/utils';

	async function logIn() {
		await signInWithPopup(auth, provider);
	}

	function logOut() {
		signOut(auth).then(clearLocalData());
	}
</script>

<section class="col wfull">
	<article class="row jbetween acenter wfull">
		<aside class="col">
			<h2><b>Facturas Cloud</b></h2>
			<p>Inicia sesión para utilizar facturasgratis en la nube</p>
		</aside>

		{#if $Firebase.user}
			<button on:click={logOut}>Cerrar session</button>
		{:else}
			<button on:click={logIn}>Iniciar session</button>
		{/if}
	</article>
</section>

<style lang="postcss">
	section {
		max-width: var(--media-lg);
		margin: 0 auto;
		padding: 2em 2em 0 2em;
	}

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

		& p {
			font-size: var(--font-xs);
		}
	}
</style>
