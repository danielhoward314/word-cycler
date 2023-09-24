<script>
	import Card from '$lib/components/Card.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>Binary Adjective Pairs</title>
	<meta name="description" content="Binary Adjective Pairs List" />
</svelte:head>

<Card name="binary_adjective_pairs" list={data.list} />
