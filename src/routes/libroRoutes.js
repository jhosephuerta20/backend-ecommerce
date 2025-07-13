const express = require("express");
const router = express.Router();
const controlador = require("../controllers/libroController");
const verificarToken = require("../middlewares/verificarToken");

//rutas admin
router.post("/crear", verificarToken, controlador.registrar);
router.put("/:id", verificarToken, controlador.actualizarLibro);
router.delete("/:id", verificarToken, controlador.eliminarLibro);

//rutas usuario cliente
router.get("/listar", controlador.listarLibros);
router.get("/:id", controlador.obtenerLibro);

module.exports = router;
