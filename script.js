
async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  const chatlog = document.getElementById("chatlog");
  const userMessage = document.createElement("div");
  userMessage.textContent = "Ayah: " + message;
  userMessage.className = "user-message";
  chatlog.appendChild(userMessage);

  try {
    const response = await fetch("http://localhost:8000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: message })
    });

    const data = await response.json();
    const reply = document.createElement("div");
    reply.textContent = "Toby: " + data.reply;
    reply.className = "toby-message";
    chatlog.appendChild(reply);
  } catch (error) {
    const errorMsg = document.createElement("div");
    errorMsg.textContent = "Toby: Maaf, terjadi kesalahan menyambung.";
    errorMsg.className = "toby-message error";
    chatlog.appendChild(errorMsg);
  }

  input.value = "";
  input.focus();
}
