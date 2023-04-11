<script>
	import { get } from 'svelte/store';
	import { Stores, User, Firebase, stores_lib } from '$lib/stores';
	import { signInWithPopup, signOut } from 'firebase/auth';
	import { auth, provider } from '$lib/database/config';
	import { clearLocalData } from '$lib/utils';
	import toast from 'svelte-french-toast';

	import Container from '$lib/components/Forms/Container.svelte';
	import Title from '$lib/components/Forms/Title.svelte';
	import Label from '$lib/components/Forms/Label.svelte';
	import Row from '$lib/components/Forms/Row.svelte';
	import SubTitle from '$lib/components/Forms/SubTitle.svelte';

	let usedStores = [];

	for (let key in Stores) {
		const name = key.toLowerCase();
		const store = Stores[key];
		const value = get(store);

		usedStores = [...usedStores, { name: stores_lib[name], value }];
	}

	function clearData() {
		const check = confirm(
			`Puede que haya datos sin guardar en la session de:\n\n${$User.legal_name.toUpperCase()}\nÚltima modificación: ${Intl.DateTimeFormat(
				'es-ES'
			).format(
				new Date($User._updated.seconds ? $User._updated.seconds * 1000 : $User._updated)
			)}\n\n¿Quieres descargar una copia?\n`
		);

		if (check) exportData();
		clearLocalData();
	}

	function setSession(session) {
		if ($User.legal_name) clearData();

		User.set(session.db_userData || {});
		Stores.Bills.set(session.db_bills || []);
		Stores.Budgets.set(session.db_budgets || []);
		Stores.Deliveries.set(session.db_deliveries || []);
		Stores.Clients.set(session.db_clients || []);
		Stores.Products.set(session.db_products || []);
		Stores.Providers.set(session.db_providers || []);
		Stores.Proforma_bills.set(session.db_proforma_bills || []);
	}

	function importData() {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = '.facturasgratis';
		input.click();

		input.onchange = () => {
			let reader = new FileReader();
			reader.readAsText(input.files[0]);

			reader.onload = (e) => {
				const session = JSON.parse(e.target.result);

				console.log(session);

				const check = confirm(
					`\n¿Quieres cargar esta sesión?\n\n${session.db_userData.legal_name.toUpperCase()}\nÚltima modificación: ${Intl.DateTimeFormat(
						'es-ES'
					).format(
						new Date(
							session.db_userData._updated.seconds
								? session.db_userData._updated.seconds * 1000
								: session.db_userData._updated
						)
					)}\n`
				);
				if (!check) return;

				setSession(session);
			};
		};
	}

	function logIn() {
		toast.promise(signInWithPopup(auth, provider), {
			loading: 'Iniciando sesión...',
			success: 'Sesión iniciada',
			error: 'Error al iniciar sesión'
		});
	}

	function logOut() {
		signOut(auth).then(() => {
			setTimeout(clearLocalData(), 500);
		});

		toast.success('Sesión cerrada', {
			position: 'bottom-right'
		});
	}

	function exportData() {
		let sessionData = { db_userData: $User };
		for (let key in Stores) {
			const name = key.toLowerCase();
			const store = Stores[key];
			const value = get(store);

			sessionData[`db_${name}`] = value;
		}

		const dataStr =
			'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(sessionData));
		const link = document.createElement('a');

		link.href = dataStr;
		link.download = `${$User.legal_name}.facturasgratis`;
		link.click();
	}
</script>

<Container>
	<Title>Sesión</Title>

	<Row>
		<label class="col acenter wfull">
			<Label clean>Facturasgratis Cloud</Label>
			{#if $Firebase.user}
				<button type="button" class="wfull" on:click={logOut}>Cerrar session</button>
			{:else}
				<button type="button" class="wfull" on:click={logIn}>Iniciar session</button>
			{/if}
		</label>

		<label class="col acenter wfull">
			<Label clean>Datos locales</Label>

			<Row class="row wfull">
				{#if !$Firebase.user}
					<button type="button" class="wfull" on:click={importData}> Cargar datos </button>
				{/if}

				{#if $User.legal_name}
					<button type="button" class="wfull" on:click={exportData}>Exportar</button>
				{/if}
			</Row>
		</label>
	</Row>

	<span class="wdiv" />

	<SubTitle>Datos de la sesión</SubTitle>

	<Row>
		<ul class="row wrap grow">
			{#each usedStores as { name, value }}
				<li>
					<p><b>{name}:</b> {value.length}</p>
				</li>
			{/each}
		</ul>
	</Row>
</Container>

<style lang="postcss">
	p {
		font-size: 12px;
	}

	ul {
		gap: 1em;
	}
</style>
