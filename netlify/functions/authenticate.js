const { PASSWORD } = process.env;
const cookie = require('cookie');

exports.handler = async (event) => {
	if (event.httpMethod !== 'POST') {
		return { statusCode: 405, body: 'Method Not Allowed', headers: { Allow: 'POST' } };
	}
	const data = JSON.parse(event.body);
	const pwdToCheck = data.password;
	if (pwdToCheck === PASSWORD) {
		const hour = 3600000;
		const twoWeeks = 14 * 24 * hour;
		const loggedInCookie = cookie.serialize('word_cycler', 'true', {
			secure: true,
			httpOnly: true,
			path: '/',
			maxAge: twoWeeks
		});
		return {
			headers: {
				'Set-Cookie': loggedInCookie
			},
			statusCode: 200,
			body: JSON.stringify({ success: true })
		};
	} else {
		return {
			statusCode: 403,
			body: JSON.stringify({ success: false })
		};
	}
};
