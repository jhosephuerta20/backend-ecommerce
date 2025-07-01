const pool = require("../config/db");

const registrar = async (
  isbn,
  titulo,
  descripcion,
  precio,
  url_portada,
  url_libro,
  id_categoria
) => {
  const query = `INSERT INTO libros (isbn,titulo,descripcion,precio,url_portada,url_libro,id_categoria) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
  const resultado = await pool.query(query, [
    isbn,
    titulo,
    descripcion,
    precio,
    url_portada,
    url_libro,
    id_categoria,
  ]);
  return resultado.rows[0];
};

const buscarPorIsbn = async (isbn) => {
  const query = `SELECT isbn FROM libros WHERE isbn = $1`;
  const resultado = await pool.query(query, [isbn]);
  return resultado.rows[0];
};

module.exports = {
  registrar,
  buscarPorIsbn,
};
