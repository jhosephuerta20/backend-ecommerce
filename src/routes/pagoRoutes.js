const express = require("express");
const router = express.Router();
const { procesarVenta } = require("../controllers/pagoController");
const validarErrores = require("../middlewares/validarErrores");

const {
  verificarToken,
  autorizarRoles,
} = require("../middlewares/verificarToken");

router.post(
  "/confirmar/:id",
  validarErrores,
  verificarToken,
  autorizarRoles("CLIENTE"),
  procesarVenta
);

module.exports = router;
