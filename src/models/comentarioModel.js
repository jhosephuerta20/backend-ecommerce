const pool = require("../config/db");

const comentar = async (id_libro, id_usuario, comentario) => {
  const query = `INSERT INTO comentarios (id_libro, id_usuario, comentario) VALUES ($1, $2, $3) RETURNING *;`;
  const resultado = await pool.query(query, [id_libro, id_usuario, comentario]);
  return resultado.rows[0];
};

const validacion = async (id_libro, id_usuario) => {
  const query = `SELECT * FROM comentarios WHERE id_libro = $1 AND id_usuario = $2`;
  const resultado = await pool.query(query, [id_libro, id_usuario]);
  return resultado.rows.length > 0;
};

module.exports = {
  comentar,
  validacion,
};
