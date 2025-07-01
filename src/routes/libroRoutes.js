const express = require("express");
const router = express.Router();
const controlador = require("../controllers/lilbroController");

//rutas admin
router.post("/crear", controlador.registrar);

//rutas usuario cliente

module.exports = router;
