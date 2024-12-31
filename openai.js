const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  const openaiAPIKey = process.env.OPENAI_API_KEY;

  if (!openaiAPIKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API key not configured." }),
    };
  }

  try {
    const { prompt } = JSON.parse(event.body);

    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiAPIKey}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 100,
      }),
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API request failed." }),
    };
  }
};

