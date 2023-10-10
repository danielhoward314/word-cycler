<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import netlifyIdentity from 'netlify-identity-widget';
	import Header from './Header.svelte';
	import './styles.css';
	import { user } from '$lib/store/netlifyIdentityWidget';

	onMount(() => {
			netlifyIdentity.init();
	});

	/**
	 * @param {string} action
	 */
	function handleUserAction(action) {
			if (action === 'login' || action === 'signup') {
				netlifyIdentity.open(action);
				console.log('open')
				netlifyIdentity.on('login', async () => {
					console.log($user)
					user.login();
					console.log($user)
					netlifyIdentity.close();
					goto('/');
				});
			} else if (action === 'logout') {
				goto('/');
				user.logout();
				netlifyIdentity.logout();
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
