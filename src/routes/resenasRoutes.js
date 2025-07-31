const express = require("express");
const router = express.Router();
const { calificar } = require("../controllers/resenasController");
const validarErrores = require("../middlewares/validarErrores");

const {
  verificarToken,
  autorizarRoles,
} = require("../middlewares/verificarToken");

router.post(
  "/calificar",
  validarErrores,
  verificarToken,
  autorizarRoles("CLIENTE"),
  calificar
);

module.exports = router;
