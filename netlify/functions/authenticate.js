const { PASSWORD } = process.env;

exports.handler = async (event) => {
	if (event.httpMethod !== 'POST') {
		return { statusCode: 405, body: 'Method Not Allowed', headers: { Allow: 'POST' } };
	}
	const data = JSON.parse(event.body);
	const pwdToCheck = data.password;
	if (pwdToCheck === PASSWORD) {
		return {
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
