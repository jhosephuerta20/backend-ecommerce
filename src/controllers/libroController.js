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
    id_autor,
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
      id_categoria,
      id_autor
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
        id_autor: nuevo.id_autor,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en el registro", detalle: error.message });
  }
};

const listarLibros = async (req, res) => {
  try {
    resultado = await Libros.listarLibros();
    res.status(200);
    res.json({ libros: resultado });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al listar libros", detalle: error.message });
  }
};

const obtenerLibro = async (req, res) => {
  const { id } = req.params;
  try {
    resultado = await Libros.libroPorId(id);
    if (!resultado) {
      res.json({ resultado: "Libro no registrado" });
    } else {
      res.status(200);
      res.json({ libro: resultado });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al buscar libro", detalle: error.message });
  }
};
module.exports = {
  registrar,
  listarLibros,
  obtenerLibro,
};
