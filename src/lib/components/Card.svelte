<script>
	let isProduction = import.meta.env.MODE === 'production';

	/**
	 * @type {string}
	 */
	export let name;

	let longerEntries =
		name === 'metaphors' ||
		name === 'epithets' ||
		name === 'binary_adjective_pairs' ||
		name === 'idioms';
	let size = longerEntries ? '1.5rem' : '2.5rem';

	let mwAPICallable =
		name === 'tier_one_verbs' ||
		name === 'tier_two_verbs' ||
		name === 'latinate_verbs' ||
		name === 'abstract_nouns';

	/**
	 * @type {string[]}
	 */
	export let list;

	/**
	 * @type {string}
	 */
	let item = list[0];

	function handleClick() {
		item = list[Math.floor(Math.random() * list.length)];
	}

	/**
	 * @type {string}
	 */
	let definition = 'definition';

	async function getDefinition() {
		let response, data;
		// if local, call the local Go server to proxy the call
		if (!isProduction) {
			response = await fetch(`http://localhost:8080/definition?word=${item}`);
			data = await response.json();
			console.log(data);
			definition = data[0].shortdef[0];
		} else {
			response = await fetch(
				`https://gilded-truffle-599b56.netlify.app/.netlify/functions/definition?word=${item}`
			);
			data = await response.json();
			console.log(data);
			definition = data[0].shortdef[0];
		}
	}

	async function getSynonyms() {
		let response, data;
		// if local, call the local Go server to proxy the call
		if (!isProduction) {
			response = await fetch(`http://localhost:8080/synonyms?word=${item}`);
			data = await response.json();
			console.log(data);
		} else {
			response = await fetch(
				`https://gilded-truffle-599b56.netlify.app/.netlify/functions/synonyms?word=${item}`
			);
			data = await response.json();
			console.log(data);
		}
	}
</script>

<section class="card">
	<p style="font-size: {size}">{@html item}</p>
	<div>
		<!-- svelte-ignore a11y-autofocus -->
		<button on:click={handleClick} autofocus>Shuffle</button>
		{#if mwAPICallable}
			<button on:click={getDefinition}>Define</button>
			<button on:click={getSynonyms}>Get Synonyms</button>
		{/if}
	</div>
</section>

<style>
	.card {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: space-evenly;
		align-items: center;
		margin: 0 auto;
		width: 60vw;
		height: 60vh;
		color: var(--color-text-0);
		background: var(--color-bg-1);
		border-radius: 10px;
		box-shadow: 0 14px 30px rgba(0, 0, 0, 0.25), 0 10px 30px rgba(0, 0, 0, 0.22);
	}

	p {
		overflow-wrap: break-word;
		margin: 20px;
	}
</style>
