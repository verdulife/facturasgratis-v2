<script>
	export let src, width, height, className, title, alt;
</script>

<img {alt} {src} {width} {height} decoding="async" class={className} loading="lazy" {title} />
