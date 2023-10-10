<script>
	import { onMount, setContext } from 'svelte';
	import { goto } from '$app/navigation';
	import netlifyIdentity from 'netlify-identity-widget';
	import Header from './Header.svelte';
	import './styles.css';
	import { localUser, redirectURL, user } from '$lib/store/netlifyIdentityWidget';

	const isProduction = import.meta.env.MODE === 'production';

	onMount(() => {
		if (isProduction) {
			netlifyIdentity.init();
		}
	});

	$: isLoggedIn = (isProduction && !!$user) || (!isProduction && $localUser.isLoggedIn);

	/**
	 * @param {string} action
	 */
	function handleUserAction(action) {
		if (!isProduction) {
			if (action === 'login' || action === 'signup') {
				localUser.login();
			}
		} else {
			if (action === 'login' || action === 'signup') {
				netlifyIdentity.open(action);
				netlifyIdentity.on('login', (u) => {
					user.login(u);
					netlifyIdentity.close();
					if ($redirectURL !== '') {
						goto($redirectURL);
						redirectURL.clearRedirectURL();
					}
				});
			} else if (action === 'logout') {
				goto('/');
				user.logout();
				netlifyIdentity.logout();
			}
		}
	}
</script>

<div class="app">
	<Header />

	<main>
		{#if !isLoggedIn}
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
