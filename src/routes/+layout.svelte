<script>
	import '$lib/startcss/startcss.css';
	import { onAuthStateChanged } from 'firebase/auth';
	import { Firebase, Stores } from '$lib/stores';
	import { auth, syncUser, syncCollection } from '$lib/database/config';
	import { Toaster } from 'svelte-french-toast';

	import Cookies from '$components/global/Cookies.svelte';
	import Nav from '$components/global/Nav.svelte';

	onAuthStateChanged(auth, async (user) => {
		if (user) {
			const { uid } = user;
			Firebase.set({ user: true, uid });

			//TODO: si firebase y localstorage ambos tienen datos, preguntar si se quiere descargar una copia local antes.

			await syncUser(uid);

			for (let key in Stores) { // TODO: Make it parallel
				const collection = key.toLowerCase();
				const store = Stores[key];

				await syncCollection({ collection, store });
			}
		}
	});
</script>

<main class="scrollbar">
	<Nav />
	<slot />
</main>

<Cookies />
<Toaster />

<style lang="postcss">
	:root {
		--blur: blur(2em);
	}

	main {
		background-color: var(--c-neutral);
	}
</style>
