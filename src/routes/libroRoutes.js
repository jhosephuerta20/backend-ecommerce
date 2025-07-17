const express = require("express");
const router = express.Router();
const controlador = require("../controllers/libroController");
//const verificarToken = require("../middlewares/verificarToken");

//rutas admin
router.post("/crear", controlador.registrar);
router.put("/:id", controlador.actualizarLibro);
router.delete("/:id", controlador.eliminarLibro);

//rutas usuario cliente
router.get("/listar", controlador.listarLibros);
router.get("/:id", controlador.obtenerLibro);

router.get("/catalogo/completo", controlador.catalogo);

module.exports = router;
