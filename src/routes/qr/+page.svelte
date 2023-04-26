<script>
	import { qrGenerator as meta } from '$lib/meta';
	import { qrGenerator } from '$lib/tools';
	import { toString as qrCode } from 'qrcode';

	import Meta from '$components/global/Meta.svelte';
	import Header from '$components/global/Header.svelte';

	let src = '';

	qrCode('https://google.es/', { type: 'svg' }, (error, qrcode) => {
		src = qrcode;
	});
</script>

<Meta data={meta} />

<Header data={qrGenerator} />

<div class="w1/2">
	<h1>qr</h1>
	{@html src}
</div>
