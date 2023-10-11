<script>
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Swal from 'sweetalert2';
	import './styles.css';

	export let data;

	const isProduction = import.meta.env.MODE === 'production';

	const user = writable({ isLoggedIn: false });
	setContext('user', user);

	const failCount = writable(0);
	setContext('failCount', failCount);

	const formDisabled = writable(false);
	setContext('formDisabled', formDisabled);

	function resetFailCounter() {
		if (browser) {
			$failCount = 0;
			$formDisabled = false;
			localStorage.setItem('word_cycler_local_fail_count', '0');
		}
	}

	onMount(() => {
		$formDisabled = false;
		if (browser) {
			let currentVal = localStorage.getItem('word_cycler_local_fail_count');
			if (currentVal) {
				$failCount = parseInt(currentVal, 10);
				if ($failCount >= 4) {
					$formDisabled = true;
				}
			} else {
				$failCount = 0;
			}
		} else {
			$formDisabled = true;
		}
	});

	function incrementFailCounter() {
		if (browser) {
			let fc = '0';
			let failCountAsNumber = 0;
			let currentVal = localStorage.getItem('word_cycler_local_fail_count');
			if (currentVal) {
				failCountAsNumber = +currentVal + 1;
				fc = `${failCountAsNumber}`;
			}
			$failCount = failCountAsNumber;
			$formDisabled = failCountAsNumber >= 4;
			localStorage.setItem('word_cycler_local_fail_count', fc);
		}
	}

	async function onSubmit(e) {
		if (!isProduction) {
			const localRes = await fetch('http://localhost:8080/authenticate');
			const localResContent = await localRes.json();
			if (localResContent.success) {
				$user = { isLoggedIn: true };
			}
			return;
		} else {
			const formData = new FormData(e.target);
			const data = {};
			for (let field of formData) {
				const [key, value] = field;
				data[key] = value;
			}
			// data should now = { password: "<password>"}
			const rawResponse = await fetch(
				'https://gilded-truffle-599b56.netlify.app/.netlify/functions/authenticate',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(data)
				}
			);

			const responseContent = await rawResponse.json();
			if (responseContent && responseContent.success) {
				$user = { isLoggedIn: true };
				localStorage.setItem('word_cycler_local_fail_count', '0');
			} else {
				if (browser) {
					let fc = '0';
					let failCountAsNumber = 0;
					let currentVal = localStorage.getItem('word_cycler_local_fail_count');
					if (currentVal) {
						failCountAsNumber = +currentVal + 1;
						fc = `${failCountAsNumber}`;
					}
					$failCount = failCountAsNumber + 1;
					$formDisabled = $failCount >= 4;
					localStorage.setItem('word_cycler_local_fail_count', fc);
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Wrong password!'
					});
				} else {
					$formDisabled = true;
				}
			}
		}
	}
</script>

<div class="app">
	{#if data.wordCyclerCookie || $user.isLoggedIn}
		<header>
			<nav>
				<ul>
					<li aria-current={$page.url.pathname.startsWith('/tier-one-verbs') ? 'page' : undefined}>
						<a href="/tier-one-verbs">Verbs One</a>
					</li>
					<li aria-current={$page.url.pathname.startsWith('/tier-two-verbs') ? 'page' : undefined}>
						<a href="/tier-two-verbs">Verbs Two</a>
					</li>
					<li aria-current={$page.url.pathname.startsWith('/latinate-verbs') ? 'page' : undefined}>
						<a href="/latinate-verbs">Latinate Verbs</a>
					</li>
					<li
						aria-current={$page.url.pathname.startsWith('/binary-adjective-pairs')
							? 'page'
							: undefined}
					>
						<a href="/binary-adjective-pairs">Adjective Pairs</a>
					</li>
					<li aria-current={$page.url.pathname.startsWith('/abstract-nouns') ? 'page' : undefined}>
						<a href="/abstract-nouns">Abstract Nouns</a>
					</li>
					<li aria-current={$page.url.pathname.startsWith('/epithets') ? 'page' : undefined}>
						<a href="/epithets">Epithets</a>
					</li>
					<li
						aria-current={$page.url.pathname.startsWith('/greek-latin-roots') ? 'page' : undefined}
					>
						<a href="/greek-latin-roots">Roots</a>
					</li>
					<li aria-current={$page.url.pathname.startsWith('/idioms') ? 'page' : undefined}>
						<a href="/idioms">Idioms</a>
					</li>
					<li aria-current={$page.url.pathname.startsWith('/color-list') ? 'page' : undefined}>
						<a href="/color-list">Colors</a>
					</li>
					<li aria-current={$page.url.pathname.startsWith('/metaphors') ? 'page' : undefined}>
						<a href="/metaphors">Metaphors</a>
					</li>
				</ul>
			</nav>
		</header>
	{/if}

	<main>
		{#if !(data.wordCyclerCookie || $user.isLoggedIn)}
			<div>
				<form on:submit|preventDefault={onSubmit}>
					<label>
						Password
						<input name="password" type="password" />
					</label>
					<button disabled={$formDisabled}>Log in</button>
				</form>
				{#if !isProduction}
					<button on:click={() => incrementFailCounter()}>Increment Failures</button>
					<button on:click={() => resetFailCounter()}>Reset Failures</button>
				{/if}
			</div>
		{:else}
			<slot />
		{/if}
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1rem;
		width: 100%;
		height: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}

	header {
		display: flex;
	}

	nav {
		display: flex;
		width: 100%;
		/* background: #ffebb7; */
		background: #9ddcdc;
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
		padding-right: 1em;
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text-1);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-text-hover-1);
		border-bottom: 0.35em solid #dece9c;
	}
</style>
