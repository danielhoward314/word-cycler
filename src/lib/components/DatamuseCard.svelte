<script>
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	const baseURL = 'https://api.datamuse.com/words?';

	/**
	 * @type {string[]}
	 */
	export let list;

	/**
	 * @type {string}
	 */
	let item = list[0];

	/**
	 * @type {string}
	 */
	let datamuseWord;

	function handleShuffle() {
		item = list[Math.floor(Math.random() * list.length)];
		datamuseWord = item;
	}

	const datamuseData = writable([]);
	setContext('datamuseData', datamuseData);

	async function onSubmit(e) {
		const formData = new FormData(e.target);
		const data = {};
		for (let field of formData) {
			const [key, value] = field;
			data[key] = value;
		}
		let response, undividedData;
		let searchTerm = data.word.replace(/\s/g, '+');
		searchTerm = searchTerm.toLowerCase();
		response = await fetch(`${baseURL}${data.param}=${searchTerm}`);
		undividedData = await response.json();
		let colOne, colTwo, colThree, colFour, colFive;
		if (undividedData && undividedData.length > 80) {
			colOne = undividedData.slice(0, 20);
			colTwo = undividedData.slice(20, 40);
			colThree = undividedData.slice(40, 60);
			colFour = undividedData.slice(60, 80);
			colFive = undividedData.slice(80);
			$datamuseData = {
				columns: [colOne, colTwo, colThree, colFour, colFive]
			};
		} else if (undividedData.length > 60) {
			colOne = undividedData.slice(0, 20);
			colTwo = undividedData.slice(20, 40);
			colThree = undividedData.slice(40, 60);
			colFour = undividedData.slice(60);
			$datamuseData = {
				columns: [colOne, colTwo, colThree, colFour]
			};
		} else if (undividedData.length > 40) {
			colOne = undividedData.slice(0, 20);
			colTwo = undividedData.slice(20, 40);
			colThree = undividedData.slice(40);
			$datamuseData = {
				columns: [colOne, colTwo, colThree]
			};
		} else if (undividedData.length > 20) {
			colOne = undividedData.slice(0, 20);
			colTwo = undividedData.slice(20);
			$datamuseData = {
				columns: [colOne, colTwo]
			};
		} else {
			$datamuseData = {
				columns: [undividedData]
			};
		}
	}
</script>

<section class="card">
	<form on:submit|preventDefault={onSubmit}>
		<div class="dropdown-container">
			<label for="datamuse-search-select"
				>Choose <a class="datamuse-link" href="https://www.datamuse.com/api/">Datamuse</a> search parameter</label
			>

			<select name="param" id="datamuse-search-select">
				<option value="ml">words with similar meaning</option>
				<option value="sl">words with similar sound</option>
				<option value="sp">words with similar spelling</option>
				<option value="rel_jja">nouns modified by the given adjective</option>
				<option value="rel_jjb">adjectives used to modify the given noun</option>
				<option value="rel_spc">"Kind of" (direct hypernyms, per WordNet)</option>
				<option value="rel_gen">"More general than" (direct hyponyms, per WordNet)</option>
				<option value="rel_com">"Comprises" (direct holonyms, per WordNet)</option>
				<option value="rel_par">"Part of" (direct meronyms, per WordNet)</option>
				<option value="rel_bga">frequent followers</option>
				<option value="rel_bgb">frequent predecessors</option>
				<option value="rel_hom">homophones</option>
				<option value="rel_cns">consonant match</option>
			</select>
		</div>
		<div class="input-row-container">
			<label for="datamuse-word-input">Word</label>
			<input
				placeholder="Search typed word or hit shuffle"
				name="word"
				type="text"
				id="datamuse-word-input"
				bind:value={datamuseWord}
			/>
			<button>Search</button>
			<!-- svelte-ignore a11y-autofocus -->
			<button on:click={handleShuffle} autofocus>Shuffle</button>
		</div>
	</form>
	<div class="examples-container">
		{#if $datamuseData && $datamuseData.columns && $datamuseData.columns.length > 0}
			{#each $datamuseData.columns as column}
				<ul class="outer-list">
					{#each column as col}
						<li class="list-item">{@html col.word}</li>
					{/each}
				</ul>
			{/each}
		{/if}
	</div>
</section>

<style>
	.card {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		border-radius: 10px;
		border: none;
		padding: 20px;
		margin: 0 auto;
		width: 60vw;
		height: 60vh;
		color: var(--color-text-0);
		background: var(--color-bg-1);
		box-shadow: 0 14px 30px rgba(0, 0, 0, 0.25), 0 10px 30px rgba(0, 0, 0, 0.22);
		overflow-y: scroll;
	}

	form {
		display: flex;
		flex-direction: column;
	}

	.card::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}

	input {
		min-width: 20vw;
		max-width: 30vw;
	}

	label {
		padding-right: 10px !important;
	}

	.datamuse-link {
		color: #ff8b8b;
	}

	.dropdown-container {
		display: flex;
		padding: 20px;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		justify-content: space-around;
		align-items: center;
	}

	.input-row-container {
		display: flex;
		padding: 20px;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		justify-content: space-around;
		align-items: center;
		padding-right: 5px;
	}

	.examples-container {
		display: flex;
		width: 100%;
	}

	.examples-container li {
		font-size: 1.25rem;
		padding-right: 50px;
	}
</style>
