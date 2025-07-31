const express = require("express");
const router = express.Router();
const validarErrores = require("../middlewares/validarErrores");
// const {
//   verificarToken,
//   autorizarRoles,
// } = require("../middlewares/validarTokenCliente");
const {
  registrar,
  iniciarSesion,
} = require("../controllers/autenticacionController");

// Rutas públicas
router.post("/registrar", validarErrores, registrar);
router.post("/iniciar-sesion", validarErrores, iniciarSesion);

// Ruta protegida simple
// router.get("/perfil", verificarToken, async (req, res) => {
//   const id = req.usuarioId;
//   res.json({ mensaje: "Acceso autorizado", id_usuario: id });
// });

// // Ruta protegida con datos reales del usuarios
// router.get("/mi-perfil", verificarToken, controlador.obtenerPerfil);

module.exports = router;
