const express = require("express");
const router = express.Router();
const controlador = require("../controllers/favoritosController");
const verificarToken = require("../middlewares/verificarToken");

//rutas admin
router.post("/agregar", verificarToken, controlador.registrar);
router.get("/listar/:id_usuario", verificarToken, controlador.listarFavoritos);
router.delete("/eliminar/:id", verificarToken, controlador.eliminarFavorito);

module.exports = router;
