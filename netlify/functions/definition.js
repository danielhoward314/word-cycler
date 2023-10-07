const { EXAMPLE } = process.env;

exports.handler = async (event) => {
	const word = event.path.replace('/api/definition/', '');
	let definition = {
		word,
		definition: 'this is the definition',
        example: EXAMPLE,
	};
	return {
		statusCode: 200,
		body: JSON.stringify(definition)
	};
};
