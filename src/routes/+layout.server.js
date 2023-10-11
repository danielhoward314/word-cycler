export function load({ cookies }) {
	const wordCyclerCookie = cookies.get('word_cycler');

	cookies.set('word_cycler', 'true', { path: '/' });
	return {
		wordCyclerCookie
	};
}
