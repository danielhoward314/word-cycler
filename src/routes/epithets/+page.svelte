<script>
	import Card from '$lib/components/Card.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>Epithets</title>
	<meta name="description" content="Epithets List" />
</svelte:head>

<Card name="epithets" list={data.list} />
