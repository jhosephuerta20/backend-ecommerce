const express = require("express");
const router = express.Router();
const validarErrores = require("../middlewares/validarErrores");
const {
  registrar,
  listarFavoritos,
  eliminarFavorito,
} = require("../controllers/favoritosController");
const {
  verificarToken,
  autorizarRoles,
} = require("../middlewares/verificarToken");

//rutas ADMIN
router.post(
  "/agregar/:id",
  validarErrores,
  verificarToken,
  autorizarRoles("CLIENTE"),
  registrar
);
router.get(
  "/listar/:id_usuario",
  validarErrores,
  verificarToken,
  autorizarRoles("CLIENTE"),
  listarFavoritos
);
router.delete(
  "/eliminar/:id",
  validarErrores,
  verificarToken,
  autorizarRoles("CLIENTE"),
  eliminarFavorito
);

module.exports = router;
