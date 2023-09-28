<script>
	import Card from '$lib/components/Card.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>Metaphors</title>
	<meta name="description" content="Metaphors List" />
</svelte:head>

<Card name="metaphors" list={data.list} />
