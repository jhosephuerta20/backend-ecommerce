const express = require("express");
const router = express.Router();
const controlador = require("../controllers/autorController");

//Rutas pretegidas solo para administrador
router.post("/registrar", controlador.registrar);
router.get("/listar", controlador.listarAutores);

module.exports = router;
