
async function sendMessage() {
  const userInput = document.getElementById("userInput").value;
  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML += `<p><strong>Ayah:</strong> ${userInput}</p>`;
  document.getElementById("userInput").value = "";
  chatBox.innerHTML += `<p><strong>Toby:</strong> Mengetik...</p>`;

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userInput })
  });

  const data = await response.json();
  chatBox.innerHTML = chatBox.innerHTML.replace(/<p><strong>Toby:<\/strong> Mengetik\.\.\.<\/p>/, '');
  chatBox.innerHTML += `<p><strong>Toby:</strong> ${data.reply}</p>`;
}
