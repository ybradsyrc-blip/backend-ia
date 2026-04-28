// 🟢 IA fácil (GET)
app.get("/ia", async (req, res) => {
  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: "Dame un consejo corto para el estrés digital"
      })
    });

    const data = await response.json();

    console.log("IA response:", data);

    let text = "";

    if (data.output && data.output.length > 0) {
      const first = data.output[0];

      if (first.content && first.content.length > 0) {
        text = first.content[0].text || "";
      }
    }

    if (!text) {
      return res.send("Error en IA (sin respuesta)");
    }

    res.send(text);

  } catch (error) {
    console.error("Error:", error);
    res.send("Error en IA");
  }
});


// 🔵 IA para app (POST)
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `Eres un asistente que ayuda con estrés digital. Responde corto.\nUsuario: ${userMessage}`
      })
    });

    const data = await response.json();

    console.log("Chat response:", data);

    let text = "";

    if (data.output && data.output.length > 0) {
      const first = data.output[0];

      if (first.content && first.content.length > 0) {
        text = first.content[0].text || "";
      }
    }

    if (!text) {
      return res.json({ reply: "Error en IA (sin respuesta)" });
    }

    res.json({ reply: text });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ reply: "Error en IA" });
  }
});
