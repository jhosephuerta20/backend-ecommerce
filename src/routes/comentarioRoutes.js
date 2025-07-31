const express = require("express");
const router = express.Router();
const { comentar } = require("../controllers/comentarioController");
const validarErrores = require("../middlewares/validarErrores");

const {
  verificarToken,
  autorizarRoles,
} = require("../middlewares/verificarToken");

router.post(
  "/crear/:id_libro/:id_usuario",
  validarErrores,
  verificarToken,
  autorizarRoles("CLIENTE"),
  comentar
);

module.exports = router;
