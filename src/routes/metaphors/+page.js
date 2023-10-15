import { dev } from '$app/environment';
import { conceptualMetpahors } from '$lib/data/metaphors2';

// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
export const csr = dev;

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

/** @type {import('./$types').PageLoad} */
export function load() {
	let list = conceptualMetpahors.map((m) => m);
	return {
		list
	};
}
