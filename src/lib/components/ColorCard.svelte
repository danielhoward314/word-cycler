<script>
	/**
	 * @type {any[]}
	 */
	export let list;

	/**
	 * @type {any}
	 */
	let item = list[0];

	/**
	 * @type {string}
	 */
	let compliment = '#FFFFFF';

	function handleClick() {
		item = list[Math.floor(Math.random() * list.length)];
		let hexColor = item.Hex;
		// Remove the "#" character if it's present
		hexColor = hexColor.replace(/^#/, '');

		// Parse the hex color into its RGB components
		const r = parseInt(hexColor.slice(0, 2), 16);
		const g = parseInt(hexColor.slice(2, 4), 16);
		const b = parseInt(hexColor.slice(4, 6), 16);

		// Calculate the complementary color by subtracting each RGB component from 255
		const complementaryR = 255 - r;
		const complementaryG = 255 - g;
		const complementaryB = 255 - b;

		// Convert the complementary RGB components back to hex format
		compliment =
			'#' +
			complementaryR.toString(16).padStart(2, '0') +
			complementaryG.toString(16).padStart(2, '0') +
			complementaryB.toString(16).padStart(2, '0');
	}
</script>

<section class="card" style="background: {item.Hex}">
	<h1 style="color: {compliment}">{@html item.Text}</h1>
	<!-- svelte-ignore a11y-autofocus -->
	<button on:click={handleClick} autofocus>Shuffle</button>
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
