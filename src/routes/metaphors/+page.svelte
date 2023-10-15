<script>
	import MetaphorCard from '$lib/components/MetaphorCard.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>Metaphors</title>
	<meta name="description" content="Metaphors List" />
</svelte:head>

<MetaphorCard name="metaphors" list={data.list} />
