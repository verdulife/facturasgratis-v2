<script>
	import {
		User,
		Bills,
		Budgets,
		Deliveries,
		Clients,
		Products,
		Providers,
		Proforma_bills
	} from '$lib/stores';
	import { clearLocalData } from '$lib/utils';

	import Image from '$lib/components/Image.svelte';

	$: currentSession = {
		db_userData: $User,
		db_bills: $Bills,
		db_budgets: $Budgets,
		db_deliveries: $Deliveries,
		db_clients: $Clients,
		db_products: $Products,
		db_providers: $Providers,
		db_proforma_bills: $Proforma_bills
	};

	function clearData() {
		const check = confirm(
			`Puede que haya datos sin guardar en la session de:\n\n${$User.legal_name.toUpperCase()}\nÚltima modificación: ${Intl.DateTimeFormat(
				'es-ES'
			).format(new Date($User._updated))}\n\n¿Quieres descargar una copia?\n`
		);

		if (check) exportData();
		clearLocalData();
	}

	function exportData() {
		const dataStr =
			'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(currentSession));
		const link = document.createElement('a');

		link.href = dataStr;
		link.download = `${$User.legal_name}.facturasgratis`;
		link.click();
	}

	function setSession(session) {
		if ($User.legal_name) clearData();

		$User = session.db_userData || {};
		$Bills = session.db_bills || [];
		$Budgets = session.db_budgets || [];
		$Deliveries = session.db_deliveries || [];
		$Clients = session.db_clients || [];
		$Products = session.db_products || [];
		$Providers = session.db_providers || [];
		$Proforma_bills = session.db_proforma_bills || [];
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

				const check = confirm(
					`\n¿Quieres cargar esta sesión?\n\n${session.db_userData.legal_name.toUpperCase()}\nÚltima modificación: ${Intl.DateTimeFormat(
						'es-ES'
					).format(new Date(session.db_userData._updated))}\n`
				);
				if (!check) return;

				setSession(session);
			};
		};
	}
</script>

<nav class="row acenter">
	<aside class="row">
		<button class="unset row acenter" title="Cargar datos" on:click={importData}>
			<b>↑</b>
			<small>Cargar datos</small>
		</button>

		{#if $User.legal_name}
			<button class="unset row acenter" title="Descargar datos" on:click={exportData}>
				<b>↓</b>
				<small>Descargar</small>
			</button>
		{/if}
	</aside>

	<a
		role="button"
		class="row acenter"
		href="/ajustes"
		title="Sesión actual: {$User.legal_name || 'Sin datos'}"
	>
		{#if $User.legal_name}
			{#if $User.logo}
				<picture avatar>
					<Image src={$User.logo} alt={$User.legal_name} />
				</picture>
			{/if}

			<span class="clamp">{$User.legal_name}</span>
		{:else}
			<span>Tus datos</span>
		{/if}
	</a>
</nav>

<style lang="postcss">
	nav {
		gap: 0.5em;
		background-color: hsl(var(--base-900-hsl), 0.05);
		backdrop-filter: blur(5px);
		color: var(--color);
		border: 1px solid hsl(var(--base-900-hsl), 0.05);
		border-radius: 0.3em;
		margin-right: 2em;
		padding: 0.25em;

		@media (--dark) {
			background-color: hsl(var(--base-hsl), 0.05);
			color: var(--base-100);
			border: 1px solid hsl(var(--base-hsl), 0.05);
		}
	}

	aside {
		gap: 0.5em;
		padding: 0 1em;

		& button {
			gap: 0.25em;
			border: 1px solid hsl(var(--base-hsl), 0.05);
			padding: 0.25em 0.5em;

			& b {
				font-size: var(--font-sm);
			}
		}
	}

	a {
		max-width: 200px;
		gap: 0.5em;
		padding: 0.5em 1.5em;

		& picture {
			width: 32px;
			height: 32px;
			border: none;
			border-radius: 0.3em;
		}

		& span {
			font-size: var(--font-xs);
		}
	}
</style>
