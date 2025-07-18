const pool = require("../config/db");

const registrar = async (nombre, url_foto) => {
  const query = `INSERT INTO autor (nombre,url_foto) VALUES ($1, $2) RETURNING *`;
  const resultado = await pool.query(query, [nombre, url_foto]);
  return resultado.rows[0];
};

const buscarPorAutor = async (nombre) => {
  const query = `SELECT * FROM autor WHERE nombre = $1`;
  const resultado = await pool.query(query, [nombre]);
  return resultado.rows[0];
};

const listarAutores = async () => {
  const query = `SELECT * FROM autor`;
  const resultado = await pool.query(query);
  return resultado.rows;
};

const updateAutor = async (nombre, url_foto, id) => {
  const query =
    "UPDATE autor SET nombre = $1, url_foto = $2 WHERE id = $3 RETURNING *";
  const resultado = await pool.query(query, [nombre, url_foto, id]);
  return resultado.rows;
};

const deleteAutor = async (id) => {
  const query = "DELETE FROM autor WHERE id = $1 RETURNING *";
  const resultado = await pool.query(query, [id]);
  return resultado.rows;
};

const obtenerIdAutor = async (id) => {
  const query = `SELECT * from autor WHERE id = $1`;
  const resultado = await pool.query(query, [id]);
  return resultado.rows[0];
};

module.exports = {
  registrar,
  buscarPorAutor,
  listarAutores,
  updateAutor,
  deleteAutor,
  obtenerIdAutor,
};
