const express = require("express");
const router = express.Router();
const controlador = require("../controllers/autenticacionController");
const verificarToken = require("../middlewares/verificarToken");

// Rutas públicas
router.post("/registrar", controlador.registrar);
router.post("/iniciar-sesion", controlador.iniciarSesion);

// Ruta protegida simple
router.get("/perfil", verificarToken, async (req, res) => {
  const id = req.usuarioId;
  res.json({ mensaje: "Acceso autorizado", id_usuario: id });
});

// Ruta protegida con datos reales del usuarios
router.get("/mi-perfil", verificarToken, controlador.obtenerPerfil);

module.exports = router;
