<script>
	/**
	 * @type {string}
	 */
	 export let name;

	 let size = name === 'epithets' || name === 'binary_adjective_pairs' ? '1.5rem' : '2.5rem';

/**
	 * @type {string[]}
	 */
	export let list;

	/**
	 * @type {string}
	 */
	let item = list[0];
	console.log(item.length);

	function handleClick() {
		item = list[Math.floor(Math.random() * list.length)];
	}
</script>

<section class="card">
	<h1 style="font-size: {size}">{@html item}</h1>
	<!-- svelte-ignore a11y-autofocus -->
	<button on:click={handleClick} autofocus>Shuffle</button>
</section>

<style>
	.card {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
		width: 40vw;
		height: 50vh;
		color: var(--color-text-0);
		background: var(--color-bg-1);
		border-radius: 10px;
		box-shadow: 0 14px 30px rgba(0, 0, 0, 0.25), 0 10px 30px rgba(0, 0, 0, 0.22);
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
