const Autor = require("../models/autorModel");
const subirImagen = require("../utils/subirImagen");

const registrar = async (req, res) => {
  const { nombre, url_foto } = req.body;
  try {
    const existente = await Autor.buscarPorAutor(nombre);
    if (existente) {
      return res.status(400).json({ error: "El autor ya está registrado" });
    }
    let url_local = url_foto;
    if (req.file) {
      url_local = await subirImagen(req.file.buffer);
    }
    const nuevo = await Autor.registrar(nombre, url_local);
    console.log(nuevo);
    res.status(201).json(nuevo);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error en el registro", detalle: error.message });
  }
};

const listarAutores = async (req, res) => {
  try {
    resultado = await Autor.listarAutores();
    res.status(200);
    res.json({ autores: resultado });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al listar autores", detalle: error.message });
  }
};

const actualizarAutor = async (req, res) => {
  const { id } = req.params;
  const { nombre, url_foto } = req.body;
  try {
    const existente = await Autor.buscarPorAutor(nombre);
    if (existente) {
      return res.status(400).json({ error: "El autor ya está registrado" });
    }
    resultado = await Autor.updateAutor(nombre, url_foto, id);
    console.log(resultado);
    res.status(200);
    res.json({ actual: resultado });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al actualizar", detalle: error.message });
  }
};

const eliminarAutor = async (req, res) => {
  const { id } = req.params;
  try {
    resultado = await Autor.deleteAutor(id);
    return res.status(200).json({ error: "El autor a sido eliminado" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error aleliinar autor", detalle: error.message });
  }
};

const obtenerAutor = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await Autor.obtenerIdAutor(id);
    res.status(200);
    res.json(resultado);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error de busqueda", detalle: error.message });
  }
};

module.exports = {
  registrar,
  listarAutores,
  actualizarAutor,
  eliminarAutor,
  obtenerAutor,
};
