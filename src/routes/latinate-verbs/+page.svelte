<script>
	import Card from '$lib/components/Card.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>Latinate Verbs</title>
	<meta name="description" content="Latinate Verbs List" />
</svelte:head>

<Card name="latinate_verbs" list={data.list} />
