<small>
	<slot />
</small>

<style lang="postcss">
	small {
		background-color: var(--base-200);
		color: var(--base-600);
		font-family: var(--font-title);
		border-radius: 0.2rem 0.2rem 0 0;
		transform: translateX(1em);
		padding: 0.25em 0.75em;
		
		@media (--dark) {
			background-color: var(--base-800);
			color: var(--base-300);
		}
	}
</style>
