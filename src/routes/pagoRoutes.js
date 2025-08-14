const express = require("express");
const router = express.Router();
const {
  procesarVenta,
  crearIntentoDePago,
} = require("../controllers/pagoController");
const validarErrores = require("../middlewares/validarErrores");

const {
  verificarToken,
  autorizarRoles,
} = require("../middlewares/verificarToken");

router.post(
  "/crear-intento",
  verificarToken,
  autorizarRoles("CLIENTE"),
  crearIntentoDePago
);

router.post(
  "/confirmar/:id",
  validarErrores,
  verificarToken,
  autorizarRoles("CLIENTE"),
  procesarVenta
);

module.exports = router;
