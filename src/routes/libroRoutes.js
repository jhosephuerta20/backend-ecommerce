const express = require("express");
const router = express.Router();
const controlador = require("../controllers/libroController");
const upload = require("../middlewares/multer");

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
router.get("/listar", controlador.listarLibros);
router.get("/:id", controlador.obtenerLibro);

router.get("/catalogo/completo", controlador.catalogo);

module.exports = router;
