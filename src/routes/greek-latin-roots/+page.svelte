<script>
	import Table from '$lib/components/Table.svelte';
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>Greek and Latin Roots</title>
	<meta name="description" content="Greek and Latin Roots List" />
</svelte:head>

<Table list={data.list} />
