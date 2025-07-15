const Resenas = require("../models/resenasModel");

const calificar = async (req, res) => {
  const { calificacion, id_usuario, id_libro } = req.body;
  try {
    const calificacionLibro = await Resenas.calificarLibro(
      calificacion,
      id_usuario,
      id_libro
    );
    res.status(201).json({
      mensaje: "Libro calificado",
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en la calificacion", detalle: error.message });
  }
};

module.exports = {
  calificar,
};
