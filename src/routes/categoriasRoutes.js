const express = require("express");
const router = express.Router();
const {
  listarCategorias,
  obtenerCategoria,
  registrar,
  actualizarCategoria,
  eliminarCategoria,
} = require("../controllers/categoriasController");
const validarErrores = require("../middlewares/validarErrores");

const {
  verificarToken,
  autorizarRoles,
} = require("../middlewares/verificarToken");

// Rutas públicas
router.get("/listar", listarCategorias);
router.get("/:id", obtenerCategoria);

//Rutas pretegidas solo para administrador
router.post(
  "/registrar",
  validarErrores,
  verificarToken,
  autorizarRoles("ADMIN"),
  registrar
);
router.put(
  "/:id",
  validarErrores,
  verificarToken,
  autorizarRoles("ADMIN"),
  actualizarCategoria
);
router.delete(
  "/:id",
  validarErrores,
  verificarToken,
  autorizarRoles("ADMIN"),
  eliminarCategoria
);

module.exports = router;
