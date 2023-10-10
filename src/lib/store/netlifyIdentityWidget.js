import { writable } from 'svelte/store';

function createUser() {

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

export const user = createUser();
export const redirectURL = createRedirectURL();
