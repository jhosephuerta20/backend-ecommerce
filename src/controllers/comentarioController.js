const Comentario = require("../models/comentarioModel");

const comentar = async (req, res) => {
  const { id_libro, id_usuario } = req.params;
  const { comentario } = req.body;

  try {
    const existeComentario = await Comentario.validacion(id_libro, id_usuario);
    if (existeComentario) {
      return res
        .status(409)
        .json({ error: "Ya has dejado un comentario en este libro" });
    }
    if (comentario.trim() === "") {
      return res
        .status(400)
        .json({ error: "El comentario no puede estar vacío" });
    }
    const result = await Comentario.comentar(id_libro, id_usuario, comentario);
    res.status(201).json({
      mensaje: "Comentario registrado correctamente",
      comentario: result,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al procesar el comentario",
      detalle: error.message,
    });
  }
};

module.exports = {
  comentar,
};
