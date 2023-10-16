<script>
	import DatamuseCard from '$lib/components/DatamuseCard.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>Datamuse Explorer</title>
	<meta name="description" content="Datamuse Explorer" />
</svelte:head>

<DatamuseCard list={data.list} />
