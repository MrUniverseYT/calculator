async function submitCode() {
  const code = document.getElementById("codeInput").value.trim();
  const responseText = document.getElementById("response");

  const res = await fetch("/redeem", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code })
  });

  const data = await res.json();

  responseText.textContent = data.message;

  if (data.success) {
    window.location.href = "/games.html";
  }
}
