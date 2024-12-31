document.getElementById("ask-btn")?.addEventListener("click", async () => {
  const userInput = document.getElementById("user-input").value;

  if (!userInput) {
    alert("Please enter a question.");
    return;
  }

  document.getElementById("ai-response").textContent = "Processing...";

  try {
    const response = await fetch("/.netlify/functions/openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userInput }),
    });

    const data = await response.json();

    if (data.choices) {
      document.getElementById("ai-response").textContent =
        data.choices[0].text.trim();
    } else {
      document.getElementById("ai-response").textContent =
        "No response received. Try again.";
    }
  } catch (error) {
    document.getElementById("ai-response").textContent =
      "An error occurred. Please try again.";
  }
});
