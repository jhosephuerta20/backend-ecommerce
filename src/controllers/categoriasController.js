const Categoria = require("../models/categoriasModel");

const registrar = async (req, res) => {
  const { categoria } = req.body;
  try {
    const existente = await Categoria.buscarPorCategoria(categoria);
    if (existente) {
      return res.status(400).json({ error: "La categoria ya está registrado" });
    }

    const nuevo = await Categoria.registrar(categoria);

    res.status(201).json({
      mensaje: "Categoria registrada correctamente",
      categoria: {
        id: nuevo.id,
        categoria: nuevo.categoria,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en el registro", detalle: error.message });
  }
};

const listarCategorias = async (req, res) => {
  try {
    const resultado = await Categoria.listarCategorias();
    res.status(200);
    res.json({ categorias: resultado });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al listar categorias", detalle: error.message });
  }
};

const obtenerCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await Categoria.obtenerCategoria(id);
    res.status(200);
    res.json({ categoria: resultado });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error de busqueda", detalle: error.message });
  }
};

const actualizarCategoria = async (req, res) => {
  const { categoria } = req.body;
  const { id } = req.params;

  try {
    const consultaId = await Categoria.obtenerCategoria(id);
    if (!consultaId) {
      return res
        .status(404)
        .json({ error: "No existe la categoría con ese ID" });
    }
    const categoriaExistente = await Categoria.buscarPorCategoria(categoria);
    if (categoriaExistente && categoriaExistente.id != id) {
      return res.status(400).json({ error: "La categoría ya existe" });
    }
    const resultado = await Categoria.actualizarCategoria(id, categoria);
    res.status(200).json({ actualizado: resultado });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al actualizar", detalle: error.message });
  }
};

//FALTA VALIDACION QUE LA CATEGORIA NO TENGA LIBROS
const eliminarCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await Categoria.eliminarCategoria(id);
    res.status(200);
    res.json({ resultado: "Categoria eliminada" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al eliminar", detalle: error.message });
  }
};
module.exports = {
  registrar,
  listarCategorias,
  obtenerCategoria,
  actualizarCategoria,
  eliminarCategoria,
};
