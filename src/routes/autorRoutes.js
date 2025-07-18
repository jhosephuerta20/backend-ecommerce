const express = require("express");
const router = express.Router();
const controlador = require("../controllers/autorController");

//Rutas pretegidas solo para administrador
router.post("/registrar", controlador.registrar);
router.get("/listar", controlador.listarAutores);
router.get("/obtener/individual/:id", controlador.obtenerAutor);
router.put("/actualizar/:id", controlador.actualizarAutor);
router.delete("/eliminar/:id", controlador.eliminarAutor);

module.exports = router;
