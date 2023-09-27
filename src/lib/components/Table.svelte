<script>
	/**
	 * @type {any[]}
	 */
	export let list;

	/**
	 * @type {any}
	 */
	let randomSubset = list.slice(0, 7);

	function handleClick() {
		let randomSubsetStartIdx = Math.floor(Math.random() * (list.length - 10));
		randomSubset = list.slice(randomSubsetStartIdx, randomSubsetStartIdx + 7);
	}
</script>

<table>
	<thead>
		<th>Root</th>
		<th>Meaning in English</th>
		<th>Origin language</th>
		<th>Etymology (root language)</th>
		<th>English examples</th>
	</thead>
	<tbody>
		{#each randomSubset as row}
			<tr>
				<td>{row.Root}</td>
				<td>{row.MeaningInEnglish}</td>
				<td>{row.OriginLanguage}</td>
				<td>{row.RootOrigin}</td>
				<td>{row.EnglishExamples}</td>
			</tr>
		{/each}
	</tbody>
</table>
<!-- svelte-ignore a11y-autofocus -->
<button on:click={handleClick} autofocus>Shuffle</button>

<style>
	table {
		overflow: auto;
		table-layout: fixed;
		width: 100%;
		border-collapse: collapse;
		border: 3px solid #095359c2;
		background: var(--color-bg-1);
		color: #f2e4bb;
	}

	th,
	td {
		padding: 15px;
	}

	th {
		letter-spacing: 2px;
	}

	td {
		letter-spacing: 1px;
	}

	tbody td {
		text-align: center;
	}

	tbody tr:nth-child(odd) {
		background-color: #095359c2;
	}

	tbody tr:nth-child(even) {
		background-color: var(--color-bg-1);
	}

	button {
		z-index: 1000;
		align-items: center;
		appearance: none;
		background-color: #fcfcfd;
		border-radius: 4px;
		border-width: 0;
		box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px,
			#d6d6e7 0 -3px 0 inset;
		box-sizing: border-box;
		color: #36395a;
		cursor: pointer;
		display: inline-flex;
		height: 48px;
		justify-content: center;
		line-height: 1;
		list-style: none;
		overflow: hidden;
		padding-left: 16px;
		padding-right: 16px;
		position: relative;
		text-align: left;
		text-decoration: none;
		transition: box-shadow 0.15s, transform 0.15s;
		user-select: none;
		-webkit-user-select: none;
		touch-action: manipulation;
		white-space: nowrap;
		will-change: box-shadow, transform;
		font-size: 18px;
	}

	button:focus {
		box-shadow: #d6d6e7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px,
			rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;
	}

	button:hover {
		box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px,
			#d6d6e7 0 -3px 0 inset;
		transform: translateY(-2px);
	}

	button:active {
		box-shadow: #d6d6e7 0 3px 7px inset;
		transform: translateY(2px);
	}
</style>
