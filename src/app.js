// Carrega as variáveis de ambiente do arquivo .env
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const conectarBanco = require("./config/database");

// ─────────────────────────────────────────────
// Inicialização do app Express
// ─────────────────────────────────────────────
const app = express();

// ─────────────────────────────────────────────
// Middlewares globais
// ─────────────────────────────────────────────
app.use(cors({ origin: "*" }));
app.use(express.json());

// ─────────────────────────────────────────────
// Rota principal
// ─────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    sucesso: true,
    mensagem: "API funcionando! 🚀",
    versao: "1.0.0",
  });
});

// ─────────────────────────────────────────────
// Rotas
// ─────────────────────────────────────────────
const usuarioRoutes = require("./routes/userRoutes");
app.use("/api/usuarios", usuarioRoutes);

// ─────────────────────────────────────────────
// Rota 404
// ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    sucesso: false,
    mensagem: `Rota "${req.method} ${req.url}" não encontrada.`,
  });
});

// ─────────────────────────────────────────────
// Conexão com banco
// ─────────────────────────────────────────────
conectarBanco();

// Exporta para a Vercel
module.exports = app;