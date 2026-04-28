import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// 🟢 Ruta base
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

// 🟢 IA fácil (para navegador)
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

    res.send(data.output[0].content[0].text);

  } catch (error) {
    console.error(error);
    res.send("Error en IA");
  }
});

// 🔵 IA real (para tu app)
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

    res.json({
      reply: data.output[0].content[0].text
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en IA" });
  }
});

// 🔥 puerto Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
