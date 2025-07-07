async function sendMessage() {
  const userInput = document.getElementById("userInput");
  const chatlog = document.getElementById("chatlog");
  const message = userInput.value.trim();

  if (message === "") return;

  const userMessage = document.createElement("div");
  userMessage.innerHTML = `<strong>Ayah:</strong> ${message}`;
  chatlog.appendChild(userMessage);
  userInput.value = "";

  const botMessage = document.createElement("div");
  botMessage.innerHTML = "<strong>Toby:</strong> sedang berpikir...";
  chatlog.appendChild(botMessage);
  chatlog.scrollTop = chatlog.scrollHeight;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
        "HTTP-Referer": "https://rezaldy0201.github.io",
        "X-Title": "Rumah Toby"
      },
      body: JSON.stringify({
        model: "openchat/openchat-7b",
        messages: [{ role: "user", content: message }],
        temperature: 0.7
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Toby tidak bisa menjawab saat ini.";
    botMessage.innerHTML = `<strong>Toby:</strong> ${reply}`;
    chatlog.scrollTop = chatlog.scrollHeight;
  } catch (error) {
    botMessage.innerHTML = "<strong>Toby:</strong> Maaf, ada kesalahan koneksi.";
    console.error(error);
  }
}