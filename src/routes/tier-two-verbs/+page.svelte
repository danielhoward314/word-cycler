<script>
	import Card from '$lib/components/Card.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>Tier Two Verbs</title>
	<meta name="description" content="Tier Two Verbs List" />
</svelte:head>

<Card name="tier_two_verbs" list={data.list} />
