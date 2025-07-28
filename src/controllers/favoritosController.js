const Favoritos = require("../models/favoritosModel");

const registrar = async (req, res) => {
  const id_usuario = req.usuarioId;
  const { id_libro } = req.body;
  try {
    // Verifica si ya existe el favorito
    const existente = await Favoritos.validacionFavoritos(id_usuario, id_libro);
    if (existente) {
      return res.status(409).json({ error: "El libro ya está en tu lista" });
    }

    // Agrega el favorito
    await Favoritos.agregar(id_usuario, id_libro);
    res.status(201).json({ mensaje: "Libro agregado a favorito" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en el proceso", detalle: error.message });
  }
};

const listarFavoritos = async (req, res) => {
  const id_usuario = req.usuarioId;
  try {
    const listaFavoritos = await Favoritos.listar(id_usuario);

    const favoritosTransformados = listaFavoritos.map((row) => ({
      id: row.favorito_id,
      id_usuario: row.id_usuario,
      libro: row.libro,
    }));

    res.status(200).json({ favoritos: favoritosTransformados });
  } catch (error) {
    res.status(500).json({
      error: "Error al consultar",
      detalle: error.message,
    });
  }
};

const eliminarFavorito = async (req, res) => {
  const { id } = req.params;
  try {
    const eliminarFavoritos = await Favoritos.eliminar(id);
    res.status(200);
    res.json({
      message: "libro eliminado de favorito",
      id,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al consultar", detalle: error.message });
  }
};

module.exports = {
  registrar,
  listarFavoritos,
  eliminarFavorito,
};
