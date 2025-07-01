const express = require("express");
const router = express.Router();
const controlador = require("../controllers/categoriasController");

// Rutas públicas
router.post("/registrar", controlador.registrar);
router.get("/listar", controlador.listarCategorias);
router.get("/:id", controlador.obtenerCategoria);
router.put("/:id", controlador.actualizarCategoria);
router.delete("/:id", controlador.eliminarCategoria);

module.exports = router;
