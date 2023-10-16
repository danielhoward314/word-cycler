<script>
	import Card from '$lib/components/Card.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>Adjectives</title>
	<meta name="description" content="Adjectives List" />
</svelte:head>

<Card name="adjectives" list={data.list} />
