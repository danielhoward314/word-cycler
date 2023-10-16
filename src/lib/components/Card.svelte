<script>
	import { browser } from '$app/environment';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import DefinitionContent from '$lib/components/DefinitionContent.svelte';

	let isProduction = import.meta.env.MODE === 'production';

	let dialog; // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal();

	let showModal = false;

	let modalContentType = '';

	const modalData = writable([]);
	setContext('modalData', modalData);

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
		name === 'abstract_nouns' ||
		name === 'adjectives';

	/**
	 * @type {string[]}
	 */
	export let list;

	/**
	 * @type {string}
	 */
	let item = list[0];

	function handleShuffle() {
		item = list[Math.floor(Math.random() * list.length)];
		showModal = false;
		modalContentType = '';
		$modalData = [];
	}

	function convertMWSynonymResponse(data) {
		if (!data || !data.length) {
			return [];
		}

		return data.map((syn) => {
			// some entries just return an array of strings
			if (typeof syn === 'string') {
				return syn;
			}
			// TODO shortdef is an array of definitions
			// shortdef[0] maps to syns[0] and ants[0]
			return {
				partOfSpeech: (syn || {}).fl ? (syn || {}).fl : '',
				synonyms: ((syn || {}).meta || {}).syns ? ((syn || {}).meta || {}).syns : [],
				antonyms: ((syn || {}).meta || {}).ants ? ((syn || {}).meta || {}).ants : [],
				definition: (syn || {}).shortdef ? (syn || {}).shortdef : []
			};
		});
	}

	function convertMWDefinitionResponse(data) {
		if (!data || !data.length) {
			return [];
		}
		return data.map((def) => {
			if (typeof def === 'string') {
				return def;
			}
			const et = (def || {}).et ? (def || {}).et : [];
			let etymology = '';
			if (et.length === 1 && et[0].length === 2) {
				etymology = et[0][1];
			}
			let partOfSpeech = (def || {}).fl;
			let definitionAddedContext;
			if (partOfSpeech === 'phrasal verb' || partOfSpeech === 'idiom') {
				definitionAddedContext = ((def || {}).hwi || {}).hw;
			}
			return {
				partOfSpeech: (def || {}).fl,
				definitions: (def || {}).shortdef ? (def || {}).shortdef : [],
				etymology,
				definitionAddedContext
			};
		});
	}

	async function getDefinition() {
		modalContentType = 'DEFINITION';
		let response, data;
		if (browser) {
			const rawLocalStorage = localStorage.getItem(item.toLowerCase() + '_def');
			if (rawLocalStorage) {
				$modalData = JSON.parse(rawLocalStorage);
				showModal = true;
				return;
			}
		}
		// if local, call the local Go server to proxy the call
		if (!isProduction) {
			response = await fetch(`http://localhost:8080/definition?word=${item}`);
			data = await response.json();
			$modalData = convertMWDefinitionResponse(data);
			localStorage.setItem(item.toLowerCase() + '_def', JSON.stringify($modalData));
			showModal = true;
		} else {
			response = await fetch(
				`https://gilded-truffle-599b56.netlify.app/.netlify/functions/definition?word=${item}`
			);
			data = await response.json();
			$modalData = convertMWDefinitionResponse(data);
			localStorage.setItem(item.toLowerCase() + '_def', JSON.stringify($modalData));
			showModal = true;
		}
	}

	async function getSynonyms() {
		modalContentType = 'SYNONYMS';
		let response, data;
		if (browser) {
			const rawLocalStorage = localStorage.getItem(item.toLowerCase() + '_syn');
			if (!!rawLocalStorage) {
				$modalData = JSON.parse(rawLocalStorage);
				showModal = true;
				return;
			}
		}
		// if local, call the local Go server to proxy the call
		if (!isProduction) {
			response = await fetch(`http://localhost:8080/synonyms?word=${item}`);
			data = await response.json();
			$modalData = convertMWSynonymResponse(data);
			localStorage.setItem(item.toLowerCase() + '_syn', JSON.stringify($modalData));
			showModal = true;
		} else {
			response = await fetch(
				`https://gilded-truffle-599b56.netlify.app/.netlify/functions/synonyms?word=${item}`
			);
			data = await response.json();
			$modalData = convertMWSynonymResponse(data);
			localStorage.setItem(item.toLowerCase() + '_syn', JSON.stringify($modalData));
			showModal = true;
		}
	}
</script>

<section class="card">
	<p style="font-size: {size}">{@html item.toLowerCase()}</p>
	<div>
		<!-- svelte-ignore a11y-autofocus -->
		<button on:click={handleShuffle} autofocus>Shuffle</button>
		{#if mwAPICallable}
			<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
			<dialog
				bind:this={dialog}
				on:close={() => (showModal = false)}
				on:click|self={() => dialog.close()}
			>
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div on:click|stopPropagation>
					<DefinitionContent
						data={$modalData}
						type={modalContentType}
						word={item.toLocaleLowerCase()}
					/>
					<!-- svelte-ignore a11y-autofocus -->
					<button autofocus on:click={() => dialog.close()}>Close</button>
				</div>
			</dialog>
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

	dialog {
		width: 80vw;
		border-radius: 10px;
		border: none;
		padding: 0;
		box-shadow: 0 14px 30px rgba(0, 0, 0, 0.25), 0 10px 30px rgba(0, 0, 0, 0.22);
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
