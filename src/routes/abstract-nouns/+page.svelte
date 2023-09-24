<script>
	import Card from '$lib/components/Card.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>Abstract Nouns</title>
	<meta name="description" content="Abstract Nouns List" />
</svelte:head>

<Card name="abstract_nouns" list={data.list} />
