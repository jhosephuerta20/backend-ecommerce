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
      return res.status(409).json({ error: "EL libro ya está registrado" });
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

const actualizarLibro = async (req, res) => {
  const { id } = req.params;
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

  console.log(isbn, id);
  try {
    resultado = await Libros.actualizarLibro(
      isbn,
      titulo,
      descripcion,
      precio,
      url_portada,
      url_libro,
      id_categoria,
      id_autor,
      id
    );
    res.json({ libro: resultado });
    console.log(resultado);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al actualizar", detalle: error.message });
  }
  console.log(resultado);
};

const eliminarLibro = async (req, res) => {
  const { id } = req.params;
  try {
    resultado = await Libros.eliminarLibro(id);
    res.json("libro eliminado");
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al eliminar ", detalle: error.message });
  }
};

const filtroLibro = async (req, res) => {
  const { titulo } = req.body;
  try {
    const resultado = await Libros.filtroLibro(titulo);
    res.json(libro);
  } catch (error) {}
};

//LIBROS PARA CATALOGO CON TODA LA INFORMACION COMPLETA

const catalogo = async (req, res) => {
  try {
    const data = await Libros.obtenerCatalogo();

    const catalogoMap = new Map();

    for (const row of data) {
      const {
        libro_id,
        titulo,
        descripcion,
        precio,
        url_portada,
        url_libro,
        nombre_categoria,
        nombre_autor,
        resena_id,
        calificacion,
        resena_usuario_id,
        nombre_usuario_resena,
        comentario_id,
        comentario,
        comentario_usuario_id,
        nombre_usuario_comentario,
      } = row;

      if (!catalogoMap.has(libro_id)) {
        catalogoMap.set(libro_id, {
          id: libro_id,
          titulo,
          descripcion,
          precio,
          url_portada,
          url_libro,
          categoria: nombre_categoria,
          autor: nombre_autor,
          resenas: [],
          comentarios: [],
        });
      }

      const libro = catalogoMap.get(libro_id);

      // Añadir reseña si existe
      if (resena_id && !libro.resenas.some((r) => r.id === resena_id)) {
        libro.resenas.push({
          id: resena_id,
          calificacion,
          usuario: {
            id: resena_usuario_id,
            nombre: nombre_usuario_resena,
          },
        });
      }

      // Añadir comentario si existe
      if (
        comentario_id &&
        !libro.comentarios.some((c) => c.id === comentario_id)
      ) {
        libro.comentarios.push({
          id: comentario_id,
          comentario,
          usuario: {
            id: comentario_usuario_id,
            nombre: nombre_usuario_comentario,
          },
        });
      }
    }

    const resultado = Array.from(catalogoMap.values());

    res.json(resultado);
  } catch (error) {
    res.status(500).json({
      error: "Error en la lista de catálogo",
      detalle: error.message,
    });
  }
};

module.exports = {
  registrar,
  listarLibros,
  obtenerLibro,
  actualizarLibro,
  eliminarLibro,
  filtroLibro,
  catalogo,
};
