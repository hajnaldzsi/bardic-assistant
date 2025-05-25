exports.handler = async function(event) {
  try {
    // Parse the incoming prompt
    const { prompt } = JSON.parse(event.body);
    // Call OpenAI using the secret env var
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAIAPIKEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are Devon Balagan, a 12th-level Half-Elf Bard of the College of Eloquence." },
          { role: "user",   content: prompt }
        ]
      })
    });
    const data = await resp.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ reply: data.choices[0].message.content })
    };
  } catch (error) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: String(error) })
    };
  }
};

