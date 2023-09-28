<script>
	import ColorCard from '$lib/components/ColorCard.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>Colors</title>
	<meta name="description" content="Colors List" />
</svelte:head>

<ColorCard list={data.list} />
