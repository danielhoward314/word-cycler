const { DICTIONARY_API_KEY } = process.env;

exports.handler = async (event) => {
    const { word = "word" } = event.queryStringParameters;
    let requestURL = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}/?key=${DICTIONARY_API_KEY}`;
    const response = await fetch(requestURL);
    const definition = await response.json();
	return {
		statusCode: 200,
		body: JSON.stringify(definition)
	};
};
