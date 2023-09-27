<script>
	import Card from '$lib/components/Card.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>Idioms</title>
	<meta name="description" content="Idioms List" />
</svelte:head>

<Card name="idioms" list={data.list} />
