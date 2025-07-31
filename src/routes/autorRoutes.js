const express = require("express");
const router = express.Router();
const {
  registrar,
  listarAutores,
  actualizarAutor,
  obtenerAutor,
  eliminarAutor,
} = require("../controllers/autorController");
const upload = require("../middlewares/multer");
const validarErrores = require("../middlewares/validarErrores");

const {
  verificarToken,
  autorizarRoles,
} = require("../middlewares/verificarToken");

//Rutas pretegidas solo para administrador
router.post(
  "/registrar",
  upload.single("imagen_url"),
  validarErrores,
  verificarToken,
  autorizarRoles("ADMIN"),
  registrar
);
router.get("/listar", validarErrores, listarAutores);
router.get("/obtener/individual/:id", validarErrores, obtenerAutor);
router.put(
  "/actualizar/:id",
  validarErrores,
  verificarToken,
  autorizarRoles("ADMIN"),
  actualizarAutor
);
router.delete(
  "/eliminar/:id",
  validarErrores,
  verificarToken,
  autorizarRoles("ADMIN"),
  eliminarAutor
);

module.exports = router;
