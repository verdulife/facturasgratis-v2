<script>
	import { ajustes } from '$lib/meta';
	import { User } from '$lib/stores';
	import { clearLocalData } from '$lib/utils';
	import { updateUser } from '$lib/database/config';

	import toast from 'svelte-french-toast';
	import Meta from '$components/global/Meta.svelte';
	import Header from '$components/ajustes/Header.svelte';
	import LogoUploader from '$components/ajustes/LogoUploader.svelte';
	import LegalData from '$components/ajustes/LegalData.svelte';
	import LegalAddress from '$components/ajustes/LegalAddress.svelte';
	import LegalContact from '$components/ajustes/LegalContact.svelte';
	import LegalTaxes from '$components/ajustes/LegalTaxes.svelte';
	import LegalNotes from '$components/ajustes/LegalNotes.svelte';
	import CurrentSession from '$components/ajustes/CurrentSession.svelte';

	$: user = $User;

	async function saveUserData() {
		const { tools_sort, ...userClean } = user;

		userClean._updated = new Date();
		if (userClean.legal_initials) userClean.legal_initials = userClean.legal_initials.toUpperCase();

		$User = userClean;
		await updateUser(userClean);

		toast.success('Datos guardados correctamente');
	}

	function clearSession() {
		if (!$User.legal_name) return;

		const check = confirm(
			`Se borraran todos los datos de la sesión de:\n\n${$User.legal_name.toUpperCase()}\nÚltima modificaión: ${Intl.DateTimeFormat(
				'es-ES'
			).format(
				new Date($User._updated.seconds ? $User._updated.seconds * 1000 : $User._updated)
			)}\n\n¿Desea continuar?\n`
		);

		if (!check) return;

		const verify = prompt('Para borrar todos los datos de la sesion, añade el NIF/CIF');

		if (verify !== $User.legal_id) return;
		clearLocalData();

		//TODO: delete firebase user
	}
</script>

<Meta data={ajustes} />

<Header {user} />

<form class="col acenter wfull" on:submit|preventDefault={saveUserData}>
	<CurrentSession />
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
		<button type="button" class="error" on:click={clearSession}>BORRAR PERFIL</button>
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
