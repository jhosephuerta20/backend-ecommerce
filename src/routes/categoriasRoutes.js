const express = require("express");
const router = express.Router();
const controlador = require("../controllers/categoriasController");

// Rutas públicas
router.get("/listar", controlador.listarCategorias);
router.get("/:id", controlador.obtenerCategoria);

//Rutas pretegidas solo para administrador
router.post("/registrar", controlador.registrar);
router.put("/:id", controlador.actualizarCategoria);
router.delete("/:id", controlador.eliminarCategoria);

module.exports = router;
