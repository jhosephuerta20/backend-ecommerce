const express = require("express");
const router = express.Router();
const controlador = require("../controllers/comentarioController");
const verificarToken = require("../middlewares/verificarToken");

router.post(
  "/crear/:id_libro/:id_usuario",
  verificarToken,
  controlador.comentar
);

module.exports = router;
