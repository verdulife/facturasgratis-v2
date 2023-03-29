<script>
	import { Firebase, Stores, User } from '$lib/stores';

	import Container from '$lib/components/Forms/Container.svelte';
	import Title from '$lib/components/Forms/Title.svelte';

	let usedStores = [];

	const stores_lib = {
		bills: 'Facturas',
		budgets: 'Presupuestos',
		deliveries: 'Albaranes',
		proforma_bills: 'Proformas',
		clients: 'Clientes',
		products: 'Productos/Servicios',
		providers: 'Proveedores'
	};

	for (let key in Stores) {
		const name = key.toLowerCase();
		const store = Stores[key];

		store.subscribe((value) => {
			usedStores = [...usedStores, { name: stores_lib[name], value }];
		});
	}

	function exportData() {
		const sessionData = usedStores.map((store) => store.data);
		console.log(sessionData);
		/* const dataStr =
			'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(sessionData));
		const link = document.createElement('a');

		link.href = dataStr;
		link.download = `${$User.legal_name}.facturasgratis`;
		link.click(); */
	}
</script>

<Container>
	<Title>Session actual</Title>

	<div class="row jbetween wfull">
		<ul class="col">
			<aside class="row fcenter">
				{#each usedStores as { name, value }}
					{#if value.length > 0}
						<li>
							<p><b>{name}:</b> {value.length}</p>
						</li>
					{/if}
				{/each}
			</aside>

			<li>
				<p>
					Facturasgratis Cloud:
					<span class:connected={$Firebase.user}>
						<b>{$Firebase.user ? 'Conectado' : 'Desconectado'}</b>
					</span>
				</p>
			</li>
		</ul>

		<button type="button" on:click={exportData}>Exportar</button>
	</div>
</Container>

<style lang="postcss">
	p {
		font-size: 12px;

		& span {
			color: var(--error);
			font-size: 12px;
		}

		& .connected {
			color: var(--success);
		}
	}

	aside {
		gap: 1em;
	}
</style>
