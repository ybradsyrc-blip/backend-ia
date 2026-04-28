import express from "express";

const app = express();
app.use(express.json());

// ruta simple para probar
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

// 🔥 IMPORTANTE
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
