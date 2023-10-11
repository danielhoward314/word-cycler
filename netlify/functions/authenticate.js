const { PASSWORD } = process.env;

exports.handler = async (event) => {
	if (event.httpMethod !== 'POST') {
		return { statusCode: 405, body: 'Method Not Allowed', headers: { Allow: 'POST' } };
	}
	const data = JSON.parse(event.body);
	const pwdToCheck = data.password;
	const pwds = (PASSWORD || '').split(',');
	let isMatch = false;
	for (let i = 0; i < pwds.length; i++) {
		if (pwdToCheck === pwds[i]) {
			isMatch = true;
		}
	}
	if (isMatch) {
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
