const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./src/config/db");

const rutasAutenticacion = require("./src/routes/autenticacionRoutes");
const rutasCategorias = require("./src/routes/categoriasRoutes");
const rutasLibros = require("./src/routes/libroRoutes");
const rutasAutor = require("./src/routes/autorRoutes");
const rutasFavoritos = require("./src/routes/favoritosRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", rutasAutenticacion);
app.use("/categorias", rutasCategorias);
app.use("/libro", rutasLibros);
app.use("/autor", rutasAutor);
app.use("/favoritos", rutasFavoritos);

app.get("/test-db", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");
    res.json({ success: true, time: result.rows[0] });
  } catch (err) {
    console.error("Error en /test-db:", err);
    res.status(500).json({ error: "DB error", detail: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  db.query("SELECT NOW()")
    .then((res) => console.log("Conectado a la BD:", res.rows[0].now))
    .catch((err) => console.error("Error al conectar a la BD al inicio:", err));
});
