const express = require("express");
const router = express.Router();
const pagoController = require("../controllers/pagoController");
const verificarToken = require("../middlewares/verificarToken");

router.post("/confirmar/:id", verificarToken, pagoController.procesarVenta);

module.exports = router;
