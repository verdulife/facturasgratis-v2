<script>
	import { auth } from '$lib/database/config';
	import { signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
	import { onMount } from 'svelte';

	const provider = new GoogleAuthProvider();

	onMount(() => {
		signInWithRedirect(auth, provider);
	});

	/* const auth = getAuth(app);
	

	function signIn() {
		signInWithRedirect(auth, provider);
	} */

	/* async function redirectResult() {
		try {
			const result = await getRedirectResult(auth);
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			const user = result.user;

			console.log(user);
		} catch (error) {
			const errorCode = error.code;
			const errorMessage = error.message;
			const email = error.customData.email;
			const credential = GoogleAuthProvider.credentialFromError(error);

			console.log(errorMessage);
		}
	}

	redirectResult(); */
</script>

<section class="col wfull">
	<article class="row jbetween acenter wfull">
		<aside class="col">
			<h2><b>Facturas Cloud</b></h2>
			<p>Inicia sesión para utilizar facturasgratis en la nube</p>
		</aside>

		<!-- <button on:click={signIn}>Iniciar session</button> -->
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
