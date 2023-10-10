const { PASSWORD } = process.env;

exports.handler = async (event) => {
	const pwdToCheck = event.body.password;
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
