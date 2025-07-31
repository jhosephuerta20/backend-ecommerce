const express = require("express");
const router = express.Router();
const {
  agregarAlCarrito,
  listarCarrito,
  eliminarLibroDelCarrito,
  vaciarCarrito,
} = require("../controllers/carritoController");
const validarErrores = require("../middlewares/validarErrores");

const {
  verificarToken,
  autorizarRoles,
} = require("../middlewares/verificarToken");

router.post(
  "/agregar/:id",
  validarErrores,
  verificarToken,
  autorizarRoles("CLIENTE"),
  agregarAlCarrito
);
router.get(
  "/listar/:id",
  validarErrores,
  verificarToken,
  autorizarRoles("CLIENTE"),
  listarCarrito
);
router.delete(
  "/eliminar/:id_usuario/:id",
  validarErrores,
  verificarToken,
  autorizarRoles("CLIENTE"),
  eliminarLibroDelCarrito
);
router.delete(
  "/vaciar/:id",
  validarErrores,
  verificarToken,
  autorizarRoles("CLIENTE"),
  vaciarCarrito
);

module.exports = router;
