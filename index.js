async function sendMessage() {
  const message = document.getElementById('msgInput').value;
  document.getElementById('chat').innerHTML += `<div class="msg user"> ${message}</div>`;
  document.getElementById('msgInput').value = '';

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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", // 🔁 استبدلها بمفتاحك
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-70b-instruct", // نموذج مجاني وسريع
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "an error";
    document.getElementById('chat').innerHTML += `<div class="msg bot">AI: ${reply}</div>`;
  } catch (err) {
    console.error(err);
    document.getElementById('chat').innerHTML += `<div class="msg bot">no conection</div>`;
  }
}
