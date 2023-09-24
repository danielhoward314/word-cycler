<script>
	import Card from '$lib/components/Card.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>Tier One Verbs</title>
	<meta name="description" content="Tier One Verbs List" />
</svelte:head>

<Card name="tier_one_verbs" list={data.list} />
