const express = require("express");
const router = express.Router();
const carritoController = require("../controllers/carritoController");
const verificarToken = require("../middlewares/verificarToken");

router.post("/agregar/:id", verificarToken, carritoController.agregarAlCarrito);
router.get("/listar/:id", verificarToken, carritoController.listarCarrito);
router.delete(
  "/eliminar/:id_usuario/:id",
  verificarToken,
  carritoController.eliminarLibroDelCarrito
);
router.delete("/vaciar/:id", verificarToken, carritoController.vaciarCarrito);

module.exports = router;
