const express = require("express");
const router = express.Router();
const validarErrores = require("../middlewares/validarErrores");
const {
  registrar,
  actualizarLibro,
  eliminarLibro,
  obtenerLibro,
  catalogo,
  listarLibrosBiblioteca,
} = require("../controllers/libroController");
const upload = require("../middlewares/multer");
const {
  verificarToken,
  autorizarRoles,
} = require("../middlewares/verificarToken");

router.post(
  "/crear",
  upload.fields([
    { name: "url_portada", maxCount: 1 },
    { name: "url_libro", maxCount: 1 },
  ]),
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
  actualizarLibro
);
router.delete(
  "/:id",
  validarErrores,
  verificarToken,
  autorizarRoles("ADMIN"),
  eliminarLibro
);

//rutas usuario CLIENTE
router.get("/:id", validarErrores, obtenerLibro);
router.get("/catalogo/completo", validarErrores, catalogo);

//Rutas protegidas lista de biblioteca
router.get(
  "/listar/biblioteca/:id",
  validarErrores,
  verificarToken,
  autorizarRoles("CLIENTE"),
  listarLibrosBiblioteca
);
module.exports = router;
