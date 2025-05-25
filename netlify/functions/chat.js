cd netlify\functions
notepad chat.js
import fetch from "node-fetch";
exports.handler = async (event) => {
  try {
    const { prompt } = JSON.parse(event.body);
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAIAPIKEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: `You are Devon Balagan, a 12th-level Bard…` },
          { role: "user",   content: prompt }
        ]
      })
    });
    const data = await resp.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ reply: data.choices[0].message.content })
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
