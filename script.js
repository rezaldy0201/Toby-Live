
const apiUrl = "https://api.deepseek.com/openai/v1/chat/completions";
const apiKey = "DEEPSEEK-API-KEY-HERE"; // Ganti dengan API key kamu jika punya

async function sendMessage() {
  const inputField = document.getElementById("userInput");
  const userText = inputField.value.trim();
  if (!userText) return;

  appendMessage("Ayah", userText);
  inputField.value = "";

  appendMessage("Toby", "Mengetik...");

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [{ role: "user", content: userText }],
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "Maaf, Toby tidak bisa menjawab saat ini.";

  removeLastMessage(); // Hapus 'Mengetik...'
  appendMessage("Toby", reply);
}

function appendMessage(sender, message) {
  const chatlog = document.getElementById("chatlog");
  const messageElem = document.createElement("div");
  messageElem.className = "message";
  messageElem.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatlog.appendChild(messageElem);
  chatlog.scrollTop = chatlog.scrollHeight;
}

function removeLastMessage() {
  const chatlog = document.getElementById("chatlog");
  chatlog.removeChild(chatlog.lastChild);
}
