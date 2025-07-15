const express = require("express");
const router = express.Router();
const controlador = require("../controllers/resenasController");
const verificarToken = require("../middlewares/verificarToken");

router.post("/calificar", verificarToken, controlador.calificar);

module.exports = router;
