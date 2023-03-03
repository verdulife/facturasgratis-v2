<script>
	import { ajustes } from '$lib/meta';
	import { User } from '$lib/stores';
	import { clearLocalData } from '$lib/utils';

	import Header from '$lib/components/ajustes/Header.svelte';
	import LogoUploader from '$lib/components/ajustes/LogoUploader.svelte';
	import LegalData from '$lib/components/ajustes/LegalData.svelte';
	import LegalAddress from '$lib/components/ajustes/LegalAddress.svelte';
	import LegalContact from '$lib/components/ajustes/LegalContact.svelte';
	import LegalTaxes from '$lib/components/ajustes/LegalTaxes.svelte';
	import LegalNotes from '$lib/components/ajustes/LegalNotes.svelte';

	$: user = $User;

	function saveUserData() {
		user._updated = new Date();
		if (user.legal_initials) user.legal_initials = user.legal_initials.toUpperCase();
		$User = user;
		alert('✔ Datos guardados correctamente');
	}

	function clearSession() {
		if (!$User.legal_name) return;

		const check = confirm(
			`Se borraran todos los datos de la sesión de:\n\n${$User.legal_name.toUpperCase()}\nÚltima modificaión: ${Intl.DateTimeFormat(
				'es-ES'
			).format(new Date($User._updated))}\n\n¿Desea continuar?\n`
		);

		if (!check) return;

		const verify = prompt('Para borrar todos los datos de la sesion, añade el NIF/CIF');

		if (verify !== $User.legal_id) return;
		clearLocalData();
	}
</script>

<svelte:head>
	<title>{ajustes.title}</title>
	<meta name="description" content={ajustes.description} />
	<meta name="keywords" content={ajustes.keywords} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={ajustes.url} />
	<meta property="og:title" content={ajustes.title} />
	<meta property="og:description" content={ajustes.description} />
	<meta property="og:image" content={ajustes.image} />
	<meta property="og:image:secure_url" content={ajustes.image} />
	<meta property="og:image:type" content="image/jpeg" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={ajustes.url} />
	<meta name="twitter:title" content={ajustes.title} />
	<meta name="twitter:description" content={ajustes.description} />
	<meta name="twitter:image" content={ajustes.image} />
</svelte:head>

<Header {user} />

<form
	class="col acenter wfull"
	on:submit|preventDefault={saveUserData}
	autocomplete="off"
	spellcheck="false"
>
	<LogoUploader bind:logo={user.logo} />
	<LegalData
		bind:legal_name={user.legal_name}
		bind:legal_id={user.legal_id}
		bind:legal_initials={user.legal_initials}
	/>
	<LegalAddress
		bind:street={user.street}
		bind:cp={user.cp}
		bind:city={user.city}
		bind:country={user.country}
	/>
	<LegalContact bind:phone={user.phone} bind:email={user.email} />
	<LegalTaxes bind:currency={user.currency} bind:iva={user.iva} bind:ret={user.ret} />
	<LegalNotes
		bind:bill_note={user.bill_note}
		bind:budget_note={user.budget_note}
		bind:delivery_note={user.delivery_note}
		bind:proforma_note={user.proforma_note}
	/>

	<footer class="row jcenter wfull">
		<button type="submit" class="grow">GUARDAR DATOS</button>
		<button type="button" class="error " on:click={clearSession}>BORRAR PERFIL</button>
	</footer>
</form>

<style lang="postcss">
	form {
		max-width: var(--media-lg);
		gap: 2em;
		margin: 0 auto;
		padding: 2em;

		& footer {
			gap: 1em;
		}
	}
</style>
