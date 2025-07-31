const pool = require("../config/db");

const registrar = async (categoria) => {
  const query = `INSERT INTO categorias (nombre_cat) VALUES ($1) RETURNING *`;
  const resultado = await pool.query(query, [categoria]);
  return resultado.rows[0];
};

const buscarPorCategoria = async (categoria) => {
  const query = `SELECT * FROM categorias WHERE nombre_cat = $1`;
  const resultado = await pool.query(query, [categoria]);
  return resultado.rows[0];
};

const listarCategorias = async () => {
  const query = `SELECT * FROM categorias`;
  const resultado = await pool.query(query);
  return resultado.rows;
};

const listarCategoriasLibros = async () => {
  const query = `SELECT c.id,nombre_cat, jsonb_agg(l.*) AS libros FROM categorias c LEFT JOIN libros l ON c.id = l.id_categoria GROUP BY c.id;`;
  const resultado = await pool.query(query);
  return resultado.rows;
};

const obtenerCategoria = async (id) => {
  const query = `SELECT * from categorias WHERE id = $1`;
  const resultado = await pool.query(query, [id]);
  return resultado.rows[0];
};

const actualizarCategoria = async (idCategoria, categoria) => {
  const query = `UPDATE categorias SET nombre_cat = $1 WHERE id = $2 RETURNING *`;
  const resultado = await pool.query(query, [categoria, idCategoria]);
  return resultado.rows;
};

const eliminarCategoria = async (idCategoria) => {
  const query = `DELETE FROM categorias WHERE id = $1 RETURNING *`;
  const resultado = await pool.query(query, [idCategoria]);
  return resultado.rows;
};

module.exports = {
  registrar,
  buscarPorCategoria,
  listarCategorias,
  obtenerCategoria,
  actualizarCategoria,
  eliminarCategoria,
  listarCategoriasLibros,
};
