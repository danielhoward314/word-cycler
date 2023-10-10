<script>
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { goto } from '$app/navigation';
	import netlifyIdentity from 'netlify-identity-widget';
	import Header from './Header.svelte';
	import './styles.css';

	const isProduction = import.meta.env.MODE === 'production';
	const user = writable({ isLoggedIn: false });
	setContext('user', user);

	const redirectURL = writable('');
	setContext('redirectURL', redirectURL);

	if (isProduction) {
		netlifyIdentity.init();
	}

	/**
	 * @param {string} action
	 */
	function handleUserAction(action) {
		if (!isProduction) {
			if (action === 'login' || action === 'signup') {
				console.log(action);
				console.log($user);
				$user = { isLoggedIn: true };
				console.log($user);
			}
		} else {
			if (action === 'login' || action === 'signup') {
				netlifyIdentity.open(action);
				netlifyIdentity.on('login', () => {
					$user = { isLoggedIn: true };
					netlifyIdentity.close();
					if ($redirectURL !== '') {
						goto($redirectURL);
						$redirectURL = '';
					}
				});
			} else if (action === 'logout') {
				goto('/');
				$user = { isLoggedIn: true };
				netlifyIdentity.logout();
			}
		}
	}
</script>

<div class="app">
	<Header />

	<main>
		{#if !$user.isLoggedIn}
			<div>
				<button on:click={() => handleUserAction('login')}>Log In</button>
				<button on:click={() => handleUserAction('signup')}>Sign Up</button>
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
</style>
