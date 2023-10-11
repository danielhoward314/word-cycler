import { error } from '@sveltejs/kit';
import { routes } from '$lib/data/routes';
import { URL } from 'url';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	let { pathname } = new URL(url);
	let match = false;
	// strip the leading `/`
	pathname = pathname.slice(1);
	if (pathname === '') {
		return;
	}
	for (let i = 0; i < routes.length; i++) {
		if (pathname === routes[i]) {
			match = true;
		}
	}

	if (!match) {
		throw error(404, {
			message: 'Not found'
		});
	}

	return;
}
