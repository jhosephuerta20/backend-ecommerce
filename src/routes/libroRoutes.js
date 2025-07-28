const express = require("express");
const router = express.Router();
const controlador = require("../controllers/libroController");
const upload = require("../middlewares/multer");
const verificarToken = require("../middlewares/verificarToken");

router.post(
  "/crear",
  upload.fields([
    { name: "url_portada", maxCount: 1 },
    { name: "url_libro", maxCount: 1 },
  ]),
  controlador.registrar
);

router.put("/:id", controlador.actualizarLibro);
router.delete("/:id", controlador.eliminarLibro);

//rutas usuario cliente
router.get("/:id", controlador.obtenerLibro);
router.get("/catalogo/completo", controlador.catalogo);
//Rutas protegidas lista de biblioteca
router.get(
  "/listar/biblioteca/:id",
  verificarToken,
  controlador.listarLibrosBiblioteca
);
module.exports = router;
