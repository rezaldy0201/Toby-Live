
export default async function handler(req, res) {
  const { message } = req.body;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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"
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-chat-v3-0324:free",
      messages: [{ role: "user", content: message }],
    })
  });

  const data = await response.json();
  res.status(200).json({ reply: data.choices[0].message.content });
}
