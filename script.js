async function sendMessage() {
  const inputField = document.getElementById("userInput");
  const userText = inputField.value.trim();
  if (!userText) return;

  appendMessage("Ayah", userText);
  inputField.value = "";

  appendMessage("Toby", "Mengetik...");

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText })
    });
    const data = await response.json();
    removeLastMessage();
    appendMessage("Toby", data.reply);
  } catch (error) {
    removeLastMessage();
    appendMessage("Toby", "Maaf Ayah, sepertinya ada masalah teknis. Coba lagi nanti ya 🙏");
  }
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
  if (chatlog.lastChild) chatlog.removeChild(chatlog.lastChild);
}
