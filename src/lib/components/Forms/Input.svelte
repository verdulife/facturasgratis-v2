<script>
	let message = '';
  
	function validation(e) {
		const { target } = e;
		if (target.validity.valueMissing) {
			message = 'Campo obligatorio';
		} else {
			target.setCustomValidity('');
		}
	}
</script>

<input {...$$props} on:input={validation} />
<span data-validation={message} />

<style lang="postcss">
	input + span {
		width: 100%;
		font-size: 12px;
		opacity: 0.2;
		padding: 0 0.5em;
	}

	input:invalid:required + span:before {
		content: attr(data-validation);
	}

	input:out-of-range + span:before {
		content: attr(data-validation);
	}
</style>
