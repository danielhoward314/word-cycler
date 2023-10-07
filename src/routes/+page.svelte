<script>
	import { onMount } from 'svelte';

	/**
	 * @type {string}
	 */
	let definition = 'definition';

	async function getDefinition() {
		const response = await fetch(
			'https://gilded-truffle-599b56.netlify.app/.netlify/functions/definition?word=fade'
		);
		const data = await response.json();
		definition = data[0].shortdef[0];
	}
	// onMount(async () => {
	// 	fetch('https://gilded-truffle-599b56.netlify.app/.netlify/functions/definition?word=fade')
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			console.log(data);
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 			return [];
	// 		});
	// });
</script>

<svelte:head>
	<title>Word Cycler</title>
	<meta name="description" content="Word Cycler App" />
</svelte:head>

<section>
	<h1>Word Cycler</h1>
	<button on:click={getDefinition} />
	<p>{@html definition}</p>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}
</style>
