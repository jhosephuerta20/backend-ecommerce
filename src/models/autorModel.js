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

module.exports = {
  registrar,
  buscarPorAutor,
  listarAutores,
};
