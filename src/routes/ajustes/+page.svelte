<script>
	import { resizeImage } from '$lib/utils';
	import { ajustes } from '$lib/meta';
	import { User, Bills, Budgets, Deliveries, Clients, Products, Providers } from '$lib/stores';

	$: user = $User;
	let files;

	function exportData() {
		const localDb = {
			db_userData: $User,
			db_bills: $Bills,
			db_budgets: $Budgets,
			db_deliveries: $Deliveries,
			db_clients: $Clients,
			db_products: $Products,
			db_providers: $Providers
		};

		const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(localDb));
		const link = document.createElement('a');

		link.href = dataStr;
		link.download = `${user.legal_name}.facturasgratis`;
		link.click();
	}

	function importData() {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = '.facturasgratis';
		input.click();

		input.onchange = () => {
			let reader = new FileReader();

			reader.onload = (e) => {
				const {
					db_userData,
					db_bills,
					db_budgets,
					db_deliveries,
					db_clients,
					db_products,
					db_providers
				} = JSON.parse(e.target.result);

				$User = db_userData;
				$Bills = db_bills;
				$Budgets = db_budgets;
				$Deliveries = db_deliveries;
				$Clients = db_clients;
				$Products = db_products;
				$Providers = db_providers;

				alert('Datos cargados correctamente ✔');
			};

			reader.readAsText(input.files[0]);
		};
	}

	function clearData() {
		const check = prompt('Se borraran todos tus datos. Introduce tu CIF/NIF para confirmar.');

		if (check.toUpperCase() !== $User.legal_id.toUpperCase()) {
			alert('⚠ La verficación de seguridad para el borrado ha fallado');
		} else {
			localStorage.clear();
			$User = {};
			$Bills = [];
			$Budgets = [];
			$Deliveries = [];
			$Clients = [];
			$Products = [];
			$Providers = [];

			alert('Datos borrados correctamente ✔');
		}
	}

	function downloadData() {
		exportData();
	}

	function uploadData() {
		if ($User.legal_id) {
			const check = confirm('¿Quieres descargar tus datos antes de cargar unos nuevos?');
			if (check) exportData();

			clearData();
			importData();
		} else {
			importData();
		}
	}

	$: if (files) {
		let imageFile = files[0];
		let reader = new FileReader();

		reader.onload = async (e) => {
			console.log(e.target.result, await resizeImage(e.target.result));
			user.logo = await resizeImage(e.target.result);
		};

		reader.readAsDataURL(imageFile);
	}

	function removeLogo() {
		files = undefined;
		delete user.logo;
		user = user;
	}

	function pushUser() {
		if (user.phone || user.email) {
			user._updated = new Date();

			if (user.legal_initials) {
				user.legal_initials = user.legal_initials.toUpperCase();
			}

			$User = user;

			alert('✔ Datos guardados correctamente');
		} else alert('⚠ No has añadido un método de contacto');
	}

	function maxLength(e) {
		const el = e.target;
		if (el.value.length > el.maxLength) el.value = el.value.slice(0, el.maxLength);
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

<div class="scroll">
	<article class="header col fcenter xfill">
		<h1>Tus datos</h1>
		<p>
			En <b>facturagratis</b>, usamos tu navegador como disco para que tus datos sean solo tuyos.
			Para tu tranquilidad, nuestra recomendación es que generes PDF's de tus documentos a medida
			que los vayas creando, y los guardes en una carpeta de tu
			<a href="https://www.google.com/drive/" target="_blank">Google Drive</a>
			(o similar), asi solo tendrás que compartir esa carpeta con tu gestor o contable.
			<br /><br />
			Si lo deseas, puedes descargarte una copia de seguridad de tus datos, y volverlos a cargar en este
			o en qualquier otro dispositivo.
		</p>
		<small
			>⚠️ Si usas programas que borren la cache de tu navegador o la borras manualmente, perderás
			esta copia de seguridad</small
		>

		<div class="io-wrapper col acenter xfill">
			<h2>Copia de seguridad</h2>

			{#if user && user.legal_id}
				<p>
					Última actualización: <b>{new Date($User._updated).toLocaleDateString()}</b>
				</p>
			{/if}

			<div class="row jcenter xfill">
				{#if user && user.legal_id}
					<button class="succ semi" on:click={downloadData}>DESCARGAR</button>
				{/if}

				<button class="succ semi" on:click={uploadData}>CARGAR COPIA</button>

				{#if user && user.legal_id}
					<button class="outwhite semi" on:click={clearData}>BORRAR TODO</button>
				{/if}
			</div>
		</div>
	</article>

	{#if user}
		<form class="info col acenter xfill" on:submit|preventDefault={pushUser}>
			<div class="box round col xfill">
				<h2>Logotipo</h2>
				<p class="notice">
					Si usas logotipo en tus facturas, presupuestos o albaranes, aqui es el sitio.
				</p>

				<div class="row xfill">
					<label for="logo" class="file-btn">SUBIR IMÁGEN</label>

					{#if user.logo}
						<div class="file-btn remove-btn" on:click={removeLogo}>BORRAR IMÁGEN</div>
					{/if}
				</div>

				<input type="file" id="logo" accept="image/png, image/jpeg" bind:files class="xfill" />

				{#if user.logo}
					<div class="logo-wrapper row fcenter xfill">
						<img src={user.logo} alt={user.legal_name || 'Logotipo'} />
					</div>
				{/if}
			</div>

			<div class="box round col xfill">
				<h2>Datos legales</h2>
				<p class="notice">Los campos marcados con un 👈 son obligatorios.</p>

				<div class="input-wrapper col xfill">
					<label for="legal_name">Nombre fiscal 👈</label>
					<input
						type="text"
						id="legal_name"
						bind:value={user.legal_name}
						class="xfill"
						placeholder="Ej. Factura Gratis S.L."
						required
					/>
				</div>

				<div class="input-wrapper col xfill">
					<label for="legal_id">CIF/NIF 👈</label>
					<input
						type="text"
						id="legal_id"
						bind:value={user.legal_id}
						class="xfill"
						placeholder="Ej. B00011100"
						required
					/>
				</div>

				<div class="input-wrapper col xfill">
					<label for="legal_initials">INICIALES</label>
					<input
						type="text"
						id="legal_initials"
						bind:value={user.legal_initials}
						class="xfill"
						maxlength="3"
						minlength="2"
						placeholder="Ej. FG"
					/>
				</div>
			</div>

			<div class="box round col xfill">
				<h2>Dirección fiscal</h2>
				<p class="notice">Los campos marcados con un 👈 son obligatorios.</p>

				<div class="row xfill">
					<div class="input-wrapper col xhalf">
						<label for="street">Dirección fiscal 👈</label>
						<input
							type="text"
							id="street"
							bind:value={user.street}
							class="xfill"
							placeholder="Ej. Calle Mayor, 18"
							required
						/>
					</div>

					<div class="input-wrapper col xhalf">
						<label for="cp">Código postal 👈</label>
						<input
							type="text"
							id="cp"
							bind:value={user.cp}
							class="xfill"
							placeholder="Ej. 08818"
							required
						/>
					</div>
				</div>

				<div class="row xfill">
					<div class="input-wrapper col xhalf">
						<label for="city">Población 👈</label>
						<input
							type="text"
							id="city"
							bind:value={user.city}
							class="xfill"
							placeholder="Ej. Barcelona"
							required
						/>
					</div>

					<div class="input-wrapper col xhalf">
						<label for="country">País 👈</label>
						<input
							type="text"
							id="country"
							bind:value={user.country}
							class="xfill"
							placeholder="Ej. España"
							required
						/>
					</div>
				</div>
			</div>

			<div class="box round col xfill">
				<h2>Contacto</h2>
				<p class="notice">Puedes rellenar ambos campos, pero con uno es suficiente.</p>

				<div class="input-wrapper col xfill">
					<label for="phone">Teléfono</label>
					<input
						type="text"
						id="phone"
						bind:value={user.phone}
						class="xfill"
						placeholder="Ej. 600 600 600"
					/>
				</div>

				<div class="input-wrapper col xfill">
					<label for="email">Correo electrónico</label>
					<input
						type="text"
						id="email"
						bind:value={user.email}
						class="xfill"
						placeholder="Ej. hola@facturagratis.com"
					/>
				</div>
			</div>

			<div class="box round col xfill">
				<h2>Moneda e impuestos</h2>
				<p class="notice">Si no rellenas el campo del IRPF, no lo aplicaremos.</p>

				<div class="input-wrapper col xfill">
					<label for="currency">Moneda</label>
					<select id="currency" bind:value={user.currency} class="out xfill" required>
						<option value="€">€</option>
						<option value="$">$</option>
						<option value="£">£</option>
						<option value="¥">¥</option>
						<option value="₹">₹</option>
					</select>
				</div>

				<div class="input-wrapper col xfill">
					<label for="iva">IVA %</label>
					<input
						type="number"
						id="iva"
						bind:value={user.iva}
						class="xfill"
						placeholder="Ej. 21"
						required
					/>
				</div>

				<div class="input-wrapper col xfill">
					<label for="ret">IRPF %</label>
					<input type="number" id="ret" bind:value={user.ret} class="xfill" placeholder="Ej. 15" />
				</div>
			</div>

			<div class="box round col xfill">
				<h2>Notas</h2>
				<p class="notice">Añade notas a pie de tus facturas, presupuestos o albaranes.</p>

				<div class="input-wrapper col xfill">
					<label class="row jbetween acenter xfill" for="bill_note">
						Facturas <span>{user.bill_note ? user.bill_note.length : 0} / 350</span>
					</label>

					<textarea
						id="bill_note"
						bind:value={user.bill_note}
						class="xfill"
						placeholder="Ej. Transporte no incluido"
						maxlength="350"
						on:keydown={(e) => maxLength(e)}
					/>
				</div>

				<div class="input-wrapper col xfill">
					<label class="row jbetween acenter xfill" for="budget_note">
						Presupuestos <span>{user.budget_note ? user.budget_note.length : 0} / 350</span>
					</label>

					<textarea
						id="budget_note"
						bind:value={user.budget_note}
						class="xfill"
						placeholder="Ej. Transporte no incluido"
						maxlength="350"
						on:keydown={(e) => maxLength(e)}
					/>
				</div>

				<div class="input-wrapper col xfill">
					<label class="row jbetween acenter xfill" for="delivery_note">
						Albaranes <span>{user.delivery_note ? user.delivery_note.length : 0} / 350</span>
					</label>

					<textarea
						id="delivery_note"
						bind:value={user.delivery_note}
						class="xfill"
						placeholder="Ej. Transporte no incluido"
						maxlength="350"
						on:keydown={(e) => maxLength(e)}
					/>
				</div>

				<div class="input-wrapper col xfill">
					<label class="row jbetween acenter xfill" for="proforma_note">
						Proforma <span>{user.proforma_note ? user.proforma_note.length : 0} / 350</span>
					</label>

					<textarea
						id="proforma_note"
						bind:value={user.proforma_note}
						class="xfill"
						placeholder="Ej. Transporte no incluido"
						maxlength="350"
						on:keydown={(e) => maxLength(e)}
					/>
				</div>
			</div>

			<div class="row jcenter xfill">
				<button class="succ semi">GUARDAR DATOS</button>
				<a href="/" class="btn out semi">CANCELAR</a>
			</div>
		</form>
	{/if}
</div>

<style lang="postcss">
	.header {
		text-align: center;
		padding: 60px;

		& h1 {
			max-width: 900px;
			font-size: 5vh;
			line-height: 1;
			margin-bottom: 40px;
		}

		& p {
			max-width: 900px;
			font-size: 18px;
			margin-bottom: 40px;
		}

		& small {
			border-radius: 5px;
			padding: 10px 20px;
			margin-bottom: 40px;
		}

		& .io-wrapper {
			& p {
				margin-bottom: 20px;
			}

			& button {
				font-size: 12px;
			}
		}
	}

	.info {
		padding: 60px;
	}

	.box {
		max-width: 900px;
		margin-bottom: 40px;
		padding: 20px;

		& .notice {
			font-size: 14px;
			margin-bottom: 40px;
		}

		& .input-wrapper {
			margin-bottom: 30px;
		}

		& label {
			text-transform: uppercase;
			font-size: 12px;
			padding: 0 15px;
		}

		& input,
		& select,
		& textarea {
			font-size: 16px;
			border-radius: 0;
		}

		& textarea {
			resize: none;
		}

		& input[type='file'] {
			display: none;
		}

		& .logo-wrapper {
			border-radius: 0.5em;

			& img {
				max-width: 100%;
				height: 250px;
				object-fit: contain;
				object-position: center;
			}
		}

		& .file-btn {
			cursor: pointer;
			text-align: center;
			font-size: 12px;
			font-weight: bold;
			border: 2px solid transparent;
			border-radius: 0.4em;
			padding: 0.9em 2em;
			margin: 0 10px 10px 0;
			user-select: none;
			-webkit-user-drag: none;
			transition: 200ms;

			&:hover {
				transform: scale(0.95);
			}
		}

		& .remove-btn {
			background: transparent;
		}
	}

	button {
		margin-right: 10px;
	}
</style>
