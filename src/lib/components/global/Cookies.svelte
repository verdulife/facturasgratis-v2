<script>
	import { browser } from '$app/environment';
	import { Cookies } from '$lib/stores';

	function acceptCookies() {
		$Cookies.visited = true;
	}
</script>

{#if browser && !$Cookies.visited}
	<aside class="row acenter">
		<span>🍪</span>

		<p>
			Esta web utiliza cookies para mejorar tu experiencia de navegación. Visita nuestra
			<a rel="license" href="/privacidad">Política de privacidad</a>.
		</p>

		<button class="pri semi" on:click={acceptCookies}>ACEPTAR</button>
	</aside>
{/if}

<style lang="postcss">
	aside {
		position: fixed;
		bottom: 1em;
		left: 50%;
		transform: translate(-50%, 0);
		max-width: calc(100% - 2em);
		gap: 0.5em;
		background-color: hsl(var(--base-hsl), 0.8);
		backdrop-filter: var(--blur);
		color: var(--base);
		border: 1px solid hsl(var(--base-900-hsl), 0.1);
		border-radius: 0.3em;
		padding: var(--spacing-sm) var(--spacing-md);
		animation: bottomFade 500ms backwards;
		animation-delay: 1s;

		@media (--dark) {
			background-color: hsl(var(--base-900-hsl), 0.8);
			border: 1px solid hsl(var(--base-hsl), 0.1);
		}
	}

	p {
		font-size: var(--font-xs);
		white-space: nowrap;
	}

	button {
		margin-left: 1em;
		padding: var(--spacing-xs) var(--spacing-xl);
	}

	@keyframes bottomFade {
		0% {
			transform: translate(-50%, 2em);
			opacity: 0;
		}
		100% {
			transform: translate(-50%, 0);
			opacity: 1;
		}
	}
</style>
