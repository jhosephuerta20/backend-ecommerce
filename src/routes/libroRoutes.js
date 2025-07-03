const express = require("express");
const router = express.Router();
const controlador = require("../controllers/libroController");

//rutas admin
router.post("/crear", controlador.registrar);

//rutas usuario cliente
router.get("/listar", controlador.listarLibros);
router.get("/:id", controlador.obtenerLibro);

module.exports = router;
