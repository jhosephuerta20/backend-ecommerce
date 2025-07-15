const pool = require("../config/db");

const calificarLibro = async (calificacion, id_usuario, id_libro) => {
  const query = `INSERT INTO resenas (calificacion, id_usuario, id_libro) VALUES ($1, $2, $3) RETURNING *`;
  const resultado = await pool.query(query, [
    calificacion,
    id_usuario,
    id_libro,
  ]);
  return resultado.rows[0];
};

module.exports = {
  calificarLibro,
};
