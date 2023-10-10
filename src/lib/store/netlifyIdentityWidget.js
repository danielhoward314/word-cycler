import { writable } from 'svelte/store';

function createLocalUser() {
	let u = { isLoggedIn: false };
	const { subscribe, set } = writable(u);

	return {
		subscribe,
		login() {
			set({ isLoggedIn: true });
		},
		logout() {
			set({ isLoggedIn: false });
		}
	};
}

function createUser() {
	let u = null;
	const { subscribe, set } = writable(u);

	return {
		subscribe,
		login(user) {
			const currentUser = {
				username: user.user_metadata.full_name,
				email: user.email,
				access_token: user.token.access_token,
				expires_at: user.token.expires_at,
				refresh_token: user.token.refresh_token,
				token_type: user.token.token_type
			};
			set(currentUser);
		},
		logout() {
			set(null);
		}
	};
}

function createRedirectURL() {
	const { subscribe, set } = writable('');
	return {
		subscribe,
		setRedirectURL(url) {
			set(url);
		},
		clearRedirectURL() {
			set('');
		}
	};
}

export const localUser = createLocalUser();
export const user = createUser();
export const redirectURL = createRedirectURL();
