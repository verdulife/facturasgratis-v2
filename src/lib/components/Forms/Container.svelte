<article class="col wfull">
	<slot />
</article>

<style lang="postcss">
	article {
		gap: 1.25em;
		background-color: hsl(var(--base-hsl), 0.4);
		border: 1px solid var(--base-200);
		border-bottom-width: 5px;
		border-radius: 0.2rem;
		padding: 1.75em;
		overflow: hidden;

		@media (--dark) {
			background-color: hsl(var(--base-800-hsl), 0.2);
			border-color: var(--base-800);
		}
	}
</style>
