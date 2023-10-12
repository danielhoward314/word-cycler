<script>
	import { browser } from '$app/environment';
	import Modal from '$lib/components/Modal.svelte';

	let isProduction = import.meta.env.MODE === 'production';

	let showModal = false;

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

	async function getDefinition() {
		let response, data;
		if (browser) {
			const rawLocalStorage = localStorage.getItem(item);
			if (rawLocalStorage) {
				const parsedLocalStorage = JSON.parse(rawLocalStorage);
				console.log('from localStorage');
				console.log(parsedLocalStorage);
				showModal = true;
				return;
			}
		}
		// if local, call the local Go server to proxy the call
		if (!isProduction) {
			response = await fetch(`http://localhost:8080/definition?word=${item}`);
			data = await response.json();
			console.log('from local api');
			console.log(data);
			localStorage.setItem(item, JSON.stringify(data));
			showModal = true;
		} else {
			response = await fetch(
				`https://gilded-truffle-599b56.netlify.app/.netlify/functions/definition?word=${item}`
			);
			data = await response.json();
			console.log('from netlify function');
			console.log(data);
			localStorage.setItem(item, JSON.stringify(data));
			showModal = true;
		}
	}

	async function getSynonyms() {
		let response, data;
		if (browser) {
			const rawLocalStorage = localStorage.getItem(item);
			if (rawLocalStorage) {
				const parsedLocalStorage = JSON.parse(rawLocalStorage);
				console.log('from localStorage');
				console.log(parsedLocalStorage);
				showModal = true;
				return;
			}
		}
		// if local, call the local Go server to proxy the call
		if (!isProduction) {
			response = await fetch(`http://localhost:8080/synonyms?word=${item}`);
			data = await response.json();
			console.log('from local api');
			console.log(data);
			localStorage.setItem(item, JSON.stringify(data));
			showModal = true;
		} else {
			response = await fetch(
				`https://gilded-truffle-599b56.netlify.app/.netlify/functions/synonyms?word=${item}`
			);
			data = await response.json();
			console.log('from netlify function');
			console.log(data);
			localStorage.setItem(item, JSON.stringify(data));
			showModal = true;
		}
	}
</script>

<section class="card">
	<p style="font-size: {size}">{@html item}</p>
	<div>
		<!-- svelte-ignore a11y-autofocus -->
		<button on:click={handleClick} autofocus>Shuffle</button>
		{#if mwAPICallable}
			<Modal bind:showModal>
				<h2 slot="header">
					modal
					<small><em>adjective</em> mod·al \ˈmō-dəl\</small>
				</h2>

				<ol class="definition-list">
					<li>of or relating to modality in logic</li>
					<li>
						containing provisions as to the mode of procedure or the manner of taking effect —used
						of a contract or legacy
					</li>
					<li>of or relating to a musical mode</li>
					<li>of or relating to structure as opposed to substance</li>
					<li>
						of, relating to, or constituting a grammatical form or category characteristically
						indicating predication
					</li>
					<li>of or relating to a statistical mode</li>
					<li>of or relating to modality in logic</li>
					<li>
						containing provisions as to the mode of procedure or the manner of taking effect —used
						of a contract or legacy
					</li>
					<li>of or relating to a musical mode</li>
					<li>of or relating to structure as opposed to substance</li>
					<li>
						of, relating to, or constituting a grammatical form or category characteristically
						indicating predication
					</li>
					<li>of or relating to a statistical mode</li>
					<li>of or relating to modality in logic</li>
					<li>
						containing provisions as to the mode of procedure or the manner of taking effect —used
						of a contract or legacy
					</li>
					<li>of or relating to a musical mode</li>
					<li>of or relating to structure as opposed to substance</li>
					<li>
						of, relating to, or constituting a grammatical form or category characteristically
						indicating predication
					</li>
					<li>of or relating to a statistical mode</li>
					<li>of or relating to modality in logic</li>
					<li>
						containing provisions as to the mode of procedure or the manner of taking effect —used
						of a contract or legacy
					</li>
					<li>of or relating to a musical mode</li>
					<li>of or relating to structure as opposed to substance</li>
					<li>
						of, relating to, or constituting a grammatical form or category characteristically
						indicating predication
					</li>
					<li>of or relating to a statistical mode</li>
					<li>of or relating to modality in logic</li>
					<li>
						containing provisions as to the mode of procedure or the manner of taking effect —used
						of a contract or legacy
					</li>
					<li>of or relating to a musical mode</li>
					<li>of or relating to structure as opposed to substance</li>
					<li>
						of, relating to, or constituting a grammatical form or category characteristically
						indicating predication
					</li>
					<li>of or relating to a statistical mode</li>
					<li>of or relating to modality in logic</li>
					<li>
						containing provisions as to the mode of procedure or the manner of taking effect —used
						of a contract or legacy
					</li>
					<li>of or relating to a musical mode</li>
					<li>of or relating to structure as opposed to substance</li>
					<li>
						of, relating to, or constituting a grammatical form or category characteristically
						indicating predication
					</li>
					<li>of or relating to a statistical mode</li>
				</ol>

				<a href="https://www.merriam-webster.com/dictionary/modal">merriam-webster.com</a>
			</Modal>
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
