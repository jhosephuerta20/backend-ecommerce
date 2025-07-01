const Libros = require("../models/libroModel");
const registrar = async (req, res) => {
  const {
    isbn,
    titulo,
    descripcion,
    precio,
    url_portada,
    url_libro,
    id_categoria,
  } = req.body;
  try {
    const existente = await Libros.buscarPorIsbn(isbn);
    if (existente) {
      return res.status(400).json({ error: "EL libro ya está registrado" });
    }

    const nuevo = await Libros.registrar(
      isbn,
      titulo,
      descripcion,
      precio,
      url_portada,
      url_libro,
      id_categoria
    );

    res.status(201).json({
      mensaje: "Libro registrado correctamente",
      libro: {
        isbn: nuevo.isbn,
        titulo: nuevo.titulo,
        descripcion: nuevo.descripcion,
        precio: nuevo.precio,
        url_portada: nuevo.url_portada,
        url_libro: nuevo.url_libro,
        id_categoria: nuevo.id_categoria,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en el registro", detalle: error.message });
  }
};

module.exports = {
  registrar,
};
